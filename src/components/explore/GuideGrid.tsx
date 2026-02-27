'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuides } from '@/lib/hooks/useGuides';
import { useFilterStore } from '@/lib/store/filterStore';
import { trackSearchExecuted } from '@/lib/analytics/events';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { SearchX } from 'lucide-react';

export function GuideGrid() {
    const filters = useFilterStore();
    const { data: guides, isLoading, isError } = useGuides(filters);
    const trackedRef = useRef(false);

    useEffect(() => {
        // Only track when guides are loaded and filters change
        if (guides && !trackedRef.current) {
            trackSearchExecuted(filters);
            trackedRef.current = true;
        }
    }, [guides, filters]);

    // Reset tracking when filters change
    useEffect(() => {
        trackedRef.current = false;
    }, [filters]);

    if (isError) {
        return (
            <div className="flex h-64 items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30">
                <p className="text-red-600 dark:text-red-400 font-medium">Failed to load guides. Please try again.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-96 rounded-2xl bg-surface border border-border overflow-hidden flex flex-col">
                        <Skeleton className="h-24 w-full rounded-none" />
                        <div className="p-6 pt-10 flex-1 flex flex-col">
                            <Skeleton className="h-6 w-3/4 mb-4" />
                            <Skeleton className="h-4 w-1/2 mb-2" />
                            <Skeleton className="h-4 w-1/3 mb-6" />
                            <Skeleton className="h-16 w-full mb-6" />
                            <Skeleton className="h-10 w-full mt-auto" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!guides || guides.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col h-full min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center"
            >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <SearchX className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">No guides found</h3>
                <p className="mt-2 text-muted max-w-sm">
                    We couldn&apos;t find any guides matching your current filters. Try changing your search criteria or resetting filters.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
            <AnimatePresence mode="popLayout">
                {guides.map((guide, i) => (
                    <motion.div
                        layout
                        key={guide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="h-full"
                    >
                        <ProfileCard guide={guide} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
}
