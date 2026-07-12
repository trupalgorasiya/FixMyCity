import '../styles/About.css'

function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <h1>About FixMyCity</h1>
        <p>
          Making cities smarter by connecting citizens with municipal
          authorities through one powerful complaint management platform.
        </p>
      </section>

      <section className="about-content">

        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to simplify the process of reporting civic issues
            while ensuring transparency, accountability, and faster resolution
            for every citizen.
          </p>
        </div>

        <div className="about-card">
          <h2>What We Do</h2>

          <ul>
            <li>Report road damage</li>
            <li>Street light complaints</li>
            <li>Garbage collection issues</li>
            <li>Water leakage</li>
            <li>Drainage problems</li>
            <li>Track complaint status</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Why Choose Us?</h2>

          <p>
            Citizens can report problems in just a few clicks while municipal
            administrators receive complaints instantly, assign departments,
            monitor progress, and provide transparent updates until the issue is
            resolved.
          </p>
        </div>

      </section>

    </div>
  );
}

export default About;