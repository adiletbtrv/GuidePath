import { create } from 'zustand';
import { GuideFilters } from '@/types/api';

interface FilterState extends GuideFilters {
    setFilters: (filters: Partial<GuideFilters>) => void;
    resetFilters: () => void;
}

const initialState: GuideFilters = {
    countries: [],
    university: '',
    major: '',
};

export const useFilterStore = create<FilterState>((set) => ({
    ...initialState,
    setFilters: (filters) => set((state) => ({ ...state, ...filters })),
    resetFilters: () => set(initialState),
}));
