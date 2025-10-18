import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from "../components/language";

export const metadata = {
  title: 'Krishi Aarogya',
  description: 'Your AI-powered assistant for crop disease detection and management.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>  <LanguageProvider>
       <UserProvider> <Navbar />
        <main>{children}</main>
        <Footer /></UserProvider></LanguageProvider>
      </body>
    </html>
  )
}
