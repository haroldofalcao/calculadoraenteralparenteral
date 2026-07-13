import * as React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// Curva ease-out suave (entrada). Ver system.md + guideline `easing`.
export const easeOut = [0.16, 1, 0.3, 1]

const resolveTag = (as) => (typeof as === 'string' ? motion[as] ?? motion.div : as)

/**
 * FadeIn — revela ao entrar no viewport (scroll reveal).
 * Sob prefers-reduced-motion o conteúdo é renderizado visível, sem animação.
 */
export function FadeIn({
	children,
	className,
	delay = 0,
	y = 16,
	once = true,
	amount = 0.2,
	as = 'div',
	...props
}) {
	const reduce = useReducedMotion()
	const MotionTag = resolveTag(as)
	return (
		<MotionTag
			className={className}
			initial={reduce ? false : { opacity: 0, y }}
			whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
			viewport={{ once, amount }}
			transition={{ duration: 0.5, delay, ease: easeOut }}
			{...props}
		>
			{children}
		</MotionTag>
	)
}

/**
 * Stagger — container que revela filhos em sequência.
 * Use com <StaggerItem> nos filhos.
 */
export function Stagger({
	children,
	className,
	stagger = 0.08,
	delayChildren = 0,
	once = true,
	amount = 0.15,
	as = 'div',
	...props
}) {
	const reduce = useReducedMotion()
	const MotionTag = resolveTag(as)
	return (
		<MotionTag
			className={className}
			initial={reduce ? false : 'hidden'}
			whileInView={reduce ? undefined : 'show'}
			viewport={{ once, amount }}
			variants={
				reduce
					? undefined
					: {
							hidden: {},
							show: { transition: { staggerChildren: stagger, delayChildren } },
						}
			}
			{...props}
		>
			{children}
		</MotionTag>
	)
}

export function StaggerItem({ children, className, y = 18, as = 'div', ...props }) {
	const reduce = useReducedMotion()
	const MotionTag = resolveTag(as)
	return (
		<MotionTag
			className={className}
			variants={
				reduce
					? undefined
					: {
							hidden: { opacity: 0, y },
							show: {
								opacity: 1,
								y: 0,
								transition: { duration: 0.45, ease: easeOut },
							},
						}
			}
			{...props}
		>
			{children}
		</MotionTag>
	)
}

/**
 * Reveal — anima na montagem (não depende de scroll). Ideal p/ resultados.
 */
export function Reveal({ children, className, y = 12, as = 'div', ...props }) {
	const reduce = useReducedMotion()
	const MotionTag = resolveTag(as)
	return (
		<MotionTag
			className={className}
			initial={reduce ? false : { opacity: 0, y }}
			animate={reduce ? undefined : { opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: easeOut }}
			{...props}
		>
			{children}
		</MotionTag>
	)
}

export { motion, AnimatePresence, useReducedMotion }
