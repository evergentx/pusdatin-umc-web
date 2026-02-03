import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
    text?: string;
}

const LoadingSpinner = ({
    size = "md",
    className,
    text,
}: LoadingSpinnerProps) => {
    const sizes = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
    };

    return (
        <div
            className={cn("flex flex-col items-center justify-center gap-3", className)}
        >
            <Loader2 className={cn("animate-spin text-primary", sizes[size])} />
            {text && <p className="text-sm text-muted-foreground">{text}</p>}
        </div>
    );
};

// Full page loading
const PageLoader = ({ text = "Memuat..." }: { text?: string }) => {
    return (
        <div className="flex min-h-[400px] items-center justify-center">
            <LoadingSpinner size="lg" text={text} />
        </div>
    );
};

// Skeleton loading
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "text" | "circular" | "rectangular";
    width?: string | number;
    height?: string | number;
}

const Skeleton = ({
    className,
    variant = "text",
    width,
    height,
    ...props
}: SkeletonProps) => {
    const variants = {
        text: "rounded-md h-4",
        circular: "rounded-full",
        rectangular: "rounded-lg",
    };

    return (
        <div
            className={cn(
                "animate-pulse bg-muted",
                variants[variant],
                className
            )}
            style={{ width, height }}
            {...props}
        />
    );
};

// Card skeleton
const CardSkeleton = () => (
    <div className="p-5 border rounded-xl space-y-4">
        <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="space-y-2 flex-1">
                <Skeleton width="60%" height={16} />
                <Skeleton width="40%" height={12} />
            </div>
        </div>
        <Skeleton height={12} />
        <Skeleton height={12} width="80%" />
        <div className="flex gap-2 pt-2">
            <Skeleton variant="rectangular" width={80} height={24} />
            <Skeleton variant="rectangular" width={60} height={24} />
        </div>
    </div>
);

// Table skeleton
const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
    <div className="space-y-3">
        {/* Header */}
        <div className="flex gap-4 p-4 border rounded-lg bg-muted/50">
            <Skeleton width="25%" height={14} />
            <Skeleton width="25%" height={14} />
            <Skeleton width="25%" height={14} />
            <Skeleton width="25%" height={14} />
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border rounded-lg">
                <Skeleton width="25%" height={14} />
                <Skeleton width="25%" height={14} />
                <Skeleton width="25%" height={14} />
                <Skeleton width="25%" height={14} />
            </div>
        ))}
    </div>
);

export { LoadingSpinner, PageLoader, Skeleton, CardSkeleton, TableSkeleton };
