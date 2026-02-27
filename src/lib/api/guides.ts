import apiClient from './client';
import { Guide, GuideDetail } from '@/types/guide';
import { GuideFilters } from '@/types/api';
import { mockGuides, mockGuideDetails } from '../mock/data';

const USE_MOCK = !process.env.NEXT_PUBLIC_API_URL;

export const getGuides = async (filters: GuideFilters): Promise<Guide[]> => {
    if (USE_MOCK) {
        let result = [...mockGuides];
        if (filters.countries?.length) {
            result = result.filter(g => filters.countries!.includes(g.country));
        }
        if (filters.university) {
            result = result.filter(g => g.university.toLowerCase().includes(filters.university!.toLowerCase()));
        }
        if (filters.major) {
            result = result.filter(g => g.major === filters.major);
        }
        return new Promise((resolve) => setTimeout(() => resolve(result), 800));
    }

    const { data } = await apiClient.get<{ data: Guide[] }>('/api/guides', { params: filters });
    return data.data;
};

export const getGuideById = async (id: string): Promise<GuideDetail> => {
    if (USE_MOCK) {
        const guide = mockGuideDetails.find(g => g.id === id);
        if (!guide) throw new Error('Guide not found');
        return new Promise((resolve) => setTimeout(() => resolve(guide), 600));
    }

    const { data } = await apiClient.get<{ data: GuideDetail }>(`/api/guides/${id}`);
    return data.data;
};
