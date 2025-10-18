"use client";
import { useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faVideo, faPhone, faTimes, faSmile } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/ExpertSuggestions.module.css";

const ExpertSuggestions = ({ crop }) => {
  const [activeChat, setActiveChat] = useState(null);

  const expertMapping = {
    "Brown Spot": [
      {
        name: "Dr Virender Kumar",
        specialty: "Rice breeding, disease resistance(IRRI)",
        image: "/images/DR-1 RICE-modified.png",
        affiliation: "International Rice Research Institute (IRRI)",
      },
      {
        name: "Dr T. Mohapatra",
        specialty: "Advanced research in rice disease,genetics(ICAR)",
        image: "/images/IMG-20241211-WA0011-modified.png",
        affiliation: "Delhi-based consultant for agriculture initiatives",
      },
      {
        name: " Dr Himanshu Pathak",
        specialty: "Climate-resilient agriculture,rice research,disease management(ICAR)",
        image: "/images/IMG-20241211-WA0012-modified.png",
        affiliation: "ICAR Headquarters, New Delhi",
      },
    ],
    "Sheath Blight": [
      {
        name: "Dr Virender Kumar",
        specialty: "Rice breeding, disease resistance(IRRI)",
        image: "/images/DR-1 RICE-modified.png",
        affiliation: "International Rice Research Institute (IRRI)",
      },
      {
        name: "Dr T. Mohapatra",
        specialty: "Advanced research in rice disease,genetics(ICAR)",
        image: "/images/IMG-20241211-WA0011-modified.png",
        affiliation: "Delhi-based consultant for agriculture initiatives",
      },
      {
        name: " Dr Himanshu Pathak",
        specialty: "Climate-resilient agriculture,rice research,disease management(ICAR)",
        image: "/images/IMG-20241211-WA0012-modified.png",
        affiliation: "ICAR Headquarters, New Delhi",
      },
    ],
    // "Corn_(maize)": [
    //   {
    //     name: "Dr. Rohan Malhotra",
    //     specialty: "Corn Pathology",
    //     image: "/images/dr1.jpeg",
    //     description: "Expert in Corn diseases like Common Rust.",
    //   },
    //   {
    //     name: "Dr. Ankit Joshi",
    //     specialty: "Corn Agronomy",
    //     image: "/images/dr2.jpeg",
    //     description: "Specialist in Corn nutrient and soil management.",
    //   },
    //   {
    //     name: "Dr. Varun Singh",
    //     specialty: "Corn Plant Science",
    //     image: "/images/dr3.jpeg",
    //     description: "Focus on sustainable Corn farming techniques.",
    //   },
    // ],
    // "Tomato": [
    //   {
    //     name: "Dr. Alice Green",
    //     specialty: "Tomato Pathology",
    //     image: "/images/dr1.jpeg",
    //     description: "Expert in Tomato diseases like Late Blight.",
    //   },
    //   {
    //     name: "Dr. Emily White",
    //     specialty: "Tomato Agronomy",
    //     image: "/images/dr2.jpeg",
    //     description: "Specialist in Tomato pest management.",
    //   },
    //   {
    //     name: "Dr. Steven Grey",
    //     specialty: "Tomato Scientist",
    //     image: "/images/dr3.jpeg",
    //     description: "Advanced Tomato farming methods.",
    //   },
    // ],
    // Add more crops and experts as needed...
  };

  const cropName = (crop && typeof crop === 'string') ? crop.split("___")[0] : "";
  //console.log(cropName);
  const experts = expertMapping[cropName] || [];

  const openChat = (expert) => {
    setActiveChat(expert);
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  return (
    <div className={styles.container}>
      <h3>Experts for {cropName}</h3>
      <div className={styles.expertList}>
        {experts.map((expert, index) => (
          <div key={index} className={styles.expertCard}>
            <img src={expert.image} alt={expert.name} className={styles.image} />
            <h4 className={styles.name}>{expert.name}</h4>
            <p className={styles.specialty}>{expert.specialty}</p>
            <div className={styles.actions}>
              <button onClick={() => openChat(expert)}>
                <FontAwesomeIcon icon={faComments} />
              </button>
              <button>
                <FontAwesomeIcon icon={faVideo} />
              </button>
              <button>
                <FontAwesomeIcon icon={faPhone} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeChat && (
        <div className={styles.chatbox}>
          <div className={styles.chatHeader}>
            <img src={activeChat.image} alt={activeChat.name} className={styles.chatImage} />
            <div className={styles.chatDetails}>
              <h4>{activeChat.name}</h4>
              <p>{activeChat.specialty}</p>
            </div>
            <div className={styles.chatActions}>
              <button title="Video Call">
                <FontAwesomeIcon icon={faVideo} />
              </button>
              <button title="Voice Call">
                <FontAwesomeIcon icon={faPhone} />
              </button>
            </div>
            <button onClick={closeChat} className={styles.closeButton}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className={styles.chatMessages}>
            <div className={styles.doctorMessage}>
              <div className={styles.bubble}>Hello! How can I assist you today?</div>
            </div>

            <div className={styles.userMessage}>
              <div className={styles.bubble}>I want to know about crop disease treatment.</div>
            </div>
          </div>

          <div className={styles.chatInputContainer}>
            <FontAwesomeIcon icon={faSmile} className={styles.emojiIcon} />
            <input type="text" placeholder="Write a message..." className={styles.chatInput} />
            <button className={styles.sendButton}>Send</button>
          </div>

          <div className={styles.chatOptions}>
            <button>Build AI chatbot</button>
            <button>Using ChatBot</button>
            <button>I have questions</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertSuggestions;