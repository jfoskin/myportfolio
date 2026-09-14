import { Link } from "react-router-dom"

// Static placeholder dock mirroring the nav bar links, mac desktop style
const dockItems = [
  { key: "about", label: "About", icon: "🧑‍💻" },
  { key: "projects", label: "Projects", icon: "💼" },
  { key: "skills", label: "Skills", icon: "🛠️" },
  { key: "logs", label: "Logs", icon: "📓", to: "/lol" },
  { key: "contact", label: "Contact", icon: "✉️" },
]

export default function Dock({ onAboutClick, onProjectsClick, onSkillsClick, onContactClick }) {
  return (
    <div className="mac-dock">
      {dockItems.map(({ key, label, icon, href, to }) => {
        const content = <span className="dock-icon-glyph" aria-hidden="true">{icon}</span>

        if (key === "about" || key === "projects" || key === "skills" || key === "contact") {
          const onClick = { about: onAboutClick, projects: onProjectsClick, skills: onSkillsClick, contact: onContactClick }[key]

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
        }

        return to ? (
          <Link key={key} to={to} className="dock-icon" aria-label={label} title={label}>
            {content}
          </Link>
        ) : (
          <a key={key} href={href} className="dock-icon" aria-label={label} title={label}>
            {content}
          </a>
        )
      })}
    </div>
  )
}

