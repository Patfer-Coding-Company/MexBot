/**
 * Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks
 * MexBot Pricing Page
 */

import React, { useState, useEffect } from 'react';
import './index.css';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  stripePriceId: string;
}

interface TrialInfo {
  isActive: boolean;
  daysRemaining: number;
  startDate: string;
  endDate: string;
}

const PricingPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('mexbot-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
  }, []);

  // Check trial status
  useEffect(() => {
    checkTrialStatus();
  }, []);

  const checkTrialStatus = async () => {
    try {
      // This would typically call your backend API
      const trialData = localStorage.getItem('mexbot-trial');
      if (trialData) {
        const trial = JSON.parse(trialData);
        const now = new Date();
        const endDate = new Date(trial.endDate);
        const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        setTrialInfo({
          isActive: daysRemaining > 0,
          daysRemaining: Math.max(0, daysRemaining),
          startDate: trial.startDate,
          endDate: trial.endDate,
        });
      }
    } catch (error) {
      console.error('Error checking trial status:', error);
    }
  };

  const pricingPlans: PricingPlan[] = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 19.99,
      period: 'month',
      stripePriceId: 'price_monthly', // Replace with actual Stripe price ID
      features: [
        'Unlimited web automation',
        'All AI models supported',
        'Priority support',
        'Advanced features',
        'Regular updates',
        'No usage limits',
      ],
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: 199.99,
      period: 'year',
      popular: true,
      stripePriceId: 'price_yearly', // Replace with actual Stripe price ID
      features: [
        'Everything in Monthly',
        '2 months free',
        'Early access to features',
        'Premium support',
        'Custom integrations',
        'API access',
      ],
    },
  ];

  const handleSubscribe = async (plan: PricingPlan) => {
    setIsLoading(true);
    setError(null);

    try {
      // Initialize Stripe
      const stripe = (window as any).Stripe('pk_test_your_publishable_key'); // Replace with your Stripe publishable key

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/pricing',
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const startTrial = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const trialData = {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      };

      localStorage.setItem('mexbot-trial', JSON.stringify(trialData));
      setTrialInfo({
        isActive: true,
        daysRemaining: 7,
        startDate: trialData.startDate,
        endDate: trialData.endDate,
      });

      // Redirect back to extension
      window.close();
    } catch (error) {
      setError('Failed to start trial');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`pricing-page ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="container">
          <h1 className="logo">MexBot</h1>
          <p className="tagline">Proprietary AI Web Automation Tool</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {trialInfo && trialInfo.isActive && (
            <div className="trial-banner">
              <h2>🎉 Free Trial Active!</h2>
              <p>You have {trialInfo.daysRemaining} days remaining in your trial.</p>
              <p>Trial ends: {new Date(trialInfo.endDate).toLocaleDateString()}</p>
            </div>
          )}

          {!trialInfo?.isActive && (
            <div className="trial-section">
              <h2>Start Your Free 7-Day Trial</h2>
              <p>Experience the full power of MexBot with no credit card required.</p>
              <button onClick={startTrial} disabled={isLoading} className="trial-button">
                {isLoading ? 'Starting Trial...' : 'Start Free Trial'}
              </button>
            </div>
          )}

          <div className="pricing-section">
            <h2>Choose Your Plan</h2>
            <p>Unlock unlimited web automation with our premium plans.</p>

            <div className="pricing-grid">
              {pricingPlans.map(plan => (
                <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && <div className="popular-badge">Most Popular</div>}

                  <h3>{plan.name}</h3>
                  <div className="price">
                    <span className="currency">$</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>

                  <ul className="features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        <span className="check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => handleSubscribe(plan)} disabled={isLoading} className="subscribe-button">
                    {isLoading ? 'Processing...' : 'Subscribe Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>

            <div className="faq-item">
              <h3>What's included in the free trial?</h3>
              <p>
                Your 7-day trial includes all premium features: unlimited web automation, access to all AI models,
                priority support, and advanced features.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I cancel anytime?</h3>
              <p>
                Yes, you can cancel your subscription at any time. Your access will continue until the end of your
                current billing period.
              </p>
            </div>

            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>
                We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment
                processing.
              </p>
            </div>

            <div className="faq-item">
              <h3>Is my data secure?</h3>
              <p>
                Absolutely. We use enterprise-grade security measures to protect your data and API keys. Your
                information never leaves your browser.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Patfer Coding Company, Patrick Blanks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
