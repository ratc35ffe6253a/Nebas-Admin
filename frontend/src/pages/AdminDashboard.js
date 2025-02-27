import { useEffect, useState } from "react";
import { fetchTestimonials, editTestimonial, deleteTestimonial, fetchVolunteers, editVolunteer, deleteVolunteer } from "../api";
import { fetchBlogPosts, createBlogPost, editBlogPost, deleteBlogPost } from "../api";

function AdminDashboard() {
  const [testimonials, setTestimonials] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [editTestimonialData, setEditTestimonialData] = useState(null);
  const [editVolunteerData, setEditVolunteerData] = useState(null);
  const token = localStorage.getItem("token");

  // Check if admin is logged in
  useEffect(() => {
    if (!token) {
        window.location.href = "/"; // Redirect to login if no token
    } else {
        fetchData();
    }
  }, []);

  const fetchData = async () => {
    setTestimonials(await fetchTestimonials());
    setVolunteers(await fetchVolunteers());
  };

  const handleEditTestimonial = async (e) => {
    e.preventDefault();
    await editTestimonial(editTestimonialData._id, editTestimonialData.name, editTestimonialData.message, token);
    setEditTestimonialData(null);
    fetchData();
  }

  const handleDeleteTestimonial = async (id) => {
    await deleteTestimonial(id, token);
    fetchData();
  };

  const handleEditVolunteer = async (e) => {
    e.preventDefault();
    await editVolunteer(editVolunteerData._id, editVolunteerData.name, editVolunteerData.email, editVolunteerData.skills, token);
    setEditVolunteerData(null);
    fetchData();
  }
  const handdleDeleteVolunteer = async (id) => {
    await deleteVolunteer(id, token);
    fetchData();
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
            <li key={t._id}>
              {t.name}: {t.message}
              <button onClick={() => setEditTestimonialData(t)}>Edit</button>
              <button onClick={() => handleDeleteTestimonial(t._id, token).then(fetchData)}>Delete</button>
          </li>
        ))}
      </ul>

      {editTestimonialData && (
        <form onSubmit={handleEditTestimonial}>
          <h3>Edit Testimonials</h3>
          <input
            type="text"
            value={editTestimonialData.name}
            onChange={(e) => setEditTestimonialData({ ...editTestimonialData, name: e.target.value })} required
          />
          <textarea
            value={editTestimonialData.message}
            onChange={(e) => setEditTestimonialData({ ...editTestimonialData, message: e.target.value })} required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditTestimonialData(null)}>Cancel</button>
        </form>
      )}

      <h2>Volunteers</h2>
      <ul>
        {volunteers.map((v) => (
          <li key={v._id}>
            {v.name} ({v.email}) - {v.skills}
            <button onClick={() => setEditVolunteerData(v)}>Edit</button>
            <button onClick={() => handdleDeleteVolunteer(v._id, token).then(fetchData)}>Delete</button>
          </li>
        ))}
      </ul>

      {editVolunteerData && (
        <form onSubmit={handleEditVolunteer}>
          <h3>Edit Volunteer</h3>
          <input type="text" value={editVolunteerData.name} onChange={(e) => setEditVolunteerData({ ...editVolunteerData, name: e.target.value })} required />
          <input type="email" value={editVolunteerData.email} onChange={(e) => setEditVolunteerData({ ...editVolunteerData, email: e.target.value })} required />
          <textarea value={editVolunteerData.skills} onChange={(e) => setEditVolunteerData({ ...editVolunteerData, skills: e.target.value })} required />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditVolunteerData(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default AdminDashboard;
