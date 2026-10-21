import ProjectCard from "./ProjectCard"
import FetchStatus from "./FetchStatus"

export default function ProjectsContent({ request, iconColor }) {
  const projects = request.data ?? []

  return (
    <>
      <FetchStatus
        label="projects"
        loading={request.loading}
        error={request.error}
        onRetry={request.retry}
        isEmpty={projects.length === 0}
      />
      {projects.length > 0 && (
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} iconColor={iconColor} />
          ))}
        </div>
      )}
    </>
  )
}
