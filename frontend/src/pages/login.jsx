import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setMessage(""); // clear messages when switching
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLogin
        ? "http://localhost:3001/home/user/login"
        : "http://localhost:3001/home/user/signup";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      setMessage(data.message);

      if (isLogin) {
        // save user info locally (or JWT if you add it later)
        console.log("Logged in user:", data.user);
      } else {
        console.log("New user created:", data.user);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Server error, please try again.");
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
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
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
            placeholder="MK Gandhi"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Bio:</label>
          <textarea
            name="bio"
            placeholder="I am 27 and a fashion designer."
            value={formData.bio}
            onChange={handleChange}
          ></textarea>

          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="madanlal@blah.com"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Pls don't choose 1234."
            value={formData.password}
            onChange={handleChange}
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
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default Login;
