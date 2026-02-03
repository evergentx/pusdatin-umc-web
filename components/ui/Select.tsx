import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
    label?: string;
    error?: string;
    hint?: string;
    options: SelectOption[];
    placeholder?: string;
    onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            label,
            error,
            hint,
            options,
            placeholder = "Pilih opsi",
            disabled,
            id,
            onChange,
            value,
            ...props
        },
        ref
    ) => {
        const selectId = id || React.useId();

        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            onChange?.(e.target.value);
        };

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="block text-sm font-medium text-foreground mb-1.5"
                    >
                        {label}
                        {props.required && <span className="text-destructive ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    <select
                        id={selectId}
                        className={cn(
                            "flex h-10 w-full appearance-none rounded-lg border bg-input px-3 py-2 pr-10 text-sm transition-colors",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            error
                                ? "border-destructive focus:ring-destructive"
                                : "border-border",
                            !value && "text-muted-foreground",
                            className
                        )}
                        disabled={disabled}
                        ref={ref}
                        value={value}
                        onChange={handleChange}
                        {...props}
                    >
                        <option value="" disabled>
                            {placeholder}
                        </option>
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                {error && (
                    <p className="mt-1.5 text-sm text-destructive">{error}</p>
                )}
                {hint && !error && (
                    <p className="mt-1.5 text-sm text-muted-foreground">{hint}</p>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";

export { Select };
