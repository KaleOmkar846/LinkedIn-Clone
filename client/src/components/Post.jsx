import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatDate, getInitials } from '../utils/helpers';
import './Post.css';

function Post({ post, onDelete, onUpdate }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const isAuthor = user && post.author?._id === user._id;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      await onDelete(post._id);
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(post.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(post.content);
  };

  const handleSaveEdit = async () => {
    if (!editedContent.trim()) {
      alert('Post content cannot be empty');
      return;
    }
    setIsUpdating(true);
    await onUpdate(post._id, editedContent);
    setIsEditing(false);
    setIsUpdating(false);
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-author-info">
          <div className="post-author-avatar">
            {getInitials(post.author?.email)}
          </div>
          <div className="post-author-details">
            <span className="post-author">{post.author?.email || 'Unknown User'}</span>
            <div className="post-author-subtitle">
              <span className="post-date">{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {isEditing ? (
        <div className="post-edit">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows="4"
            disabled={isUpdating}
          />
          <div className="post-edit-actions">
            <button 
              onClick={handleCancelEdit} 
              disabled={isUpdating}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveEdit} 
              disabled={isUpdating}
              className="btn-save"
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          
          {isAuthor && (
            <div className="post-actions">
              <button onClick={handleEdit} className="btn-edit">
                Edit
              </button>
              <button 
                onClick={handleDelete} 
                disabled={isDeleting}
                className="btn-delete"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Post;
