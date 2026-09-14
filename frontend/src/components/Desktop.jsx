import { Link } from "react-router-dom"

// Placeholder icons mirroring the nav bar links, mac desktop style
const desktopIcons = [
  { key: "about", label: "About", icon: "🧑‍💻", href: "/#about" },
  { key: "projects", label: "Projects", icon: "💼", href: "/#projects" },
  { key: "skills", label: "Skills", icon: "🛠️", href: "/#skills" },
  { key: "logs", label: "Logs", icon: "📓", to: "/lol" },
  { key: "contact", label: "Contact", icon: "✉️", href: "/#contact" },
]

export default function Desktop() {
  return (
    <div className="desktop-icons">
      {desktopIcons.map(({ key, label, icon, href, to }) => {
        const content = (
          <>
            <span className="desktop-icon-glyph" aria-hidden="true">{icon}</span>
            <span className="desktop-icon-label">{label}</span>
          </>
        )

        return to ? (
          <Link key={key} to={to} className="desktop-icon">
            {content}
          </Link>
        ) : (
          <a key={key} href={href} className="desktop-icon">
            {content}
          </a>
        )
      })}
    </div>
  )
}
