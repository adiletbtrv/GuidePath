'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Send, Search, User, ArrowRight, Compass } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/lib/store/authStore';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { TELEGRAM_LINK } from '@/lib/constants';

const quickLinks = [
    {
        icon: Search,
        title: 'Explore Guides',
        description: 'Browse our community of international student mentors',
        href: '/explore',
        color: 'from-blue-500/10 to-primary/10',
    },
    {
        icon: Compass,
        title: 'Become a Guide',
        description: 'Share your experience and help other students',
        href: '/auth/signup?role=guide',
        color: 'from-purple-500/10 to-accent/10',
    },
];

export default function DashboardPage() {
    const { isAuthenticated, user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-16">
                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <Avatar
                            fallback={user?.name?.[0] || 'U'}
                            src={user?.avatarUrl}
                            size="lg"
                        />
                        <div>
                            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                                Welcome back, {user?.name?.split(' ')[0] || 'Student'}
                            </h1>
                            <p className="text-muted mt-1">
                                Here&apos;s your GuidePath dashboard
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Telegram CTA — Main Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-2"
                    >
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent p-8 sm:p-10 text-white">
                            {/* Pattern */}
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                                    backgroundSize: '24px 24px',
                                }}
                            />

                            <div className="relative z-10">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm mb-5">
                                    <Send className="h-6 w-6" />
                                </div>

                                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
                                    Chat with Our Community
                                </h2>
                                <p className="text-white/80 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
                                    Connect with mentors, ask questions, and get real-time advice from our student community on Telegram.
                                </p>

                                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                                    <Button
                                        size="lg"
                                        className="bg-white text-primary hover:bg-white/90 rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        Open Telegram Chat
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Stats / Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="rounded-2xl bg-surface border border-border p-6 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="font-heading font-semibold text-foreground text-lg mb-4">
                                    Your Profile
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <User className="h-4 w-4 text-muted" />
                                        <span className="text-foreground">{user?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="text-muted">Role:</span>
                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">
                                            {user?.role || 'Seeker'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-border">
                                <p className="text-xs text-muted">
                                    Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'recently'}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    {quickLinks.map((link, index) => (
                        <motion.div
                            key={link.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        >
                            <Link href={link.href}>
                                <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${link.color} border border-border p-6 transition-all duration-300 hover:shadow-md hover:border-primary/30 h-full`}>
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-primary transition-transform group-hover:scale-110">
                                            <link.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-semibold text-foreground mb-1 flex items-center gap-2">
                                                {link.title}
                                                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                            </h3>
                                            <p className="text-sm text-muted leading-relaxed">
                                                {link.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
