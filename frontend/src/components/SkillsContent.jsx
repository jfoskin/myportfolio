import SkillCard from "./SkillCard"
import FetchStatus from "./FetchStatus"

export default function SkillsContent({ request, iconColor }) {
  const skills = request.data ?? []

  return (
    <>
      <FetchStatus
        label="skills"
        loading={request.loading}
        error={request.error}
        onRetry={request.retry}
        isEmpty={skills.length === 0}
      />
      {skills.length > 0 && (
        <div className="skills-grid">
          {skills.map(skill => (
            <SkillCard key={skill._id} skill={skill} iconColor={iconColor} />
          ))}
        </div>
      )}
    </>
  )
}
