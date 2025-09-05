import { useState, useEffect } from "react";
import { useLocation } from "react-router"; // ✅ for query params
import NavBar from "../components/navbar.jsx";
import Feed from "../components/feed.jsx";
import axios from "axios";
import Sidebar from "../components/sidebar.jsx";
import API_BASE_URL from "../config/config.js";
import "./Home.css";

function Homepage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search"); // ✅ read ?search=term

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = `${API_BASE_URL}/home?page=${page}&limit=6`;

        if (selectedTag) {
          url += `&tags=${selectedTag}`;
        }
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }

        const res = await axios.get(url);
        setPosts(res.data.papers);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, [page, selectedTag, search]); // ✅ refetch when search or tag changes

  // Reset to page 1 if a new tag is selected
  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setPage(1);
  };

  return (
    <div className="home-Container">
      <NavBar />
      <div className="sideBar-Feed-Container">
        <div className="Feeds">
          {posts.length > 0 ? (
            posts.map((post) => <Feed key={post._id} post={post} />)
          ) : (
            <p>No posts found</p>
          )}
        </div>
        <Sidebar onTagSelect={handleTagSelect} selectedTag={selectedTag} />
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Homepage;
