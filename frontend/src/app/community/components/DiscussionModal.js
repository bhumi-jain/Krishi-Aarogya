import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/DiscussionModal.module.css";

export default function DiscussionModal({ discussion, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // For nested replies

  // Fetch comments for the discussion when the modal is opened
  useEffect(() => {
    if (discussion) {
      fetchComments();
    }
  }, [discussion]);

  // Fetch comments from the backend
  async function fetchComments() {
    try {
      const response = await axios.get(
        `http://localhost:3001/discussions/${discussion.id}`
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  // Handle likes for comments
  async function handleLike(commentId) {
    try {
        await axios.patch(`http://localhost:3001/comments/${commentId}/likes`);
        fetchComments(); // Refresh comments after liking
    } catch (error) {
        console.error("Error liking comment:", error);
    }
}


  // Post a new comment or reply
  async function handlePostComment() {
    try {
      await axios.post("http://localhost:3001/comments/create", {
        discussionId: discussion.id,
        content: newComment,
        parentCommentId: replyingTo,
      });
      setNewComment("");
      setReplyingTo(null);
      fetchComments(); // Refresh comments
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {/* Discussion Details */}
        <h2 className={styles.discussionTitle}>
          {discussion?.title || "Untitled Discussion"}
        </h2>
        <p className={styles.discussionDescription}>
          {discussion?.description || "No description provided."}
        </p>
        <p className={styles.discussionCategory}>
          <strong>Category:</strong> {discussion?.category || "Uncategorized"}
        </p>
        <div className={styles.tags}>
          {Array.isArray(discussion?.tags) && discussion.tags.length > 0 ? (
            discussion.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                #{tag}
              </span>
            ))
          ) : (
            <span className={styles.noTags}>No Tags</span>
          )}
        </div>

        {/* Comments Section */}
        <h3>Comments</h3>
        <div className={styles.commentsSection}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <p>
                <strong>{comment.author?.name || "Anonymous"}:</strong>{" "}
                {comment.content}
              </p>
              <div className={styles.commentActions}>
              <span
  onClick={(e) => {
    e.stopPropagation(); // Prevent triggering the parent click (e.g., opening the modal)
    handleLike(comment.id); // Call the handleLike function for the specific comment
  }}
  style={{ cursor: "pointer", color: "goldenrod" }}
>
  👍 {comment.likes || 0} likes
</span>

                <button
                  className={styles.replyButton}
                  onClick={() => setReplyingTo(comment.id)}
                >
                  Reply
                </button>
              </div>
              {Array.isArray(comment.replies) &&
                comment.replies.map((reply) => (
                  <div key={reply.id} className={styles.reply}>
                    <p>
                      <strong>{reply.author?.name || "Anonymous"}:</strong>{" "}
                      {reply.content}
                    </p>
                    <div className={styles.replyActions}>
                    <span
  onClick={(e) => {
    e.stopPropagation(); // Prevent triggering the parent click (e.g., opening the modal)
    handleLike(comment.id); // Call the handleLike function for the specific comment
  }}
  style={{ cursor: "pointer", color: "goldenrod" }}
>
  👍 {comment.likes || 0} likes
</span>

                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Add New Comment */}
        <div className={styles.newComment}>
          <textarea
            placeholder={
              replyingTo ? "Write a reply..." : "Add a new comment..."
            }
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handlePostComment}>
            {replyingTo ? "Post Reply" : "Post Comment"}
          </button>
        </div>
      </div>
    </div>
  );
}
