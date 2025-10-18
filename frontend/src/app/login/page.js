"use client";
import React, { useState } from "react";
import styles from "../../styles/Login.module.css";
import { useUser } from "../context/UserContext";

export default function LoginModal({ isOpen, onClose }) {
  const { setUser } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
  
     if (!email.trim() || !password.trim() || (!isLogin && (!username.trim() || !address.trim()))) {

      setMessage("All fields are required");
      return;
    }
  
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return;
    }
  
    const endpoint = isLogin ? "/api/login" : "/api/signup";
    const payload = isLogin ? { email, password } : { username, email, password ,address };
  
    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unauthorized");
      }
  
      if (response.status === 200 && isLogin) {
        setUser(data.user); // Set global user state
      
        // Successful login
        setMessage("Login successful!");
        setUsername("");
        setEmail("");
        setPassword("");
        setAddress("");
        onClose(); // Close the dialog
        console.log("User data:", data.user);
      } else if (response.status === 201 && !isLogin) {
        // Successful signup
        setMessage("Signup successful! Please log in.");
        setIsLogin(true); // Switch to login mode
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage(error.message || "An unexpected error occurred.");
    }
  };
  

  return (
    <div className={styles.overlay}>
      <div className={styles.authModal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <h1 className={styles.heading}>{isLogin ? "Welcome Back" : "Sign Up"}</h1>
        <p className={styles.subheading}>
          {isLogin ? "Login to your account" : "Create your account"}
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            required
          />
          {!isLogin && (
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.inputField}
              required
            />
          )}
          <button type="submit" className={styles.authButton}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
          {message && <p className={styles.message}>{message}</p>}
        </form>
        <p className={styles.toggle}>
          {isLogin
            ? "Don’t have an account? "
            : "Already have an account? "}
          <span
            className={styles.toggleLink}
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage(""); // Clear messages on toggle
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
