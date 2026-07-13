import { Toaster as Sonner } from 'sonner'

const Toaster = ({ ...props }) => {
	return (
		<Sonner
			theme="light"
			className="toaster group"
			position="top-center"
			richColors
			closeButton
			toastOptions={{
				// Classes semânticas estáveis como âncora de testes E2E
				classNames: {
					toast: 'alert',
					success: 'alert-success',
					error: 'alert-danger',
					warning: 'alert-warning',
					info: 'alert-info',
				},
			}}
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
