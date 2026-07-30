
export default function Contact() {
  return (
    <section className="panel contact-section">
      <h2>Contact</h2>
      <form className="contact-form">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Message" rows={5}></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  )
}
