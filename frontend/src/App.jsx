import { useState, useEffect } from "react"
import Skills from "./components/Skills"


function App() {

const [skills,setSkills] = useState([])

useEffect(() => {
const getSkills = async () => {
  const skillsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/skills`)
  const skillsData = await skillsResponse.json()
  setSkills(skillsData)
}
getSkills()
},[])


  return (
    <>
      <h1>Hello World</h1>
      {skills.map(skill => (
        <Skills key={skill._id} skill={skill} />
      ))}
    </>
  )
}

export default App
