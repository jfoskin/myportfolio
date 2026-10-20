import ProjectCard from "./ProjectCard"

export default function ProjectsContent({ projects, loading, error }) {
  return (
    <>
      {loading && <p className="status-text">Loading...</p>}
      {error && <p className="status-text">Error: {error}</p>}
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </>
  )
}
