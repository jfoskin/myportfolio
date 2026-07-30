function Skills({ skill }) {
  return (
    <div className="skill-card">
        <h4>{skill.name}</h4>
        <img src={skill.image} alt={skill.name} />
    </div>
  )
}

export default Skills