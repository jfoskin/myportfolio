import SkillCard from "./SkillCard"

export default function SkillsContent({ skills, loading, error, iconColor }) {
  return (
    <>
      {loading && <p className="status-text">Loading...</p>}
      {error && <p className="status-text">Error: {error}</p>}
      <div className="skills-grid">
        {skills.map(skill => (
          <SkillCard key={skill._id} skill={skill} iconColor={iconColor} />
        ))}
      </div>
    </>
  )
}
