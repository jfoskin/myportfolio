// Static placeholder dock mirroring the nav bar links, mac desktop style
const dockItems = [
  { key: "about", label: "About", icon: "🧑‍💻" },
  { key: "projects", label: "Projects", icon: "💼" },
  { key: "skills", label: "Skills", icon: "🛠️" },
  { key: "logs", label: "Logs", icon: "📓" },
  { key: "contact", label: "Contact", icon: "✉️" },
]

export default function Dock({ onAboutClick, onProjectsClick, onSkillsClick, onContactClick, onLogsClick }) {
  return (
    <div className="mac-dock">
      {dockItems.map(({ key, label, icon }) => {
        const content = <span className="dock-icon-glyph" aria-hidden="true">{icon}</span>
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

