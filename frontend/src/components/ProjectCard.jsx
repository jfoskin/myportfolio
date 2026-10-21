import placeholderImage from "../assets/windowsDesktop.png"
import { withIconColor } from "../utils/iconColor"

export default function ProjectCard({ project, iconColor }) {
  return (
    <div className="project-card">
        <img className="project-image" src={project.image || placeholderImage} alt={`${project.title} preview`} />
        <h4>{project.title}</h4>
        <p className="project-description">{project.description}</p>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer">
            <img src={withIconColor("https://img.icons8.com/?size=100&id=WCL5hPLvhUjQ&format=png", iconColor)} alt="github logo" />
            GitHub
          </a>
          <a href={project.url} target="_blank" rel="noreferrer">
            <img src={withIconColor("https://img.icons8.com/?size=100&id=9918&format=png", iconColor)} alt="live site logo" />
            Live Site
          </a>
        </div>
    </div>
  )
}
