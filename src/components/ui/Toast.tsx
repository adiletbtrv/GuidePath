'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToastStore } from '@/lib/store/toastStore';

export function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 md:bottom-6 md:right-6">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="flex w-full max-w-sm overflow-hidden rounded-lg bg-surface shadow-lg ring-1 ring-border"
                    >
                        <div className="flex w-full items-start p-4">
                            <div className="flex-shrink-0">
                                {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
                                {toast.type === 'info' && <Info className="h-5 w-5 text-primary" />}
                            </div>
                            <div className="ml-3 w-0 flex-1 pt-0.5 text-left">
                                <p className="text-sm font-medium text-foreground">{toast.title}</p>
                                {toast.description && (
                                    <p className="mt-1 text-sm text-muted">{toast.description}</p>
                                )}
                            </div>
                            <div className="ml-4 flex flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => removeToast(toast.id)}
                                    className="inline-flex rounded-md bg-surface text-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    <span className="sr-only">Close</span>
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
