export type Role = 'seeker' | 'guide';

export interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    role: Role;
    createdAt: string;
}
