/**
 * Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks
 * Google OAuth Authentication Module
 */

const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// User Schema
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  picture: String,
  trialStartDate: Date,
  trialEndDate: Date,
  isTrialActive: {
    type: Boolean,
    default: false,
  },
  subscription: {
    isActive: {
      type: Boolean,
      default: false,
    },
    planId: String,
    planName: String,
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    startDate: Date,
    endDate: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

// Verify Google token
async function verifyGoogleToken(token) {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  } catch (error) {
    console.error('Google token verification failed:', error);
    throw new Error('Invalid Google token');
  }
}

// Create or update user
async function createOrUpdateUser(googleData) {
  try {
    let user = await User.findOne({ googleId: googleData.googleId });

    if (!user) {
      // Create new user with trial
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 7); // 7-day trial

      user = new User({
        googleId: googleData.googleId,
        email: googleData.email,
        name: googleData.name,
        picture: googleData.picture,
        trialStartDate: new Date(),
        trialEndDate: trialEndDate,
        isTrialActive: true,
      });
    } else {
      // Update last login
      user.lastLogin = new Date();

      // Check if trial is still active
      if (user.isTrialActive && user.trialEndDate < new Date()) {
        user.isTrialActive = false;
      }
    }

    await user.save();
    return user;
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw new Error('Failed to create/update user');
  }
}

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      googleId: user.googleId,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );
}

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Get user by ID
async function getUserById(userId) {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

// Update user subscription
async function updateUserSubscription(userId, subscriptionData) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.subscription = {
      ...user.subscription,
      ...subscriptionData,
    };

    await user.save();
    return user;
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw new Error('Failed to update subscription');
  }
}

// Check if user has active subscription or trial
async function hasActiveAccess(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return false;
    }

    // Check if subscription is active
    if (user.subscription.isActive && user.subscription.endDate > new Date()) {
      return true;
    }

    // Check if trial is active
    if (user.isTrialActive && user.trialEndDate > new Date()) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking user access:', error);
    return false;
  }
}

module.exports = {
  verifyGoogleToken,
  createOrUpdateUser,
  generateToken,
  verifyToken,
  getUserById,
  updateUserSubscription,
  hasActiveAccess,
  User,
};
