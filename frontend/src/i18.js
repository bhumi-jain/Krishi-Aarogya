import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // Enables loading translations from a backend
  .use(initReactI18next) // Passes i18n instance to React
  .init({
    lng: "en", // Default language
    fallbackLng: "en", // Language to use if translation is missing
    backend: {
      loadPath: "/locales/translations.json", // Path to your translation file
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disables suspense for server-side rendering
    },
  });

export default i18n;

