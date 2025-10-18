import React from "react";
import styles from "../../../styles/StartPost.module.css";
import { FaPen } from "react-icons/fa"; // Icon from react-icons

export default function StartPost({ onStartDiscussion }) {
  return (
    <div className={styles.startPostContainer}>
      {/* Clickable input area */}
      <div
        className={styles.inputContainer}
        onClick={onStartDiscussion}
        role="button"
        tabIndex="0"
        onKeyPress={(e) => {
          if (e.key === "Enter") onStartDiscussion();
        }}
      >
        <FaPen className={styles.icon} />
        <div className={styles.text}>Start a Discussion</div>
      </div>

      {/* Post button */}
      <button
        className={styles.actionButton}
        onClick={onStartDiscussion}
        aria-label="Post a new discussion"
      >
        Post
      </button>
    </div>
  );
}
