'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils/cn';

const navLinks = [
    { href: '/explore', label: 'Explore' },
    { href: '/dashboard', label: 'Dashboard' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();
    const { isAuthenticated, user, logout } = useAuthStore();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setIsMobileOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileOpen]);

    return (
        <>
            <header
                className={cn(
                    'fixed inset-x-0 top-0 z-40 transition-all duration-300',
                    isScrolled
                        ? 'glass-strong py-3 shadow-sm'
                        : 'bg-transparent py-4'
                )}
            >
                <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <Logo size={32} />
                        <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                            GuidePath
                        </span>
                    </Link>

                    {/* Desktop Nav - Absolutely centered for perfect mathematical alignment */}
                    <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'relative px-4 py-2 rounded-full text-sm font-medium transition-colors',
                                    pathname === link.href
                                        ? 'text-primary'
                                        : 'text-muted hover:text-foreground'
                                )}
                            >
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-full bg-primary/10"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {isAuthenticated ? (
                            <Link href="/dashboard">
                                <Avatar
                                    fallback={user?.name?.[0] || 'U'}
                                    src={user?.avatarUrl}
                                    size="sm"
                                />
                            </Link>
                        ) : (
                            <div className="hidden md:flex items-center gap-2">
                                <Link href="/auth/login">
                                    <Button variant="ghost" className="text-foreground">
                                        Sign in
                                    </Button>
                                </Link>
                                <Link href="/auth/signup">
                                    <Button variant="primary">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-surface-hover transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                            className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-surface p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <Link href="/" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2">
                                    <Logo size={28} />
                                    <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                                        GuidePath
                                    </span>
                                </Link>
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={cn(
                                            'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                                            pathname === link.href
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted hover:bg-surface-hover hover:text-foreground'
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            {!isAuthenticated && (
                                <div className="mt-8 flex flex-col gap-3">
                                    <Link href="/auth/login" onClick={() => setIsMobileOpen(false)}>
                                        <Button variant="outline" className="w-full">Sign in</Button>
                                    </Link>
                                    <Link href="/auth/signup" onClick={() => setIsMobileOpen(false)}>
                                        <Button variant="primary" className="w-full">Get Started</Button>
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
