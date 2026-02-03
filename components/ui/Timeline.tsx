import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/format";
import { Check, Circle } from "lucide-react";

interface TimelineItem {
    id: string;
    title: string;
    description?: string;
    timestamp: string;
    icon?: React.ReactNode;
    variant?: "default" | "success" | "warning" | "destructive";
}

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
    items: TimelineItem[];
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
    ({ className, items, ...props }, ref) => {
        const variantStyles = {
            default: "bg-primary",
            success: "bg-success",
            warning: "bg-warning",
            destructive: "bg-destructive",
        };

        return (
            <div ref={ref} className={cn("relative", className)} {...props}>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const variant = item.variant || "default";

                    return (
                        <div key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
                            {/* Line */}
                            {!isLast && (
                                <div
                                    className="absolute left-[11px] top-6 h-full w-0.5 bg-border"
                                    aria-hidden="true"
                                />
                            )}

                            {/* Dot/Icon */}
                            <div
                                className={cn(
                                    "relative z-10 flex h-6 w-6 items-center justify-center rounded-full",
                                    variantStyles[variant]
                                )}
                            >
                                {item.icon || (
                                    <Circle className="h-3 w-3 text-white" fill="currentColor" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-0.5">
                                <div className="flex items-center justify-between gap-2">
                                    <h4 className="text-sm font-medium text-foreground">
                                        {item.title}
                                    </h4>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {formatRelativeTime(item.timestamp)}
                                    </span>
                                </div>
                                {item.description && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
);

Timeline.displayName = "Timeline";

// Ticket Activity Timeline
interface TicketTimelineItem {
    id: string;
    type: "created" | "status_changed" | "assigned" | "comment" | "attachment" | "escalated";
    description: string;
    userName?: string;
    oldValue?: string;
    newValue?: string;
    createdAt: string;
}

interface TicketTimelineProps {
    activities: TicketTimelineItem[];
}

const typeConfigs: Record<
    TicketTimelineItem["type"],
    { variant: TimelineItem["variant"]; icon?: React.ReactNode }
> = {
    created: { variant: "success", icon: <Check className="h-3 w-3 text-white" /> },
    status_changed: { variant: "default" },
    assigned: { variant: "default" },
    comment: { variant: "default" },
    attachment: { variant: "default" },
    escalated: { variant: "destructive" },
};

const TicketTimeline = ({ activities }: TicketTimelineProps) => {
    const items: TimelineItem[] = activities.map((activity) => {
        const config = typeConfigs[activity.type];
        return {
            id: activity.id,
            title: activity.userName ? `${activity.userName}` : "System",
            description: activity.description,
            timestamp: activity.createdAt,
            variant: config.variant,
            icon: config.icon,
        };
    });

    return <Timeline items={items} />;
};

export { Timeline, TicketTimeline };
export type { TimelineItem };
