'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TELEGRAM_LINK } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';

export function CTASection() {
    return (
        <section className="relative overflow-hidden py-24 sm:py-32">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />

            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                }}
            />

            <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl"
                >
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl text-balance">
                        Ready to start your journey?
                    </h2>
                    <p className="mt-6 text-lg text-white/80 sm:text-xl leading-relaxed">
                        Join thousands of students who have successfully navigated their study abroad experience with GuidePath.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/auth/signup">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-8 py-7 text-base rounded-full shadow-lg hover:shadow-xl transition-all"
                            >
                                Create an Account
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                            <Button
                                size="lg"
                                variant="ghost"
                                className="w-full sm:w-auto text-white/90 hover:text-white hover:bg-white/10 px-8 py-7 text-base rounded-full border border-white/20"
                            >
                                <Send className="mr-2 h-4 w-4" />
                                Join our Telegram
                            </Button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
