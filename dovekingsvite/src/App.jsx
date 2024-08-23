import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chat from './pages/chat';
import LandingPage from './pages/LandingPage';
import Homepage from './pages/Homepage';
import Servicespage from './pages/Servicespage';
import ContactPage from './pages/Contactpage';
import Blog from './components/Blog/Blog';
import AboutPage from './pages/Aboutpage';
import Footer from './components/Footer';
import ErrorPage from './pages/errorpage';
import Storepage from './pages/Storepage';
import AICodeStore from './components/Services/AICodeStore';
import AppShop from './components/Services/AppShop';
import FAQPage from './pages/FAQPage';
import SupportUsPage from './pages/SupportUsPage';
import CommunityPage from './pages/CommunityPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        
       

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<Servicespage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/store" element={<Storepage />} />
          <Route path="/ai-code-store" element={<AICodeStore />} />
          <Route path="/app-shop" element={<AppShop />} />
          <Route path="/FAQPage" element={<FAQPage />} />
          <Route path="/SupportUsPage" element={<SupportUsPage />} />
          <Route path="/CommunityPage" element={<CommunityPage />} />
          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Chat />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
