import { useEffect, useState } from "react";
import { fetchBlogPosts } from "../api";
import "../styles/blog.css";

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetchBlogPosts().then(setBlogPosts);
  }, []);

  return (
    <div className="blog-container">
      <h1>Our Blog</h1>
      {blogPosts.map((post) => (
        <div key={post._id} className="blog-post">
          <h2 className="blog-title">{post.title}</h2>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="blog-img" />}
          {post.videoUrl && (
            <div className="video-container">
              <video controls>
                <source src={post.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <p className="blog-content">{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Blog;
