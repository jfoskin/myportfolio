import { useEffect, useState } from "react"


function LOL() {

    const [entries,setEntries] = useState([])
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const getEntries = async ()=>{
            try {
                const entryResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/entries`)

                 if (!entryResponse.ok) throw new Error(`Failed to fetch entries: ${entryResponse.status} ${entryResponse.statusText}`)

                const entriesData =  entryResponse.json()

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
        <div id='thoughts'></div>

        <>
        <article className="entries">
          
            <h4 className="entryTitle">Working on Portfolio</h4>
            <p className="entryDate">2026-08-21</p>
            <p className='entryBlurb'> started looking into how I was going to structure my learning in my porfotlio section</p>
            <p className='entryTags' > node, MongoDB</p>


        </article>
        </>
    </main>
  )
}

export default LOL