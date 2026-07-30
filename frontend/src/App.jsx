import { useState, useEffect } from "react"
import Skills from "./components/Skills"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import About from "./components/About"
import Contact from "./components/Contact"
import "./App.css"


function App() {

const [skills,setSkills] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
const getSkills = async () => {

    try {

      const skillsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/skills`)

      if (!skillsResponse.ok) throw new Error(`Failed to fetch skills: ${skillsResponse.status} ${skillsResponse.statusText}`)

      const skillsData = await skillsResponse.json()

      setSkills(skillsData)
      setLoading(false)

    }catch (error) {
      console.log(`Error while trying to get skills`, error)
      setError(error.message)
    }
 
  }
    getSkills()

},[])

  return (
    <div className="app">
    

      <header >
        <NavBar/>
      </header>

    
      <About/>

      <section className="panel skills-section">
        <h2>Skills</h2>
        {loading && <p className="status-text">Loading...</p>}
        {error && <p className="status-text">Error: {error}</p>}
        <div className="skills-grid">
          {skills.map(skill => (
            <Skills key={skill._id} skill={skill} />
          ))}
        </div>
      </section>
          
      <Contact/>
      <Footer />
    </div>
  )
}

export default App
