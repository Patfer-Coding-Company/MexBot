# MexBot API Server

**Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks**

This is the backend API server for MexBot with Stripe integration and Google OAuth authentication.

## Features

- ✅ **Google OAuth**: Secure authentication with Google Sign-In
- ✅ **Stripe Integration**: Secure payment processing
- ✅ **Trial Management**: 7-day free trial system
- ✅ **Subscription Management**: Handle monthly/yearly subscriptions
- ✅ **User Management**: MongoDB-based user profiles
- ✅ **Webhook Support**: Real-time payment event handling
- ✅ **Security**: Rate limiting, CORS, and Helmet protection
- ✅ **Health Checks**: API health monitoring

## Setup Instructions

### 1. Install Dependencies

```bash
cd api
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `api` directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS and redirects)
FRONTEND_URL=http://localhost:5174

# Allowed Origins for CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,https://yourdomain.com

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/mexbot

# Google OAuth Configuration
# Get these from Google Cloud Console: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your_google_client_id_here

# Stripe Configuration
# Get these from your Stripe Dashboard: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Security
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here

# Logging
LOG_LEVEL=info
```

### 3. Google OAuth Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API

2. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" user type
   - Fill in the required information:
     - App name: "MexBot"
     - User support email: your email
     - Developer contact information: your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if needed

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - `http://localhost:5174` (for pricing page)
     - `https://yourdomain.com` (for production)
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/google`
     - `https://yourdomain.com/api/auth/google`
   - Copy the Client ID and add it to your `.env` file

4. **Update Extension Configuration**
   - Update the Google Client ID in your extension:
   ```javascript
   // In pages/side-panel/src/components/GoogleSignIn.tsx
   client_id: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id'
   ```

### 4. Stripe Setup

1. **Create a Stripe Account**
   - Go to [stripe.com](https://stripe.com) and create an account
   - Complete the verification process

2. **Get API Keys**
   - Go to [Stripe Dashboard > API Keys](https://dashboard.stripe.com/apikeys)
   - Copy your **Publishable Key** and **Secret Key**
   - Update your `.env` file with these keys

3. **Create Products and Prices**
   - Go to [Stripe Dashboard > Products](https://dashboard.stripe.com/products)
   - Create two products:
     - **MexBot Monthly** ($19.99/month)
     - **MexBot Yearly** ($199.99/year)
   - Note down the Price IDs (start with `price_`)

4. **Set Up Webhooks**
   - Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
   - Add endpoint: `https://yourdomain.com/api/webhooks`
   - Select events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
   - Copy the webhook secret and add it to your `.env` file

### 5. MongoDB Setup

1. **Install MongoDB**
   - Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas for cloud hosting

2. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mexbot
   ```

### 6. Update Pricing Page

Update the pricing page with your actual Stripe Price IDs:

```javascript
// In pages/pricing/src/index.tsx
const pricingPlans: PricingPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 19.99,
    period: 'month',
    stripePriceId: 'price_your_monthly_price_id_here', // Replace with actual Stripe price ID
    features: [...]
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    price: 199.99,
    period: 'year',
    popular: true,
    stripePriceId: 'price_your_yearly_price_id_here', // Replace with actual Stripe price ID
    features: [...]
  }
];
```

### 7. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /health` - Check API status

### Authentication
- `POST /api/auth/google` - Google OAuth authentication
- `GET /api/user/profile` - Get user profile (requires auth)

### Stripe Integration
- `POST /api/create-checkout-session` - Create Stripe checkout session (requires auth)
- `POST /api/webhooks` - Handle Stripe webhooks
- `GET /api/subscription` - Get subscription status (requires auth)
- `POST /api/cancel-subscription` - Cancel subscription (requires auth)

### Trial Management
- `POST /api/start-trial` - Start a 7-day trial (requires auth)

## Authentication Flow

1. **User clicks "Sign in with Google"** in the extension
2. **Google OAuth popup** opens for user authentication
3. **Google returns ID token** to the extension
4. **Extension sends token** to `/api/auth/google`
5. **Server verifies token** with Google
6. **Server creates/updates user** in MongoDB
7. **Server returns JWT token** and user data
8. **Extension stores token** and user data locally
9. **Extension uses token** for authenticated requests

## User Management

The API automatically manages users with the following features:

- **Automatic User Creation**: New users are created on first sign-in
- **Trial Management**: New users get a 7-day trial automatically
- **Subscription Tracking**: Links Stripe subscriptions to user accounts
- **Session Management**: JWT tokens for secure authentication
- **Profile Management**: User profiles with Google data

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable allowed origins
- **Helmet**: Security headers
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Comprehensive error handling
- **MongoDB Security**: Database connection security

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mexbot
GOOGLE_CLIENT_ID=your_production_google_client_id
STRIPE_SECRET_KEY=sk_live_your_live_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
JWT_SECRET=your_secure_jwt_secret
SESSION_SECRET=your_secure_session_secret
```

### Deployment Options

1. **Heroku**
   ```bash
   heroku create your-mexbot-api
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   git push heroku main
   ```

2. **Vercel**
   ```bash
   npm i -g vercel
   vercel --env NODE_ENV=production
   ```

3. **DigitalOcean App Platform**
   - Connect your GitHub repository
   - Set environment variables
   - Deploy

4. **AWS EC2**
   ```bash
   # Install PM2 for process management
   npm install -g pm2
   pm2 start src/index.js --name mexbot-api
   pm2 startup
   pm2 save
   ```

## Testing

```bash
npm test
```

## Monitoring

The API includes health checks and logging for monitoring:

- Health check: `GET /health`
- Logs are output to console
- Consider adding monitoring services like:
  - [Sentry](https://sentry.io) for error tracking
  - [LogRocket](https://logrocket.com) for session replay
  - [Stripe Dashboard](https://dashboard.stripe.com) for payment monitoring
  - [MongoDB Atlas](https://cloud.mongodb.com) for database monitoring

## Support

For API-related issues, contact the development team.

**Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks** 