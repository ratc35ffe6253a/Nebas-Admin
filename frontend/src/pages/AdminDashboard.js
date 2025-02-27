import { useEffect, useState } from "react";
import { 
  fetchTestimonials, editTestimonial, deleteTestimonial, 
  fetchVolunteers, editVolunteer, deleteVolunteer,
  fetchBlogPosts, deleteBlogPost
} from "../api";

function AdminDashboard() {
  const [testimonials, setTestimonials] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  const [editTestimonialData, setEditTestimonialData] = useState(null);
  const [editVolunteerData, setEditVolunteerData] = useState(null);

  const [newPost, setNewPost] = useState({ title: "", content: "", imageUrl: "", videoUrl: "" });
  const [editPost, setEditPost] = useState(null);

  const token = localStorage.getItem("token");

  // Check if admin is logged in
  useEffect(() => {
    if (!token) {
        window.location.href = "/"; // Redirect to login if no token
    } else {
        fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    setTestimonials(await fetchTestimonials());
    setVolunteers(await fetchVolunteers());
    setBlogPosts(await fetchBlogPosts());
  };

  // ✅ Handle Blog Post Creation
  const handleCreatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    if (newPost.file) formData.append("file", newPost.file);

    await fetch(`${process.env.REACT_APP_API_URL}/blog`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    setNewPost({ title: "", content: "", file: null });
    fetchData();
  };

  // ✅ Handle Blog Post Editing
  const handleEditPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", editPost.title);
    formData.append("content", editPost.content);
    if (editPost.file) formData.append("file", editPost.file);

    await fetch(`${process.env.REACT_APP_API_URL}/blog/${editPost._id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    setEditPost(null);
    fetchData();
  };

  // ✅ Handle Blog Post Deletion
  const handleDeletePost = async (id) => {
    await deleteBlogPost(id, token);
    fetchData();
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

      {/* ✅ Blog Management Section */}
      <h2>Manage Blog Posts</h2>
      <form onSubmit={editPost ? handleEditPost : handleCreatePost}>
        <input 
          type="text" placeholder="Title" required 
          value={editPost ? editPost.title : newPost.title}
          onChange={(e) => editPost ? setEditPost({ ...editPost, title: e.target.value }) : setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea 
          placeholder="Content" required 
          value={editPost ? editPost.content : newPost.content}
          onChange={(e) => editPost ? setEditPost({ ...editPost, content: e.target.value }) : setNewPost({ ...newPost, content: e.target.value })}
        />
        <input 
          type="file" accept="image/*,video/*" 
          onChange={(e) => editPost ? setEditPost({ ...editPost, file: e.target.files[0] }) : setNewPost({ ...newPost, file: e.target.files[0] })}
        />
        <button type="submit">{editPost ? "Save Changes" : "Create Blog Post"}</button>
      </form>

      <ul>
        {blogPosts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="Post" width="100" />}
            {post.videoUrl && <a href={post.videoUrl} target="_blank" rel="noopener noreferrer">Watch Video</a>}
            <button onClick={() => setEditPost(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* ✅ Testimonials Management Section */}
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

      {/* ✅ Volunteers Management Section */}
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
