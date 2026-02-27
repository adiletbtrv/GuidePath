import { Guide, GuideDetail } from '@/types/guide';
import { Connection } from '@/types/connection';
import { Message } from '@/types/message';

export const mockGuides: Guide[] = [
    {
        id: 'g1',
        email: 'kenji@example.com',
        name: 'Kenji Sato',
        role: 'guide',
        createdAt: '2023-01-15T00:00:00Z',
        country: 'Japan',
        countryFlagEmoji: '🇯🇵',
        university: 'University of Tokyo',
        major: 'Computer Science',
        bio: 'Masters student researching AI. Happy to help you navigate Tokyo!',
        avatarUrl: 'https://i.pravatar.cc/150?u=kenji'
    },
    {
        id: 'g2',
        email: 'sarah@example.com',
        name: 'Sarah Miller',
        role: 'guide',
        createdAt: '2023-02-10T00:00:00Z',
        country: 'USA',
        countryFlagEmoji: '🇺🇸',
        university: 'Stanford University',
        major: 'Design',
        bio: 'Product designer and international student mentor. Let’s talk portfolios!',
        avatarUrl: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
        id: 'g3',
        email: 'lucas@example.com',
        name: 'Lucas Schmidt',
        role: 'guide',
        createdAt: '2023-03-05T00:00:00Z',
        country: 'Germany',
        countryFlagEmoji: '🇩🇪',
        university: 'TU Munich',
        major: 'Mechanical Engineering',
        bio: 'Finding accommodation in Munich is tough—I can share my apartment hunting tips.',
        avatarUrl: 'https://i.pravatar.cc/150?u=lucas'
    },
    {
        id: 'g4',
        email: 'minji@example.com',
        name: 'Minji Kim',
        role: 'guide',
        createdAt: '2023-04-12T00:00:00Z',
        country: 'South Korea',
        countryFlagEmoji: '🇰🇷',
        university: 'Seoul National University',
        major: 'Business Administration',
        bio: 'Passionate about startups and Korean business culture.',
        avatarUrl: 'https://i.pravatar.cc/150?u=minji'
    },
    {
        id: 'g5',
        email: 'emma@example.com',
        name: 'Emma Watson',
        role: 'guide',
        createdAt: '2023-05-20T00:00:00Z',
        country: 'UK',
        countryFlagEmoji: '🇬🇧',
        university: 'University of Oxford',
        major: 'Literature',
        bio: 'Can guide you through the college system and application process.',
        avatarUrl: 'https://i.pravatar.cc/150?u=emma'
    },
    {
        id: 'g6',
        email: 'marco@example.com',
        name: 'Marco Rossi',
        role: 'guide',
        createdAt: '2023-06-18T00:00:00Z',
        country: 'Italy',
        countryFlagEmoji: '🇮🇹',
        university: 'Politecnico di Milano',
        major: 'Architecture',
        bio: 'Studying architecture in the fashion capital. Ask me about visa processes!',
        avatarUrl: 'https://i.pravatar.cc/150?u=marco'
    },
    {
        id: 'g7',
        email: 'sophie@example.com',
        name: 'Sophie Laurent',
        role: 'guide',
        createdAt: '2023-07-22T00:00:00Z',
        country: 'France',
        countryFlagEmoji: '🇫🇷',
        university: 'Sorbonne University',
        major: 'Philosophy',
        bio: 'Philosophy major balancing studies with exploring Parisian life.',
        avatarUrl: 'https://i.pravatar.cc/150?u=sophie'
    },
    {
        id: 'g8',
        email: 'chen@example.com',
        name: 'Chen Wei',
        role: 'guide',
        createdAt: '2023-08-30T00:00:00Z',
        country: 'Singapore',
        countryFlagEmoji: '🇸🇬',
        university: 'National University of Singapore',
        major: 'Economics',
        bio: 'Economics undergrad. I know all the best hawker centres around campus.',
        avatarUrl: 'https://i.pravatar.cc/150?u=chen'
    }
];

export const mockGuideDetails: GuideDetail[] = mockGuides.map(guide => ({
    ...guide,
    roadmap: [
        {
            id: `${guide.id}-step1`,
            year: '2022',
            title: 'Decided to study abroad',
            description: 'Started researching universities and scholarship opportunities.'
        },
        {
            id: `${guide.id}-step2`,
            year: 'Summer 2022',
            title: 'Language Proficiency Test',
            description: 'Passed the required language exams with top marks.'
        },
        {
            id: `${guide.id}-step3`,
            year: 'Fall 2022',
            title: 'Application Submitted',
            description: 'Applied to 5 different universities.'
        },
        {
            id: `${guide.id}-step4`,
            year: 'Spring 2023',
            title: 'Acceptance and Visa',
            description: 'Got accepted! Navigated the complex visa process successfully.'
        }
    ],
    experienceTags: ['Visa Application', 'Apartment Hunting', 'Scholarships', 'Campus Life', 'Language Barrier']
}));

export const mockConnections: Connection[] = [
    {
        id: 'conn1',
        seekerId: 'me',
        guideId: 'g1',
        status: 'active',
        lastMessage: 'Sure, I can help you with that!',
        updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        guide: mockGuides.find(g => g.id === 'g1'),
    },
    {
        id: 'conn2',
        seekerId: 'me',
        guideId: 'g2',
        status: 'pending',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        guide: mockGuides.find(g => g.id === 'g2'),
    },
    {
        id: 'conn3',
        seekerId: 'me',
        guideId: 'g4',
        status: 'archived',
        lastMessage: 'Good luck with your application!',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 2 weeks ago
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
        guide: mockGuides.find(g => g.id === 'g4'),
    }
];

export const mockMessages: Record<string, Message[]> = {
    'conn1': [
        {
            id: 'msg1',
            connectionId: 'conn1',
            senderId: 'me',
            body: 'Hi Kenji! I\'m planning to apply to UTokyo next year.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
        },
        {
            id: 'msg2',
            connectionId: 'conn1',
            senderId: 'g1',
            body: 'Hello! That\'s great to hear. Which program are you looking at?',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString()
        },
        {
            id: 'msg3',
            connectionId: 'conn1',
            senderId: 'me',
            body: 'The Master\'s in Computer Science. I was wondering about the MEXT scholarship.',
            timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() // 10 mins ago
        },
        {
            id: 'msg4',
            connectionId: 'conn1',
            senderId: 'g1',
            body: 'Sure, I can help you with that!',
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 mins ago
        }
    ]
};
