import { User } from './user';

export interface TimelineItem {
    id: string;
    year: string;
    title: string;
    description: string;
}

export interface Guide extends User {
    role: 'guide';
    country: string;
    university: string;
    major: string;
    bio: string;
    countryFlagEmoji: string;
}

export interface GuideDetail extends Guide {
    roadmap: TimelineItem[];
    experienceTags: string[];
}
