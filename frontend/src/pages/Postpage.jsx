import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import axios from "axios";
import "./PostPage.css";
import NavBar from "../components/navbar.jsx";

//For styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function PostPage() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem("user")); // logged-in user

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/home/${id}`);
        setPost(res.data);
      } catch (error) {
        console.log("Error in fetching post", error);
        navigate("/");
      }
    };

    fetchPost();
  }, [id, navigate]);

  async function handleGlide() {
    if (!currentUser) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    try {
      const res = await axios.put(`http://localhost:3001/home/${id}/glide`, {
        userId: currentUser._id,
      });
      setPost(res.data.paper); // update post with new glide count
    } catch (err) {
      console.error("Error toggling glide:", err);
    }
  }

  return (
    <>
      <NavBar />
      {post ? (
        <div className="post-container">
          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            {/* Author clickable link */}
            <Link to={`/profile/${post.author._id}`} className="post-author">
              -by {post.author.name}
            </Link>
            <span className="post-date">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2 className="post-subtitle">{post.subTitle}</h2>
          <p style={{ whiteSpace: "pre-line" }} className="post-content">
            {post.content}
          </p>

          {/* Glide Section */}
          <div className="glide-floating">
            <button
              className={`glide-button ${
                post.glideUsers?.includes(currentUser?._id) ? "active" : ""
              }`}
              onClick={handleGlide}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="plane-icon" />
              {post.glideUsers?.includes(currentUser?._id) ? " Fall" : " Glide"}
            </button>
            <span className="glide-count">{post.glide} Glides</span>
          </div>

        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </>
  );
}

export default PostPage;
