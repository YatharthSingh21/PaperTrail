import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setFormData({ name: "", bio: "", email: "", password: "", profilePic: "" }); // reset form
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // login API
        const res = await axios.post("http://localhost:3001/home/user/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        // signup API
        const res = await axios.post("http://localhost:3001/home/user/signup", {
          name: formData.name,
          bio: formData.bio,
          email: formData.email,
          password: formData.password,
          profilePic: formData.profilePic, // <-- send profilePic
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="login-container">
      {isLogin ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <button type="submit">Login</button>
          <p>
            Don’t have an account?{" "}
            <button type="button" onClick={handleToggle} className="link-btn">
              Create one
            </button>
          </p>
        </form>
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="MK Gandhi"
          />

          <label>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="I am 27 and a fashion designer."
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="madanlal@blah.com"
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Pls don't choose 1234."
          />

          <label>Profile Picture URL:</label>
          <input
            type="text"
            name="profilePic"
            value={formData.profilePic}
            onChange={handleChange}
            placeholder="https://example.com/profile.jpg"
          />

          <button type="submit">Sign Up</button>
          <p>
            Already have an account?{" "}
            <button type="button" onClick={handleToggle} className="link-btn">
              Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

export default Login;
