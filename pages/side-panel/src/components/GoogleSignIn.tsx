/**
 * Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks
 * Google Sign-In Component
 */

import React, { useEffect, useState } from 'react';

interface GoogleSignInProps {
  isDarkMode: boolean;
  onSignIn: (userData: any) => void;
  onSignOut: () => void;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  picture: string;
  isTrialActive: boolean;
  trialEndDate: string;
  hasActiveSubscription: boolean;
  hasAccess: boolean;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ isDarkMode, onSignIn, onSignOut }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      initializeGoogleSignIn();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeGoogleSignIn = () => {
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      (window as any).google.accounts.id.renderButton(document.getElementById('google-signin-button'), {
        theme: isDarkMode ? 'filled_black' : 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
      });
    }
  };

  const handleCredentialResponse = async (response: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: response.credential,
        }),
      });

      const data = await result.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('mexbot-auth-token', data.token);
        localStorage.setItem('mexbot-user', JSON.stringify(data.user));

        setUser(data.user);
        onSignIn(data.user);
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Failed to authenticate with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    // Clear stored data
    localStorage.removeItem('mexbot-auth-token');
    localStorage.removeItem('mexbot-user');

    // Sign out from Google
    if (typeof window !== 'undefined' && (window as any).google) {
      (window as any).google.accounts.id.disableAutoSelect();
    }

    setUser(null);
    onSignOut();
  };

  // Check for existing user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('mexbot-user');
    const storedToken = localStorage.getItem('mexbot-auth-token');

    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        onSignIn(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('mexbot-user');
        localStorage.removeItem('mexbot-auth-token');
      }
    }
  }, [onSignIn]);

  if (user) {
    return (
      <div className={`user-profile ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="user-info">
          <img src={user.picture} alt={user.name} className="user-avatar" />
          <div className="user-details">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-email">{user.email}</p>
            {user.isTrialActive && (
              <p className="trial-status">Trial: {new Date(user.trialEndDate).toLocaleDateString()}</p>
            )}
            {user.hasActiveSubscription && <p className="subscription-status">Premium Active</p>}
          </div>
        </div>
        <button onClick={handleSignOut} className="sign-out-button" disabled={isLoading}>
          {isLoading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    );
  }

  return (
    <div className={`google-signin-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="signin-header">
        <h3>Sign in to MexBot</h3>
        <p>Access your trial and subscription</p>
      </div>

      <div id="google-signin-button" className="google-signin-button"></div>

      {error && <div className="error-message">{error}</div>}

      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Signing in...</p>
        </div>
      )}
    </div>
  );
};

export default GoogleSignIn;
