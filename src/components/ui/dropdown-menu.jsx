import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuContent = React.forwardRef(
	({ className, sideOffset = 4, ...props }, ref) => (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				ref={ref}
				sideOffset={sideOffset}
				className={cn(
					'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
					className,
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	),
)
DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = React.forwardRef(
	({ className, inset, variant = 'default', ...props }, ref) => (
		<DropdownMenuPrimitive.Item
			ref={ref}
			data-variant={variant}
			className={cn(
				'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none',
				'focus:bg-accent focus:text-accent-foreground',
				'data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive',
				'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				"[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
				inset && 'pl-8',
				className,
			)}
			{...props}
		/>
	),
)
DropdownMenuItem.displayName = 'DropdownMenuItem'

const DropdownMenuLabel = React.forwardRef(
	({ className, inset, ...props }, ref) => (
		<DropdownMenuPrimitive.Label
			ref={ref}
			className={cn(
				'px-2 py-1.5 text-sm font-semibold',
				inset && 'pl-8',
				className,
			)}
			{...props}
		/>
	),
)
DropdownMenuLabel.displayName = 'DropdownMenuLabel'

const DropdownMenuSeparator = React.forwardRef(
	({ className, ...props }, ref) => (
		<DropdownMenuPrimitive.Separator
			ref={ref}
			className={cn('-mx-1 my-1 h-px bg-border', className)}
			{...props}
		/>
	),
)
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

const DropdownMenuShortcut = ({ className, ...props }) => (
	<span
		className={cn(
			'ml-auto text-xs tracking-widest text-muted-foreground',
			className,
		)}
		{...props}
	/>
)
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuGroup,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuRadioGroup,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
}
