import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import {
	Controller,
	FormProvider,
	useFormContext,
	useFormState,
} from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = ({ ...props }) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

const FormItemContext = React.createContext({})

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)
	const { getFieldState } = useFormContext()
	const formState = useFormState({ name: fieldContext.name })
	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error('useFormField deve ser usado dentro de <FormField>')
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
	const id = React.useId()
	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				ref={ref}
				data-slot="form-item"
				className={cn('grid gap-2', className)}
				{...props}
			/>
		</FormItemContext.Provider>
	)
})
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField()
	return (
		<Label
			ref={ref}
			data-error={!!error}
			className={cn('data-[error=true]:text-destructive', className)}
			htmlFor={formItemId}
			{...props}
		/>
	)
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	)
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField()
	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cn('text-xs text-muted-foreground', className)}
			{...props}
		/>
	)
})
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef(
	({ className, children, ...props }, ref) => {
		const { error, formMessageId } = useFormField()
		const body = error ? String(error?.message ?? '') : children
		if (!body) return null
		return (
			<p
				ref={ref}
				id={formMessageId}
				role="alert"
				className={cn('text-xs font-medium text-destructive', className)}
				{...props}
			>
				{body}
			</p>
		)
	},
)
FormMessage.displayName = 'FormMessage'

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
}
