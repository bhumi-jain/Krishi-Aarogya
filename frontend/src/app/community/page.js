"use client";
import React, { useState, useEffect } from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Feed from "./components/Feed";
import DiscussionModal from "./components/DiscussionModal";
import StartDiscussionModal from "./components/StartDiscussionModal";
import SearchBar from "./components/SearchBar";
import StartPost from "./components/StartPost";
import styles from "../../styles/Community.module.css";

export default function Community() {
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState(false);
  const [isStartDiscussionModalOpen, setIsStartDiscussionModalOpen] = useState(false);

  // Fetch discussions on load
  useEffect(() => {
    fetch("http://localhost:3001/discussions/display")
      .then((res) => res.json())
      .then((data) => setDiscussions(data))
      .catch((error) => console.error("Error fetching discussions:", error));
  }, []);

  const openDiscussionModal = (discussion) => {
    setSelectedDiscussion(discussion);
    setIsDiscussionModalOpen(true);
  };

  const closeDiscussionModal = () => {
    setIsDiscussionModalOpen(false);
    setSelectedDiscussion(null);
  };

  const openStartDiscussionModal = () => setIsStartDiscussionModalOpen(true);
  const closeStartDiscussionModal = () => setIsStartDiscussionModalOpen(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.communityPage}>
      <div className={styles.leftSidebar}>
        <LeftSidebar />
      </div>
      <div className={styles.mainContent}>
        <SearchBar />
        <div>
      <StartPost onStartDiscussion={openModal} />
      {isModalOpen && <StartDiscussionModal onClose={closeModal} />}
    </div>
    <Feed
  discussions={discussions}
  onDiscussionClick={(discussion) => {
    setSelectedDiscussion(discussion);
    setIsDiscussionModalOpen(true);
  }}/>
      </div>
      <div className={styles.rightSidebar}>
        <RightSidebar />
      </div>

      {isDiscussionModalOpen && (
        <DiscussionModal
          discussion={selectedDiscussion}
          onClose={closeDiscussionModal}
        />
      )}
      {isStartDiscussionModalOpen && (
        <StartDiscussionModal onClose={closeStartDiscussionModal} />
      )}
    </div>
  );
}
