import documentIcon from "../assets/document-icon.png"
import projectIcon from "../assets/project-icon.png"
import skillIcon from "../assets/level-icon.png"

// Static placeholder dock mirroring the nav bar links, mac desktop style.
// Use `image` for an imported asset, or `icon` for an emoji.
const dockItems = [
  { key: "about", label: "About", image: documentIcon },
  { key: "projects", label: "Projects", image: projectIcon },
  { key: "skills", label: "Skills", image: skillIcon },
  { key: "logs", label: "Logs", icon: "📓" },
  { key: "contact", label: "Contact", icon: "✉️" },
]

export default function Dock({ onAboutClick, onProjectsClick, onSkillsClick, onContactClick, onLogsClick }) {
  return (
    <div className="mac-dock">
      {dockItems.map(({ key, label, icon, image }) => {
        const content = image
          ? <img className="dock-icon-image" src={image} alt="" />
          : <span className="dock-icon-glyph" aria-hidden="true">{icon}</span>
        const onClick = { about: onAboutClick, projects: onProjectsClick, skills: onSkillsClick, contact: onContactClick, logs: onLogsClick }[key]

        return (
          <button
            key={key}
            type="button"
            className="dock-icon"
            aria-label={label}
            title={label}
            onClick={onClick}
          >
            {content}
          </button>
        )
      })}
    </div>
  )
}

