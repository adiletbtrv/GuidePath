'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { useAuthStore } from '@/lib/store/authStore';
import { trackSignupStarted, trackSignupCompleted } from '@/lib/analytics/events';

const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignupForm = z.infer<typeof signupSchema>;

function SignupFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRole = (searchParams.get('role') === 'guide' ? 'guide' : 'seeker') as 'guide' | 'seeker';

    const [role, setRole] = useState<'guide' | 'seeker'>(initialRole);
    const setAuth = useAuthStore((s) => s.setAuth);
    const [isSubmitLoading, setSubmitLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupForm) => {
        trackSignupStarted('email');
        setSubmitLoading(true);

        setTimeout(() => {
            setAuth({
                id: `user_${Date.now()}`,
                email: data.email,
                name: data.name,
                role,
                createdAt: new Date().toISOString()
            }, 'fake-jwt-token-456');

            trackSignupCompleted(role);
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]" />
                <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="relative z-10 w-full max-w-md space-y-8 rounded-2xl bg-surface border border-border p-8 shadow-xl"
            >
                <div className="text-center">
                    <Link href="/" className="inline-block">
                        <Logo size={44} />
                    </Link>
                    <h2 className="mt-6 font-heading text-2xl font-bold tracking-tight text-foreground">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="font-medium text-primary hover:text-primary-hover transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Role Toggle */}
                    <div className="flex rounded-xl bg-surface-hover p-1">
                        {(['seeker', 'guide'] as const).map((r) => (
                            <button
                                key={r}
                                onClick={() => setRole(r)}
                                className={`relative flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${role === r
                                        ? 'text-foreground'
                                        : 'text-muted hover:text-foreground'
                                    }`}
                            >
                                {role === r && (
                                    <motion.div
                                        layoutId="roleTab"
                                        className="absolute inset-0 rounded-lg bg-surface shadow-sm"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">
                                    I&apos;m a {r === 'seeker' ? 'Seeker' : 'Guide'}
                                </span>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Full Name"
                            type="text"
                            autoComplete="name"
                            placeholder="John Doe"
                            {...register('name')}
                            error={errors.name?.message}
                        />

                        <Input
                            label="Email address"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            {...register('email')}
                            error={errors.email?.message}
                        />

                        <Input
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••••"
                            {...register('password')}
                            error={errors.password?.message}
                        />

                        <Button type="submit" className="w-full py-6 text-base" isLoading={isSubmitLoading}>
                            Create {role === 'guide' ? 'Guide' : 'Seeker'} Account
                        </Button>
                    </form>

                    <p className="text-center text-xs text-muted">
                        By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <SignupFormContent />
        </Suspense>
    );
}
