/**
 * Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks
 * Trial Banner Component
 */

import React, { useState, useEffect } from 'react';
import { trialStore } from '@extension/storage';

interface TrialBannerProps {
  isDarkMode: boolean;
}

interface TrialInfo {
  isActive: boolean;
  daysRemaining: number;
  isPremium: boolean;
}

const TrialBanner: React.FC<TrialBannerProps> = ({ isDarkMode }) => {
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkTrialStatus();
  }, []);

  const checkTrialStatus = async () => {
    try {
      const isPremium = await trialStore.isPremium();
      const trialData = await trialStore.getTrialInfo();
      const daysRemaining = await trialStore.getDaysRemaining();

      setTrialInfo({
        isActive: trialData.isActive,
        daysRemaining,
        isPremium,
      });
    } catch (error) {
      console.error('Error checking trial status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openPricingPage = () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('pricing/index.html'),
    });
  };

  if (isLoading) {
    return (
      <div className={`trial-banner-loading ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!trialInfo) {
    return null;
  }

  // If user is premium, don't show banner
  if (trialInfo.isPremium) {
    return null;
  }

  // If trial is active
  if (trialInfo.isActive) {
    return (
      <div className={`trial-banner ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="trial-content">
          <div className="trial-info">
            <span className="trial-icon">🎉</span>
            <span className="trial-text">Free Trial: {trialInfo.daysRemaining} days remaining</span>
          </div>
          <button onClick={openPricingPage} className="upgrade-button">
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  // If trial expired or no trial
  return (
    <div className={`trial-banner expired ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="trial-content">
        <div className="trial-info">
          <span className="trial-icon">⚠️</span>
          <span className="trial-text">Trial expired. Upgrade to continue using MexBot.</span>
        </div>
        <button onClick={openPricingPage} className="upgrade-button">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default TrialBanner;
