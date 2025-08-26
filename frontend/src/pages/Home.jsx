import { useState, useEffect } from 'react'
import NavBar from "../components/navbar.jsx";
import Feed from "../components/feed.jsx";
import axios from "axios";
import Sidebar from '../components/sidebar.jsx';
import "./Home.css";

function Homepage() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/home/");
        setPosts(res.data.papers); //res.data.papers is an array that we want to display
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <div className='home-Container'>
      <NavBar />
      <div className='sideBar-Feed-Container'>
        <div className="Feeds">
          {posts.map((post) => (
          <Feed key={post._id} post={post} />
          ))}
        </div>
        <Sidebar />
      </div>
    </div>
  )
}

export default Homepage;
