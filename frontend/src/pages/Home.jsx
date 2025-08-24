import { useState, useEffect } from 'react'
import NavBar from "../components/navbar.jsx";
import Feed from "../components/feed.jsx";
import axios from "axios";

function Homepage() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/home/");
        //console.log("API Response:", res.data);
        setPosts(res.data.papers); //res.data.papers is an array that we want to display
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <>
      <NavBar />
      <div className="Feeds">
        {posts.map((post) => (
        <Feed key={post._id} post={post} />
        ))}
      </div>
    </>
  )
}

export default Homepage;
