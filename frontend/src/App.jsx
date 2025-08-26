import { Route, Routes } from "react-router"
import HomePage from "./pages/Home.jsx";
import PublishPage from "./pages/Publish.jsx";
import PostPage from "./pages/Postpage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element= {<HomePage />} />
        <Route path="/publish" element= {<PublishPage />} />
        <Route path="/:id" element= {<PostPage />} />
      </Routes>
    </>
  )
}

export default App
