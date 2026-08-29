import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const emptyForm = { title: "", github: "", description: "", url: "", image: "" }

export default function AdminDashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const navigate = useNavigate()

  const token = localStorage.getItem("adminToken")

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }

  const loadProjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`)
      if (!response.ok) throw new Error("Failed to load projects")
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/")
      return
    }
    loadProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    navigate("/")
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)

    try {
      const url = editingId
        ? `${import.meta.env.VITE_BACKEND_URL}/mgmt/projects/${editingId}`
        : `${import.meta.env.VITE_BACKEND_URL}/mgmt/projects`
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error(`Failed to ${editingId ? "update" : "create"} project`)

      resetForm()
      await loadProjects()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (project) => {
    setEditingId(project._id)
    setForm({
      title: project.title || "",
      github: project.github || "",
      description: project.description || "",
      url: project.url || "",
      image: project.image || "",
    })
  }

  const handleDelete = async (id) => {
    setError(null)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mgmt/projects/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      })
      if (!response.ok) throw new Error("Failed to delete project")
      if (editingId === id) resetForm()
      await loadProjects()
    } catch (err) {
      setError(err.message)
    }
  }

  if (!token) return null

  return (
    <section className="panel admin-dashboard">
      <div className="admin-dashboard-header">
        <h2>Admin Dashboard</h2>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>

      {error && <p className="status-text">{error}</p>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Project" : "New Project"}</h3>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="github" placeholder="GitHub URL" value={form.github} onChange={handleChange} required />
        <input name="url" placeholder="Live Site URL" value={form.url} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <textarea name="description" placeholder="Description" rows={4} value={form.description} onChange={handleChange} />
        <div className="admin-form-actions">
          {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
          <button type="submit">{editingId ? "Save Changes" : "Create Project"}</button>
        </div>
      </form>

      {loading && <p className="status-text">Loading...</p>}

      <div className="admin-list">
        {projects.map(project => (
          <div className="admin-list-item" key={project._id}>
            <div>
              <h4>{project.title}</h4>
              <p className="project-description">{project.description}</p>
            </div>
            <div className="admin-list-actions">
              <button type="button" onClick={() => handleEdit(project)}>Edit</button>
              <button type="button" onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
