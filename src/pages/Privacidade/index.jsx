import React from 'react'
import SEO from '../../components/SEO.jsx'
import { Card, CardContent } from '@/components/ui/card'

const secoes = [
	{
		titulo: 'Quem é o responsável',
		paragrafos: [
			'O NutriCalc (nutricalc.online) é mantido por Haroldo Falcão Ramos da Cunha. Dúvidas sobre esta política ou pedidos relacionados aos seus dados podem ser enviados para haroldofalcao@gmail.com.',
		],
	},
	{
		titulo: 'Dados que você digita nas calculadoras',
		paragrafos: [
			'Os dados digitados nas calculadoras (peso, altura, idade, fórmulas, sintomas do GIDS) são processados no seu próprio navegador. Os produtos que você cadastra e o histórico de medidas do GIDS ficam guardados apenas no armazenamento local do navegador (localStorage) e não são enviados aos nossos servidores.',
			'Não digite nome completo ou documento de pacientes. Se precisar identificar a medida, use iniciais ou um código interno.',
		],
	},
	{
		titulo: 'Cookies e publicidade',
		paragrafos: [
			'Este site exibe anúncios do Google AdSense. O Google e seus parceiros usam cookies para exibir anúncios com base em visitas anteriores a este e a outros sites. Você pode desativar a publicidade personalizada nas Configurações de anúncios do Google (adssettings.google.com) e saber mais sobre como o Google usa dados em policies.google.com/technologies/partner-sites.',
		],
	},
	{
		titulo: 'Estatísticas de uso',
		paragrafos: [
			'Usamos o Google Analytics para Firebase para entender, de forma agregada, quais páginas e funções são mais usadas. Ele registra informações como páginas visitadas, tipo de dispositivo e região aproximada, sem identificar você pelo nome.',
			'O contador de visitas da página inicial guarda no seu navegador um identificador aleatório, usado só para não contar a mesma visita várias vezes, e envia esse identificador ao banco de dados do Firebase.',
		],
	},
	{
		titulo: 'Seus direitos (LGPD)',
		paragrafos: [
			'Pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir informações sobre o tratamento de dados, correção ou eliminação. Os dados guardados no seu navegador podem ser apagados a qualquer momento limpando os dados do site nas configurações do navegador.',
		],
	},
	{
		titulo: 'Alterações nesta política',
		paragrafos: [
			'Esta política pode ser atualizada quando o site mudar. A data abaixo indica a versão em vigor.',
		],
	},
]

function Privacidade() {
	return (
		<>
			<SEO
				title="Política de Privacidade - NutriCalc"
				description="Como o NutriCalc trata os dados digitados nas calculadoras, o uso de cookies do Google AdSense, estatísticas de uso e seus direitos pela LGPD."
				keywords="política de privacidade nutricalc, cookies, adsense, lgpd"
				canonical="/privacidade"
			/>

			<div className="mx-auto max-w-3xl px-4">
				<h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground">
					Política de Privacidade
				</h1>
				<p className="mb-8 text-center text-sm text-muted-foreground">
					Última atualização: 16/10/2026
				</p>

				<Card>
					<CardContent className="space-y-6 pt-6">
						{secoes.map((secao) => (
							<section key={secao.titulo}>
								<h2 className="mb-2 text-lg font-semibold text-foreground">
									{secao.titulo}
								</h2>
								<div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
									{secao.paragrafos.map((p) => (
										<p key={p.slice(0, 40)}>{p}</p>
									))}
								</div>
							</section>
						))}
					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default Privacidade
