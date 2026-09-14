import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import About from "./components/About"
import Contact from "./components/Contact" 
import LOL from "./components/LOL"
import AdminDashboard from "./components/AdminDashboard"
import AdminLogin from "./components/AdminLogin"
import Desktop from "./components/Desktop"
import MenuBar from "./components/MenuBar"
import Dock from "./components/Dock"
import Modal from "./components/Modal"
import AboutContent from "./components/AboutContent"
import ProjectsContent from "./components/ProjectsContent"
import SkillsContent from "./components/SkillsContent"
import ContactContent from "./components/ContactContent"
import "./App.css"


function App() {

const [skills,setSkills] = useState([])
const [projects,setProjects] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const [isModern, setIsModern] = useState(false)
const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false)
const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false)
const [isContactModalOpen, setIsContactModalOpen] = useState(false)

useEffect(() => {
  document.documentElement.dataset.theme = isModern ? "modern" : "retro"
}, [isModern])

// Ctrl/Cmd + Shift + L opens the hidden admin login modal
useEffect(() => {
  const handleKeyDown = (event) => {
    const modifierKey = event.ctrlKey || event.metaKey
    if (modifierKey && event.shiftKey && event.key.toLowerCase() === "l") {
      event.preventDefault()
      setIsAdminLoginOpen(true)
    }
  }

  document.addEventListener("keydown", handleKeyDown)
  return () => document.removeEventListener("keydown", handleKeyDown)
}, [])

useEffect(() => {
  const getProjects = async () => {
    try {
      const projectsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`)
      if (!projectsResponse.ok) throw new Error(`Failed to fetch projects: ${projectsResponse.status} ${projectsResponse.statusText}`)
        const projectsData = await projectsResponse.json()
      setProjects(projectsData)
      setLoading(false)
    } catch (error) {
      console.log(`Error while trying to get projects`, error)
      setError(error.message)
    }
  }
  
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

  

  getProjects()
  getSkills()
 


},[])

  return (
    <>
      {isModern && <MenuBar />}

      <div className="app">
        <header >
          <NavBar
            isModern={isModern}
            onThemeToggle={() => setIsModern(currentTheme => !currentTheme)}
          />
        </header>

      <Routes>
        <Route path="/" element={
          <>
            {isModern && <Desktop />}
            {!isModern && <About/>}

            {!isModern && (
              <section id="projects" className="panel projects-section">
                <h2>Projects</h2>
                <ProjectsContent projects={projects} loading={loading} error={error} />
              </section>
            )}

            {!isModern && (
              <section id="skills" className="panel skills-section">
                <h2>Skills</h2>
                <SkillsContent skills={skills} loading={loading} error={error} />
              </section>
            )}

         

            {!isModern && <Contact/>}
          </>
        } />
        <Route path="/lol" element={<LOL isModern={isModern} />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <AdminLogin isOpen={isAdminLoginOpen} onClose={() => setIsAdminLoginOpen(false)} />
      <Footer />
      {isModern && <Dock onAboutClick={() => setIsAboutModalOpen(true)} onProjectsClick={() => setIsProjectsModalOpen(true)} onSkillsClick={() => setIsSkillsModalOpen(true)} onContactClick={() => setIsContactModalOpen(true)} />}
      {isModern && (
        <Modal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} title="About">
          <AboutContent />
        </Modal>
      )}
      {isModern && (
        <Modal isOpen={isProjectsModalOpen} onClose={() => setIsProjectsModalOpen(false)} title="Projects">
          <ProjectsContent projects={projects} loading={loading} error={error} />
        </Modal>
      )}
      {isModern && (
        <Modal isOpen={isSkillsModalOpen} onClose={() => setIsSkillsModalOpen(false)} title="Skills">
          <SkillsContent skills={skills} loading={loading} error={error} />
        </Modal>
      )}
      {isModern && (
        <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Contact">
          <ContactContent />
        </Modal>
      )}
      </div>
    </>
  )
}

export default App
