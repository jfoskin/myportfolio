export default function Projects({ project }) {
  return (
    <div>
        <h4>Title:{project.title}</h4>
        <img src="https://img.icons8.com/?size=100&id=WCL5hPLvhUjQ&format=png&color=f5f4ef" alt="github cat logo" />
        <p>github: {project.github}</p>
        <p>description: {project.description}</p>
        <img src="https://img.icons8.com/?size=100&id=9918&format=png&color=000000" alt="www logo" />
        <p>url: {project.url}</p>
    </div>
  )
}
