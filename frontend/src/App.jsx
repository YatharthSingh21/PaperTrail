import { Route, Routes } from "react-router"
import { useState, useEffect } from "react";

import HomePage from "./pages/Home.jsx";
import PublishPage from "./pages/Publish.jsx";
import PostPage from "./pages/Postpage.jsx";
import LoginPage from "./pages/login.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element= {<HomePage />} />
        <Route path="/publish" element={<PublishPage currentUser={currentUser} />} />
        <Route path="/profile/:id" element= {<Profile />} /> {/*Never write just this "/:id", otherwise it would treat other routes as /something here*/}
        <Route path="/post/:id" element= {<PostPage />} />
        <Route path="/login" element= {<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
