import { useState } from "react";
import axios from "axios";
import "../styles/Contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {

      alert("Please fill all fields.");

      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:8085/api/contact",
        formData
      );

      console.log(
        "Contact Response:",
        response.data
      );

      alert(
        "Your message has been sent successfully!"
      );

      // Clear form

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {

      console.error(
        "Contact Form Error:",
        error
      );

      alert(
        "Failed to send your message. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="contact-page">

      <h1>
        Contact Us
      </h1>

      <div className="contact-container">

        <div className="contact-info">

          <h2>
            Get In Touch
          </h2>

          <p>
            Email
          </p>

          <span>
            support@fixmycity.com
          </span>

          <p>
            Phone
          </p>

          <span>
            +91 9876543210
          </span>

          <p>
            Office
          </p>

          <span>
            Municipal Corporation Office
          </span>

        </div>


        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />


          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />


          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />


          <textarea
            name="message"
            rows="6"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
          />


          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Sending..."
              : "Send Message"}

          </button>

        </form>

      </div>

    </div>
  );
}

export default Contact;