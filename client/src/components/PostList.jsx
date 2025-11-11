import { usePosts } from '../hooks/usePosts';
import Post from './Post';
import './PostList.css';

function PostList({ refreshTrigger }) {
  const { posts, loading, error, updatePost, deletePost } = usePosts(refreshTrigger);

  const handleDeletePost = async (postId) => {
    const result = await deletePost(postId);
    if (!result.success) {
      alert(result.error);
    }
  };

  const handleUpdatePost = async (postId, newContent) => {
    const result = await updatePost(postId, newContent);
    if (!result.success) {
      alert(result.error);
    }
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="no-posts">No posts yet. Be the first to post!</div>;
  }

  return (
    <div className="post-list">
      <h3>Feed</h3>
      {posts.map((post) => (
        <Post 
          key={post._id} 
          post={post} 
          onDelete={handleDeletePost}
          onUpdate={handleUpdatePost}
        />
      ))}
    </div>
  );
}

export default PostList;
