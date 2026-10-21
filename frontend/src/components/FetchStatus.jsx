// Loading, error and empty states for data fetched from the backend.
// Renders nothing once there's data to show.
export default function FetchStatus({ label, loading, error, onRetry, isEmpty }) {
  if (loading) {
    return (
      <div className="fetch-status" role="status">
        <span className="fetch-spinner" aria-hidden="true" />
        <p>Loading {label}…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fetch-status fetch-status-error" role="alert">
        <p className="fetch-status-title">Couldn't load {label}</p>
        <p>Something went wrong reaching the server. Please try again in a moment.</p>
        <button type="button" className="fetch-retry" onClick={onRetry}>Try again</button>
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="fetch-status">
        <p>No {label} yet. Check back soon!</p>
      </div>
    )
  }

  return null
}
