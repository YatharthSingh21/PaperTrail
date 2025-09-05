import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./Profile.css";
import NavBar from "../components/navbar.jsx";
import API_BASE_URL from "../config/config.js";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${API_BASE_URL}/home/user/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_BASE_URL}/home/user/${id}`, {
        name: user.name,
        bio: user.bio,
        profilePic: user.profilePic,
        loggedInUserId: currentUser._id, // prove identity
      });

      setUser(res.data.user);

      // 🔥 keep localStorage in sync
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  }

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <div className="profile-header">
          <h1>{user.name}</h1>
          <img
            src={user.profilePic}
            alt={`${user.name}'s profile`}
            className="profile-pic"
          />
        </div>

        <div>
          <h2 className="section-title">Bio</h2>
          <p className="profile-bio">{user.bio || "No bio yet."}</p>
        </div>

        {/* Only owner sees edit option */}
        {currentUser && currentUser._id === id && (
          <>
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>

            {isEditing && (
              <form onSubmit={handleUpdate} className="edit-form">
                <label>Name</label>
                <input
                  type="text"
                  value={user.name || ""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />

                <label>Bio</label>
                <textarea
                  value={user.bio || ""}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                />

                <label>Image URL</label>
                <input
                  type="text"
                  value={user.profilePic || ""}
                  onChange={(e) =>
                    setUser({ ...user, profilePic: e.target.value })
                  }
                  placeholder="Profile picture URL"
                />

                <button type="submit">Save</button>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
