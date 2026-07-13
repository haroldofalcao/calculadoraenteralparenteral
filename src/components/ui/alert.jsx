import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
	'relative w-full rounded-lg border px-4 py-3 text-sm grid grid-cols-[0_1fr] has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] gap-x-3 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
	{
		variants: {
			variant: {
				default: 'bg-card text-card-foreground',
				info: 'border-primary/30 bg-primary/5 text-foreground [&>svg]:text-primary',
				destructive:
					'border-destructive/40 bg-destructive/5 text-destructive [&>svg]:text-destructive',
				warning:
					'border-warning/40 bg-warning/10 text-foreground [&>svg]:text-warning',
				success:
					'border-success/40 bg-success/5 text-foreground [&>svg]:text-success',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
	<div
		ref={ref}
		role="alert"
		data-slot="alert"
		className={cn(alertVariants({ variant }), className)}
		{...props}
	/>
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'col-start-2 min-h-4 font-medium tracking-tight',
			className,
		)}
		{...props}
	/>
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'col-start-2 grid gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed',
			className,
		)}
		{...props}
	/>
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
