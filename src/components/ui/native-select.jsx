import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * NativeSelect — <select> nativo estilizado no visual shadcn.
 * Mantém semântica nativa (picker mobile, name/id, teclado) e é
 * amigável a testes (select[name], .select()).
 */
const NativeSelect = React.forwardRef(
	({ className, children, ...props }, ref) => (
		<div className="relative">
			<select
				ref={ref}
				data-slot="native-select"
				className={cn(
					'flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm shadow-xs outline-none transition-[color,box-shadow]',
					'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40',
					'disabled:cursor-not-allowed disabled:opacity-50',
					'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30',
					className,
				)}
				{...props}
			>
				{children}
			</select>
			<ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 opacity-50" />
		</div>
	),
)
NativeSelect.displayName = 'NativeSelect'

export { NativeSelect }
