import { useQuery } from '@tanstack/react-query';
import { getGuides, getGuideById } from '@/lib/api/guides';
import { GuideFilters } from '@/types/api';

export function useGuides(filters: GuideFilters) {
    return useQuery({
        queryKey: ['guides', filters],
        queryFn: () => getGuides(filters),
    });
}

export function useGuide(id: string) {
    return useQuery({
        queryKey: ['guide', id],
        queryFn: () => getGuideById(id),
        enabled: !!id,
    });
}
