import { type ReactNode } from 'react';
import { cn } from '../lib/utils';

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-4 gap-px",
            className
        )}>
            {children}
        </div>
    );
}

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: string;
    rowSpan?: string;
}

export function BentoCard({ children, className, colSpan = "md:col-span-1", rowSpan = "row-span-1" }: BentoCardProps) {
    return (
        <div
            className={cn(
                "relative h-full w-full",
                colSpan,
                rowSpan,
                className
            )}
        >
            {children}
        </div>
    );
}
