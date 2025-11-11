import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CreatePostForm from '../components/CreatePostForm';
import PostList from '../components/PostList';
import { getInitials, getUsernameFromEmail, getRandomNumber } from '../utils/helpers';
import './Home.css';

function Home() {
  const { isAuthenticated, loading, user } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePostCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-card">
          <div className="sidebar-profile">
            <div className="sidebar-profile-bg"></div>
            <div className="sidebar-avatar">
              {user ? getInitials(user.email) : '?'}
            </div>
            <div className="sidebar-name">
              {user ? getUsernameFromEmail(user.email) : 'Guest'}
            </div>
            <div className="sidebar-title">
              {user ? user.email : 'Welcome to LinkedIn Clone'}
            </div>
          </div>
          <div className="sidebar-stats">
            <div className="sidebar-stat">
              <span>Profile viewers</span>
              <span className="sidebar-stat-number">{getRandomNumber(10, 100)}</span>
            </div>
            <div className="sidebar-stat">
              <span>Post impressions</span>
              <span className="sidebar-stat-number">{getRandomNumber(100, 500)}</span>
            </div>
          </div>
          <div className="sidebar-premium">
            <span>Access exclusive tools & insights</span>
          </div>
        </div>
        <div className="sidebar-card">
          <div className="sidebar-links">
            <div className="sidebar-link">📑 Saved items</div>
            <div className="sidebar-link">👥 Groups</div>
            <div className="sidebar-link">📰 Newsletters</div>
            <div className="sidebar-link">📅 Events</div>
          </div>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="main-feed">
        <div className="home-content">
          {isAuthenticated && (
            <CreatePostForm onPostCreated={handlePostCreated} />
          )}
          <PostList refreshTrigger={refreshTrigger} />
        </div>
      </main>

      {/* Right Sidebar - News */}
      <aside className="right-sidebar">
        <div className="news-panel">
          <div className="news-header">
            <h3 className="news-title">LinkedIn News</h3>
          </div>
          <div className="news-item">
            <div className="news-item-title">Top stories</div>
            <div className="news-item-meta">Tech industry updates</div>
          </div>
          <div className="news-item">
            <div className="news-item-title">Startup funding rounds</div>
            <div className="news-item-meta">3h ago • 1,234 readers</div>
          </div>
          <div className="news-item">
            <div className="news-item-title">Remote work trends</div>
            <div className="news-item-meta">5h ago • 892 readers</div>
          </div>
          <div className="news-item">
            <div className="news-item-title">AI developments</div>
            <div className="news-item-meta">1d ago • 2,156 readers</div>
          </div>
          <div className="news-item">
            <div className="news-item-title">Market analysis</div>
            <div className="news-item-meta">2d ago • 756 readers</div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Home;
