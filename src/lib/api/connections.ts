import apiClient from './client';
import { Connection } from '@/types/connection';
import { mockConnections } from '../mock/data';

const USE_MOCK = !process.env.NEXT_PUBLIC_API_URL;

export const getMyConnections = async (): Promise<Connection[]> => {
    if (USE_MOCK) {
        return new Promise((resolve) => setTimeout(() => resolve(mockConnections), 500));
    }

    const { data } = await apiClient.get<{ data: Connection[] }>('/api/connections');
    return data.data;
};

export const requestConnection = async (guideId: string): Promise<Connection> => {
    if (USE_MOCK) {
        const newConnection: Connection = {
            id: `conn_${Date.now()}`,
            seekerId: 'me',
            guideId,
            status: 'pending',
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };
        mockConnections.push(newConnection);
        return new Promise((resolve) => setTimeout(() => resolve(newConnection), 800));
    }

    const { data } = await apiClient.post<{ data: Connection }>('/api/connections/request', { guideId });
    return data.data;
};
