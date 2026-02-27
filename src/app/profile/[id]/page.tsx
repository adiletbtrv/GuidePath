'use client';

import { use, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Avatar } from '@/components/ui/Avatar';
import { Skeleton } from '@/components/ui/Skeleton';
import { ProfileDetail } from '@/components/profile/ProfileDetail';
import { useGuide } from '@/lib/hooks/useGuides';
import { trackProfileViewed } from '@/lib/analytics/events';

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: guide, isLoading, isError } = useGuide(id);

    useEffect(() => {
        if (guide) {
            trackProfileViewed(guide.id, guide.name);
        }
    }, [guide]);

    if (isError) {
        return (
            <main className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <div className="flex-1 flex items-center justify-center pt-20">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-foreground mb-2">Guide Not Found</h1>
                        <p className="text-muted">The profile you&apos;re looking for doesn&apos;t exist.</p>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="flex-1 pb-16">
                {/* Hero Area */}
                <div className="relative h-48 sm:h-64 md:h-72 w-full bg-gradient-to-br from-primary/20 via-accent/15 to-primary/10 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                            backgroundSize: '32px 32px',
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Info */}
                    <div className="relative -mt-16 sm:-mt-20 mb-8 md:mb-12 flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
                        {isLoading ? (
                            <Skeleton className="h-28 w-28 sm:h-36 sm:w-36 rounded-full border-4 border-background shrink-0" />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Avatar
                                    src={guide?.avatarUrl}
                                    fallback={guide?.name[0] || 'G'}
                                    className="h-28 w-28 sm:h-36 sm:w-36 border-4 border-background shadow-lg text-3xl sm:text-4xl"
                                />
                            </motion.div>
                        )}

                        <div className="flex-1 pb-1">
                            {isLoading ? (
                                <>
                                    <Skeleton className="h-8 w-64 mb-2" />
                                    <Skeleton className="h-5 w-48" />
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
                                        {guide?.name}
                                        <span className="text-xl sm:text-2xl">{guide?.countryFlagEmoji}</span>
                                    </h1>
                                    <p className="text-base sm:text-lg text-muted mt-1 font-medium">{guide?.university} • {guide?.major}</p>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    {isLoading ? (
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-1 space-y-4">
                                <Skeleton className="h-14 w-full rounded-xl" />
                                <Skeleton className="h-[400px] w-full rounded-2xl" />
                            </div>
                            <Skeleton className="hidden lg:block h-64 w-80 rounded-2xl shrink-0" />
                        </div>
                    ) : guide && (
                        <ProfileDetail guide={guide} />
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
