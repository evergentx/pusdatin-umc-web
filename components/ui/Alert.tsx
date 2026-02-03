import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
    AlertCircle,
    CheckCircle2,
    Info,
    AlertTriangle,
    X,
} from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
    "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
                success:
                    "border-success/50 text-success dark:border-success [&>svg]:text-success",
                warning:
                    "border-warning/50 text-warning-foreground dark:border-warning [&>svg]:text-warning-foreground",
                info: "border-info/50 text-info dark:border-info [&>svg]:text-info",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const icons = {
    default: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
    destructive: AlertCircle,
    info: Info,
};

interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
    dismissible?: boolean
    onDismiss?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant = "default", title, dismissible, onDismiss, children, ...props }, ref) => {
        const [isVisible, setIsVisible] = React.useState(true)
        const Icon = icons[variant || "default"]

        if (!isVisible) return null

        const handleDismiss = () => {
            setIsVisible(false);
            onDismiss?.();
        };

        return (
            <div
                ref={ref}
                role="alert"
                className={cn(alertVariants({ variant }), className)}
                {...props}
            >
                <Icon className="h-4 w-4" />
                {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
                <div className="text-sm [&_p]:leading-relaxed">{children}</div>
                {dismissible && (
                    <button
                        onClick={handleDismiss}
                        className="absolute right-4 top-4 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label="Dismiss"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        )
    }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 font-medium leading-none tracking-tight", className)}
        {...props}
    />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm [&_p]:leading-relaxed", className)}
        {...props}
    />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
