/**
 * Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks
 * MexBot API Server with Stripe Integration and Google OAuth
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Import auth module
const {
  verifyGoogleToken,
  createOrUpdateUser,
  generateToken,
  verifyToken,
  getUserById,
  updateUserSubscription,
  hasActiveAccess,
} = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mexbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB');
});

mongoose.connection.on('error', err => {
  console.error('❌ MongoDB connection error:', err);
});

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/mexbot',
      ttl: 24 * 60 * 60, // 1 day
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  }),
);

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = verifyToken(token);
    const user = await getUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'MexBot API',
    version: '1.0.0-beta',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Google OAuth endpoints
app.post('/api/auth/google', async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'Google ID token is required' });
    }

    // Verify Google token
    const googleData = await verifyGoogleToken(idToken);

    // Create or update user
    const user = await createOrUpdateUser(googleData);

    // Generate JWT token
    const token = generateToken(user);

    // Check access status
    const hasAccess = await hasActiveAccess(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        isTrialActive: user.isTrialActive,
        trialEndDate: user.trialEndDate,
        hasActiveSubscription: user.subscription.isActive,
        hasAccess,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const hasAccess = await hasActiveAccess(req.user._id);

    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
        isTrialActive: req.user.isTrialActive,
        trialEndDate: req.user.trialEndDate,
        hasActiveSubscription: req.user.subscription.isActive,
        subscription: req.user.subscription,
        hasAccess,
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Create Stripe checkout session (updated with user authentication)
app.post('/api/create-checkout-session', authenticateToken, async (req, res) => {
  try {
    const { priceId, successUrl, cancelUrl } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    // Create or get Stripe customer
    let customer;
    if (req.user.subscription.stripeCustomerId) {
      customer = await stripe.customers.retrieve(req.user.subscription.stripeCustomerId);
    } else {
      customer = await stripe.customers.create({
        email: req.user.email,
        name: req.user.name,
        metadata: {
          userId: req.user._id.toString(),
          googleId: req.user.googleId,
        },
      });

      // Update user with Stripe customer ID
      await updateUserSubscription(req.user._id, {
        stripeCustomerId: customer.id,
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.FRONTEND_URL}/pricing`,
      metadata: {
        userId: req.user._id.toString(),
        product: 'MexBot Premium',
      },
      subscription_data: {
        metadata: {
          userId: req.user._id.toString(),
          product: 'MexBot Premium',
        },
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Handle Stripe webhooks (updated with user management)
app.post('/api/webhooks', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful for session:', session.id);

      // Update user subscription status
      if (session.metadata.userId) {
        await updateUserSubscription(session.metadata.userId, {
          isActive: true,
          startDate: new Date(),
          stripeSubscriptionId: session.subscription,
        });
      }
      break;

    case 'customer.subscription.created':
      const subscription = event.data.object;
      console.log('Subscription created:', subscription.id);

      // Update user with subscription details
      if (subscription.metadata.userId) {
        const planName = subscription.items.data[0].price.nickname || 'Premium Plan';
        await updateUserSubscription(subscription.metadata.userId, {
          isActive: true,
          planId: subscription.items.data[0].price.id,
          planName: planName,
          stripeSubscriptionId: subscription.id,
          startDate: new Date(subscription.current_period_start * 1000),
          endDate: new Date(subscription.current_period_end * 1000),
        });
      }
      break;

    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object;
      console.log('Subscription updated:', updatedSubscription.id);

      if (updatedSubscription.metadata.userId) {
        await updateUserSubscription(updatedSubscription.metadata.userId, {
          isActive: updatedSubscription.status === 'active',
          endDate: new Date(updatedSubscription.current_period_end * 1000),
        });
      }
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      console.log('Subscription cancelled:', deletedSubscription.id);

      if (deletedSubscription.metadata.userId) {
        await updateUserSubscription(deletedSubscription.metadata.userId, {
          isActive: false,
        });
      }
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      console.log('Payment succeeded for invoice:', invoice.id);
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      console.log('Payment failed for invoice:', failedInvoice.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Get subscription status (updated with authentication)
app.get('/api/subscription', authenticateToken, async (req, res) => {
  try {
    const hasAccess = await hasActiveAccess(req.user._id);

    res.json({
      hasActiveSubscription: req.user.subscription.isActive,
      isTrialActive: req.user.isTrialActive,
      trialEndDate: req.user.trialEndDate,
      subscription: req.user.subscription,
      hasAccess,
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

// Cancel subscription (updated with authentication)
app.post('/api/cancel-subscription', authenticateToken, async (req, res) => {
  try {
    if (!req.user.subscription.stripeSubscriptionId) {
      return res.status(400).json({ error: 'No active subscription found' });
    }

    const subscription = await stripe.subscriptions.update(req.user.subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    await updateUserSubscription(req.user._id, {
      isActive: false,
    });

    res.json({
      success: true,
      message: 'Subscription will be cancelled at the end of the current period',
      cancelAt: subscription.cancel_at,
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// Trial management (updated with authentication)
app.post('/api/start-trial', authenticateToken, async (req, res) => {
  try {
    // Check if user already has an active trial or subscription
    if (req.user.isTrialActive || req.user.subscription.isActive) {
      return res.status(400).json({ error: 'User already has active access' });
    }

    // Start trial
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7); // 7 days

    await updateUserSubscription(req.user._id, {
      trialStartDate: new Date(),
      trialEndDate: trialEndDate,
      isTrialActive: true,
    });

    res.json({
      success: true,
      message: 'Trial started successfully',
      trialEndDate: trialEndDate,
    });
  } catch (error) {
    console.error('Error starting trial:', error);
    res.status(500).json({ error: 'Failed to start trial' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MexBot API Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`💳 Stripe integration: ${process.env.STRIPE_SECRET_KEY ? 'Enabled' : 'Disabled'}`);
  console.log(`🔐 Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? 'Enabled' : 'Disabled'}`);
  console.log(`🗄️  MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
});

module.exports = app;
