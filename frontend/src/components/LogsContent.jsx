import useFetch from "../hooks/useFetch"
import FetchStatus from "./FetchStatus"

export default function LogsContent() {
  const request = useFetch("/entries")
  const entries = [...(request.data ?? [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  return (
    <>
      <div className="lol-heading">
        <span className="lol-square" aria-hidden="true"></span>
        <h3>My learning log</h3>
        <span className="lol-status">Under construction</span>
      </div>

      <FetchStatus
        label="log entries"
        loading={request.loading}
        error={request.error}
        onRetry={request.retry}
        isEmpty={entries.length === 0}
      />

      <div className="entry-list">
        {entries.map((entry) => {
          const shortDate = new Date(entry.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          })

          return (
            <article className="entry-card" key={entry._id}>
              <h2 className="entry-title">
                <span className="entry-square" aria-hidden="true"></span>
                {entry.title}
              </h2>
              <p className="entry-summary">{entry.summary}</p>
              <div className="entry-meta">
                <div className="entry-tags">
                  {entry.tags?.map(tag => (
                    <span className="entry-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <time className="entry-date" dateTime={entry.createdAt}>
                  {`Posted ${shortDate}`}
                </time>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
