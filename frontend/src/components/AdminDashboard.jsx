import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const emptyForm = { title: "", github: "", description: "", url: "", image: "" }
const emptyEntryForm = { title: "", summary: "", tags: "" }

export default function AdminDashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const [entries, setEntries] = useState([])
  const [entriesLoading, setEntriesLoading] = useState(true)
  const [entryError, setEntryError] = useState(null)
  const [entryForm, setEntryForm] = useState(emptyEntryForm)
  const [editingEntryId, setEditingEntryId] = useState(null)

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

  const loadEntries = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/entries`)
      if (!response.ok) throw new Error("Failed to load entries")
      const data = await response.json()
      setEntries(data)
    } catch (err) {
      setEntryError(err.message)
    } finally {
      setEntriesLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/")
      return
    }
    loadProjects()
    loadEntries()
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

  const handleEntryChange = (event) => {
    const { name, value } = event.target
    setEntryForm(current => ({ ...current, [name]: value }))
  }

  const resetEntryForm = () => {
    setEntryForm(emptyEntryForm)
    setEditingEntryId(null)
  }

  const handleEntrySubmit = async (event) => {
    event.preventDefault()
    setEntryError(null)

    const payload = {
      title: entryForm.title,
      summary: entryForm.summary,
      tags: entryForm.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean),
    }

    try {
      const url = editingEntryId
        ? `${import.meta.env.VITE_BACKEND_URL}/mgmt/entries/${editingEntryId}`
        : `${import.meta.env.VITE_BACKEND_URL}/mgmt/entries`
      const method = editingEntryId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error(`Failed to ${editingEntryId ? "update" : "create"} entry`)

      resetEntryForm()
      await loadEntries()
    } catch (err) {
      setEntryError(err.message)
    }
  }

  const handleEntryEdit = (entry) => {
    setEditingEntryId(entry._id)
    setEntryForm({
      title: entry.title || "",
      summary: entry.summary || "",
      tags: (entry.tags || []).join(", "),
    })
  }

  const handleEntryDelete = async (id) => {
    setEntryError(null)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mgmt/entries/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      })
      if (!response.ok) throw new Error("Failed to delete entry")
      if (editingEntryId === id) resetEntryForm()
      await loadEntries()
    } catch (err) {
      setEntryError(err.message)
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

      <hr className="admin-divider" />

      {entryError && <p className="status-text">{entryError}</p>}

      <form className="admin-form" onSubmit={handleEntrySubmit}>
        <h3>{editingEntryId ? "Edit Log Entry" : "New Log Entry"}</h3>
        <input name="title" placeholder="Title" value={entryForm.title} onChange={handleEntryChange} required />
        <textarea name="summary" placeholder="Summary" rows={4} value={entryForm.summary} onChange={handleEntryChange} />
        <input name="tags" placeholder="Tags (comma separated)" value={entryForm.tags} onChange={handleEntryChange} />
        <div className="admin-form-actions">
          {editingEntryId && <button type="button" onClick={resetEntryForm}>Cancel</button>}
          <button type="submit">{editingEntryId ? "Save Changes" : "Add Entry"}</button>
        </div>
      </form>

      {entriesLoading && <p className="status-text">Loading...</p>}

      <div className="admin-list">
        {entries.map(entry => (
          <div className="admin-list-item" key={entry._id}>
            <div>
              <h4>{entry.title}</h4>
              <p className="project-description">{entry.summary}</p>
            </div>
            <div className="admin-list-actions">
              <button type="button" onClick={() => handleEntryEdit(entry)}>Edit</button>
              <button type="button" onClick={() => handleEntryDelete(entry._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
