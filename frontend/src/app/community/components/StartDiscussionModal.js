"use client";

import { useState } from "react";
import styles from "../../../styles/StartDiscussionModal.module.css";
import axios from "axios";

export default function StartDiscussionModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // For the uploaded image

  const categories = ["General", "Crops", "Diseases", "Fertilizers", "Soil"];

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };

  async function handlePostDiscussion() {
    if (!title || !description || !category) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", JSON.stringify(tags.split(",").map((tag) => tag.trim())));
    formData.append("userId", "92eb0b9c-1df6-4ac1-9046-46db56e6ab05"); // Replace with actual user ID
  
    if (image) {
      formData.append("image", image);
    }
  
    try {
      await axios.post("http://localhost:3001/discussions/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error posting discussion:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to post discussion.");
    }
  }
  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h3 className={styles.modalTitle}>Start a New Discussion</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Discussion Title"
          className={styles.input}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Discussion Description"
          className={styles.textarea}
        />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter Tags (comma-separated)"
          className={styles.input}
        />
        <input
          list="categories"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Select or Type a Category"
          className={styles.input}
        />
        <datalist id="categories">
          {categories.map((cat, index) => (
            <option key={index} value={cat} />
          ))}
        </datalist>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <button onClick={handlePostDiscussion} className={styles.submitButton}>
          Post Discussion
        </button>
      </div>
    </div>
  );
}
