import { logEvent } from "firebase/analytics";
// useAnalytics.js
import { useCallback } from "react";
import { analytics } from "../lib/firebase";

export function useAnalytics() {
    /**
     * Loga um evento customizado no Firebase Analytics
     * @param {string} eventName - Nome do evento (ex: "botao_clicado")
     * @param {object} params - Parâmetros adicionais (ex: { label: "comprar" })
     */
    const trackEvent = useCallback((eventName, params = {}) => {
        if (!analytics) return;
        try {
            logEvent(analytics, eventName, params);
            console.log("Evento enviado:", eventName, params);
        } catch (err) {
            console.error("Erro ao enviar evento:", err);
        }
    }, []);

    return { trackEvent };
}
