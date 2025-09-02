import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./Profile.css";
import NavBar from "../components/navbar.jsx";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`http://localhost:3001/home/user/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <>
        <NavBar />        
        <div className="profile-container">
        <div className="profile-header">
            <h1>{user.name}</h1>
        </div>

        <div>
            <h2 className="section-title">Bio</h2>
            <p className="profile-bio">{user.bio || "No bio yet."}</p>
        </div>
        </div>
    </>
  );
}

export default Profile;
