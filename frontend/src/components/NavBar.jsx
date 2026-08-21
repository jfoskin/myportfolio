import { Link } from "react-router-dom"

export default function NavBar({ isModern, onThemeToggle }) {
  return (
   <nav className="panel nav-panel">
        
        <Link to="/" aria-label="Home">
          <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXJ6dGt6cnZvaWd5N3BmamFyNWUxNnh5aDIwNWVoN2NwM21zZjg2NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rzcYzbp8BZmwWTUPFa/giphy.gif" alt="" className='homeLogo' />
        </Link>

        <p><a href="/#about">About</a></p>
        <p><a href="/#projects">Projects</a></p>
        <p><a href="/#skills">Skills</a></p>
        <p><Link to="/lol">Logs</Link></p>
        <p><a href="/#contact">Contact</a></p>

      <button
        className="theme-toggle"
        type="button"
        onClick={onThemeToggle}
        aria-pressed={isModern}
      >
        {isModern ? "Retro" : "Modern"}
      </button>
     
      </nav>
  )
}
