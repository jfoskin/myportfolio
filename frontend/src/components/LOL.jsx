import { useEffect, useState } from "react"


function LOL({ isModern }) {

    const [entries,setEntries] = useState([])
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const getEntries = async ()=>{
            try {
                const entryResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/entries`)

                 if (!entryResponse.ok) throw new Error(`Failed to fetch entries: ${entryResponse.status} ${entryResponse.statusText}`)

                const entriesData =  await entryResponse.json()

                setEntries(entriesData)
            } catch (error) {
                setError(error.message)
            }finally{
                setLoading(false)
            }

        
    }
    getEntries()
    },[])
    
  return (
    <main className="panel lol-section">
      <div className="lol-heading">
        <span className="lol-square" aria-hidden="true"></span>
        <h3>My learning log</h3>
        <span className="lol-status">Under construction</span>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="entry-list">
        {entries.map((entry, index) => (
          <article className="entry-card" key={entry._id}>
            <h2 className="entry-title">
              <span className="entry-square" aria-hidden="true"></span>
              <span className="entry-index">#{String(entries.length - index).padStart(3, "0")}</span>
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
                {isModern
                  ? `Posted ${new Date(entry.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}`
                  : new Date(entry.createdAt).toISOString()}
              </time>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default LOL