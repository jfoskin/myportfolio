import { withIconColor } from "../utils/iconColor"

function SkillCard({ skill, iconColor }) {
  return (
    <div className="skill-card">
        <p>{skill.name}</p>
        <img src={withIconColor(skill.image, iconColor)} alt={skill.name} />
    </div>
  )
}

export default SkillCard