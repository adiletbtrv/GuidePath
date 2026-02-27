import { User } from './user';

export type ConnectionStatus = 'pending' | 'active' | 'archived';

export interface Connection {
    id: string;
    seekerId: string;
    guideId: string;
    status: ConnectionStatus;
    lastMessage?: string;
    updatedAt: string;
    createdAt: string;
    // For UI display purposes
    guide?: User;
    seeker?: User;
}
