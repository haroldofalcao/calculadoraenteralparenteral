import { Toaster as Sonner } from 'sonner'

const Toaster = ({ ...props }) => {
	return (
		<Sonner
			theme="light"
			className="toaster group"
			position="top-center"
			richColors
			closeButton
			style={{
				'--normal-bg': 'hsl(var(--popover))',
				'--normal-text': 'hsl(var(--popover-foreground))',
				'--normal-border': 'hsl(var(--border))',
			}}
			{...props}
		/>
	)
}

export { Toaster }
