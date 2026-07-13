import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

const Tabs = React.forwardRef(({ className, ...props }, ref) => (
	<TabsPrimitive.Root
		ref={ref}
		className={cn('flex flex-col gap-4', className)}
		{...props}
	/>
))
Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			'inline-flex h-10 w-fit items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
			className,
		)}
		{...props}
	/>
))
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			'inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md px-4 py-1 text-sm font-medium whitespace-nowrap transition-all cursor-pointer',
			'text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40 outline-none',
			'disabled:pointer-events-none disabled:opacity-50',
			"data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
			"[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
			className,
		)}
		{...props}
	/>
))
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn('flex-1 outline-none', className)}
		{...props}
	/>
))
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
