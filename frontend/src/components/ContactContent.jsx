export default function ContactContent() {
  return (
    <form className="email-compose">
      <div className="email-compose-header">
        <span>New Message</span>
      </div>

      <div className="email-field">
        <label htmlFor="contact-to">To:</label>
        <input id="contact-to" type="email" value="jf@myportfolio.dev" readOnly />
      </div>

      <div className="email-field">
        <label htmlFor="contact-from">From:</label>
        <input id="contact-from" type="email" placeholder="you@example.com" />
      </div>

      <div className="email-field">
        <label htmlFor="contact-subject">Subject:</label>
        <input id="contact-subject" type="text" placeholder="Let's build something" />
      </div>

      <textarea className="email-body" placeholder="Write your message..." rows={8}></textarea>

      <div className="email-compose-footer">
        <button type="submit">Send</button>
      </div>
    </form>
  )
}
