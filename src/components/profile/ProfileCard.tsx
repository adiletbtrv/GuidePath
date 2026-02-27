'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Guide } from '@/types/guide';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

interface ProfileCardProps {
    guide: Guide;
}

export function ProfileCard({ guide }: ProfileCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border transition-shadow hover:shadow-lg hover:ring-border/80"
        >
            {/* Gradient Header */}
            <div className="relative h-20 bg-gradient-to-r from-primary/15 to-accent/15 dark:from-primary/10 dark:to-accent/10">
                <div className="absolute -bottom-7 left-5">
                    <Avatar
                        src={guide.avatarUrl}
                        fallback={guide.name[0]}
                        size="lg"
                        className="ring-[3px] ring-surface shadow-md"
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5 pt-10">
                <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-heading text-base font-bold text-foreground truncate">
                        {guide.name}
                    </h3>
                    <span className="text-lg flex-shrink-0 ml-2" title={guide.country}>
                        {guide.countryFlagEmoji}
                    </span>
                </div>

                <p className="text-sm font-medium text-primary">
                    {guide.university}
                </p>
                <p className="mb-3 text-sm text-muted">
                    {guide.major}
                </p>

                <p className="mb-5 line-clamp-2 text-sm text-muted flex-1 leading-relaxed">
                    {guide.bio}
                </p>

                <div className="mt-auto">
                    <Link href={`/profile/${guide.id}`} className="block w-full">
                        <Button variant="secondary" className="w-full group">
                            View Profile
                            <ArrowRight className="ml-1 h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
