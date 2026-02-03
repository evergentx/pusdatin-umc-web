import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "destructive"
    | "info"
    | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: "sm" | "md" | "lg";
    dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = "default", size = "md", dot = false, children, ...props }, ref) => {
        const variants = {
            default: "bg-primary/10 text-primary border-primary/20",
            secondary: "bg-secondary/10 text-secondary border-secondary/20",
            success: "bg-success/10 text-success border-success/20",
            warning: "bg-warning/10 text-warning-foreground border-warning/20",
            destructive: "bg-destructive/10 text-destructive border-destructive/20",
            info: "bg-info/10 text-info border-info/20",
            outline: "bg-transparent text-foreground border-border",
        };

        const dotColors = {
            default: "bg-primary",
            secondary: "bg-secondary",
            success: "bg-success",
            warning: "bg-warning",
            destructive: "bg-destructive",
            info: "bg-info",
            outline: "bg-muted-foreground",
        };

        const sizes = {
            sm: "text-xs px-2 py-0.5",
            md: "text-xs px-2.5 py-1",
            lg: "text-sm px-3 py-1.5",
        };

        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center gap-1.5 font-medium rounded-full border",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {dot && (
                    <span
                        className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            dotColors[variant]
                        )}
                    />
                )}
                {children}
            </span>
        );
    }
);

Badge.displayName = "Badge";

// Status-specific badges
interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
    status: string;
}

const statusVariantMap: Record<string, BadgeVariant> = {
    // Ticket Status
    open: "info",
    in_progress: "warning",
    waiting_user: "secondary",
    resolved: "success",
    closed: "default",
    escalated: "destructive",

    // Priority
    low: "default",
    medium: "info",
    high: "warning",
    urgent: "destructive",

    // Service Status
    operational: "success",
    degraded: "warning",
    partial_outage: "warning",
    major_outage: "destructive",
    maintenance: "info",

    // Borrow Status
    pending: "warning",
    approved: "success",
    rejected: "destructive",
    borrowed: "info",
    returned: "success",
    overdue: "destructive",
};

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
    ({ status, ...props }, ref) => {
        const variant = statusVariantMap[status] || "default";
        return <Badge ref={ref} variant={variant} dot {...props} />;
    }
);

StatusBadge.displayName = "StatusBadge";

export { Badge, StatusBadge };
