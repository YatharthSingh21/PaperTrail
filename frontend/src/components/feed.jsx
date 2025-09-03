import "./Feed.css";
import { Link } from "react-router";

function Feed({post}) {
  return (
    <Link to={`/post/${post._id}`} className="feed-link">
      <div className="feed-card">
        <div className="feed-content">
          <h2 className="feed-title">{post.title}</h2>
          <span className="feed-author">
            -by {post.author.name}
          </span>          
          <p className="feed-subtitle">{post.subTitle}</p>
          <span className="feed-date">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Feed;
