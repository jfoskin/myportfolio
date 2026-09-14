import { Link } from "react-router-dom"

// Static placeholder dock mirroring the nav bar links, mac desktop style
const dockItems = [
  { key: "about", label: "About", icon: "🧑‍💻" },
  { key: "projects", label: "Projects", icon: "💼", href: "/#projects" },
  { key: "skills", label: "Skills", icon: "🛠️", href: "/#skills" },
  { key: "logs", label: "Logs", icon: "📓", to: "/lol" },
  { key: "contact", label: "Contact", icon: "✉️", href: "/#contact" },
]

export default function Dock({ onAboutClick }) {
  return (
    <div className="mac-dock">
      {dockItems.map(({ key, label, icon, href, to }) => {
        const content = <span className="dock-icon-glyph" aria-hidden="true">{icon}</span>

        if (key === "about") {
          return (
            <button
              key={key}
              type="button"
              className="dock-icon"
              aria-label={label}
              title={label}
              onClick={onAboutClick}
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

