import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		data-slot="checkbox"
		className={cn(
			'peer size-5 shrink-0 rounded-[4px] border border-input bg-background shadow-xs outline-none transition-shadow',
			'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40',
			'disabled:cursor-not-allowed disabled:opacity-50',
			'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
			className,
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn('flex items-center justify-center text-current')}
		>
			<CheckIcon className="size-3.5" strokeWidth={3} />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
))
Checkbox.displayName = 'Checkbox'

export { Checkbox }
