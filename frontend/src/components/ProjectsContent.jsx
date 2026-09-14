import Projects from "./Projects"

export default function ProjectsContent({ projects, loading, error }) {
  return (
    <>
      {loading && <p className="status-text">Loading...</p>}
      {error && <p className="status-text">Error: {error}</p>}
      <div className="projects-grid">
        {projects.map(project => (
          <Projects key={project._id} project={project} />
        ))}
      </div>
    </>
  )
}
