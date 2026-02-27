import posthog from 'posthog-js';
import { GuideFilters } from '@/types/api';

const isEnabled = () => !!process.env.NEXT_PUBLIC_POSTHOG_KEY;

export const trackSearchExecuted = (filters: GuideFilters): void => {
    if (!isEnabled()) return;
    posthog.capture('search_executed', { filters });
};

export const trackProfileViewed = (guideId: string, guideName: string): void => {
    if (!isEnabled()) return;
    posthog.capture('profile_viewed', { guideId, guideName });
};

export const trackConnectionRequested = (guideId: string): void => {
    if (!isEnabled()) return;
    posthog.capture('connection_requested', { guideId });
};

export const trackMessageSent = (connectionId: string): void => {
    if (!isEnabled()) return;
    posthog.capture('message_sent', { connectionId });
};

export const trackSignupStarted = (method: 'email' | 'google'): void => {
    if (!isEnabled()) return;
    posthog.capture('signup_started', { method });
};

export const trackSignupCompleted = (role: 'seeker' | 'guide'): void => {
    if (!isEnabled()) return;
    posthog.capture('signup_completed', { role });
};
