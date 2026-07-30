import { useState, useEffect } from "react"
import Skills from "./components/Skills"


function App() {

const [skills,setSkills] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

useEffect(() => {
const getSkills = async () => {

    try {

      const skillsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/skills`)

      if (!skillsResponse.ok) throw new Error(`Failed to fetch skills: ${skillsResponse.status} ${skillsResponse.statusText}`)

      const skillsData = await skillsResponse.json()

      setSkills(skillsData)

    }catch (error) {
      console.log(`Error while trying to get skills`, error)
    }
 
  }
    getSkills()
},[])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <h1>Hello World</h1>
      {skills.map(skill => (
        <Skills key={skill._id} skill={skill} />
      ))}
    </>
  )
}

export default App
