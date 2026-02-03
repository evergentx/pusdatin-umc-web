import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        info:
          'border-transparent bg-blue-500/15 text-blue-700 dark:bg-blue-500/25 dark:text-blue-300 hover:bg-blue-500/25',
        success:
          'border-transparent bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-300 hover:bg-emerald-500/25',
        warning:
          'border-transparent bg-amber-500/15 text-amber-700 dark:bg-amber-500/25 dark:text-amber-300 hover:bg-amber-500/25',
      },
      size: {
        default: "px-2 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: "default",
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants, StatusBadge }

// Status-specific badges
type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "info" | "success" | "warning";

interface StatusBadgeProps extends React.ComponentProps<typeof Badge> {
  status: string;
}

const statusVariantMap: Record<string, string> = {
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

// Extend badge variants to include custom ones if needed, or map them to existing ones
// For now, we will map them to the closest existing variants in the new system
// or add custom classes via cn if needed.
// However, the new system only has default, secondary, destructive, outline.
// info, success, warning need to be implemented or mapped.

// Let's implement them as custom styles in the StatusBadge component for now
const statusStyles: Record<string, string> = {
  info: "bg-blue-500/15 text-blue-700 dark:bg-blue-500/25 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  success: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  warning: "bg-amber-500/15 text-amber-700 dark:bg-amber-500/25 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  default: "bg-slate-500/15 text-slate-700 dark:bg-slate-500/25 dark:text-slate-300 border-slate-200 dark:border-slate-800",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive/15 text-destructive dark:bg-destructive/25 border-destructive/20",
  outline: "border-input bg-background",
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, className, ...props }, ref) => {
    const variantKey = statusVariantMap[status] || "default";
    // If the variant matches one of the standard ones, use it?
    // But we want specific colors for success/info etc which might not be in standard variants.
    // So we'll disable the standard variant style and apply our own if it's special.

    const style = statusStyles[variantKey] || statusStyles.default;

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          style,
          className
        )}
        {...props}
      />
    );
  }
);

StatusBadge.displayName = "StatusBadge";
