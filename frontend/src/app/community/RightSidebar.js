import React from "react";
import styles from "../../styles/Community.module.css";

export default function RightSidebar() {
  const categories = ["Crops", "Diseases", "Organic Farming", "Technology"];
  const trendingPosts = [
    {
      id: 1,
      title: "Effective treatments for tomato blight",
      likes: 200,
    },
    {
      id: 2,
      title: "Top 5 organic pesticides for rice fields",
      likes: 150,
    },
    {
      id: 3,
      title: "How to prevent wheat rust naturally",
      likes: 180,
    },
  ];

  return (
    <div className={styles.rightSidebar}>
      {/* Explore Categories */}
      <div className={styles.categories}>
        <h3>Explore Categories</h3>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>

      {/* Trending Posts */}
      <div className={styles.trendingPosts}>
        <h3>Trending Posts</h3>
        <ul>
          {trendingPosts.map((post) => (
            <li key={post.id}>
              <p>{post.title}</p>
              <span>{post.likes} likes</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
