import axios from "axios";

const API_URL = "http://localhost:5001/api"; // Update if hosting changes

// Fetch testimonials
export const fetchTestimonials = async () => {
  const response = await axios.get(`${API_URL}/testimonials`);
  return response.data;
};

// Edit a testimonial
export const editTestimonial = async (id, name, message, token) => {
  const response = await axios.put(`${API_URL}/testimonials/${id}`, { name, message }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Delete a testimonial
export const deleteTestimonial = async (id, token) => {
  await axios.delete(`${API_URL}/testimonials/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Fetch volunteers
export const fetchVolunteers = async () => {
  const response = await axios.get(`${API_URL}/volunteers`);
  return response.data;
};

// Edit a volunteer application
export const editVolunteer = async (id, name, email, skills, token) => {
  const response = await axios.put(`${API_URL}/volunteers/${id}`, { name, email, skills }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Delete a volunteer application
export const deleteVolunteer = async (id, token) => {
  await axios.delete(`${API_URL}/volunteers/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Fetch blog posts
export const fetchBlogPosts = async () => {
  const response = await axios.get(`${API_URL}/blog`);
  return response.data;
};

// Create a blog post
export const createBlogPost = async (title, content, imageUrl, videoUrl, token) => {
  const response = await axios.post(`${API_URL}/blog`, { title, content, imageUrl, videoUrl }, {
      headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Edit a blog post
export const editBlogPost = async (id, title, content, imageUrl, videoUrl, token) => {
  const response = await axios.put(`${API_URL}/blog/${id}`, { title, content, imageUrl, videoUrl }, {
      headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Delete a blog post
export const deleteBlogPost = async (id, token) => {
  await axios.delete(`${API_URL}/blog/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
  });
};

