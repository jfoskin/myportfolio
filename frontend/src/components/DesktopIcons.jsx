import documentIcon from "../assets/about-id-icon.png"
import projectIcon from "../assets/projectId-icon.png"
import skillIcon from "../assets/skill-icon.png"
import logIcon from "../assets/refresh-icon.png"

// Desktop shortcuts for the modern theme, each opens its section in a modal.
// Use `image` for an imported asset, or `icon` for an emoji.
const shortcuts = [
  { key: "about", label: "About", image: documentIcon },
  { key: "projects", label: "Projects", image: projectIcon },
  { key: "skills", label: "Skills", image: skillIcon },
  { key: "logs", label: "Logs", image: logIcon },
  { key: "contact", label: "Contact", image: "✉️" },
]

export default function DesktopIcons({ onAboutClick, onProjectsClick, onSkillsClick, onContactClick, onLogsClick }) {
  const handlers = { about: onAboutClick, projects: onProjectsClick, skills: onSkillsClick, contact: onContactClick, logs: onLogsClick }

  return (
    <nav className="desktop-icons" aria-label="Desktop shortcuts">
      {shortcuts.map(({ key, label, icon, image }) => (
        <button key={key} type="button" className="desktop-icon" onClick={handlers[key]}>
          {image
            ? <img className="desktop-icon-image" src={image} alt="" />
            : <span className="desktop-icon-glyph" aria-hidden="true">{icon}</span>}
          <span className="desktop-icon-label">{label}</span>
        </button>
      ))}
    </nav>
  )
}
