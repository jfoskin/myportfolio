function Skills({ skill }) {
  return (
    <div>
        <h4>Skills</h4>
        <p>Name: {skill.name}</p>
        <img src={skill.image} alt={skill.name} />
    </div>
  )
}

export default Skills