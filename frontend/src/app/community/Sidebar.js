import React from "react";
import styles from "../../styles/Community.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.trending}>
        <h3>Trending Topics</h3>
        <ul>
          <li>#Crops</li>
          <li>#Diseases</li>
          <li>#OrganicFarming</li>
        </ul>
      </div>
      <div className={styles.filters}>
        <h3>Filters</h3>
        <ul>
          <li>Most Recent</li>
          <li>Most Upvoted</li>
          <li>Following</li>
        </ul>
      </div>
    </div>
  );
}
