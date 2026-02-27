'use client';

export function Logo({ className = '', size = 32 }: { className?: string; size?: number }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={className}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#2563EB" />
            <path d="M2 17l10 5 10-5" stroke="#6366F1" />
            <path d="M2 12l10 5 10-5" stroke="#3B82F6" />
        </svg>
    );
}
