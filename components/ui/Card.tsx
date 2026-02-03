import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "outline" | "elevated";
    padding?: "none" | "sm" | "md" | "lg";
    hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            variant = "default",
            padding = "md",
            hover = false,
            children,
            ...props
        },
        ref
    ) => {
        const variants = {
            default: "bg-card border border-border",
            outline: "bg-transparent border border-border",
            elevated: "bg-card shadow-lg border border-border/50",
        };

        const paddings = {
            none: "",
            sm: "p-3",
            md: "p-5",
            lg: "p-7",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-xl",
                    variants[variant],
                    paddings[padding],
                    hover && "transition-shadow hover:shadow-md cursor-pointer",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", className)}
        {...props}
    />
));

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
    />
));

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
));

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
    />
));

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
