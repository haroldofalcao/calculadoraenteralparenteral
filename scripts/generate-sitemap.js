import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const baseUrl = 'https://www.nutricalc.online'

const routes = [
	{ path: '/', changefreq: 'weekly', priority: '1.0' },
	{ path: '/nenpt', changefreq: 'weekly', priority: '0.9' },
	{ path: '/gids', changefreq: 'weekly', priority: '0.9' },
	{ path: '/nenpt/gerenciar-produtos', changefreq: 'monthly', priority: '0.8' },
	{ path: '/perguntas-frequentes', changefreq: 'monthly', priority: '0.7' },
]

const lastmod = new Date().toISOString().split('T')[0]

const urls = routes
	.map(
		(r) => `	<url>
		<loc>${baseUrl}${r.path}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>${r.changefreq}</changefreq>
		<priority>${r.priority}</priority>
	</url>`,
	)
	.join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const outPath = path.join(distDir, 'sitemap.xml')
writeFileSync(outPath, xml)
console.log(`sitemap.xml gerado em ${outPath} (${routes.length} rotas, lastmod ${lastmod})`)

// Vercel serve dist/404.html com status 404 para qualquer rota não encontrada
const notFoundSrc = path.join(distDir, '404/index.html')
const notFoundDest = path.join(distDir, '404.html')
if (existsSync(notFoundSrc)) {
	copyFileSync(notFoundSrc, notFoundDest)
	console.log(`404.html copiado para ${notFoundDest}`)
} else {
	console.warn(`aviso: ${notFoundSrc} não encontrado, 404.html não gerado`)
}
