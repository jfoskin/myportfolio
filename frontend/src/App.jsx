import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import Contact from "./components/Contact" 
import LOL from "./components/LOL"
import AdminDashboard from "./components/AdminDashboard"
import AdminLogin from "./components/AdminLogin"
import MenuBar from "./components/MenuBar"
import DesktopIcons from "./components/DesktopIcons"
import Modal from "./components/Modal"
import AboutContent from "./components/AboutContent"
import ProjectsContent from "./components/ProjectsContent"
import SkillsContent from "./components/SkillsContent"
import ContactContent from "./components/ContactContent"
import LogsContent from "./components/LogsContent"
import { ICON_COLORS } from "./utils/iconColor"
import useFetch from "./hooks/useFetch"
import "./App.css"


function App() {

const projectsRequest = useFetch("/projects")
const skillsRequest = useFetch("/skills")
const [isModern, setIsModern] = useState(true)
const [isDark, setIsDark] = useState(true)
const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false)
const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false)
const [isContactModalOpen, setIsContactModalOpen] = useState(false)
const [isLogsModalOpen, setIsLogsModalOpen] = useState(false)

// Menu bar title follows the open window, like the active app name on macOS
const menuBarTitle =
  (isAboutModalOpen && "About") ||
  (isProjectsModalOpen && "Projects") ||
  (isSkillsModalOpen && "Skills") ||
  (isContactModalOpen && "Contact") ||
  (isLogsModalOpen && "Logs") ||
  "Portfolio"

const iconColor = !isModern ? ICON_COLORS.retro : isDark ? ICON_COLORS.dark : ICON_COLORS.light

useEffect(() => {
  document.documentElement.dataset.theme = isModern ? "modern" : "retro"
}, [isModern])

useEffect(() => {
  document.documentElement.dataset.mode = isDark ? "dark" : "light"
}, [isDark])

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

  return (
    <>
      {isModern && <MenuBar title={menuBarTitle} isModern={isModern}onThemeToggle={() => setIsModern(currentTheme => !currentTheme)} isDark={isDark} onModeToggle={() => setIsDark(currentMode => !currentMode)} />}

      <div className="app">
        {!isModern && (
          <header >
            <NavBar
              isModern={isModern}
              onThemeToggle={() => setIsModern(currentTheme => !currentTheme)}
            />
          </header>
        )}

      <Routes>
        <Route path="/" element={
          <>
            {!isModern && (
              <section id="about" className="panel about-section">
                <h2>About</h2>
                <AboutContent />
              </section>
            )}

            {!isModern && (
              <section id="projects" className="panel projects-section">
                <h2>Projects</h2>
                <ProjectsContent request={projectsRequest} iconColor={iconColor} />
              </section>
            )}

            {!isModern && (
              <section id="skills" className="panel skills-section">
                <h2>Skills</h2>
                <SkillsContent request={skillsRequest} iconColor={iconColor} />
              </section>
            )}

         

            {!isModern && <Contact/>}
          </>
        } />
        <Route path="/lol" element={<LOL isModern={isModern} />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <AdminLogin isOpen={isAdminLoginOpen} onClose={() => setIsAdminLoginOpen(false)} />
      {!isModern && <Footer />}
      {isModern && <DesktopIcons onAboutClick={() => setIsAboutModalOpen(true)} onProjectsClick={() => setIsProjectsModalOpen(true)} onSkillsClick={() => setIsSkillsModalOpen(true)} onContactClick={() => setIsContactModalOpen(true)} onLogsClick={() => setIsLogsModalOpen(true)} />}
      {isModern && (
        <Modal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} title="About" className="about-modal">
          <AboutContent />
        </Modal>
      )}
      {isModern && (
        <Modal isOpen={isProjectsModalOpen} onClose={() => setIsProjectsModalOpen(false)} title="Projects">
          <ProjectsContent request={projectsRequest} iconColor={iconColor} />
        </Modal>
      )}
      {isModern && (
        <Modal isOpen={isSkillsModalOpen} onClose={() => setIsSkillsModalOpen(false)} title="Skills">
          <SkillsContent request={skillsRequest} iconColor={iconColor} />
        </Modal>
      )}
      {isModern && (
        <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Contact">
          <ContactContent />
        </Modal>
      )}
      {isModern && (
        <Modal isOpen={isLogsModalOpen} onClose={() => setIsLogsModalOpen(false)} title="Logs">
          <LogsContent />
        </Modal>
      )}
      </div>
    </>
  )
}

export default App
