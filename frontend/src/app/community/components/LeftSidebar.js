import React from "react";
import styles from "../../../styles/LeftSidebar.module.css";
import { useUser } from "../../context/UserContext";


  
export default function LeftSidebar() {
  const savedDiscussions = ["How to treat tomato blight?", "Best organic fertilizers for wheat"];
  const latestQuestions = ["What are the symptoms of rice blast?", "How to improve soil fertility?"];
  const { user } = useUser();
  return (
    <div className={styles.sidebar}>
      <div className={styles.profile}>
        <img src="images/profile.jpg" alt="Profile" className={styles.profileImage} />
        
        {user ? (
          <>
            <h3><strong>{user.username}</strong></h3>
      
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </>
        ) : (
          <p>No user data available. Please log in.</p>
        )}
      </div>
      <div className={styles.section}>
        <h4>Saved Discussions</h4>
        <ul>
          {savedDiscussions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h4>Your Latest Questions</h4>
        <ul>
          {latestQuestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
