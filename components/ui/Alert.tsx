import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current [&>*:not(svg)]:col-start-2',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
        info: "bg-blue-500/15 text-blue-700 dark:bg-blue-500/25 dark:text-blue-300 [&>svg]:text-blue-700 dark:[&>svg]:text-blue-300",
        success: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-300 [&>svg]:text-emerald-700 dark:[&>svg]:text-emerald-300",
        warning: "bg-amber-500/15 text-amber-700 dark:bg-amber-500/25 dark:text-amber-300 [&>svg]:text-amber-700 dark:[&>svg]:text-amber-300",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)


interface AlertProps extends React.ComponentProps<'div'>, VariantProps<typeof alertVariants> {
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

function Alert({
  className,
  variant,
  title,
  dismissible,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
      {dismissible && (
        <button onClick={onDismiss} type="button" className="absolute right-4 top-4 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
