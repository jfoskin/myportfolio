import Skills from "./Skills"

export default function SkillsContent({ skills, loading, error }) {
  return (
    <>
      {loading && <p className="status-text">Loading...</p>}
      {error && <p className="status-text">Error: {error}</p>}
      <div className="skills-grid">
        {skills.map(skill => (
          <Skills key={skill._id} skill={skill} />
        ))}
      </div>
    </>
  )
}
