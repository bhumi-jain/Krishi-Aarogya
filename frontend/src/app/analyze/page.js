"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./styles/CropAnalysis.module.css";
import ExpertSuggestions from "./ExpertSuggestions";
import animation from "../../../public/Animation6.json";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import loadingAnimation from "../../../public/loading.json";
import Fertilizers from "./Fertilizers";
import { useLanguage } from "../../components/language";

// Translation dictionary
const translation = {
  en: {
    translate : "English",
    analyze: "Analyze",
    instructions: "Upload an image of the crop for diagnosis, and get treatment and prevention recommendations.",
    predictedDisease: "Predicted Disease",
    causeOfDisease: "Cause of Disease",
    treatment: "Treatment",
    errorFetching: "Failed to connect to the server.",
    noDetails: "No details available.",
    uploadingImage: "Uploading Image...",
    analyzing: "Analyzing...",
    aiGenerating: "AI is generating the diagnosis...",
    diagnosisError: "An error occurred during the diagnosis.",
  },
  hi: {
    translate : "Hindi",
    analyze: "विश्लेषण करें",
    instructions: "फसल के निदान के लिए एक छवि अपलोड करें, और उपचार और रोकथाम की सिफारिशें प्राप्त करें।",
    predictedDisease: "अनुमानित रोग",
    causeOfDisease: "रोग का कारण",
    treatment: "उपचार",
    errorFetching: "सर्वर से कनेक्ट नहीं हो सका।",
    noDetails: "कोई जानकारी उपलब्ध नहीं।",
    uploadingImage: "छवि अपलोड हो रही है...",
    analyzing: "विश्लेषण हो रहा है...",
    aiGenerating: "एआई निदान तैयार कर रहा है...",
    diagnosisError: "निदान के दौरान एक त्रुटि हुई।",
  },
  ta: {
    translate : "Tamil",
  analyze: "பரிசோதனை",
  instructions: "நோய்க்கான கண்டறிய பயிரின் படத்தை பதிவேற்றவும், மற்றும் சிகிச்சை மற்றும் தடுப்பு பரிந்துரைகள் பெறவும்.",
  predictedDisease: "முன்னறிவிக்கப்பட்ட நோய்",
  causeOfDisease: "நோய்க்கான காரணம்",
  treatment: "சிகிச்சை",
  errorFetching: "சர்வருடன் இணைக்க முடியவில்லை.",
  noDetails: "விவரங்கள் கிடைக்கவில்லை.",
  uploadingImage: "படம் பதிவேற்றப்படுகிறது...",
  analyzing: "பரிசோதனை செய்யப்படுகிறது...",
  aiGenerating: "ஏஐ க்கான கண்டறியும் விளக்கம் உருவாக்குகிறது...",
  diagnosisError: "நோய்க் கண்டறியும் போது பிழை ஏற்பட்டது.",
  },
  te: {
    translate : "Telugu",
    analyze: "విశ్లేషించండి",
    instructions: "పంట చిత్రాన్ని అప్లోడ్ చేసి, రోగ నిర్ధారణతో పాటు చికిత్స మరియు నివారణ సూచనలు పొందండి.",
    predictedDisease: "అంచనా వ్యాధి",
    causeOfDisease: "వ్యాధి కారణం",
    treatment: "చికిత్స",
    errorFetching: "సర్వర్ కు కనెక్ట్ చేయడంలో విఫలమైంది.",
    noDetails: "వివరాలు అందుబాటులో లేవు.",
    uploadingImage: "చిత్రం అప్లోడ్ అవుతోంది...",
    analyzing: "విశ్లేషణ జరుగుతోంది...",
    aiGenerating: "ఏఐ రోగ నిర్ధారణను సృష్టిస్తోంది...",
    diagnosisError: "రోగ నిర్ధారణలో లోపం ఏర్పడింది."
  },
  kn: {
    translate : "Kannada",
    analyze: "ವಿಶ್ಲೇಷಿಸಿ",
    instructions: "ಕೃಷಿ ಪತ್ತೆಗಾಗಿ ಪಂಟದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಚಿಕಿತ್ಸೆಯ serta ತಡೆಗಟ್ಟುವಿಕೆಯ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.",
    predictedDisease: "ಅನಮಾನಿತ ರೋಗ",
    causeOfDisease: "ರೋಗದ ಕಾರಣ",
    treatment: "ಚಿಕಿತ್ಸೆ",
    errorFetching: "ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಲು ವಿಫಲವಾಗಿದೆ.",
    noDetails: "ಯಾವುದೇ ವಿವರಗಳು ಲಭ್ಯವಿಲ್ಲ.",
    uploadingImage: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡುತ್ತಿದೆ...",
    analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    aiGenerating: "ಎಐ ರೋಗನಿರ್ಣಯವನ್ನು ರಚಿಸುತ್ತಿದೆ...",
    diagnosisError: "ರೋಗನಿರ್ಣಯದಲ್ಲಿ ದೋಷವೊಂದು ಸಂಭವಿಸಿದೆ."
  },
  ml: {
    translate : "Malayalam",
    analyze: "വിശകലനം ചെയ്യുക",
    instructions: "വിശകലനത്തിനായി വിളയിലയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക, ചികിത്സയും പ്രതിരോധ നിർദേശങ്ങളും നേടുക.",
    predictedDisease: "പ്രതീക്ഷിക്കുന്ന രോഗം",
    causeOfDisease: "രോഗത്തിന്റെ കാരണം",
    treatment: "ചികിത്സ",
    errorFetching: "സർവറുമായി ബന്ധപ്പെടാൻ കഴിഞ്ഞില്ല.",
    noDetails: "വിശദാംശങ്ങൾ ലഭ്യമല്ല.",
    uploadingImage: "ചിത്രം അപ്‌ലോഡ് ചെയ്യുന്നു...",
    analyzing: "വിശകലനം നടത്തുന്നു...",
    aiGenerating: "എഐ രോഗനിർണ്ണയം സൃഷ്ടിക്കുന്നു...",
    diagnosisError: "രോഗനിർണ്ണയത്തിനിടെ ഒരു പിശക് സംഭവിച്ചു."
  },
  mr: {
    translate : "Marathi",
    analyze: "विश्लेषण करा",
    instructions: "निदानासाठी पिकाचा फोटो अपलोड करा आणि उपचार व प्रतिबंधक उपायांची शिफारस मिळवा.",
    predictedDisease: "अनुमानित रोग",
    causeOfDisease: "रोगाचे कारण",
    treatment: "उपचार",
    errorFetching: "सर्व्हरशी कनेक्ट होण्यात अपयश आले.",
    noDetails: "कोणतीही माहिती उपलब्ध नाही.",
    uploadingImage: "प्रतिमा अपलोड करत आहे...",
    analyzing: "विश्लेषण सुरू आहे...",
    aiGenerating: "एआय निदान तयार करत आहे...",
    diagnosisError: "निदान करताना त्रुटी आली."
  },
  bn: {
    translate : "Bengali",
    analyze: "বিশ্লেষণ করুন",
    instructions: "রোগ নির্ণয়ের জন্য ফসলের ছবি আপলোড করুন এবং চিকিৎসা ও প্রতিরোধ পরামর্শ পান।",
    predictedDisease: "অনুমানিত রোগ",
    causeOfDisease: "রোগের কারণ",
    treatment: "চিকিৎসা",
    errorFetching: "সার্ভারের সাথে সংযোগ ব্যর্থ হয়েছে।",
    noDetails: "কোনো তথ্য উপলব্ধ নেই।",
    uploadingImage: "ছবি আপলোড হচ্ছে...",
    analyzing: "বিশ্লেষণ চলছে...",
    aiGenerating: "এআই রোগ নির্ণয় তৈরি করছে...",
    diagnosisError: "রোগ নির্ণয়ের সময় একটি সমস্যা হয়েছে।"
  },
  pa: {
    translate : "Punjabi",
    analyze: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    instructions: "ਰੋਗ ਦੀ ਜਾਂਚ ਲਈ ਫਸਲ ਦੀ ਤਸਵੀਰ ਅੱਪਲੋਡ ਕਰੋ ਅਤੇ ਇਲਾਜ ਅਤੇ ਰੋਕਥਾਮ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।",
    predictedDisease: "ਅਨੁਮਾਨਿਤ ਬਿਮਾਰੀ",
    causeOfDisease: "ਬਿਮਾਰੀ ਦਾ ਕਾਰਨ",
    treatment: "ਇਲਾਜ",
    errorFetching: "ਸਰਵਰ ਨਾਲ ਜੁੜਨ ਵਿੱਚ ਅਸਫਲ।",
    noDetails: "ਕੋਈ ਵੇਰਵਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।",
    uploadingImage: "ਤਸਵੀਰ ਅੱਪਲੋਡ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...",
    analyzing: "ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    aiGenerating: "ਏਆਈ ਰੋਗ ਦੀ ਜਾਂਚ ਤਿਆਰ ਕਰ ਰਹੀ ਹੈ...",
    diagnosisError: "ਰੋਗ ਦੀ ਜਾਂਚ ਦੌਰਾਨ ਗਲਤੀ ਹੋਈ।"
  },
  gu: {
    translate : "Gujarati",
    analyze: "વિશ્લેષણ કરો",
    instructions: "રોગની ઓળખ માટે પાકનું ચિત્ર અપલોડ કરો અને સારવાર અને નિવારણની ભલામણો મેળવો.",
    predictedDisease: "અનુમાનિત રોગ",
    causeOfDisease: "રોગનું કારણ",
    treatment: "ઉપચાર",
    errorFetching: "સર્વર સાથે જોડાતા નિષ્ફળ.",
    noDetails: "કોઈ વિગત ઉપલબ્ધ નથી.",
    uploadingImage: "ચિત્ર અપલોડ થઈ રહ્યું છે...",
    analyzing: "વિશ્લેષણ થઈ રહ્યું છે...",
    aiGenerating: "એઆઈ રોગની ઓળખ કરી રહ્યું છે...",
    diagnosisError: "રોગની ઓળખમાં ભૂલ થઈ."
  },
  ur: {
    translate : "Urdu",
    analyze: "تجزیہ کریں",
    instructions: "تشخیص کے لیے فصل کی تصویر اپلوڈ کریں، اور علاج و روک تھام کی تجاویز حاصل کریں۔",
    predictedDisease: "متوقع بیماری",
    causeOfDisease: "بیماری کی وجہ",
    treatment: "علاج",
    errorFetching: "سرور سے رابطہ کرنے میں ناکام۔",
    noDetails: "کوئی تفصیل دستیاب نہیں ہے۔",
    uploadingImage: "تصویر اپلوڈ ہو رہی ہے...",
    analyzing: "تجزیہ جاری ہے...",
    aiGenerating: "اے آئی تشخیص تیار کر رہی ہے...",
    diagnosisError: "تشخیص کے دوران ایک خرابی پیش آئی۔"
  }
  
};

export default function CropAnalysis() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [cause, setCause] = useState("");
  const [treatment, setTreatment] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFertilizerSection, setShowFertilizerSection] = useState(false);
  const [recommendation, setRecommendation] = useState("");

  // Language translation
  const { language } = useLanguage(); // Hook for the current language
  const t = translation[language] || translation["en"]; // Fallback to English if translation is not found

  const GEMINI_API_KEY = "AIzaSyDshsEBQKFxUvWAUOnCWfaaFJn3IzYwUwo"; // Replace with your Gemini API key

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
      resetResults();
    }
  };

  const resetResults = () => {
    setDiagnosis("");
    setCause("");
    setTreatment("");
    setFertilizer("");
    setError("");
  };

  const handleDiagnosis = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5002/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setDiagnosis(data.prediction);
        setRecommendation(data.recommendation);
        await fetchGeminiDetails(data.prediction); // Fetch detailed information
        setShowFertilizerSection(true);
        setError("");
      } else {
        setError(data.error || t.diagnosisError);
      }
    } catch (err) {
      setError(t.errorFetching);
    } finally {
      setLoading(false);
    }
  };

  const fetchGeminiDetails = async (disease) => {
        try {
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
          const requestData = {
            contents: [
              {
                parts: [
                  {
                    text: `show me the cause of the ${disease} in plant in 5 points only and dont show any extra summary text  in ${t.translate} language.`,
                  },
                ],
              },
            ],
          };
    
      // Fetch the cause
      const causeResponse = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const causeData = await causeResponse.json();
      const causeContent = parseGeminiText(
        causeData.candidates?.[0]?.content?.parts?.[0]?.text ||
          t.noDetails
      );
      setCause(causeContent);

      // Fetch the treatment
      requestData.contents[0].parts[0].text = `Explain the treatment for the disease ${disease} in the plant by summarising in not more than 5 points with only little description in ${t.translate} language,without any note`;
      const treatmentResponse = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const treatmentData = await treatmentResponse.json();
      const treatmentContent = parseGeminiText(
        treatmentData.candidates?.[0]?.content?.parts?.[0]?.text ||
          t.noDetails
      );
      setTreatment(formatAsBulletPoints(treatmentContent));


      // Fetch the fertilizers/products
      requestData.contents[0].parts[0].text = `divide into two sections, in one list inorganic fertilizers and in the other list organic fertilizers required for treating the disease ${disease} in bullet points without any description.`;
      const fertilizerResponse = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const fertilizerData = await fertilizerResponse.json();
      const fertilizerContent = formatAsBulletPoints(
        fertilizerData.candidates?.[0]?.content?.parts?.[0]?.text ||
          t.noDetails
      );
      setFertilizer(fertilizerContent);
    } catch (err) {
      console.error("Failed to fetch Gemini details", err);
      setCause(t.errorFetching);
      setTreatment(t.errorFetching);
      setFertilizer(t.errorFetching);
    }
  };

    const parseGeminiText = (text) => {
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="highlight">$1</strong>') // Bold the section headers
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>') // Italicize emphasized terms
      .replace(/\n/g, "<br />") // Ensure new lines are rendered properly
      .replace(/(\d+\.)/g, "<br />$1"); // Ensure numbered list starts on the next line
    return formattedText;
  };

  const formatAsBulletPoints = (text) => {
    const items = text
      .split("\n")
      .filter((item) => item)
      .map((item) => `<li>${item}</li>`);
    return `<ul>${items.join("")}</ul>`;
  };

  const formatAsOrderedList = (text) => {
    const items = text
      .split("\n")
      .filter((item) => item)
      .map((item) => `<li>${item}</li>`);
    return `<ol>${items.join("")}</ol>`;
  };
  

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.headingContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className={styles.heading}>
          {t.analyze}
        </Typography>

        <Typography className={styles.instructions}>
          {t.instructions}
        </Typography>
      </motion.div>

      <Box className={styles.uploadSection}>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.imagePreview}
          />
        )}
        <input
          type="file"
          onChange={handleImageUpload}
          className={styles.fileInput}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleDiagnosis}
          disabled={!selectedImage || loading}
          className={styles.analyzeButton}
        >
          {loading ? t.analyzing : t.analyze}
        </Button>
      </Box>

      {loading && (
        <Box className={styles.loadingContainer}>
          <Lottie
            options={{ animationData: loadingAnimation }}
            height={100}
            width={100}
          />
          <Typography variant="h6" className={styles.loadingText}>
            {t.aiGenerating}
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" className={styles.errorMessage}>
          {error}
        </Typography>
      )}

      {diagnosis && (
        <Paper className={styles.resultContainer}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" className={styles.diseaseHeading}>
              {t.predictedDisease}: {diagnosis}
            </Typography>
          </motion.div>
        </Paper>
      )}

      <div className={styles.sectionContainer}>
        {cause && (
          <div className={styles.causeText}>
            <Typography variant="h4" className={styles.subHeading}>
              {t.causeOfDisease}
            </Typography>
            <Typography dangerouslySetInnerHTML={{ __html: cause }} />
          </div>
        )}

        {treatment && (
          <div className={styles.treatmentText}>
            <Typography variant="h4" className={styles.subHeading}>
              {t.treatment}
            </Typography>
            <Typography dangerouslySetInnerHTML={{ __html: treatment }} />
          </div>
        )}
      </div>

      {showFertilizerSection && (
        <Box className={styles.fertilizerSection}>
          <Fertilizers dangerouslySetInnerHTML={{ __html: fertilizer }} />
        </Box>
      )}
      {diagnosis && (
                <Box className={styles.expertsSection}>
           <ExpertSuggestions crop={diagnosis} />
         </Box>
       )}
     </div>
  );
}
