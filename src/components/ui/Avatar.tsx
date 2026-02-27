import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    fallback: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
    ({ className, src, fallback, size = 'md', alt, ...props }, ref) => {

        const sizes = {
            sm: "h-8 w-8 text-xs",
            md: "h-12 w-12 text-sm",
            lg: "h-16 w-16 text-base",
            xl: "h-24 w-24 text-xl",
        };

        const containerClasses = cn("relative flex shrink-0 overflow-hidden rounded-full bg-surface border border-border shadow-sm", sizes[size], className);

        if (!src) {
            return (
                <div className={cn(containerClasses, "items-center justify-center font-medium")}>
                    {fallback}
                </div>
            );
        }

        return (
            <img
                ref={ref}
                src={src}
                alt={alt || fallback}
                className={cn(containerClasses, "object-cover", className)}
                {...props}
            />
        );
    }
);
Avatar.displayName = 'Avatar';
