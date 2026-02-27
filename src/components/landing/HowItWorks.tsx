'use client';

import { motion } from 'framer-motion';
import { Search, UserPlus, Send } from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: 'Find Your Match',
        description: 'Filter our vetted guides by target country, university, and major to find your perfect mentor.',
        step: '01',
    },
    {
        icon: UserPlus,
        title: 'View Their Profile',
        description: 'Explore their journey, roadmap, and experience to see if they\'re the right fit for you.',
        step: '02',
    },
    {
        icon: Send,
        title: 'Connect on Telegram',
        description: 'Reach out directly through our Telegram community for instant, personal advice and mentorship.',
        step: '03',
    }
];

export function HowItWorks() {
    return (
        <section className="bg-surface py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Simple Process</p>
                        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                            How GuidePath Works
                        </h2>
                        <p className="mt-4 text-lg text-muted leading-relaxed">
                            Three simple steps to connect with someone who&apos;s been in your shoes.
                        </p>
                    </motion.div>
                </div>

                <div className="mx-auto mt-16 max-w-5xl">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative flex flex-col items-center text-center rounded-2xl p-8 transition-all duration-300 hover:bg-surface-hover hover:-translate-y-1"
                            >
                                {/* Step Number */}
                                <span className="absolute top-4 right-4 text-6xl font-bold text-foreground/[0.04] dark:text-foreground/[0.06] font-heading select-none">
                                    {step.step}
                                </span>

                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                                    <step.icon className="h-6 w-6" />
                                </div>

                                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
