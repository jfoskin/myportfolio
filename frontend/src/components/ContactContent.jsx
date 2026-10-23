import { useState } from "react"

const emptyForm = { name: "", email: "", reason: "", company: "", timeline: "", link: "", message: "" }

// Values must match the `reason` enum in backend/src/models/ContactModel.js.
// `optional` lists the extra fields shown for that reason (same list as the
// backend route), and `linkPlaceholder` describes what the link is for.
const reasons = [
  { value: "job", label: "Job opportunity", optional: ["company", "link"], linkPlaceholder: "Link to the job posting" },
  { value: "freelance", label: "Freelance project", optional: ["company", "timeline", "link"], linkPlaceholder: "Project site, if there is one" },
  { value: "collab", label: "Collaboration", optional: ["company", "link"], linkPlaceholder: "Link to the project" },
  { value: "hello", label: "Just saying hi", optional: [] },
]

export default function ContactContent() {
  const [form, setForm] = useState(emptyForm)
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [invalidFields, setInvalidFields] = useState([])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  const selectedReason = reasons.find(reason => reason.value === form.reason)
  const showsField = (name) => selectedReason?.optional.includes(name) ?? false

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Only send the optional fields that are showing for this reason
    const { name, email, reason, message } = form
    const payload = { name, email, reason, message }
    for (const field of selectedReason?.optional ?? []) {
      if (form[field].trim()) payload[field] = form[field].trim()
    }

    setStatus("sending")
    setErrorMessage("")
    setInvalidFields([])

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        setInvalidFields(data.fields ?? [])
        throw new Error(response.status === 400 && data.error
          ? data.error
          : "Something went wrong sending your message. Please try again in a moment.")
      }

      setForm(emptyForm)
      setStatus("sent")
    } catch (error) {
      console.error("Failed to send contact message:", error)
      setErrorMessage(error.name === "TimeoutError" || error.name === "TypeError"
        ? "Couldn't reach the server. Please try again in a moment."
        : error.message)
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="email-compose email-sent" role="status">
        <p className="email-sent-title">Message sent!</p>
        <p>Thanks for reaching out. I'll get back to you soon.</p>
        <button type="button" className="fetch-retry" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    )
  }

  const isSending = status === "sending"
  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: form[name],
    onChange: handleChange,
    disabled: isSending,
    "aria-invalid": invalidFields.includes(name) || undefined,
  })

  return (
    <form className="email-compose" onSubmit={handleSubmit}>
      <div className="email-compose-header">
        <span>New Message</span>
      </div>

      <div className="email-field">
        <label htmlFor="contact-name">Name:</label>
        <input {...fieldProps("name")} type="text" placeholder="Your name" maxLength={100} required autoComplete="name" />
      </div>

      <div className="email-field">
        <label htmlFor="contact-email">From:</label>
        <input {...fieldProps("email")} type="email" placeholder="you@example.com" required autoComplete="email" />
      </div>

      <div className="email-field">
        <label htmlFor="contact-reason">What's this about?</label>
        <select {...fieldProps("reason")} required>
          <option value="" disabled>Choose a reason…</option>
          {reasons.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {showsField("company") && (
        <div className="email-field">
          <label htmlFor="contact-company">Company:</label>
          <input {...fieldProps("company")} type="text" placeholder="Company or organization (optional)" maxLength={100} autoComplete="organization" />
        </div>
      )}

      {showsField("timeline") && (
        <div className="email-field">
          <label htmlFor="contact-timeline">Timeline / budget:</label>
          <input {...fieldProps("timeline")} type="text" placeholder="e.g. 6 weeks, $3–5k (optional)" maxLength={200} />
        </div>
      )}

      {showsField("link") && (
        <div className="email-field">
          <label htmlFor="contact-link">Link:</label>
          <input {...fieldProps("link")} type="url" placeholder={`${selectedReason.linkPlaceholder} (optional)`} maxLength={500} />
        </div>
      )}

      <label htmlFor="contact-message" className="visually-hidden">Message</label>
      <textarea
        {...fieldProps("message")}
        className="email-body"
        placeholder="Tell me about your project or role…"
        rows={8}
        maxLength={5000}
        required
      />

      {status === "error" && (
        <p className="email-error" role="alert">{errorMessage}</p>
      )}

      <div className="email-compose-footer">
        <button type="submit" disabled={isSending}>
          {isSending ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  )
}
