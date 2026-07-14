import React from 'react'
import ProductManager from '../../../components/ProductManager.jsx'
import SEO from '../../../components/SEO.jsx'

function GerenciarProdutos() {
	return (
		<>
			<SEO
				title="Gerenciador de Produtos Nutricionais - NutriCalc | Cadastro e Gestão"
				description="Gerencie produtos nutricionais para cálculos de nutrição enteral e parenteral. Cadastre, edite e organize seus produtos para prescrições mais eficientes."
				keywords="produtos nutricionais, gestão de produtos, nutrição enteral, nutrição parenteral, cadastro de fórmulas"
				canonical="/nenpt/gerenciar-produtos"
			/>

			<ProductManager />
		</>
	)
}

export default GerenciarProdutos
