function Skills({ skill }) {
  return (
    <div className="skill-card">
        <p>{skill.name}</p>
        <img src={skill.image} alt={skill.name} />
    </div>
  )
}

export default Skills