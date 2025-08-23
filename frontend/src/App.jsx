import { Route, Routes } from "react-router"
import HomePage from "./pages/Home.jsx";
import PublishPage from "./pages/Publish.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element= {<HomePage />} />
        <Route path="/publish" element= {<PublishPage />} />
      </Routes>
    </>
  )
}

export default App
