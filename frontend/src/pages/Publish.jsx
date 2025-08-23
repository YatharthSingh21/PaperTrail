import axios from "axios";
import { useState } from "react";

function Publish({ currentUser }) {   // <- you’ll pass the logged-in user as prop or from context
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  // const [tags, setTags] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const post = await axios.post("http://localhost:3001/home/", {
        title: title,
        subTitle: subTitle,
        content: content,
        author: "Yatharth", //For now be default
        // author: currentUser.username,
        tags: [],
      });

      console.log("Paper posted:", post.data);
    } catch (err) {
      console.error("Error posting:", err.response?.data || err.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <input 
          type="text" 
          name="tags" 
          placeholder="tags"
          value={tags}
          onChange={(e) => setTitle(e.target.value)}
        />         */}
        <input 
          type="text" 
          name="title" 
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          type="text" 
          name="subTitle" 
          placeholder="Sub-Title"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <textarea
          name="content"
          placeholder="Body"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </>
  );
}

export default Publish;
