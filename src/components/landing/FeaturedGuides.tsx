'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { getGuides } from '@/lib/api/guides';
import { Guide } from '@/types/guide';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function FeaturedGuides() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [guides, setGuides] = useState<Guide[]>([]);

    useEffect(() => {
        getGuides({}).then(data => setGuides(data.slice(0, 4))).catch(console.error);
    }, []);

    return (
        <section className="overflow-hidden bg-background py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Our Community</p>
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                            <div className="max-w-2xl">
                                <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                                    Meet Our Guides
                                </h2>
                                <p className="mt-3 text-lg text-muted leading-relaxed">
                                    Connect with students from top universities worldwide.
                                </p>
                            </div>
                            <Link href="/explore">
                                <Button variant="ghost" className="group text-sm">
                                    View all
                                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Card Grid */}
                <div
                    ref={containerRef}
                    className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0"
                >
                    {guides.map((guide, index) => (
                        <motion.div
                            key={guide.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-72 shrink-0 snap-start sm:w-auto"
                        >
                            <ProfileCard guide={guide} />
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <div className="flex flex-wrap justify-center gap-12 sm:gap-16">
                        {[
                            { value: '50+', label: 'Countries' },
                            { value: '200+', label: 'Universities' },
                            { value: '1k+', label: 'Connections' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <span className="block text-3xl font-bold text-foreground font-heading">{stat.value}</span>
                                <span className="text-sm text-muted">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
