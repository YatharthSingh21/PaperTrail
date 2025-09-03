import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./Profile.css";
import NavBar from "../components/navbar.jsx";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

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

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3001/home/user/${id}`, {
        ...user,
        loggedInUserId: currentUser._id, // prove identity
      });
      setUser(res.data.user);
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
            alt={`${user.name}'s profile picture`}
            className="profile-pic"
          />
        </div>

        <div>
          <h2 className="section-title">Bio</h2>
          <p className="profile-bio">{user.bio || "No bio yet."}</p>
        </div>

        {/* Show edit option only if logged-in user owns this profile */}
        {currentUser && currentUser._id === id && (
          <>
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Done!" : "Edit Profile"}
            </button>

            {isEditing && (
              <form onSubmit={handleUpdate} className="edit-form">
                <lable>Name</lable>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <lable>Bio</lable>
                <textarea
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                />
                <lable>Image URL</lable>
                <input
                  type="text"
                  value={user.profilePic}
                  onChange={(e) =>
                    setUser({ ...user, profilePic: e.target.value })
                  }
                  placeholder="Profile picture URL"
                />
                {/* <button type="submit">Save</button> */}
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
