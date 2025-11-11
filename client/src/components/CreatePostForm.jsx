import { useState } from 'react';
import postsApi from '../services/postsApi';
import './CreatePostForm.css';

function CreatePostForm({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await postsApi.createPost(content);
      setContent('');
      onPostCreated();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-form">
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start a post"
          rows="1"
          disabled={loading}
          onFocus={(e) => e.target.rows = 3}
          onBlur={(e) => {
            if (!content.trim()) e.target.rows = 1;
          }}
        />
        {content.trim() && (
          <button type="submit" disabled={loading || !content.trim()} className="btn-primary">
            {loading ? 'Posting...' : 'Post'}
          </button>
        )}
      </form>
    </div>
  );
}

export default CreatePostForm;
