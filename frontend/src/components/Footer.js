"use client";
// Import necessary libraries
import { useLanguage } from "./language";
import {
  Box,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhoneAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Footer.module.css";

// Translation dictionary for the footer
const translation = {
  en: {
    aboutTitle: "KRISHI AAROGYA",
    aboutDescription:
      "KRISHI AAROGYA is an AI-powered platform dedicated to helping farmers detect and manage crop diseases efficiently. Our mission is to leverage technology to improve agricultural productivity and sustainability.",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    email: "Email",
    phone: "Phone",
    address: "Address",
    socialMedia: "Follow Us",
    facebook: "Facebook",
    twitter: "Twitter",
    linkedin: "LinkedIn",
    copy: "All rights reserved.",
    analyze: "Analyze",
    outbreakAlerts: "Outbreak Alerts",
    community: "Community",
    pharmacistLocator: "Pharmacist Locator",
    education: "Education",
  },
  hi: {
    aboutTitle: "कृषि आरोग्य",
    aboutDescription:
      "कृषि आरोग्य एक एआई-समर्थित प्लेटफ़ॉर्म है जो किसानों को फसलों की बीमारियों का पता लगाने और उन्हें कुशलतापूर्वक प्रबंधित करने में मदद करता है। हमारा मिशन तकनीक का उपयोग करके कृषि उत्पादकता और स्थिरता को बेहतर बनाना है।",
    quickLinks: "त्वरित लिंक",
    contactUs: "संपर्क करें",
    email: "ईमेल",
    phone: "फ़ोन",
    address: "पता",
    socialMedia: "हमसे जुड़ें",
    facebook: "फेसबुक",
    twitter: "ट्विटर",
    linkedin: "लिंक्डइन",
    copy: "सर्वाधिकार सुरक्षित।",
    analyze: "विश्लेषण करें",
    outbreakAlerts: "प्रकोप अलर्ट",
    community: "समुदाय",
    pharmacistLocator: "फार्मासिस्ट स्थान",
    education: "शिक्षा",
  },
  ta: {
    aboutTitle: "கிரிஷி ஆரோக்யா",
    aboutDescription:
      "கிரிஷி ஆரோக்யா என்பது விவசாயிகளுக்கு பயிர் நோய்களை கண்டறிந்து நிர்வகிக்க உதவும் எஐ-ஆதாரமுள்ள தளமாகும். நாங்கள் தொழில்நுட்பத்தை பயன்படுத்தி வேளாண்மை உற்பத்தித்திறன் மற்றும் நிலைத்தன்மையை மேம்படுத்துவதே எங்கள் நோக்கம்.",
    quickLinks: "விரைவு இணைப்புகள்",
    contactUs: "எங்களை தொடர்பு கொள்ளவும்",
    email: "மின்னஞ்சல்",
    phone: "தொலைபேசி",
    address: "முகவரி",
    socialMedia: "எங்களை பின்தொடருங்கள்",
    facebook: "பேஸ்புக்",
    twitter: "ட்விட்டர்",
    linkedin: "லிங்க்டின்",
    copy: "அனைத்து உரிமைகள் பாதுகாக்கப்பட்டவை.",
    analyze: "ஆய்வு செய்",
    outbreakAlerts: "நோய் பரவல் எச்சரிக்கை",
    community: "சமூகம்",
    pharmacistLocator: "மருந்தாளர் இடம் காண்பி",
    education: "கல்வி",
  },
  te: {
    aboutTitle: "కృషి ఆరోగ్య",
    aboutDescription:
      "కృషి ఆరోగ్య ఒక AI ఆధారిత వేదిక, ఇది రైతులకు పంట వ్యాధులను గుర్తించి సమర్థవంతంగా నిర్వహించడంలో సహాయపడుతుంది. మా లక్ష్యం సాంకేతికతను వినియోగించి వ్యవసాయ ఉత్పాదకత మరియు స్థిరత్వాన్ని మెరుగుపరచడం.",
    quickLinks: "త్వరిత లింకులు",
    contactUs: "మమ్మల్ని సంప్రదించండి",
    email: "ఈమెయిల్",
    phone: "ఫోన్",
    address: "చిరునామా",
    socialMedia: "మమ్మల్ని అనుసరించండి",
    facebook: "ఫేస్‌బుక్",
    twitter: "ట్విట్టర్",
    linkedin: "లింక్డ్ఇన్",
    copy: "అన్ని హక్కులు పరిరక్షించబడినవి.",
    analyze: "విశ్లేషణ",
    outbreakAlerts: "వ్యాధి వ్యాప్తి హెచ్చరికలు",
    community: "సముదాయం",
    pharmacistLocator: "ఫార్మసిస్ట్ లొకేటర్",
    education: "విద్య",
  },
  kn: {
    aboutTitle: "ಕೃಷಿ ಆರೋಗ್ಯ",
    aboutDescription:
      "ಕೃಷಿ ಆರೋಗ್ಯ ಒಂದು ಎಐ-ಚಾಲಿತ ವೇದಿಕೆ, ಇದು ರೈತರಿಗೆ ಬೆಳೆ ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಮತ್ತು ಸುಲಭವಾಗಿ ನಿರ್ವಹಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸಿಕೊಂಡು ಕೃಷಿ ಉತ್ಪಾದಕತೆ ಮತ್ತು ಸ್ಥಿರತೆಯನ್ನು ಸುಧಾರಿಸುವುದು ನಮ್ಮ ಉದ್ದೇಶ.",
    quickLinks: "ತ್ವರಿತ ಕೊಂಡಿಗಳು",
    contactUs: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    email: "ಇಮೇಲ್",
    phone: "ಫೋನ್",
    address: "ವಿಳಾಸ",
    socialMedia: "ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ",
    facebook: "ಫೇಸ್‌ಬುಕ್",
    twitter: "ಟ್ವಿಟರ್",
    linkedin: "ಲಿಂಕ್ಡ್‌ಇನ್",
    copy: "ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    analyze: "ವಿಶ್ಲೇಷಿಸಿ",
    outbreakAlerts: "ರೋಗದ ಹರಡುವಿಕೆ ಎಚ್ಚರಿಕೆ",
    community: "ಸಮುದಾಯ",
    pharmacistLocator: "ಔಷಧ ವ್ಯಾಪಾರಿ ಪತ್ತೆಗಾರ",
    education: "ಶಿಕ್ಷಣ",
  },
  ml: {
    aboutTitle: "കൃഷി ആരോഗ്യ",
    aboutDescription:
      "കൃഷി ആരോഗ്യ ഒരു എഐ-പ്രേരിത പ്ലാറ്റ്ഫോം ആണ്, ഇത് കര്‍ഷകര്‍ക്ക് വിളകളുടെ രോഗങ്ങള്‍ കണ്ടെത്താനും കാര്യക്ഷമമായി കൈകാര്യം ചെയ്യാനും സഹായിക്കുന്നു. നമ്മുടെ ദൗത്യം സാങ്കേതികവിദ്യ ഉപയോഗിച്ച് കൃഷി ഉല്‍പ്പാദനക്ഷമതയും സ്ഥിരതയും വര്‍ദ്ധിപ്പിക്കുന്നതാണ്.",
    quickLinks: "പെട്ടെന്ന് ലിങ്കുകള്‍",
    contactUs: "ഞങ്ങളെ സമീപിക്കുക",
    email: "ഇമെയിൽ",
    phone: "ഫോൺ",
    address: "വിലാസം",
    socialMedia: "ഞങ്ങളെ പിന്തുടരുക",
    facebook: "ഫേസ്ബുക്ക്",
    twitter: "ട്വിറ്റർ",
    linkedin: "ലിങ്ക്ഡിൻ",
    copy: "എല്ലാ അവകാശങ്ങളും സംരക്ഷിതമാണ്.",
    analyze: "വിശകലനം",
    outbreakAlerts: "രോഗ പ്രഭവ മുന്നറിയിപ്പുകള്‍",
    community: "സമൂഹം",
    pharmacistLocator: "ഫാര്‍മസിസ്റ്റ് ലൊക്കേറ്റര്‍",
    education: "വിദ്യാഭ്യാസം",
  },
  mr: {
    aboutTitle: "कृषी आरोग्य",
    aboutDescription:
      "कृषी आरोग्य हे एक एआय-आधारित प्लॅटफॉर्म आहे जे शेतकऱ्यांना पिकांतील रोग ओळखण्यात आणि त्यांचा प्रभावीपणे सामना करण्यात मदत करते. आमचे ध्येय तंत्रज्ञानाचा उपयोग करून कृषी उत्पादकता आणि शाश्वतता सुधारणे आहे.",
    quickLinks: "त्वरित दुवे",
    contactUs: "आमच्याशी संपर्क साधा",
    email: "ईमेल",
    phone: "फोन",
    address: "पत्ता",
    socialMedia: "आम्हाला फॉलो करा",
    facebook: "फेसबुक",
    twitter: "ट्विटर",
    linkedin: "लिंक्डइन",
    copy: "सर्व हक्क राखीव.",
    analyze: "विश्लेषण",
    outbreakAlerts: "रोग प्रादुर्भाव सूचना",
    community: "समुदाय",
    pharmacistLocator: "फार्मासिस्ट शोधक",
    education: "शिक्षण",
  },
  bn: {
    aboutTitle: "কৃষি আরোগ্য",
    aboutDescription:
      "কৃষি আরোগ্য একটি এআই-চালিত প্ল্যাটফর্ম যা কৃষকদের ফসলের রোগ সনাক্তকরণ এবং কার্যকরভাবে পরিচালনায় সাহায্য করে। আমাদের লক্ষ্য প্রযুক্তির ব্যবহার করে কৃষি উৎপাদনশীলতা এবং টেকসই উন্নতি করা।",
    quickLinks: "দ্রুত লিঙ্ক",
    contactUs: "আমাদের সাথে যোগাযোগ করুন",
    email: "ইমেল",
    phone: "ফোন",
    address: "ঠিকানা",
    socialMedia: "আমাদের অনুসরণ করুন",
    facebook: "ফেসবুক",
    twitter: "টুইটার",
    linkedin: "লিংকডইন",
    copy: "সমস্ত অধিকার সংরক্ষিত।",
    analyze: "বিশ্লেষণ করুন",
    outbreakAlerts: "রোগের প্রাদুর্ভাব সতর্কতা",
    community: "সম্প্রদায়",
    pharmacistLocator: "ফার্মাসিস্ট লোকেটর",
    education: "শিক্ষা",
  },
  pa: {
    aboutTitle: "ਕ੍ਰਿਸ਼ੀ ਆਰੋਗਿਆ",
    aboutDescription:
      "ਕ੍ਰਿਸ਼ੀ ਆਰੋਗਿਆ ਇੱਕ ਏਆਈ-ਚਲਿਤ ਪਲੇਟਫਾਰਮ ਹੈ ਜੋ ਕਿਸਾਨਾਂ ਨੂੰ ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਦੀ ਪਛਾਣ ਕਰਨ ਅਤੇ ਉਹਨਾਂ ਦਾ ਸਮਰਥਨ ਨਾਲ ਇਲਾਜ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ। ਸਾਡਾ ਮਿਸ਼ਨ ਤਕਨੀਕ ਦਾ ਲਾਭ ਉਠਾ ਕੇ ਖੇਤੀਬਾੜੀ ਦੀ ਉਤਪਾਦਕਤਾ ਅਤੇ ਸਥਿਰਤਾ ਨੂੰ ਸੁਧਾਰਨਾ ਹੈ।",
    quickLinks: "ਫ਼ੌਰੀ ਲਿੰਕ",
    contactUs: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    email: "ਈਮੇਲ",
    phone: "ਫੋਨ",
    address: "ਪਤਾ",
    socialMedia: "ਸਾਨੂੰ ਫਾਲੋ ਕਰੋ",
    facebook: "ਫੇਸਬੁੱਕ",
    twitter: "ਟਵਿੱਟਰ",
    linkedin: "ਲਿੰਕਡਇਨ",
    copy: "ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।",
    analyze: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    outbreakAlerts: "ਬਿਮਾਰੀ ਚੇਤਾਵਨੀ",
    community: "ਸਮੂਹ",
    pharmacistLocator: "ਫਾਰਮਾਸਿਸਟ ਖੋਜਕ",
    education: "ਸਿੱਖਿਆ",
  },
  gu: {
    aboutTitle: "કૃષિ આરોગ્ય",
    aboutDescription:
      "કૃષિ આરોગ્ય એ એક એઆઈ-ચલિત પ્લેટફોર્મ છે જે ખેડૂતોને પાકની બીમારીઓ ઓળખવામાં અને અસરકારક રીતે મેનેજ કરવામાં મદદ કરે છે. અમારું ધ્યેય ટેકનોલોજીનો ઉપયોગ કરીને કૃષિની ઉત્પાદન ક્ષમતા અને સ્થિરતામાં સુધારો કરવાનો છે.",
    quickLinks: "ફાસ્ટ લિંક્સ",
    contactUs: "અમારો સંપર્ક કરો",
    email: "ઈમેલ",
    phone: "ફોન",
    address: "સરનામું",
    socialMedia: "અમને અનુસરો",
    facebook: "ફેસબુક",
    twitter: "ટ્વિટર",
    linkedin: "લિંકડઇન",
    copy: "બધા હક્કો સુરક્ષિત છે.",
    analyze: "વિશ્લેષણ કરો",
    outbreakAlerts: "રોગચાળો ચેતવણીઓ",
    community: "સમુદાય",
    pharmacistLocator: "ફાર્માસિસ્ટ શોધક",
    education: "શિક્ષણ",
  },
  ur: {
    aboutTitle: "کرشی آروگیا",
    aboutDescription:
      "کرشی آروگیا ایک اے آئی پر مبنی پلیٹ فارم ہے جو کسانوں کو فصل کی بیماریوں کی تشخیص اور ان کا مؤثر علاج کرنے میں مدد دیتا ہے۔ ہمارا مشن ٹیکنالوجی کو استعمال کر کے زرعی پیداوار اور استحکام کو بہتر بنانا ہے۔",
    quickLinks: "فوری روابط",
    contactUs: "ہم سے رابطہ کریں",
    email: "ای میل",
    phone: "فون",
    address: "پتہ",
    socialMedia: "ہمیں فالو کریں",
    facebook: "فیس بک",
    twitter: "ٹوئٹر",
    linkedin: "لنکڈ ان",
    copy: "تمام حقوق محفوظ ہیں۔",
    analyze: "تجزیہ کریں",
    outbreakAlerts: "وبا کی اطلاعات",
    community: "کمیونٹی",
    pharmacistLocator: "فارماسسٹ لوکیٹر",
    education: "تعلیم",
  },
};

// // Footer Component
// export default function Footer() {
//   const { language } = useLanguage();
//   const t = translation[language] || translation["en"];

//   return (
//     <Box component="footer" className={styles.footer}>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Box className={styles.footerContent}>
//           {/* Logo Section */}
//           <Box className={styles.logoSection}>
//             <img src="/images/logo.jpeg" alt="KRISHI AAROGYA Logo" />
//           </Box>
//           <Box className={styles.section}>
//             <Typography variant="h6" className={styles.footerTitle}>
//               {t.aboutTitle}
//             </Typography>
//             <Typography className={styles.footerDescription}>
//               {t.aboutDescription}
//             </Typography>
//           </Box>

//           <Box className={styles.section}>
//             <Typography variant="h6" className={styles.footerQuickLinksTitle}>
//               {t.quickLinks}
//             </Typography>
//             <List className={styles.footerQuickLinks}>
//               <ListItem>
//                 <Link href="#">{t.analyze}</Link>
//               </ListItem>
//               <ListItem>
//                 <Link href="#">{t.outbreakAlerts}</Link>
//               </ListItem>
//               <ListItem>
//                 <Link href="#">{t.community}</Link>
//               </ListItem>
//               <ListItem>
//                 <Link href="#">{t.pharmacistLocator}</Link>
//               </ListItem>
//               <ListItem>
//                 <Link href="#">{t.education}</Link>
//               </ListItem>
//             </List>
//           </Box>

//           <Box className={styles.section}>
//             <Typography variant="h6" className={styles.footerTitle}>
//               {t.contactUs}
//             </Typography>
//             <List className={styles.footerQuickLinks}>
//               <ListItem>
//                 <FontAwesomeIcon
//                   icon={faEnvelope}
//                   style={{ marginRight: "10px" }}
//                 />
//                 <Link href="mailto:support@cropnurture.com">{t.email}</Link>
//               </ListItem>
//               <ListItem>
//                 <FontAwesomeIcon
//                   icon={faPhoneAlt}
//                   style={{ marginRight: "10px" }}
//                 />
//                 <Link href="tel:+1234567890">{t.phone}</Link>
//               </ListItem>
//               <ListItem>
//                 <FontAwesomeIcon
//                   icon={faMapMarkerAlt}
//                   style={{ marginRight: "10px" }}
//                 />
//                 <Typography>{t.address}</Typography>
//               </ListItem>
//             </List>
//           </Box>
//         </Box>

//         <Divider className={styles.divider} />

//         <Box className={styles.socialMedia}>
//           <Link href="https://facebook.com" target="_blank">
//             <FontAwesomeIcon icon={faFacebook} />
//           </Link>
//           <Link href="https://twitter.com" target="_blank">
//             <FontAwesomeIcon icon={faTwitter} />
//           </Link>
//           <Link href="https://linkedin.com" target="_blank">
//             <FontAwesomeIcon icon={faLinkedin} />
//           </Link>
//         </Box>

//         <Typography className={styles.footerCopy}>{t.copy}</Typography>
//       </motion.div>
//     </Box>
//   );
// }






// Footer Component
export default function Footer() {
  const { language } = useLanguage();
  const t = translation[language] || translation["en"];

  return (
    <Box component="footer" className={styles.footer}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box className={styles.footerContent}>
          {/* Logo and Social Media Section */}
          <Box className={styles.logoSection}>
            <img src="/images/logo.jpeg" alt="KRISHI AAROGYA Logo" className={styles.footerLogo} />
            <Box className={styles.socialMedia}>
              <Link href="https://facebook.com" target="_blank">
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
            </Box>
          </Box>

          {/* About Section */}
          <Box className={styles.aboutSection}>
            <Typography variant="h6" className={styles.footerTitle}>
              {t.aboutTitle}
            </Typography>
            <Typography className={styles.footerDescription}>
              {t.aboutDescription}
            </Typography>
          </Box>

          {/* Quick Links Section */}
          <Box className={styles.linksSection}>
            <Box>
              <Typography variant="h6" className={styles.footerQuickLinksTitle}>
                {t.quickLinks}
              </Typography>
              <List className={styles.footerQuickLinks}>
                <ListItem>
                  <Link href="#">{t.analyze}</Link>
                </ListItem>
                <ListItem>
                  <Link href="#">{t.outbreakAlerts}</Link>
                </ListItem>
                <ListItem>
                  <Link href="#">{t.community}</Link>
                </ListItem>
                <ListItem>
                  <Link href="#">{t.pharmacistLocator}</Link>
                </ListItem>
                <ListItem>
                  <Link href="#">{t.education}</Link>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>

        <Divider className={styles.divider} />

        <Typography className={styles.footerCopy}>
          © 2024 KRISHI AAROGYA - {t.copy}
        </Typography>
      </motion.div>
    </Box>
  );
}