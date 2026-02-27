'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background pt-20 pb-16">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px] animate-float" />
                <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute left-1/3 bottom-0 h-[350px] w-[350px] rounded-full bg-primary/10 blur-[80px] animate-float" style={{ animationDelay: '4s' }} />
            </div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto max-w-4xl"
                >
                    {/* Tag */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 backdrop-blur-sm px-4 py-1.5 text-sm text-muted"
                    >
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        Trusted by 1,000+ students worldwide
                    </motion.div>

                    <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance leading-[1.1]">
                        Navigate your{' '}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            study abroad
                        </span>{' '}
                        journey
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl leading-relaxed">
                        Connect with international students who have already walked the path. Get real advice, application help, and local insights.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/explore">
                            <Button size="lg" className="w-full sm:w-auto text-base px-8 py-7 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                                Find Your Guide
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/auth/signup?role=guide">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base px-8 py-7 rounded-full">
                                Become a Guide
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
