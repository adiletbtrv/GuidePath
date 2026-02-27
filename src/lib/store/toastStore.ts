import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
    id: string;
    title: string;
    description?: string;
    type: ToastType;
}

interface ToastState {
    toasts: ToastMessage[];
    addToast: (toast: Omit<ToastMessage, 'id'>) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
    toasts: [],
    addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
        setTimeout(() => {
            set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
        }, 5000); // auto dismiss
    },
    removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

// Helper logic for direct importing
export const toast = {
    success: (title: string, description?: string) => useToastStore.getState().addToast({ title, description, type: 'success' }),
    error: (title: string, description?: string) => useToastStore.getState().addToast({ title, description, type: 'error' }),
    info: (title: string, description?: string) => useToastStore.getState().addToast({ title, description, type: 'info' }),
};
