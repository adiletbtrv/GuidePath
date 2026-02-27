'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden rounded-md p-2 text-muted hover:bg-surface hover:text-foreground"
            >
                <Menu className="h-6 w-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 bg-surface p-6 shadow-xl md:hidden"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary font-heading font-bold text-white">
                                        G
                                    </div>
                                    <span className="font-heading text-xl font-bold tracking-tight text-foreground">GuidePath</span>
                                </Link>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full p-1 text-muted hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-4 font-medium">
                                <Link href="/explore" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-muted hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800">
                                    Explore
                                </Link>
                                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-muted hover:bg-gray-100 hover:text-foreground dark:hover:bg-gray-800">
                                    Dashboard
                                </Link>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
