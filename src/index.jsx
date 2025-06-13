import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if (import.meta.env.DEV) {
	import('./ads/utils/adSensePolicyValidator.js')
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
