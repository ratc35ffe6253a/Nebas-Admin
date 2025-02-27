import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [testimonials, setTestimonials] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/"; // Redirect to login if no token
    } else {
        fetchData();
    }
  }, []);

  const fetchData = async () => {
    const testimonialRes = await axios.get("http://localhost:5000/api/testimonials");
    const volunteerRes = await axios.get("http://localhost:5000/api/volunteers");
    setTestimonials(testimonialRes.data);
    setVolunteers(volunteerRes.data);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }}>
        Logout
      </button>

      <h2>Testimonials</h2>
      <ul>
        {testimonials.map((t) => (
            <li key={t._id}>{t.name}: {t.message}</li>
        ))}
      </ul>

      <h2>Volunteers</h2>
      <ul>
        {volunteers.map((v) => (
            <li key={v._id}>{v.name} ({v.email}) - {v.skills}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
