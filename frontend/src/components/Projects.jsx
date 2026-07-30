export default function Projects({ project }) {
  return (
    <div className="project-card">
        <h4>{project.title}</h4>
        <p className="project-description">{project.description}</p>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/?size=100&id=WCL5hPLvhUjQ&format=png&color=f5f4ef" alt="github logo" />
            GitHub
          </a>
          <a href={project.url} target="_blank" rel="noreferrer">
            <img src="https://img.icons8.com/?size=100&id=9918&format=png&color=000000" alt="live site logo" />
            Live Site
          </a>
        </div>
    </div>
  )
}
