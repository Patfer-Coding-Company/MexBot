/**
 * Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks
 * Trial Management System
 */

import { createStorage } from '../base/base';
import { StorageEnum } from '../base/enums';

export interface TrialData {
  isActive: boolean;
  startDate: string;
  endDate: string;
  daysRemaining: number;
}

export interface SubscriptionData {
  isActive: boolean;
  planId: string;
  planName: string;
  price: number;
  period: string;
  startDate: string;
  endDate: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface BillingInfo {
  trial: TrialData;
  subscription: SubscriptionData | null;
}

export type TrialStorage = {
  getTrialInfo: () => Promise<TrialData>;
  startTrial: () => Promise<void>;
  endTrial: () => Promise<void>;
  getSubscriptionInfo: () => Promise<SubscriptionData | null>;
  setSubscriptionInfo: (data: SubscriptionData) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  isPremium: () => Promise<boolean>;
  getDaysRemaining: () => Promise<number>;
};

const storage = createStorage<BillingInfo>(
  'billing-info',
  {
    trial: {
      isActive: false,
      startDate: '',
      endDate: '',
      daysRemaining: 0,
    },
    subscription: null,
  },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
);

export const trialStore: TrialStorage = {
  getTrialInfo: async () => {
    const data = await storage.get();
    return data.trial;
  },

  startTrial: async () => {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await storage.set(current => ({
      ...current,
      trial: {
        isActive: true,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        daysRemaining: 7,
      },
    }));
  },

  endTrial: async () => {
    await storage.set(current => ({
      ...current,
      trial: {
        ...current.trial,
        isActive: false,
        daysRemaining: 0,
      },
    }));
  },

  getSubscriptionInfo: async () => {
    const data = await storage.get();
    return data.subscription;
  },

  setSubscriptionInfo: async (subscriptionData: SubscriptionData) => {
    await storage.set(current => ({
      ...current,
      subscription: subscriptionData,
    }));
  },

  cancelSubscription: async () => {
    await storage.set(current => ({
      ...current,
      subscription: current.subscription
        ? {
            ...current.subscription,
            isActive: false,
          }
        : null,
    }));
  },

  isPremium: async () => {
    const data = await storage.get();

    // Check if subscription is active
    if (data.subscription?.isActive) {
      return true;
    }

    // Check if trial is active
    if (data.trial.isActive) {
      const now = new Date();
      const endDate = new Date(data.trial.endDate);
      const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (daysRemaining > 0) {
        // Update days remaining
        await storage.set(current => ({
          ...current,
          trial: {
            ...current.trial,
            daysRemaining: Math.max(0, daysRemaining),
            isActive: daysRemaining > 0,
          },
        }));

        return daysRemaining > 0;
      } else {
        // Trial expired
        await storage.set(current => ({
          ...current,
          trial: {
            ...current.trial,
            isActive: false,
            daysRemaining: 0,
          },
        }));
      }
    }

    return false;
  },

  getDaysRemaining: async () => {
    const data = await storage.get();

    if (data.subscription?.isActive) {
      const now = new Date();
      const endDate = new Date(data.subscription.endDate);
      return Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    }

    if (data.trial.isActive) {
      const now = new Date();
      const endDate = new Date(data.trial.endDate);
      return Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    }

    return 0;
  },
};
