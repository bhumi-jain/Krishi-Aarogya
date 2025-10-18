import React, { useState } from "react";
import styles from "../../../styles/SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm, selectedCategory);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search discussions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className={styles.categorySelect}
      >
        <option value="">All Categories</option>
        <option value="Crops">Crops</option>
        <option value="Diseases">Diseases</option>
        <option value="Organic Farming">Organic Farming</option>
        <option value="Soil">Soil</option>
      </select>
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
}
