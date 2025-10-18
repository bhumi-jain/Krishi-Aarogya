
"use client";
import farmerAnimation1 from "../../public/animation3.json";
import farmerAnimation2 from "../../public/animation2.json";
import farmerAnimation3 from "../../public/animation.json";
import farmerAnimation4 from "../../public/animation4.json";  // Lottie animation  file
import { useEffect, useState } from "react";
import { useLanguage } from "../components/language";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

// Translation dictionary
const translations = {
  en: {
    title: "Welcome to Krishi Aarogya",
    subtitle:
      "Your AI-powered assistant for crop disease detection and management.",
    getStarted: "Get Started",
    features: "Our Features",
    feature1: {
      title: "Instant Crop Diagnosis",
      description:
        "Efficiently identify crop diseases with our cutting-edge AI-powered analysis tool. Simply upload an image of your crop, and our advanced algorithms will quickly analyze it to detect any signs of disease. Receive immediate insights and diagnostic results, enabling you to take swift action and minimize crop damage.",
    },
    feature2: {
      title: "Personalized Treatment",
      description:
        "Get customized treatment recommendations tailored to the specific condition of your crops. Based on the diagnostic results, our tool provides precise advice on the best practices, treatments, and interventions needed to address identified issues. This ensures that your crops receive the most effective care, enhancing their health and yield.",
    },
    feature3: {
      title: "Community Support",
      description:
        "Become a part of our vibrant community where you can engage with fellow farmers, exchange insights, and discuss best practices. Share your experiences, ask questions, and learn from others’ successes and challenges.",
    },
    feature4: {
      title: "Educational Resources",
      description:
        "Access a wide range of educational materials, including in-depth articles, video tutorials, and practical guides, to enhance your farming skills. Our resources cover essential topics such as disease prevention, nutrient management, and innovative farming techniques.",
    },
  },
  hi: {
    title: "कृषि आरोग्य में आपका स्वागत है",
    subtitle: "फसल रोग पहचान और प्रबंधन के लिए आपकी एआई-पावर्ड सहायक।",
    getStarted: "शुरू करें",
    features: "हमारी विशेषताएं",
    feature1: {
      title: "तत्काल फसल निदान",
      description:
        "हमारे अत्याधुनिक एआई-समर्थित विश्लेषण टूल के माध्यम से फसल के रोगों की कुशलता से पहचान करें। बस अपनी फसल की एक छवि अपलोड करें, और हमारे उन्नत एल्गोरिदम किसी भी बीमारी के लक्षणों का शीघ्रता से विश्लेषण करेंगे। त्वरित जानकारी और निदान परिणाम प्राप्त करें, जिससे आप तुरंत कार्रवाई कर सकें और फसल को होने वाले नुकसान को कम कर सकें।",
    },
    feature2: {
      title: "व्यक्तिगत उपचार",
      description:
        "अपनी फसलों की विशेष स्थिति के अनुरूप कस्टमाइज़्ड उपचार सिफारिशें प्राप्त करें। निदान परिणामों के आधार पर, हमारा टूल सर्वोत्तम प्रथाओं, उपचारों और हस्तक्षेपों पर सटीक सलाह प्रदान करता है ताकि पहचानी गई समस्याओं का समाधान किया जा सके। यह सुनिश्चित करता है कि आपकी फसल को सबसे प्रभावी देखभाल मिले, जिससे उनकी सेहत और उपज में सुधार हो।",
    },
    feature3: {
      title: "सामुदायिक समर्थन",
      description:
        "हमारे जीवंत समुदाय का हिस्सा बनें, जहाँ आप साथी किसानों के साथ बातचीत कर सकते हैं, अनुभव साझा कर सकते हैं और सर्वोत्तम प्रथाओं पर चर्चा कर सकते हैं। अपने अनुभव साझा करें, प्रश्न पूछें, और दूसरों की सफलताओं और चुनौतियों से सीखें।",
    },
    feature4: {
      title: "शैक्षिक संसाधन",
      description:
        "अपने खेती कौशल को निखारने के लिए गहन लेख, वीडियो ट्यूटोरियल और व्यावहारिक गाइड जैसे व्यापक शैक्षिक संसाधनों तक पहुँच प्राप्त करें। हमारे संसाधन रोग रोकथाम, पोषक तत्व प्रबंधन और नवीन कृषि तकनीकों जैसे आवश्यक विषयों को कवर करते हैं।",
    },
  },
  ta: {
    title: "கிருஷி ஆரோக்யா வரவேற்கிறது",
    subtitle: "பயிர் நோய்களை கண்டறிய மற்றும் நிர்வகிக்க AI உதவி செய்கிறது.",
    getStarted: "தொடங்கவும்",
    features: "எங்கள் அம்சங்கள்",
    feature1: {
      title: "உடனடி பயிர் நோய் கண்டறிதல்",
      description:
        "நவீன AI-ஆதாரமிக்க பகுப்பாய்வு கருவியின் மூலம் உங்கள் பயிர் நோய்களை விரைவாக கண்டறியுங்கள். உங்கள் பயிரின் ஒரு படத்தை பதிவேற்றம் செய்யுங்கள், மற்றும் எங்கள் மேம்பட்ட அல்காரிதம்கள் நோய் அறிகுறிகளை துல்லியமாக பகுப்பாய்வு செய்து முடிவுகளை வழங்கும். உடனடி தகவல்களும் கண்டறிதல் முடிவுகளும் கிடைத்து, நீங்கள் விரைவாக செயல்பட்டு பயிர் சேதத்தை குறைக்க முடியும்.",
    },
    feature2: {
      title: "தனிப்பட்ட சிகிச்சை பரிந்துரைகள்",
      description:
        "உங்கள் பயிர்களின் குறிப்பிட்ட நிலைக்கு ஏற்ப தனிப்பயனாக்கப்பட்ட சிகிச்சை பரிந்துரைகளை பெறுங்கள். கண்டறிதல் முடிவுகளின் அடிப்படையில், எங்கள் கருவி சிறந்த நடைமுறைகள், சிகிச்சைகள் மற்றும் தீர்வுகளை துல்லியமாக வழங்குகிறது. இது உங்கள் பயிர்கள் மிகவும் பயனுள்ள பராமரிப்பைப் பெறுவதை உறுதி செய்கிறது, மற்றும் அதன் ஆரோக்கியத்தையும் விளைச்சலையும் மேம்படுத்துகிறது.",
    },
    feature3: {
      title: "சமூக ஆதரவு",
      description:
        "நம்முடைய உற்சாகமான சமூகத்தின் ஒரு பகுதியாகி, மற்ற விவசாயிகளுடன் கலந்துரையாடுங்கள், தகவல்களைப் பகிர்ந்து கொள்ளுங்கள் மற்றும் சிறந்த முறைகளைப் பற்றி அறிந்து கொள்ளுங்கள். உங்கள் அனுபவங்களை பகிர்ந்து கொள்ளுங்கள், கேள்விகள் கேளுங்கள் மற்றும் மற்றவர்களின் வெற்றிகள் மற்றும் சவால்களில் இருந்து கற்றுக் கொள்ளுங்கள்.",
    },
    feature4: {
      title: "கல்வி வளங்கள்",
      description:
        "உங்கள் விவசாயத் திறமைகளை மேம்படுத்துவதற்கான விரிவான கல்வி வளங்களை அணுகுங்கள், இதில் ஆழமான கட்டுரைகள், வீடியோ பாடங்கள் மற்றும் நடைமுறை வழிகாட்டுதல்கள் அடங்கும். நம் வளங்கள் நோய் தடுப்பு, ஊட்டச்சத்து மேலாண்மை மற்றும் புதுமையான விவசாய நுட்பங்கள் போன்ற முக்கியமான தலைப்புகளை உள்ளடக்கியவை.",
    },
  },
  te: {
    title: "కృష్ణి ఆరోగ్యకు స్వాగతం",
    subtitle: "పంట రోగ నిర్ధారణ మరియు నిర్వహణ కోసం మీ AI-సహాయకుడు.",
    getStarted: "ప్రారంభించండి",
    features: "మా ఫీచర్లు",
    feature1: {
      title: "తక్షణ పంట రోగ నిర్ధారణ",
      description:
        "మా అత్యాధునిక AI ఆధారిత విశ్లేషణ సాధనంతో మీ పంట రోగాలను సులభంగా గుర్తించండి. మీ పంట యొక్క చిత్రాన్ని అప్‌లోడ్ చేయండి, మరియు మా అధునాతన అల్గోరిథములు రోగ లక్షణాలను శీఘ్రంగా విశ్లేషించి, తక్షణ ఫలితాలను అందిస్తాయి. అవసరమైన సమాచారంతో రోగ నిర్ధారణ చేయబడతాయి, ఇది వేగంగా చర్య తీసుకోవడానికి మరియు పంట నష్టాన్ని తగ్గించడానికి సహాయపడుతుంది.",
    },
    feature2: {
      title: "వ్యక్తిగత చికిత్స సిఫారసులు",
      description:
        "మీ పంటల ప్రత్యేక పరిస్థితికి అనుగుణంగా వ్యక్తిగత చికిత్స సూచనలను పొందండి. నిర్ధారణ ఫలితాల ఆధారంగా, మా సాధనం అత్యుత్తమ పద్ధతులు, చికిత్సలు మరియు పరిష్కారాలపై ఖచ్చితమైన సలహాలను అందిస్తుంది. ఇది మీ పంటలకు అత్యంత సమర్థవంతమైన సంరక్షణ అందడం నిర్ధారించి వాటి ఆరోగ్యాన్ని మరియు దిగుబడిని పెంచుతుంది.",
    },
    feature3: {
      title: "సమూహ మద్దతు",
      description:
        "మా సమర్థవంతమైన సమాజంలో భాగమై ఇతర రైతులతో చర్చలు జరపండి, మీ జ్ఞానాన్ని పంచుకోండి మరియు ఉత్తమ పద్ధతుల గురించి తెలుసుకోండి. మీ అనుభవాలను పంచుకోండి, ప్రశ్నలు అడగండి మరియు ఇతరుల విజయాలు మరియు సవాళ్ల నుంచి నేర్చుకోండి.",
    },
    feature4: {
      title: "విద్యా వనరులు",
      description:
        "మీ వ్యవసాయ నైపుణ్యాలను మెరుగుపరచడానికి లోతైన వ్యాసాలు, వీడియో ట్యుటోరియల్స్ మరియు ఉపయోగకరమైన మార్గదర్శకాలతో కూడిన విద్యా వనరులను పొందండి. మా వనరులు రోగ నిరోధం, పోషక నిర్వహణ మరియు ఆధునిక వ్యవసాయ సాంకేతికతల వంటి ముఖ్యమైన అంశాలను కవర్ చేస్తాయి.",
    },
  },
  kn: {
    title: "ಕೃಷಿ ಆರೋಗ್ಯಕ್ಕೆ ಸ್ವಾಗತ",
    subtitle: "ಪಂಟ ರೋಗ ಪತ್ತೆ ಮತ್ತು ನಿರ್ವಹಣೆಗೆ ನಿಮ್ಮ AI ಸಹಾಯಕ.",
    getStarted: "ಆರಂಭಿಸಿ",
    features: "ನಮ್ಮ ವೈಶಿಷ್ಟ್ಯಗಳು",
    feature1: {
      title: "ತಕ್ಷಣದ ಬೆಳೆ ರೋಗ ಪತ್ತೆ",
      description:
        "ನಮ್ಮ ತಂತ್ರಜ್ಞಾನ-ನಿರ್ಧಿಷ್ಟ AI-ಚಾಲಿತ ವಿಶ್ಲೇಷಣಾ ಸಾಧನದಿಂದ ಬೆಳೆ ರೋಗಗಳನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಗುರುತಿಸಿ. ನಿಮ್ಮ ಬೆಳೆ ಚಿತ್ರದೊಂದಿಗೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ಮತ್ತು ನಮ್ಮ ಸುಧಾರಿತ ಅಲ್ಗಾರಿದಮ್ಗಳು ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ತ್ವರಿತವಾಗಿ ವಿಶ್ಲೇಷಿಸುತ್ತವೆ. ತಕ್ಷಣದ ಫಲಿತಾಂಶಗಳು ಮತ್ತು ನಿಖರವಾದ ಮಾಹಿತಿ ನಿಮ್ಮನ್ನು ಬೇಗನೆ ಕ್ರಮ ಕೈಗೊಳ್ಳಲು ಹಾಗೂ ಬೆಳೆ ಹಾನಿಯನ್ನು ಕಡಿಮೆ ಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.",
    },
    feature2: {
      title: "ವೈಯಕ್ತಿಕ ಚಿಕಿತ್ಸೆ",
      description:
        "ನಿಮ್ಮ ಬೆಳೆಗಳ ನಿರ್ದಿಷ್ಟ ಸ್ಥಿತಿಗೆ ತಕ್ಕಂತೆ ಕಸ್ಟಮೈಸ್ ಮಾಡಲಾದ ಚಿಕಿತ್ಸಾ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ. ರೋಗನಿರ್ಣಯ ಫಲಿತಾಂಶಗಳ ಆಧಾರದ ಮೇಲೆ, ನಮ್ಮ ಸಾಧನವು ಶ್ರೇಷ್ಠ ವಿಧಾನಗಳು, ಚಿಕಿತ್ಸೆಗಳು ಮತ್ತು ಪರಿಹಾರಗಳ ಕುರಿತು ನಿಖರವಾದ ಸಲಹೆಗಳನ್ನು ನೀಡುತ್ತದೆ. ಇದು ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಪರಿಣಾಮಕಾರಿಯಾದ ಆರೈಕೆ ಒದಗಿಸಿ, ಆರೋಗ್ಯ ಮತ್ತು ಉತ್ಪಾದಕತೆ ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    },
    feature3: {
      title: "ಸಮುದಾಯ ಬೆಂಬಲ",
      description:
        "ನಮ್ಮ ಸಕ್ರಿಯ ಸಮುದಾಯದ ಭಾಗವಾಗಿರಿ, ಇಲ್ಲಿ ನೀವು ಇತರ ರೈತებთან ಸಂವಹಿಸಬಹುದು, ಉತ್ತಮ ಅಭ್ಯಾಸಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಬಹುದು ಮತ್ತು ಜ್ಞಾನವನ್ನು ವಿನಿಮಯ ಮಾಡಿಕೊಳ್ಳಬಹುದು. ನಿಮ್ಮ ಅನುಭವಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ, ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ಇತರರ ಯಶಸ್ಸು ಮತ್ತು ಸವಾಲುಗಳಿಂದ ಕಲಿಯಿರಿ.",
    },
    feature4: {
      title: "ಶಿಕ್ಷಣ ಸಂಪತ್ತು",
      description:
        "ನಿಮ್ಮ ಕೃಷಿ ಕೌಶಲ್ಯವನ್ನು ಬೆಳೆಸಲು ಆಳವಾದ ಲೇಖನಗಳು, ವೀಡಿಯೊ ಪಾಠಗಳು ಮತ್ತು ಉಪಯುಕ್ತ ಮಾರ್ಗದರ್ಶಿಗಳಂತಹ ಶೈಕ್ಷಣಿಕ ಸಂಪತ್ತನ್ನು ಪ್ರವೇಶಿಸಿ. ನಮ್ಮ ಸಂಪತ್ತು ರೋಗ ತಡೆಗಟ್ಟುವಿಕೆ, ಪೋಷಕ ತಾಣ ನಿರ್ವಹಣೆ ಮತ್ತು ನಾವೀನ್ಯತೆಯ ಕೃಷಿ ತಂತ್ರಗಳಂತಹ ಪ್ರಮುಖ ವಿಷಯಗಳನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ.",
    },
  },
  ml: {
    title: "കൃഷി ആരോഗ്യയിലെ സ്വാഗതം",
    subtitle: "പുളളിന്റെ രോഗ നിർണയം നിർവഹിക്കാൻ നിങ്ങളുടെ AI സഹായി.",
    getStarted: "ആരംഭിക്കുക",
    features: "നമ്മുടെ സവിശേഷതകൾ",
    feature1: {
      title: "തുരങ്കം.crop രോഗനിർണ്ണയം",
      description:
        "നമ്മുടെ അത്യാധുനിക AI സാങ്കേതികവിദ്യ ഉപയോഗിച്ചുള്ള വിശകലന ഉപകരണം വഴി തുരങ്കം.crop രോഗങ്ങൾ കാര്യക്ഷമമായി തിരിച്ചറിയുക. നിങ്ങളുടെ തുരങ്കം.cropയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക, ഞങ്ങളുടെ മുൻനിര അല്ഗോരിതങ്ങൾ രോഗലക്ഷണങ്ങൾ വേഗത്തിൽ വിശകലനം ചെയ്ത് അതിന്റെ വിവരങ്ങൾ ഉടനടി നൽകും. നിങ്ങൾക്ക് ത്വരിതമായ നടപടികൾ സ്വീകരിക്കാൻ സാധിക്കുവാനും തുരങ്കം.crop നാശം കുറയ്ക്കാനും സഹായിക്കുന്നു.",
    },
    feature2: {
      title: "ഇഷ്‌ടാനുസൃത ചികിത്സ",
      description:
        "നിങ്ങളുടെ തുരങ്കം.cropയുടെ പ്രത്യേക അവസ്ഥയനുസരിച്ചു സാന്ദീപിക ചികിത്സാ ശുപാർശകൾ നേടുക. രോഗനിർണ്ണയ ഫലങ്ങളുടെ അടിസ്ഥാനത്തിൽ, ഞങ്ങളുടെ ഉപകരണം മികച്ച മാർഗങ്ങളും ചികിത്സകളും പരിഹാരങ്ങളും സംബന്ധിച്ച കൃത്യമായ ഉപദേശം നൽകുന്നു. ഇതുവഴി തുരങ്കം.crop ഉത്തമ പരിചരണം ലഭിച്ചു ആരോഗ്യം വർദ്ധിക്കുകയും വിളവെടുപ്പ് മെച്ചപ്പെടുത്തുകയും ചെയ്യും.",
    },
    feature3: {
      title: "സമൂഹ പിന്തുണ",
      description:
        "നിങ്ങൾക്ക് സമാനമായ തുരങ്കം.crop കർഷകരുമായി സംവദിക്കുകയും പരിജ്ഞാനം കൈമാറുകയും മികച്ച പ്രവർത്തനങ്ങളിലൂടെ വിജയങ്ങൾ ആഘോഷിക്കുകയും ചെയ്യാൻ കഴിയുന്ന ഞങ്ങളുടെ സജീവ സമൂഹത്തിൽ അംഗമാകുക. നിങ്ങളുടെ അനുഭവങ്ങൾ പങ്കുവയ്ക്കുക, ചോദ്യങ്ങൾ ചോദിക്കുക, മറ്റു കർഷകരുടെ വിജയങ്ങളിൽ നിന്നും വെല്ലുവിളികളിൽ നിന്നും പഠിക്കുക.",
    },
    feature4: {
      title: "വിദ്യാഭ്യാസ വിഭവങ്ങൾ",
      description:
        "നിങ്ങളുടെ കൃഷി കഴിവുകൾ വികസിപ്പിക്കാൻ ആഴത്തിലുള്ള ലേഖനങ്ങൾ, വീഡിയോകളും പ്രായോഗിക മാർഗ്ഗനിർദ്ദേശങ്ങളും ഉൾപ്പെടെ വിവിധ വിദ്യാഭ്യാസ വിഭവങ്ങൾ പ്രാപ്തമാക്കുക. ഞങ്ങളുടെ വിഭവങ്ങൾ രോഗ പ്രതിരോധം, പോഷകസംഭരണവും പുതുമയാർന്ന കൃഷി സാങ്കേതികവിദ്യകളും ഉൾപ്പെടെയുള്ള പ്രധാന വിഷയങ്ങൾ ഉൾക്കൊള്ളുന്നു.",
    },
  },
  mr: {
    title: "कृषी आरोग्यामध्ये तुमचे स्वागत आहे",
    subtitle: "पिकांच्या रोगनिदान आणि व्यवस्थापनासाठी तुमचा AI सहाय्यक.",
    getStarted: "सुरु करा",
    features: "आमचे वैशिष्ट्ये",
    feature1: {
      title: "त्वरित पिक रोग निदान",
      description:
        "आमच्या अत्याधुनिक AI-सक्षम विश्लेषण साधनाने पिकांचे रोग जलदगतीने ओळखा. तुमच्या पिकाचा फोटो अपलोड करा आणि आमचे प्रगत अल्गोरिदम त्वरित रोगाचे लक्षणे तपासून त्याचे निदान देतील. वेळीच माहिती मिळवा आणि तत्काळ कृती करून पिकांच्या नुकसानापासून बचाव करा.",
    },
    feature2: {
      title: "वैयक्तिकृत उपचार",
      description:
        "तुमच्या पिकांच्या विशेष स्थितीनुसार सानुकूलित उपचार शिफारशी मिळवा. निदानाच्या निकालांवर आधारित, आमचे साधन तुमच्या पिकासाठी सर्वोत्तम उपाययोजना, उपचार आणि पद्धतींची अचूक माहिती देते. हे तुमच्या पिकांचे आरोग्य सुधारण्यास आणि उत्पादन वाढविण्यास मदत करते.",
    },
    feature3: {
      title: "समुदाय समर्थन",
      description:
        "आमच्या सक्रिय समुदायाचा भाग बना, जिथे तुम्ही इतर शेतकऱ्यांशी संवाद साधू शकता, अनुभव शेअर करू शकता आणि उत्तम पद्धतींबद्दल चर्चा करू शकता. तुमचे अनुभव शेअर करा, प्रश्न विचारा आणि इतरांच्या यश-अपयशातून शिकण्याचा प्रयत्न करा.",
    },
    feature4: {
      title: "शैक्षणिक संसाधने",
      description:
        "तुमच्या शेती कौशल्यांना चालना देण्यासाठी विस्तृत शैक्षणिक सामग्री, ज्यामध्ये सखोल लेख, व्हिडिओ ट्यूटोरियल्स आणि प्रायोगिक मार्गदर्शने समाविष्ट आहेत, यांचा लाभ घ्या. आमची संसाधने रोग प्रतिबंध, पोषण व्यवस्थापन आणि नाविन्यपूर्ण शेती तंत्रज्ञान यांसारख्या महत्त्वाच्या विषयांवर आधारित आहेत.",
    },
  },
  bn: {
    title: "কৃষি আরোগ্য-তে আপনাকে স্বাগতম",
    subtitle: "শস্য রোগ সনাক্তকরণ এবং ব্যবস্থাপনার জন্য আপনার AI সহায়ক।",
    getStarted: "শুরু করুন",
    features: "আমাদের বৈশিষ্ট্য",
    feature1: {
      title: "তাৎক্ষণিক ফসল রোগ নির্ণয়",
      description:
        "আমাদের অত্যাধুনিক AI-চালিত বিশ্লেষণ টুলের সাহায্যে সহজেই ফসলের রোগ সনাক্ত করুন। শুধু আপনার ফসলের একটি ছবি আপলোড করুন, আর আমাদের উন্নত অ্যালগরিদম দ্রুত বিশ্লেষণ করে রোগের যে কোনো লক্ষণ সনাক্ত করবে। অবিলম্বে ফলাফল এবং অন্তর্দৃষ্টি পান, যাতে দ্রুত ব্যবস্থা নিতে পারেন এবং ফসলের ক্ষতি কমাতে পারেন।",
    },
    feature2: {
      title: "ব্যক্তিগত চিকিৎসা পরামর্শ",
      description:
        "আপনার ফসলের নির্দিষ্ট অবস্থার জন্য ব্যক্তিগতকৃত চিকিৎসা পরামর্শ পান। নির্ণয়ের ফলাফলের উপর ভিত্তি করে, আমাদের টুল আপনাকে সঠিক পদ্ধতি, চিকিৎসা ও হস্তক্ষেপের সুপারিশ প্রদান করবে। এটি নিশ্চিত করবে যে আপনার ফসল সর্বোত্তম যত্ন পাচ্ছে, যা তাদের স্বাস্থ্য এবং উৎপাদনশীলতা বাড়াতে সাহায্য করবে।",
    },
    feature3: {
      title: "কমিউনিটি সাপোর্ট",
      description:
        "আমাদের সক্রিয় কমিউনিটির অংশ হয়ে উঠুন যেখানে আপনি অন্যান্য কৃষকদের সাথে যোগাযোগ করতে পারবেন, অভিজ্ঞতা শেয়ার করতে পারবেন এবং সেরা চর্চাগুলি নিয়ে আলোচনা করতে পারবেন। আপনার অভিজ্ঞতা শেয়ার করুন, প্রশ্ন জিজ্ঞাসা করুন এবং অন্যদের সাফল্য ও চ্যালেঞ্জ থেকে শিখুন।",
    },
    feature4: {
      title: "শিক্ষামূলক সম্পদ",
      description:
        "আপনার কৃষি দক্ষতা উন্নত করতে আমাদের বিস্তৃত শিক্ষামূলক সামগ্রী অ্যাক্সেস করুন, যার মধ্যে রয়েছে বিশদ নিবন্ধ, ভিডিও টিউটোরিয়াল এবং ব্যবহারিক গাইড। আমাদের সম্পদ রোগ প্রতিরোধ, পুষ্টি ব্যবস্থাপনা এবং উদ্ভাবনী চাষাবাদ কৌশলসহ গুরুত্বপূর্ণ বিষয়গুলি কভার করে।",
    },
  },
  pa: {
    title: "ਕ੍ਰਿਸ਼ੀ ਆਰੋਗਿਆ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
    subtitle: "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਪਛਾਣ ਅਤੇ ਪ੍ਰਬੰਧਨ ਲਈ ਤੁਹਾਡਾ ਏਆਈ ਸਹਾਇਕ।",
    getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
    features: "ਸਾਡੇ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    feature1: {
      title: "ਤੁਰੰਤ ਫ਼ਸਲ ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ",
      description:
        "ਸਾਡੇ ਉੱਚ-ਤਕਨੀਕੀ AI-ਚਲਿਤ ਵਿਸ਼ਲੇਸ਼ਣ ਟੂਲ ਦੀ ਮਦਦ ਨਾਲ ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਨੂੰ ਤੇਜ਼ੀ ਨਾਲ ਪਛਾਣੋ। ਸਿਰਫ਼ ਆਪਣੀ ਫਸਲ ਦੀ ਤਸਵੀਰ ਅੱਪਲੋਡ ਕਰੋ, ਅਤੇ ਸਾਡੇ ਵਿਕਸਿਤ ਐਲਗੋਰਿਥਮ ਉਸ ਨੂੰ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ ਕਿਸੇ ਵੀ ਬਿਮਾਰੀ ਦੇ ਨਿਸ਼ਾਨਾਂ ਨੂੰ ਖੋਜਣਗੇ। ਤੁਰੰਤ ਨਤੀਜੇ ਅਤੇ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ, ਜਦੋਂ ਤੁਸੀਂ ਫੌਰੀ ਕਾਰਵਾਈ ਕਰਕੇ ਫਸਲ ਦੇ ਨੁਕਸਾਨ ਨੂੰ ਘਟਾ ਸਕਦੇ ਹੋ।",
    },
    feature2: {
      title: "ਨਿੱਜੀ ਇਲਾਜ ਸਿਫਾਰਸ਼ਾਂ",
      description:
        "ਆਪਣੀ ਫਸਲ ਦੀ ਖਾਸ ਹਾਲਤ ਦੇ ਮੁਤਾਬਕ ਨਿੱਜੀ ਇਲਾਜ ਦੀ ਸਿਫਾਰਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ। ਵਿਸ਼ਲੇਸ਼ਣ ਦੇ ਨਤੀਜਿਆਂ ਦੇ ਅਧਾਰ 'ਤੇ, ਸਾਡਾ ਟੂਲ ਤੁਹਾਨੂੰ ਸਹੀ ਤਰੀਕਿਆਂ, ਇਲਾਜ ਅਤੇ ਹੱਲਾਂ ਬਾਰੇ ਸਹੀ ਜਾਣਕਾਰੀ ਦਿੰਦਾ ਹੈ। ਇਸ ਨਾਲ ਇਹ ਯਕੀਨੀ ਬਣੇਗਾ ਕਿ ਤੁਹਾਡੀ ਫਸਲ ਨੂੰ ਸਭ ਤੋਂ ਵਧੀਆ ਸੰਭਾਲ ਮਿਲਦੀ ਹੈ, ਜਿਸ ਨਾਲ ਉਸ ਦੀ ਸਿਹਤ ਅਤੇ ਉਤਪਾਦਨ ਵਿੱਚ ਵਾਧਾ ਹੋਵੇਗਾ।",
    },
    feature3: {
      title: "ਕਮਿਊਨਿਟੀ ਸਹਿਯੋਗ",
      description:
        "ਸਾਡੇ ਚੁਸਤ ਕਮਿਊਨਿਟੀ ਦਾ ਹਿੱਸਾ ਬਣੋ, ਜਿੱਥੇ ਤੁਸੀਂ ਹੋਰ ਕਿਸਾਨਾਂ ਨਾਲ ਗੱਲਬਾਤ ਕਰ ਸਕਦੇ ਹੋ, ਤਜਰਬੇ ਸਾਂਝੇ ਕਰ ਸਕਦੇ ਹੋ ਅਤੇ ਵਧੀਆ ਤਜਰਬਿਆਂ ਬਾਰੇ ਚਰਚਾ ਕਰ ਸਕਦੇ ਹੋ। ਆਪਣੇ ਤਜਰਬੇ ਸਾਂਝੇ ਕਰੋ, ਸਵਾਲ ਪੁੱਛੋ ਅਤੇ ਹੋਰਾਂ ਦੀਆਂ ਸਫਲਤਾਵਾਂ ਅਤੇ ਚੁਣੌਤੀਆਂ ਤੋਂ ਸਿੱਖੋ।",
    },
    feature4: {
      title: "ਸ਼ਿਖਿਆਵਾਂ ਦੀਆਂ ਵਸਾਧਨ",
      description:
        "ਕਿਸਾਨੀ ਦੀਆਂ ਨਵੀਆਂ ਤਕਨੀਕਾਂ ਅਤੇ ਸਿੱਖਣ ਦੀ ਕਲਾ ਵਿੱਚ ਆਪਣੀ ਕਾਬਲੀਅਤ ਨੂੰ ਵਿਕਸਤ ਕਰਨ ਲਈ ਸਾਡੇ ਵਿਆਪਕ ਸਿੱਖਿਆਵਾਂ ਦੀਆਂ ਸਮਗ੍ਰੀਆਂ ਨੂੰ ਐਕਸੈਸ ਕਰੋ। ਸਾਡੇ ਵਿਚਾਰ ਸ਼ਾਮਲ ਕਰਦੇ ਹਨ ਵਿਸਤ੍ਰਿਤ ਲੇਖ, ਵੀਡੀਓ ਟਿਊਟੋਰਿਅਲਾਂ ਅਤੇ ਵਿਹਾਰਕ ਗਾਈਡਾਂ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਰੋਗ-ਰੋਕਥਾਮ, ਪੋਸ਼ਣ ਪ੍ਰਬੰਧਨ ਅਤੇ ਨਵੀਨਤਮ ਖੇਤੀਬਾੜੀ ਤਕਨੀਕਾਂ ਨੂੰ ਕਵਰ ਕੀਤਾ ਗਿਆ ਹੈ।",
    },
  },
  gu: {
    title: "કૃષિ આરોગ્યમાં આપનું સ્વાગત છે",
    subtitle: "પાકના રોગ નિદાન અને વ્યવસ્થાપન માટે તમારું AI સહાયક.",
    getStarted: "શરુ કરો",
    features: "અમારી વિશેષતાઓ",
    feature1: {
      title: "તાત્કાલિક પાક રોગ નિદાન",
      description:
        "અમારા અદ્યતન AI-આધારિત વિશ્લેષણ ટૂલની મદદથી ઝડપી રીતે પાક રોગોને ઓળખો. ફક્ત તમારા પાકનો ફોટો અપલોડ કરો અને અમારા અદ્યતન અલ્ગોરિધમ્સ તેને વિશ્લેષણ કરી રોગના કોઈપણ સંકેતો શોધશે. તાત્કાલિક ફલિતો અને નિદાનના પરિણામો મેળવો, જેથી તમે ઝડપી પગલાં લઈ શકો અને પાકને નુકસાનથી બચાવી શકો.",
    },
    feature2: {
      title: "વ્યક્તિગત સારવાર સલાહ",
      description:
        "તમારા પાકની વિશિષ્ટ સ્થિતિ માટે કસ્ટમાઇઝ્ડ સારવારની ભલામણો મેળવો. નિદાનના પરિણામો પર આધાર રાખીને, અમારું ટૂલ તમારે શું કરવું જોઈએ તે વિશે ચોક્કસ સલાહ પૂરી પાડે છે, જેમાં શ્રેષ્ઠ પદ્ધતિઓ, સારવાર અને યોગ્ય પગલાંનો સમાવેશ થાય છે. આ તમારા પાકને શ્રેષ્ઠ સંભાળ આપવાનું સુનિશ્ચિત કરે છે અને તેના સ્વાસ્થ્ય અને ઉપજમાં વધારો કરે છે.",
    },
    feature3: {
      title: "સામુદાયિક સહયોગ",
      description:
        "અમારા જીવંત સમુદાયનો ભાગ બનો જ્યાં તમે અન્ય ખેડુતો સાથે જોડાઈ શકો, અનુભવો શેર કરી શકો અને શ્રેષ્ઠ પદ્ધતિઓ પર ચર્ચા કરી શકો. તમારા અનુભવો વહેંચો, પ્રશ્નો પૂછો અને અન્ય લોકોની સફળતાઓ અને પડકારોમાંથી શીખો.",
    },
    feature4: {
      title: "શૈક્ષણિક સંસાધનો",
      description:
        "ખેડુતની કુશળતામાં વધારો કરવા માટે અમારા વ્યાપક શૈક્ષણિક સામગ્રીનો ઉપયોગ કરો. અમે વિગતવાર લેખો, વિડિયો ટ્યુટોરીયલ્સ અને વ્યવહારૂ માર્ગદર્શિકાઓ પ્રદાન કરીએ છીએ, જે રોગ પ્રતિકારકતા, પોષણ વ્યવસ્થાપન અને નવીન ખેતી તકનીકો જેવા મહત્વપૂર્ણ વિષયો કવર કરે છે.",
    },
  },
  ur: {
    title:  "کرشی آروگیہ میں خوش آمدید",
    subtitle: "فصل کی بیماری کی تشخیص اور انتظام کے لیے آپ کا اے آئی معاون۔",
    getStarted: "شروع کریں",
    features: "ہماری خصوصیات",
    feature1: {
      title: "فوری فصل کی تشخیص",
      description:
        "ہمارے جدید AI-مبنی تجزیاتی ٹول کے ذریعے فصلوں کی بیماریوں کی مؤثر طریقے سے شناخت کریں۔ بس اپنی فصل کی تصویر اپ لوڈ کریں، اور ہمارے جدید الگورڈمز اس کا تجزیہ کریں گے تاکہ کسی بھی بیماری کے علامات کا پتہ چل سکے۔ فوری بصیرت اور تشخیصی نتائج حاصل کریں، جو آپ کو تیز عمل کرنے اور فصلوں کے نقصان کو کم کرنے میں مدد فراہم کرتے ہیں۔",
    },
    feature2: {
      title: "ذاتی علاج کی تجویز",
      description:
        "اپنی فصلوں کی مخصوص حالت کے مطابق ذاتی علاج کی تجویز حاصل کریں۔ تشخیصی نتائج کی بنیاد پر، ہمارا ٹول بہترین طریقوں، علاج اور مداخلتوں کے بارے میں درست مشورے فراہم کرتا ہے جو شناخت شدہ مسائل کو حل کرنے کے لئے ضروری ہیں۔ اس سے یہ یقینی بنتا ہے کہ آپ کی فصلوں کو سب سے مؤثر دیکھ بھال ملے، جس سے ان کی صحت اور پیداوار میں اضافہ ہوتا ہے۔",
    },
    feature3: {
      title: "کمیونٹی سپورٹ",
      description:
        "ہمارے جاندار کمیونٹی کا حصہ بنیں جہاں آپ دوسرے کسانوں کے ساتھ بات چیت کر سکتے ہیں، بصیرت کا تبادلہ کر سکتے ہیں، اور بہترین طریقوں پر بات کر سکتے ہیں۔ اپنے تجربات شیئر کریں، سوالات پوچھیں، اور دوسروں کی کامیابیوں اور چیلنجز سے سیکھیں۔",
    },
    feature4: {
      title: "تعلیمی وسائل",
      description:
        "تعلیمی مواد کی ایک وسیع رینج تک رسائی حاصل کریں، بشمول تفصیلی مضامین، ویڈیو ٹیوٹوریلز، اور عملی رہنمائی جو آپ کی زرعی مہارتوں کو بڑھانے کے لئے ہیں۔ ہمارے وسائل بیماریوں کی روک تھام، غذائیت کے انتظام، اور جدید زرعی تکنیکوں جیسے اہم موضوعات کو شامل کرتے ہیں۔",
    },
  },
};

export default function Home() {
  const { language } = useLanguage(); // Fetch current language
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [userType, setUserType] = useState('customer');
  const [messages, setMessages] = useState([
    { text: 'Hi there! How can I help you today? Are you a farmer or a customer?', sender: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const images = [
    "/images/img_bk.png",
    "/images/background-image_2.png",
    "/images/background-image_3.png",
  ];
  
  const { ref: treeRef, inView: treeInView } = useInView({ triggerOnce: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const t = translations[language];

  // Common FAQs for quick responses
  const faqs = {
    customer: {
      'opening hours': 'Our farmers market is open Monday to Saturday, 8am to 6pm.',
      'delivery': 'Yes, we offer delivery for orders above $30 within a 10-mile radius.',
      'organic': 'All our produce is certified organic and locally sourced.',
      'payment': 'We accept cash, credit cards, and mobile payments.',
      'return policy': 'We have a satisfaction guarantee. If you are not happy with your purchase, we will replace it or refund you.'
    },
    farmer: {
      'join market': 'To join our farmers market, please fill out the application form on our website under "Vendor Information".',
      'fees': 'The booth fee is $50 per day or $200 for a weekly spot.',
      'requirements': 'All vendors must provide proof of insurance and appropriate certifications.',
      'setup time': 'Vendor setup begins at 6am, and you must be ready by 7:30am.',
      'sell online': 'Yes, we offer an online marketplace option for all our vendors.'
    }
  };

  // Handle chat toggle
  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  // Handle user type selection
  const handleUserTypeChange = (type) => {
    setUserType(type);
    addMessage(`You are now chatting as a ${type}. How can I help you?`, 'bot');
  };

  // Add message to chat
  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    addMessage(userInput, 'user');
    setUserInput('');
    setIsTyping(true);
    
    // Process the message after a short delay
    setTimeout(() => processMessage(userInput), 1000);
  };

  // Process message and generate response
  const processMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    let response = null;
    
    // Check FAQs first for quick responses
    for (const [key, value] of Object.entries(faqs[userType])) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }
    
    if (response) {
      // Show response
      setIsTyping(false);
      addMessage(response, 'bot');
    } else {
      // Use simulated API response for demo
      fetchGeminiResponse(message);
    }
  };

  // Simulate Gemini API call
  const fetchGeminiResponse = async (message) => {
    try {
      // Simulate a response based on user type
      let botResponse = '';
      if (userType === 'farmer') {
        if (message.toLowerCase().includes('pest')) {
          botResponse = 'For pest control, consider integrated pest management (IPM) techniques that use natural predators and organic sprays before resorting to chemicals.';
        } else if (message.toLowerCase().includes('soil')) {
          botResponse = 'Healthy soil is the foundation of successful farming. Consider regular testing and using cover crops to maintain soil health.';
        } else if (message.toLowerCase().includes('weather')) {
          botResponse = 'Weather patterns are becoming more unpredictable. Consider installing irrigation systems and using weather-resistant crop varieties.';
        } else {
          botResponse = 'That\'s a great farming question. I\'d recommend consulting with your local agricultural extension office for specific advice tailored to your region.';
        }
      } else {
        if (message.toLowerCase().includes('season')) {
          botResponse = 'We have seasonal produce all year round! Currently, we have fresh apples, pumpkins, and late-season berries available.';
        } else if (message.toLowerCase().includes('price')) {
          botResponse = 'Our prices are competitive and reflect the quality of our locally-grown produce. We also offer weekly specials!';
        } else if (message.toLowerCase().includes('recipe')) {
          botResponse = 'We have a collection of seasonal recipes available at our market stand or on our website. I\'d be happy to suggest some based on what you\'re buying!';
        } else {
          botResponse = 'Thank you for your question about our farm products. Our farmers take pride in growing high-quality, sustainable produce.';
        }
      }
      
      // Add delay to simulate API call
      setTimeout(() => {
        setIsTyping(false);
        addMessage(botResponse, 'bot');
      }, 1500);
      
    } catch (error) {
      console.error('Error fetching response:', error);
      setIsTyping(false);
      addMessage('Sorry, I couldn\'t process your request right now. Please try again later.', 'bot');
    }
  };

  return (
    <div className={styles.container}>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${images[backgroundIndex]})` }}
      >
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <a href="/analyze" className={styles.heroBtn}>
          {t.getStarted}
        </a>
      </section>

      <section className={styles.features}>
        <h2>{t.features}</h2>

        {/* Line Animation: Appears and moves smoothly across the features */}
        <motion.div
          className={styles.lineBranch}
          initial={{ left: "-100%" }}
          animate={{ left: "50%" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            loop: Infinity,
            repeatDelay: 1,
          }}
        ></motion.div>

        {/* Feature Grid with Sliding Transitions */}
        <div className={styles.featureGrid}>
          {/* Feature 1 */}
          <motion.div
            className={styles.featureItem}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <Lottie
              options={{
                animationData: farmerAnimation1,
                loop: true,
                autoplay: true,
              }}
              height={250}
              width={250}
            />
            <div className={styles.featureText}>
              <h3>{t.feature1.title}</h3>
              <p>{t.feature1.description}</p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className={styles.featureItem}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <Lottie
              options={{
                animationData: farmerAnimation2,
                loop: true,
                autoplay: true,
              }}
              height={250}
              width={250}
            />
            <div className={styles.featureText}>
              <h3>{t.feature2.title}</h3>
              <p>{t.feature2.description}</p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className={styles.featureItem}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <Lottie
              options={{
                animationData: farmerAnimation3,
                loop: true,
                autoplay: true,
              }}
              height={350}
              width={350}
            />
            <div className={styles.featureText}>
              <h3>{t.feature3.title}</h3>
              <p>{t.feature3.description}</p>
            </div>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            className={styles.featureItem}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <Lottie
              options={{
                animationData: farmerAnimation4,
                loop: true,
                autoplay: true,
              }}
              height={350}
              width={350}
            />
            <div className={styles.featureText}>
              <h3>{t.feature4.title}</h3>
              <p>{t.feature4.description}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Chatbot */}
      <div className="chatbot-container" style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif'
      }}>
        <button 
          onClick={toggleChat}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          💬
        </button>

        {chatOpen && (
          <div style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '320px',
            height: '400px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '15px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              Farm Helper Chat
              <button 
                onClick={toggleChat}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '10px'
            }}>
              <button 
                onClick={() => handleUserTypeChange('customer')}
                style={{
                  backgroundColor: userType === 'customer' ? '#4CAF50' : '#f0f0f0',
                  color: userType === 'customer' ? 'white' : 'black',
                  border: '1px solid #ddd',
                  padding: '5px 10px',
                  margin: '0 5px',
                  borderRadius: '15px',
                  cursor: 'pointer'
                }}
              >
                Customer
              </button>
              <button 
                onClick={() => handleUserTypeChange('farmer')}
                style={{
                  backgroundColor: userType === 'farmer' ? '#4CAF50' : '#f0f0f0',
                  color: userType === 'farmer' ? 'white' : 'black',
                  border: '1px solid #ddd',
                  padding: '5px 10px',
                  margin: '0 5px',
                  borderRadius: '15px',
                  cursor: 'pointer'
                }}
              >
                Farmer
              </button>
            </div>

            <div style={{
              flex: 1,
              padding: '10px',
              overflowY: 'auto',
              backgroundColor: '#f9f9f9'
            }}>
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  style={{
                    marginBottom: '10px',
                    padding: '8px 12px',
                    borderRadius: '18px',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                    backgroundColor: msg.sender === 'user' ? '#e1ffc7' : '#f0f0f0',
                    marginLeft: msg.sender === 'user' ? 'auto' : '0',
                    marginRight: msg.sender === 'bot' ? 'auto' : '0',
                    borderBottomRightRadius: msg.sender === 'user' ? '5px' : '18px',
                    borderBottomLeftRadius: msg.sender === 'bot' ? '5px' : '18px'
                  }}
                >
                  {msg.text}
                </div>
              ))}
              
              {isTyping && (
                <div style={{
                  marginBottom: '10px',
                  padding: '8px 12px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '18px',
                  maxWidth: '80%',
                  marginRight: 'auto',
                  borderBottomLeftRadius: '5px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{
                    height: '8px',
                    width: '8px',
                    margin: '0 1px',
                    backgroundColor: '#8d8d8d',
                    display: 'inline-block',
                    borderRadius: '50%',
                    animation: 'typing 1.4s infinite both'
                  }}></span>
                  <span style={{
                    height: '8px',
                    width: '8px',
                    margin: '0 1px',
                    backgroundColor: '#8d8d8d',
                    display: 'inline-block',
                    borderRadius: '50%',
                    animation: 'typing 1.4s infinite both',
                    animationDelay: '0.2s'
                  }}></span>
                  <span style={{
                    height: '8px',
                    width: '8px',
                    margin: '0 1px',
                    backgroundColor: '#8d8d8d',
                    display: 'inline-block',
                    borderRadius: '50%',
                    animation: 'typing 1.4s infinite both',
                    animationDelay: '0.4s'
                  }}></span>
                </div>
              )}
            </div>

            <form 
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                padding: '10px',
                borderTop: '1px solid #eee'
              }}
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  outline: 'none'
                }}
              />
              <button 
                type="submit"
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '10px 15px',
                  marginLeft: '5px',
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Add required keyframes for the typing animation */}
      <style jsx global>{`
        @keyframes typing {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}