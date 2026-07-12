import '../styles/Contact.css'

function Contact() {
  return (
    <div className="contact-page">

      <h1>Contact Us</h1>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Get In Touch</h2>

          <p>Email</p>
          <span>support@fixmycity.com</span>

          <p>Phone</p>
          <span>+91 9876543210</span>

          <p>Office</p>
          <span>Municipal Corporation Office</span>

        </div>

        <form className="contact-form">

          <input type="text" placeholder="Full Name" />

          <input type="email" placeholder="Email Address" />

          <input type="text" placeholder="Subject" />

          <textarea
            rows="6"
            placeholder="Write your message..."
          />

          <button>Send Message</button>

        </form>

      </div>

    </div>
  );
}

export default Contact;