import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import '../components/navbar.css';
import logo from "../assets/logo.png";
import './publish.css';

function NavBar() {
    return (
        <nav>
            <div className="Nav">
                <Link to="/"><img id="logo" src={logo}/></Link>
            </div>
        </nav>
    );
}

function TagDropdown({ tags, setTags }) {
  const availableTags = ["Technology", "Science", "AI", "Crypto", "Education", "Philosophy", "Statistics", "Spirituality", "Mathematics", "Gaming"
    ,"Sports", "Politics", "Food", "Lifestyle", "Fashion", "Television", "Art", "Literature"
  ];
  const [open, setOpen] = useState(false);

  function toggleTag(tag) {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  }

  return (
    <div className="tag-dropdown">
      <div className="dropdown-header" onClick={() => setOpen(!open)}>
        {tags.length > 0 ? tags.join(", ") : "Select Tags"}
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="dropdown-menu">
          {availableTags.map((tag) => (
            <label key={tag} className="dropdown-item">
              <input
                type="checkbox"
                checked={tags.includes(tag)}
                onChange={() => toggleTag(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function Publish({ currentUser }) {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const post = await axios.post("http://localhost:3001/home/", {
        title: title,
        subTitle: subTitle,
        content: content,
        author: currentUser?.name || "Anonymous", // or currentUser.username
        tags: tags,
      });

      console.log("Paper posted:", post.data);

      navigate("/")
      // reset form after submit
      setTitle("");
      setSubTitle("");
      setContent("");
      setTags([]);

    } catch (err) {
      console.error("Error posting:", err.response?.data || err.message);
    }
  }

  return (
    <>
      <NavBar />
      <form className="publish-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />

        <TagDropdown tags={tags} setTags={setTags} />

        <input
          type="text"
          name="subTitle"
          placeholder="Sub-Title"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="subtitle-input"
        />

        <textarea
          name="content"
          placeholder="Write your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-input"
        />

        <button type="submit" className="publish-btn">
          Publish
        </button>
      </form>
    </>
  );
}

export default Publish;
