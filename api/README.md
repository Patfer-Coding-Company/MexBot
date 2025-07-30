# MexBot API Server

**Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks**

This is the backend API server for MexBot with Stripe integration for handling payments and subscriptions.

## Features

- ✅ **Stripe Integration**: Secure payment processing
- ✅ **Trial Management**: 7-day free trial system
- ✅ **Subscription Management**: Handle monthly/yearly subscriptions
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

### 3. Stripe Setup

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

### 4. Update Pricing Page

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

### 5. Start the Server

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

### Stripe Integration
- `POST /api/create-checkout-session` - Create Stripe checkout session
- `POST /api/webhooks` - Handle Stripe webhooks
- `GET /api/subscription/:customerId` - Get subscription status
- `POST /api/cancel-subscription` - Cancel subscription

### Trial Management
- `POST /api/start-trial` - Start a 7-day trial

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable allowed origins
- **Helmet**: Security headers
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Comprehensive error handling

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
STRIPE_SECRET_KEY=sk_live_your_live_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
```

### Deployment Options

1. **Heroku**
   ```bash
   heroku create your-mexbot-api
   git push heroku main
   ```

2. **Vercel**
   ```bash
   npm i -g vercel
   vercel
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

## Support

For API-related issues, contact the development team.

**Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks** 