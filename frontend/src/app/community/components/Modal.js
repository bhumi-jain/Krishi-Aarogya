import React from "react";
import styles from "../../../styles/Modal.module.css";

export default function Modal({ discussion, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{discussion.title}</h2>
        <p>{discussion.description}</p>
        <div className={styles.repliesSection}>
          <h3>Replies</h3>
          <ul>
            {discussion.replies.map((reply) => (
              <li key={reply.id} className={styles.reply}>
                {reply.content} - <em>{reply.author}</em>
              </li>
            ))}
          </ul>
          <textarea placeholder="Add a reply..." className={styles.inputField}></textarea>
          <button className={styles.submitButton}>Post Reply</button>
        </div>
      </div>
    </div>
  );
}
