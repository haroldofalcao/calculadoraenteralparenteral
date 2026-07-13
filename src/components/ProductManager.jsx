import { useAtom } from 'jotai'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import {
	EyeOff,
	MoreHorizontal,
	PackagePlus,
	RotateCcw,
	Search,
	Trash2,
} from 'lucide-react'
import { ResponsiveBanner } from '../ads/components/AdVariants.jsx'
import { useAnalytics } from '../hooks/useAnalytics'
import {
	allProductsAtom,
	defaultProductsAtom,
	hiddenDefaultProductsAtom,
	userProductsAtom,
} from '../store/productsAtoms'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

const emptyProduct = {
	nome: '',
	kcal_ml: '',
	cho_g_l: '',
	lip_g_l: '',
	ptn_g_l: '',
	ep_ratio: '',
}

const numericFields = [
	{ name: 'kcal_ml', min: '0.1' },
	{ name: 'cho_g_l', min: '0' },
	{ name: 'lip_g_l', min: '0' },
	{ name: 'ptn_g_l', min: '0' },
	{ name: 'ep_ratio', min: '0' },
]

const ProductManager = () => {
	const { t } = useTranslation()
	const [userProducts, setUserProducts] = useAtom(userProductsAtom)
	const [allProducts] = useAtom(allProductsAtom)
	const [hiddenDefaultProducts, setHiddenDefaultProducts] = useAtom(
		hiddenDefaultProductsAtom,
	)
	const [defaultProducts] = useAtom(defaultProductsAtom)
	const { trackEvent } = useAnalytics()

	const [newProduct, setNewProduct] = useState(emptyProduct)
	const [searchTerm, setSearchTerm] = useState('')
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [productToDelete, setProductToDelete] = useState(null)

	useEffect(() => {
		trackEvent('productManager_view', { page: 'product_manager' })
	}, [trackEvent])

	const isProductUser = (name) => userProducts.some((p) => p.nome === name)

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setNewProduct({
			...newProduct,
			[name]: name === 'nome' ? value : parseFloat(value) || '',
		})
	}

	const handleAddProduct = (e) => {
		e.preventDefault()
		if (
			allProducts.some(
				(p) => p.nome.toLowerCase() === newProduct.nome.toLowerCase(),
			)
		) {
			toast.error(t('productManager.validation.nameExists'))
			trackEvent('productManager_add_failed', {
				reason: 'name_exists',
				name: newProduct.nome,
			})
			return
		}

		if (
			newProduct.kcal_ml <= 0 ||
			newProduct.cho_g_l < 0 ||
			newProduct.lip_g_l < 0 ||
			newProduct.ptn_g_l < 0 ||
			newProduct.ep_ratio < 0
		) {
			toast.error(t('productManager.validation.invalidValues'))
			trackEvent('productManager_add_failed', { reason: 'invalid_values' })
			return
		}

		setUserProducts([...userProducts, newProduct])
		trackEvent('productManager_add_product', { name: newProduct.nome })
		setNewProduct(emptyProduct)
		toast.success(t('productManager.validation.productAdded'))
	}

	const handleDeleteClick = (product) => {
		setProductToDelete(product)
		setShowDeleteModal(true)
		trackEvent('productManager_delete_initiated', { name: product.nome })
	}

	const confirmDelete = () => {
		if (!productToDelete) return
		const isUserProduct = isProductUser(productToDelete.nome)
		const isDefaultProduct = defaultProducts.some(
			(p) => p.nome === productToDelete.nome,
		)

		if (isUserProduct) {
			setUserProducts(
				userProducts.filter((p) => p.nome !== productToDelete.nome),
			)
			trackEvent('productManager_deleted', {
				name: productToDelete.nome,
				type: 'user',
			})
			toast.success(t('productManager.validation.productDeleted'))
		} else if (isDefaultProduct) {
			setHiddenDefaultProducts([...hiddenDefaultProducts, productToDelete.nome])
			trackEvent('productManager_hidden', {
				name: productToDelete.nome,
				type: 'default',
			})
			toast.success(t('productManager.validation.productDeleted'))
		}

		setShowDeleteModal(false)
		setProductToDelete(null)
	}

	const handleRestoreProduct = (productName) => {
		setHiddenDefaultProducts(
			hiddenDefaultProducts.filter((name) => name !== productName),
		)
		trackEvent('productManager_restored', { name: productName })
		toast.success(t('productManager.validation.productDeleted'))
	}

	const filteredProducts = allProducts.filter((product) =>
		product.nome.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	const handleSearchKeyDown = (e) => {
		if (e.key === 'Enter') {
			trackEvent('productManager_search', { query: searchTerm })
		}
	}

	const deletingUser = productToDelete && isProductUser(productToDelete.nome)

	return (
		<div className="mx-auto max-w-6xl px-4">
			<ResponsiveBanner adSlot="9004267172" requireContent={false} />

			<h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
				{t('productManager.title')}
			</h1>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Adicionar produto */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg">
							<PackagePlus className="size-5 text-primary" />
							{t('productManager.addProduct')}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleAddProduct} className="space-y-4">
							<div className="grid gap-2">
								<Label htmlFor="nome">{t('productManager.productName')}</Label>
								<Input
									id="nome"
									type="text"
									name="nome"
									value={newProduct.nome}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{numericFields.map((f) => (
									<div key={f.name} className="grid gap-2">
										<Label htmlFor={f.name}>
											{t(
												`productManager.${
													f.name === 'kcal_ml'
														? 'kcalMl'
														: f.name === 'cho_g_l'
															? 'cho'
															: f.name === 'lip_g_l'
																? 'lip'
																: f.name === 'ptn_g_l'
																	? 'ptn'
																	: 'epRatio'
												}`,
											)}
										</Label>
										<Input
											id={f.name}
											type="number"
											name={f.name}
											value={newProduct[f.name]}
											onChange={handleInputChange}
											required
											min={f.min}
											step="0.1"
										/>
									</div>
								))}
							</div>

							<Button type="submit" className="w-full">
								{t('productManager.addProductButton')}
							</Button>
						</form>
					</CardContent>
				</Card>

				{/* Produtos cadastrados */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">
							{t('productManager.registeredProducts')}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="relative">
							<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								type="text"
								placeholder={t('productManager.searchProduct')}
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onKeyDown={handleSearchKeyDown}
								className="pl-9"
							/>
						</div>

						<div className="max-h-[28rem] overflow-y-auto rounded-md border border-border">
							<Table>
								<TableHeader className="sticky top-0 bg-card">
									<TableRow>
										<TableHead>{t('productManager.name')}</TableHead>
										<TableHead className="text-right">
											{t('productManager.kcalMl')}
										</TableHead>
										<TableHead>{t('productManager.type')}</TableHead>
										<TableHead className="text-right">
											{t('productManager.actions')}
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredProducts.length > 0 ? (
										filteredProducts.map((product, index) => {
											const isUserProduct = isProductUser(product.nome)
											return (
												<TableRow key={index}>
													<TableCell className="font-medium">
														{product.nome}
													</TableCell>
													<TableCell className="text-right tabular-nums">
														{product.kcal_ml.toFixed(1)}
													</TableCell>
													<TableCell>
														<Badge
															variant={isUserProduct ? 'default' : 'secondary'}
														>
															{isUserProduct
																? t('common.custom')
																: t('productManager.standard')}
														</Badge>
													</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	variant="ghost"
																	size="icon"
																	className="size-8"
																	aria-label={t('productManager.actions')}
																>
																	<MoreHorizontal className="size-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem
																	variant="destructive"
																	onClick={() => handleDeleteClick(product)}
																>
																	{isUserProduct ? (
																		<>
																			<Trash2 className="size-4" />
																			{t('productManager.delete')}
																		</>
																	) : (
																		<>
																			<EyeOff className="size-4" />
																			{t('productManager.hide')}
																		</>
																	)}
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											)
										})
									) : (
										<TableRow>
											<TableCell
												colSpan={4}
												className="py-8 text-center text-muted-foreground"
											>
												{t('common.noResults')}
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Produtos ocultos */}
			{hiddenDefaultProducts.length > 0 && (
				<Card className="mt-6">
					<CardHeader>
						<CardTitle className="text-lg">
							{t('productManager.hiddenProducts')}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="mb-3 text-sm text-muted-foreground">
							{t('productManager.hiddenProductsDescription')}
						</p>
						<div className="flex flex-wrap gap-2">
							{hiddenDefaultProducts.map((productName, index) => (
								<div
									key={index}
									className="flex items-center gap-2 rounded-full border border-border bg-secondary/40 py-1 pl-3 pr-1 text-sm"
								>
									<span>{productName}</span>
									<Button
										variant="ghost"
										size="sm"
										className="h-7 gap-1 px-2 text-success hover:text-success"
										onClick={() => handleRestoreProduct(productName)}
									>
										<RotateCcw className="size-3.5" />
										{t('productManager.show')}
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Modal de confirmação */}
			<Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
				<DialogContent data-testid="delete-dialog">
					<DialogHeader>
						<DialogTitle>
							{deletingUser
								? t('productManager.confirmDelete')
								: t('productManager.confirmHide')}
						</DialogTitle>
						<DialogDescription>
							{deletingUser
								? t('productManager.deleteConfirmation').replace(
										'{{productName}}',
										productToDelete?.nome ?? '',
									)
								: t('productManager.hideConfirmation').replace(
										'{{productName}}',
										productToDelete?.nome ?? '',
									)}
						</DialogDescription>
					</DialogHeader>
					<p
						className={
							deletingUser
								? 'text-sm text-destructive'
								: 'text-sm text-warning'
						}
					>
						{deletingUser
							? t('productManager.deleteWarning')
							: t('productManager.hideWarning')}
					</p>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowDeleteModal(false)}
						>
							{t('common.cancel')}
						</Button>
						<Button
							variant={deletingUser ? 'destructive' : 'warning'}
							onClick={confirmDelete}
						>
							{deletingUser
								? t('productManager.delete')
								: t('productManager.hide')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Seções informativas */}
			<div className="mt-12">
				<h3 className="mb-6 text-center text-xl font-bold text-foreground">
					Informações Sobre Gerenciamento de Produtos
				</h3>
				<div className="space-y-4">
					{[
						{
							title: t('productManager.clinicalImportance.title'),
							content: t('productManager.clinicalImportance.content'),
						},
						{
							title: t('productManager.productCustomization.title'),
							content: t('productManager.productCustomization.content'),
						},
					].map((sec) => (
						<Card key={sec.title}>
							<CardContent className="pt-6">
								<h4 className="mb-3 text-base font-semibold text-primary">
									{sec.title}
								</h4>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{sec.content}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}

export default ProductManager
