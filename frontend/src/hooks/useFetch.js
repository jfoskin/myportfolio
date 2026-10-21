import { useEffect, useState } from "react"

const TIMEOUT_MS = 15000

// Fetches JSON from the backend. Each call keeps its own loading/error state,
// gives up after TIMEOUT_MS, and can be retried.
export default function useFetch(path) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(TIMEOUT_MS)])

    fetch(`${import.meta.env.VITE_BACKEND_URL}${path}`, { signal })
      .then(response => {
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
        return response.json()
      })
      .then(
        data => setState({ data, loading: false, error: null }),
        error => {
          // Unmounted or re-run: nothing to report
          if (controller.signal.aborted) return
          console.error(`Failed to fetch ${path}:`, error)
          setState({ data: null, loading: false, error })
        }
      )

    return () => controller.abort()
  }, [path, attempt])

  const retry = () => {
    setState(current => ({ ...current, loading: true, error: null }))
    setAttempt(current => current + 1)
  }

  return { ...state, retry }
}
