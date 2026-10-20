import aboutIcon from "../assets/about-id-icon.png"
import projectIcon from "../assets/projectId-icon.png"
import skillIcon from "../assets/skill-icon.png"
import logsIcon from "../assets/refresh-icon.png"
import contactIcon from "../assets/email-icon.png"

// Desktop shortcuts for the modern theme, each opens its section in a modal.
const shortcuts = [
  { key: "about", label: "About", image: aboutIcon },
  { key: "projects", label: "Projects", image: projectIcon },
  { key: "skills", label: "Skills", image: skillIcon },
  { key: "logs", label: "Logs", image: logsIcon },
  { key: "contact", label: "Contact", image: contactIcon },
]

export default function DesktopIcons({ onAboutClick, onProjectsClick, onSkillsClick, onContactClick, onLogsClick }) {
  const handlers = { about: onAboutClick, projects: onProjectsClick, skills: onSkillsClick, contact: onContactClick, logs: onLogsClick }

  return (
    <nav className="desktop-icons" aria-label="Desktop shortcuts">
      {shortcuts.map(({ key, label, image }) => (
        <button key={key} type="button" className="desktop-icon" onClick={handlers[key]}>
          <img className="desktop-icon-image" src={image} alt="" />
          <span className="desktop-icon-label">{label}</span>
        </button>
      ))}
    </nav>
  )
}
