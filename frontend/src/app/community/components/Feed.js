"use client";

import React from "react";
import axios from "axios";
import styles from "../../../styles/Feed.module.css";

const Feed = ({ discussions, onDiscussionClick }) => {
  async function handleUpvote(discussionId) {
    try {
      await axios.patch(
        `http://localhost:3001/discussions/${discussionId}/upvotes`
      );
      window.location.reload(); // Refresh discussions
    } catch (error) {
      console.error("Error upvoting discussion:", error);
    }
  }

  return (
    <div className={styles.feed}>
      {discussions && discussions.length > 0 ? (
        discussions.map((discussion) => (
          <div
            key={discussion.id}
            className={styles.discussionCard}
            onClick={() => onDiscussionClick(discussion)}
          >
            <h2>{discussion.title || "Untitled Discussion"}</h2>
            <p>{discussion.description || "No description available."}</p>
            <p>
              <strong>Category:</strong> {discussion.category || "Uncategorized"}
            </p>
            <div className={styles.tags}>
              {Array.isArray(discussion.tags) && discussion.tags.length > 0 ? (
                discussion.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag}
                  </span>
                ))
              ) : (
                <span className={styles.noTags}>No Tags</span>
              )}
            </div>
            {/* Display image if available */}
            {discussion.imageUrl && (
    <div className={styles.imageContainer}>
      <img src={discussion.imageUrl} alt={discussion.title} />
    </div>
  )}
            <div className={styles.interactions}>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpvote(discussion.id);
                }}
                style={{ cursor: "pointer", color: "red" }}
              >
                ❤️ {discussion.upvotes || 0} Upvotes
              </span>
              <span>💬 {discussion.comments?.length || 0} Replies</span>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noDiscussions}>
          No discussions available. Start a new discussion!
        </div>
      )}
    </div>
  );
};

export default Feed;
