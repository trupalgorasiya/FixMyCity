import { Link } from "react-router-dom";
import "../styles/Home.css";
// import heroBanner from "../assets/hero-banner.jpg";
// import roadRepair from "../assets/road-repair.jpg";
// import garbage from "../assets/garbage.jpg";
// import park from "../assets/park.jpg";

function Home() {
  return (
    <div className="home">

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <h1>FixMyCity</h1>

          <h2>Building Smarter Cities Together</h2>

          <p>
            Report civic issues like potholes, garbage, street lights,
            water leakage, drainage problems and track their resolution
            in real time.
          </p>

          <div className="hero-buttons">
           <Link to="/com"><button className="primary-btn">
              Report Complaint
            </button></Link> 

            <Link to="tracking"><button className="secondary-btn">
              Track Complaint
            </button></Link>
          </div>

        </div>
      </section>

      {/* ================= COUNTERS ================= */}

      <section className="counter-section">

        <div className="counter-card">
          <h1>2,580+</h1>
          <p>Total Complaints</p>
        </div>

        <div className="counter-card">
          <h1>2,210+</h1>
          <p>Resolved</p>
        </div>

        <div className="counter-card">
          <h1>265</h1>
          <p>In Progress</p>
        </div>

        <div className="counter-card">
          <h1>105</h1>
          <p>Pending</p>
        </div>

      </section>

      {/* ================= SERVICES ================= */}

      <section className="services">

        <h2>Our Services</h2>

        <div className="service-grid">

          <div className="service-card">
            🚧
            <h3>Road Damage</h3>
          </div>

          <div className="service-card">
            💡
            <h3>Street Lights</h3>
          </div>

          <div className="service-card">
            🚮
            <h3>Garbage</h3>
          </div>

          <div className="service-card">
            💧
            <h3>Water Leakage</h3>
          </div>

          <div className="service-card">
            🌳
            <h3>Parks</h3>
          </div>

          <div className="service-card">
            🚰
            <h3>Drainage</h3>
          </div>

        </div>

      </section>

      {/* ================= NEWS ================= */}

      <section className="news">

        <h2>Latest News</h2>

        <div className="news-grid">

          <div className="news-card">
            <img src="https://picsum.photos/400/220?1" alt="" />
            <h3>Road Repair Started</h3>
            <p>
              Major road repair work has started across the city.
            </p>
          </div>

          <div className="news-card">
            <img src="https://picsum.photos/400/220?2" alt="" />
            <h3>New Garbage Vehicles</h3>
            <p>
              Municipal corporation launched smart waste collection.
            </p>
          </div>

          <div className="news-card">
            <img src="https://picsum.photos/400/220?3" alt="" />
            <h3>Park Renovation</h3>
            <p>
              Five public parks are under renovation this month.
            </p>
          </div>

        </div>

      </section>

      {/* ================= ANNOUNCEMENTS ================= */}

      <section className="announcement">

        <h2>Announcements</h2>

        <div className="announcement-box">

          <p>📢 Water supply maintenance on 10 July (9 AM - 3 PM)</p>

          <p>📢 Heavy rainfall alert for low-lying areas.</p>

          <p>📢 Independence Day city cleaning drive.</p>

        </div>

      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="steps">

        <h2>How It Works</h2>

        <div className="step-grid">

          <div className="step-card">
            <h1>1</h1>
            <p>Register</p>
          </div>

          <div className="step-card">
            <h1>2</h1>
            <p>Report Complaint</p>
          </div>

          <div className="step-card">
            <h1>3</h1>
            <p>Track Progress</p>
          </div>

          <div className="step-card">
            <h1>4</h1>
            <p>Issue Resolved</p>
          </div>

        </div>

      </section>

      {/* ================= TESTIMONIAL ================= */}

      <section className="testimonial">

        <h2>Citizen Feedback</h2>

        <div className="testimonial-card">

          <h3>⭐⭐⭐⭐⭐</h3>

          <p>
            My street light complaint was resolved within 24 hours.
            Excellent service.
          </p>

          <strong>- Rahul Patel</strong>

        </div>

      </section>

      {/* ================= EMERGENCY ================= */}

      <section className="emergency">

        <h2>Emergency Contacts</h2>

        <div className="emergency-grid">

          <div>🚓 Police<br />100</div>

          <div>🚑 Ambulance<br />108</div>

          <div>🔥 Fire<br />101</div>

          <div>🏢 Municipal<br />155303</div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      

    </div>
  );
}

export default Home;