import { onValue, ref, runTransaction } from 'firebase/database'
import { useCallback, useEffect, useState } from 'react'
import { database } from '../lib/firebase'

function getOrCreateVisitorId() {
    try {
        const key = 'nutricalc_visitor_id'
        let id = localStorage.getItem(key)
        if (!id) {
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                id = crypto.randomUUID()
            } else {
                id = `visitor_${Date.now()}_${Math.floor(Math.random() * 100000)}`
            }
            localStorage.setItem(key, id)
        }
        return id
    } catch {
        // localStorage may fail in some environments
        return `visitor_fallback_${Date.now()}`
    }
}

// useViewCounter hook
// pageId: string - identificador único da página (ex: 'home', 'nenpt_calculator')
// options: { cooldownSeconds = 3600, autoIncrement = false }
// retorna: { count, increment, incrementBy, incrementWithRateLimit, loading, error, visitorId }
export default function useViewCounter(pageId, options = {}) {
    const { cooldownSeconds = 3600, autoIncrement = false } = options

    const [count, setCount] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const visitorId = getOrCreateVisitorId()

    useEffect(() => {
        if (!pageId || !database) {
            setLoading(false)
            setCount(0)
            return
        }
        const nodeRef = ref(database, `views/${pageId}/count`)

        const unsubscribe = onValue(
            nodeRef,
            (snapshot) => {
                const val = snapshot.val()
                setCount(typeof val === 'number' ? val : 0)
                setLoading(false)
            },
            (err) => {
                console.error('Erro no listener de views:', err)
                setError(err)
                setLoading(false)
            },
        )

        return () => unsubscribe()
    }, [pageId])

    // Increment sem rate-limit (uso interno quando permitido)
    const incrementRaw = useCallback(async (n = 1) => {
        if (!pageId || !database) return false
        setLoading(true)
        const nodeRef = ref(database, `views/${pageId}/count`)
        try {
            await runTransaction(nodeRef, (current) => {
                if (current === null) return n
                return (current || 0) + n
            })
            setLoading(false)
            return true
        } catch (err) {
            console.error('Erro ao incrementar contador de views:', err)
            setError(err)
            setLoading(false)
            return false
        }
    }, [pageId])

    // Increment com rate-limit baseado em visitorId e cooldownSeconds
    const increment = useCallback(async () => {
        if (!pageId || !database) return false
        setLoading(true)
        const now = Date.now()
        const visitorPath = `visitors/${visitorId}/lastViews/${pageId}`
        const visitorRef = ref(database, visitorPath)
        try {
            const res = await runTransaction(visitorRef, (current) => {
                // current is timestamp in ms
                if (current === null) return now
                const elapsed = now - current
                if (elapsed >= cooldownSeconds * 1000) return now
                return current // not allowed, keep existing
            })

            // res.committed true means our write happened; check that the value equals now
            const committed = res && res.committed
            const snapshotVal = res && res.snapshot && res.snapshot.val()
            if (committed && snapshotVal === now) {
                // allowed: increment the public counter
                await incrementRaw(1)
                setLoading(false)
                return true
            }

            // rate limited
            setLoading(false)
            return false
        } catch (err) {
            console.error('Erro ao aplicar rate-limit/increment:', err)
            setError(err)
            setLoading(false)
            return false
        }
    }, [pageId, visitorId, cooldownSeconds, incrementRaw])

    const incrementBy = useCallback(async (n) => {
        if (!pageId) return false
        if (typeof n !== 'number' || n <= 0) return false
        // For bulk increments, bypass rate-limit (or could implement different logic)
        return incrementRaw(n)
    }, [pageId, incrementRaw])

    // Auto-increment once on mount (subject to rate-limit)
    useEffect(() => {
        if (autoIncrement && pageId) {
            // fire-and-forget
            increment()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoIncrement, pageId])

    return { count, increment, incrementBy, loading, error, visitorId }
}
