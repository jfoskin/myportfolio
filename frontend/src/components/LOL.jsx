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
        <h3>Learning out loud</h3>
       {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {entries.map(entry => (
        <article key={entry._id}>
          <h2>{entry.title}</h2>
          <p>{entry.summary}</p>
          <p>
            {isModern
              ? new Date(entry.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })
              : new Date(entry.createdAt).toISOString()}
          </p>
        </article>
      ))}
    </main>
  )
}

export default LOL