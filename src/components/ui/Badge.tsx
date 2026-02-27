import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = 'default', children, ...props }, ref) => {

        const variants = {
            default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
            success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
            warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
            error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
        };

        return (
            <div
                ref={ref}
                className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold", variants[variant], className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Badge.displayName = 'Badge';
