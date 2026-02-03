
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  showCount?: boolean;
}

function Textarea({ className, label, error, hint, showCount, id, ...props }: TextareaProps) {
  const generatedId = React.useId();
  const textareaId = id || generatedId;
  const valueLength = props.value ? String(props.value).length : 0;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        data-slot="textarea"
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error && "border-destructive focus-visible:ring-destructive/50",
          className,
        )}
        {...props}
      />
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          {hint && !error && (
            <p className="text-[0.8rem] text-muted-foreground">
              {hint}
            </p>
          )}
          {error && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {error}
            </p>
          )}
        </div>
        {showCount && props.maxLength && (
          <p className="text-[0.8rem] text-muted-foreground tabular-nums">
            {valueLength}/{props.maxLength}
          </p>
        )}
      </div>
    </div>
  )
}

export { Textarea }
