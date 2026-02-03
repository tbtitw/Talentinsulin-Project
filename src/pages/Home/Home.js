import React from 'react';
import './Home.css';
import Hero from './components/Hero';
import Features from './components/Features';
import LanguageShowcase from './components/LanguageShowcase';
import AudioSamples from './components/AudioSamples';
import Testimonials from './components/Testimonials';
import PricingSection from './components/PricingSection';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import CallToAction from './components/CallToAction';

function Home({ openModal }) {
  return (
    <div className="home-page">
      <Hero />
      <Features />
      <LanguageShowcase />
      <AudioSamples />
      <Testimonials />
      <WhyChooseUs />
      <HowItWorks />
      <PricingSection openModal={openModal} />
      <CallToAction />
    </div>
  );
}

export default Home;
