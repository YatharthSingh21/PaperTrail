import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./Sidebar.css";

const topArticleImg =
  "https://tse3.mm.bing.net/th/id/OIP.YBSexRNJNdNJ5V8eSS3ZDgHaDt?r=0&cb=ucfimg2&pid=Api&ucfimg=1";

function Sidebar({ onTagSelect, selectedTag }) {
  const [topArticle, setTopArticle] = useState(null);

  const availableTags = [
    "Technology", "Science", "AI", "Crypto", "Education",
    "Philosophy", "Statistics", "Spirituality", "Mathematics",
    "Gaming", "Sports", "Politics", "Food", "Lifestyle",
    "Fashion", "Television", "Art", "Literature"
  ];

  useEffect(() => {
    const fetchTopArticle = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/home?sortBy=glide&order=-1&limit=1"
        );
        if (res.data.papers && res.data.papers.length > 0) {
          setTopArticle(res.data.papers[0]);
        }
      } catch (err) {
        console.error("Error fetching top article:", err);
      }
    };
    fetchTopArticle();
  }, []);

  // ✅ Toggle logic: clicking again clears the tag
  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      onTagSelect(null); // clear tag
    } else {
      onTagSelect(tag); // set new tag
    }
  };

  return (
    <div className="sidebar-Container">
      <div className="topArticle">
        <h1>Top Article of the Week</h1>
        {topArticle ? (
          <Link to={`/post/${topArticle._id}`} className="topArticle-link">
            <img src={topArticleImg} alt="top-article" />
            <p className="topArticle-title">{topArticle.title}</p>
            <p className="topArticle-author">
              - {topArticle.author?.name || "Anonymous"}
            </p>
          </Link>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="tag-section">
        <p>Search By Tag</p>
        <div className="tags-grid">
          {availableTags.map((tag) => (
            <button
              key={tag}
              className={`tag-btn ${selectedTag === tag ? "active" : ""}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
