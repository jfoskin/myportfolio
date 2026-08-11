
export default function Contact() {
  return (
    <div id="contact" className="contact-layout">
    <section className="panel contact-section"> 

      <h2>Let's Build Something </h2> 
      <img src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHB6aHJkNG15bGt1djhhbjB6b242YmxmcDBqY2plbjllNXhhbm45dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TdF2rSnG3Gd6spXPA9/giphy.gif' width='50' height='50' />

      <p>Everyone has the potiential to have the things they want to see in teh world become a reality. I would love to help develop software that brings your vision to life. Let's work together to bring new resources and tools in the world </p>

    </section>
    <section className="panel contact-section">
      <h2>Contact</h2>
      <form className="contact-form">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Message" rows={5}></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
    </div>
  )
}
