function Sidebar({ onTagSelect, selectedTag }) {
  const availableTags = [
    "Technology", "Science", "AI", "Crypto", "Education",
    "Philosophy", "Statistics", "Spirituality", "Mathematics",
    "Gaming", "Sports", "Politics", "Food", "Lifestyle",
    "Fashion", "Television", "Art", "Literature"
  ];

  return (
    <div className="sidebar-Container">
      <div className="topArticle">
        <h1>Top Article of the week</h1>
        <img alt="top-article" />
        <p>Chand shabd uss article ke upar!!</p>
        <p>-Yatharth Singh</p>
      </div>

      <div className="tag-section">
        <p>Search By Tag</p>
        <div className="tags-grid">
          {availableTags.map((tag) => (
            <button
              key={tag}
              className={`tag-btn ${selectedTag === tag ? "active" : ""}`}
              onClick={() => onTagSelect(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
