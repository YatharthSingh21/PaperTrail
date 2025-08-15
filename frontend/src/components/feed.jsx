import './Feed.css';
import '@fortawesome/fontawesome-free/css/all.css';

function Feed() {
  return (
    <div className="feed">
      <article className="article-card">
        <div className="article-meta">
          <img src="author-avatar.jpg" alt="Author" className="author-avatar" />
          <span className="author-name">Jane Doe</span>
          <span className="article-date">May 15 · 5 min read</span>
          <button className="bookmark-btn">
            <i className="far fa-bookmark"></i>
          </button>
        </div>
        
        <div className="article-content">
          <h2 className="article-title">How to Build a Modern Web App</h2>
          <p className="article-excerpt">
            Learn the best practices for creating responsive web applications...
          </p>
          <div className="article-tags">
            <span className="tag">Web Development</span>
            <span className="tag">React</span>
          </div>
        </div>
        
        <div className="article-stats">
          <button className="clap-btn">
            <i className="far fa-hands-clapping"></i>
            <span>248</span>
          </button>
          <span className="read-time">5 min read</span>
        </div>
      </article>
    </div>
  );
}

export default Feed;