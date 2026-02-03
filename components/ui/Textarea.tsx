import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
    showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            label,
            error,
            hint,
            showCount = false,
            disabled,
            id,
            maxLength,
            value,
            ...props
        },
        ref
    ) => {
        const textareaId = id || React.useId();
        const charCount = typeof value === "string" ? value.length : 0;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="block text-sm font-medium text-foreground mb-1.5"
                    >
                        {label}
                        {props.required && <span className="text-destructive ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    <textarea
                        id={textareaId}
                        className={cn(
                            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            error
                                ? "border-destructive focus-visible:ring-destructive"
                                : "",
                            className
                        )}
                        disabled={disabled}
                        ref={ref}
                        maxLength={maxLength}
                        value={value}
                        {...props}
                    />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                    <div>
                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}
                        {hint && !error && (
                            <p className="text-sm text-muted-foreground">{hint}</p>
                        )}
                    </div>
                    {showCount && maxLength && (
                        <p
                            className={cn(
                                "text-sm",
                                charCount >= maxLength
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                            )}
                        >
                            {charCount}/{maxLength}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };
