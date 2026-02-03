import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AnimatedBackground from './components/AnimatedBackground';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';
import BlogList from './pages/Blog/BlogList';
import BlogPostDetail from './pages/Blog/BlogPostDetail';
import FAQ from './pages/FAQ';
import { Refunds, PrivacyPolicy, TermsOfService, CookiePolicy } from './pages/Legal';
import Courses, { CourseDetails, Lesson } from './pages/Courses';
import Profile from './pages/Profile';
import About from './pages/About';
import Support from './pages/Support';
import BecomeTeacher from './pages/BecomeTeacher';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login');

  const openModal = (mode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  return (
    <Router>
      <div className="App">
        <AnimatedBackground />
        <Header openModal={openModal} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home openModal={openModal} />} />
            <Route path="/pricing" element={<Pricing openModal={openModal} />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/refunds" element={<Refunds />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<Lesson />} />
            <Route path="/become-teacher" element={<BecomeTeacher />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
        <AuthModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          mode={modalMode}
        />
      </div>
    </Router>
  );
}

export default App;
