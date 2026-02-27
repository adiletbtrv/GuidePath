'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { GuideDetail } from '@/types/guide';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TELEGRAM_LINK } from '@/lib/constants';

interface ProfileDetailProps {
    guide: GuideDetail;
}

export function ProfileDetail({ guide }: ProfileDetailProps) {
    const [activeTab, setActiveTab] = useState<'About' | 'Roadmap' | 'Experience'>('About');

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <div className="flex-1 w-full min-w-0">
                <div className="mb-6 flex space-x-1 rounded-xl bg-surface p-1 shadow-sm border border-border">
                    {['About', 'Roadmap', 'Experience'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as 'About' | 'Roadmap' | 'Experience')}
                            className={`relative flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${activeTab === tab ? 'text-foreground' : 'text-muted hover:text-foreground hover:bg-surface-hover'
                                }`}
                        >
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-lg bg-surface-hover"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{tab}</span>
                        </button>
                    ))}
                </div>

                <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-sm border border-border min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'About' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Bio</h3>
                                        <p className="text-muted leading-relaxed whitespace-pre-wrap">{guide.bio}</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border">
                                        <div className="rounded-xl bg-surface-hover p-4">
                                            <span className="block text-sm text-muted mb-0.5">University</span>
                                            <span className="font-medium text-foreground">{guide.university}</span>
                                        </div>
                                        <div className="rounded-xl bg-surface-hover p-4">
                                            <span className="block text-sm text-muted mb-0.5">Major</span>
                                            <span className="font-medium text-foreground">{guide.major}</span>
                                        </div>
                                        <div className="rounded-xl bg-surface-hover p-4">
                                            <span className="block text-sm text-muted mb-0.5">Target Country</span>
                                            <div className="flex items-center gap-2 font-medium text-foreground">
                                                {guide.countryFlagEmoji} {guide.country}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Roadmap' && (
                                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                                    {guide.roadmap.map((item, index) => (
                                        <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                                                <span className="text-xs font-bold">{index + 1}</span>
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{item.year}</span>
                                                <h4 className="mt-1 font-heading font-semibold text-foreground text-lg">{item.title}</h4>
                                                <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'Experience' && (
                                <div>
                                    <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Areas of Expertise</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {guide.experienceTags.map(tag => (
                                            <Badge key={tag} className="px-3 py-1.5 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-default">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Sticky Sidebar CTA */}
            <div className="w-full lg:w-80 shrink-0">
                <div className="sticky top-28 space-y-4">
                    {/* Telegram Connect Card */}
                    <div className="bg-surface rounded-2xl p-6 shadow-sm border border-border">
                        <h3 className="font-heading font-semibold text-foreground text-lg mb-2">
                            Connect with {guide.name.split(' ')[0]}
                        </h3>
                        <p className="text-sm text-muted mb-6 leading-relaxed">
                            Reach out directly through our Telegram community to ask questions and get advice.
                        </p>
                        <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block">
                            <Button className="w-full py-6 text-base rounded-xl">
                                <Send className="mr-2 h-4 w-4" />
                                Chat on Telegram
                            </Button>
                        </a>
                        <p className="mt-4 text-xs text-center text-muted">
                            Free • Instant • No account needed
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
