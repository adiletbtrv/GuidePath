import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { TELEGRAM_LINK } from '@/lib/constants';

const platformLinks = [
    { href: '/explore', label: 'Find a Guide' },
    { href: '/auth/signup?role=guide', label: 'Become a Guide' },
    { href: '/dashboard', label: 'Dashboard' },
];

const socialLinks = [
    { href: TELEGRAM_LINK, label: 'Telegram', external: true }, // Get this from constants.ts
    { href: 'https://github.com/adiletbtrv', label: 'Github', external: true },
    { href: 'https://www.linkedin.com/in/adilet-batyrov/', label: 'LinkedIn', external: true },
];

export function Footer() {
    return (
        <footer className="border-t border-border bg-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <Logo size={28} />
                            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                                GuidePath
                            </span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                            Connect with current international students and navigate your study abroad journey with confidence. Real advice from real students.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                            Platform
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {platformLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                            Social
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {socialLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target={link.external ? '_blank' : undefined}
                                        rel={link.external ? 'noopener noreferrer' : undefined}
                                        className="text-sm text-muted transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border py-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-xs text-muted">
                        &copy; {new Date().getFullYear()} GuidePath. All rights reserved.
                    </p>
                    <p className="text-xs text-muted">
                        Made with purpose for students worldwide.
                    </p>
                </div>
            </div>
        </footer>
    );
}
