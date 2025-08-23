import "./Feed.css"

function Feed({ title, subtitle, createdAt }) {
  return (
    <div className="feed-card">
      <div className="feed-content">
        <h2 className="feed-title">{title}</h2>
        <p className="feed-subtitle">{subtitle}</p>
        <span className="feed-date">
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

export default Feed;
