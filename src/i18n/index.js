import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Importar traduções
import ptTranslation from './locales/pt/translation.json'
import enTranslation from './locales/en/translation.json'

const resources = {
	pt: {
		translation: ptTranslation,
	},
	en: {
		translation: enTranslation,
	},
}

let i18nBuilder = i18n.use(initReactI18next)
if (!import.meta.env.SSR) {
	i18nBuilder = i18nBuilder.use(LanguageDetector)
}

i18nBuilder.init({
		resources,
		fallbackLng: 'pt', // Fallback para português
		debug: false,

		interpolation: {
			escapeValue: false, // React já faz escape
		},

		detection: {
			order: ['localStorage', 'navigator', 'htmlTag'],
			caches: ['localStorage'],
		},
	})

export default i18n
