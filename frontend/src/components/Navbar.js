"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Button,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";

import { useUser } from "../app/context/UserContext";
import { useLanguage } from "../components/language";

import LoginModal from "../app/login/page";
import styles from "../styles/Navbar.module.css";

// Material UI Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { user, logout } = useUser();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [translatedNavLabels, setTranslatedNavLabels] = useState({
    Home: "Home",
    CropAnalysis: "Crop Analysis",
    OutbreakAlerts: "Outbreak Alerts",
    Community: "Community",
    PharmacistLocator: "Pharmacist Locator",
    Education: "Education",
  });

  const toggleProfileMenu = () => setIsProfileOpen((prev) => !prev);

  const navbarAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const dropdownAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  useEffect(() => {
    const translateNavLabels = async () => {
      const navKeys = Object.keys(translatedNavLabels);
      const newLabels = {};

      for (const key of navKeys) {
        const response = await fetch("/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: key, targetLanguage: language }),
        });

        const data = await response.json();
        newLabels[key] = data.translatedText || key;
      }

      setTranslatedNavLabels(newLabels);
    };

    translateNavLabels();
  }, [language]);

  return (
    <>
      {/* Top Green Bar */}
      <div className={styles.topBar}>
  <div className={styles.leftTopBar}>
    <div className={styles.logo}>
      <Link href="/" aria-label="Home">
        <img src="/images/logo.jpeg" alt="KRISHI AAROGYA Logo" />
      </Link>
    </div>
    <Select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className={styles.languageSelector}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="hi">हिन्दी (Hindi)</MenuItem>
      <MenuItem value="ta">தமிழ் (Tamil)</MenuItem>
      <MenuItem value="te">తెలుగు (Telugu)</MenuItem>
      <MenuItem value="kn">ಕನ್ನಡ (Kannada)</MenuItem>
      <MenuItem value="ml">മലയാളം (Malayalam)</MenuItem>
      <MenuItem value="mr">मराठी (Marathi)</MenuItem>
      <MenuItem value="bn">বাংলা (Bengali)</MenuItem>
      <MenuItem value="pa">ਪੰਜਾਬੀ (Punjabi)</MenuItem>
      <MenuItem value="gu">ગુજરાતી (Gujarati)</MenuItem>
      <MenuItem value="ur">اردو (Urdu)</MenuItem>
    </Select>
  </div>
  <div className={styles.centerTopBar}>
    <div className={styles.slidingText}>
    <p>
    🌾  Providing Innovative Crop Solutions | 🌿  Connect with us for expert advice | 🌱  Supporting Sustainable Agriculture
  </p>
    </div>
  </div>
  <div className={styles.rightTopBar}>
    <span>📩 krishiaarogya@gmail.com</span>
    <span>📞 +91-1234567890</span>
  </div>
</div>


      {/* Main Navbar */}
      <motion.nav className={styles.navbar} variants={navbarAnimation} initial="hidden" animate="visible">

        <motion.ul
          className={styles.navLinks}
          variants={dropdownAnimation}
          initial="hidden"
          animate="visible"
        >
          {[
            { path: "/", label: translatedNavLabels.Home },
            { path: "/analyze", label: translatedNavLabels.CropAnalysis },
            { path: "/alerts", label: translatedNavLabels.OutbreakAlerts },
            { path: "/community", label: translatedNavLabels.Community },
            { path: "/pharmacists", label: translatedNavLabels.PharmacistLocator },
            { path: "/education", label: translatedNavLabels.Education },
          ].map((link) => (
            <motion.li key={link.path} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link href={link.path}>{link.label}</Link>
            </motion.li>
          ))}
        </motion.ul>

        <div className={styles.languageDropdown}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsLoginOpen(true)}
          >
            {t("navbar.login", "Login")}
          </Button>
        </div>

        {user ? (
          <motion.div variants={dropdownAnimation} initial="hidden" animate="visible">
            <IconButton onClick={toggleProfileMenu} color="inherit">
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            {isProfileOpen && (
              <div className={styles.profileMenu}>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Address: {user.address}</p>
                <Button variant="contained" color="error" onClick={logout}>
                  {t("navbar.logout", "Logout")}
                </Button>
              </div>
            )}
          </motion.div>
        ) : null}

        {/* Login Modal */}
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </motion.nav>
    </>
  );
}
