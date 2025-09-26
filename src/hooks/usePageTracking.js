import { logEvent } from "firebase/analytics";
// usePageTracking.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analytics } from "../lib/firebase";

export function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
        if (!analytics) return;

        const pagePath = location.pathname + location.search;

        logEvent(analytics, "page_view", {
            page_path: pagePath,
            page_location: window.location.href,
            page_title: document.title,
        });

        console.log("Page view registrada:", pagePath);
    }, [location]);
}
