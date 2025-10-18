import React from "react";
import styles from "../../../styles/RightSidebar.module.css";

export default function RightSidebar() {
  const categories = ["Crops", "Diseases", "Organic Farming", "Soil"];
  const trendingPosts = [
    "Best organic pesticides for tomatoes",
    "How to prevent wheat rust naturally",
  ];
  const popularTags = ["#fertilizers", "#tomatoes", "#wheat", "#organic"];

  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <h4>Explore Categories</h4>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h4>Trending Posts</h4>
        <ul>
          {trendingPosts.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h4>Popular Tags</h4>
        <div className={styles.tags}>
          {popularTags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
