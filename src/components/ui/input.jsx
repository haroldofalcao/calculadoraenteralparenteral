import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			ref={ref}
			data-slot="input"
			className={cn(
				'flex h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none',
				'file:border-0 file:bg-transparent file:text-sm file:font-medium',
				'placeholder:text-muted-foreground',
				'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30',
				className,
			)}
			{...props}
		/>
	)
})
Input.displayName = 'Input'

export { Input }
