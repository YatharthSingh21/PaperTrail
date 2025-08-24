import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import "./PostPage.css";
import NavBar from "../components/navbar.jsx";

function PostPage() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/home/${id}`);
        setPost(res.data);
      } catch (error) {
        console.log("Error in fetching post", error);
        navigate("/"); 
      }
    };

    fetchNote();
  }, [id, navigate]);

  return (
    <>
      <NavBar />
      {post ? (
        <div className="post-container">
        <h1 className="post-title">{post.title}</h1>

        <div className="post-meta">
            <span className="post-author">{post.author}</span>
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
        <p className="post-content">{post.content}</p>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </>
  );
}

export default PostPage;
