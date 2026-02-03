import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CategorySection from './components/CategorySection';
import '../../App.css';
import './FAQ.css';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click the "Sign Up" button in the top right corner of the homepage. Fill in your email, create a password, and verify your email address. You\'ll be ready to start learning within minutes!'
        },
        {
          question: 'Is there a free trial available?',
          answer: 'Yes! We offer a 7-day free trial for all new users. You can explore our course catalog and start learning before committing to a subscription.'
        },
        {
          question: 'What devices can I use to access courses?',
          answer: 'You can access Talentinsulin on any device with a web browser - desktop, laptop, tablet, or smartphone. Our platform is fully responsive and optimized for all screen sizes.'
        }
      ]
    },
    {
      category: 'Courses & Learning',
      questions: [
        {
          question: 'How do I enroll in a course?',
          answer: 'Browse our course catalog, click on any course that interests you, and click the "Enroll" button. If you have an active subscription, you can start learning immediately.'
        },
        {
          question: 'Can I download course materials?',
          answer: 'Many courses include downloadable resources like PDFs, code files, and supplementary materials. Look for the download icon in the course lesson pages.'
        },
        {
          question: 'What happens if I miss a live class?',
          answer: 'All live classes are recorded and available for replay within 24 hours. You can watch them at your convenience from your course dashboard.'
        },
        {
          question: 'How long do I have access to a course?',
          answer: 'Once you enroll in a course, you have unlimited access to it for as long as you maintain an active subscription. Purchased courses remain accessible even if you cancel your subscription.'
        }
      ]
    },
    {
      category: 'Payments & Billing',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual subscriptions.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your current billing period.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with our platform within the first 30 days, contact us for a full refund.'
        },
        {
          question: 'How do I update my payment information?',
          answer: 'Go to Account Settings > Billing, and click "Update Payment Method" to enter new payment details.'
        }
      ]
    },
    {
      category: 'Teachers & Instructors',
      questions: [
        {
          question: 'How can I become an instructor?',
          answer: 'Click on "Become a Teacher" in the footer menu and fill out the application form. Our team will review your application and contact you within 5-7 business days.'
        },
        {
          question: 'What percentage do instructors earn?',
          answer: 'Instructors earn 70% of the revenue from their courses. We provide the platform, marketing, and student support while you focus on creating great content.'
        },
        {
          question: 'What support do you provide for course creation?',
          answer: 'We provide comprehensive guides, video tutorials, and dedicated support to help you create engaging courses. Our team is available to answer questions throughout the process.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'I\'m having trouble playing videos. What should I do?',
          answer: 'First, check your internet connection. Try refreshing the page, clearing your browser cache, or switching to a different browser. If issues persist, contact our support team.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click "Sign In" and then "Forgot Password?" Enter your email address, and we\'ll send you instructions to reset your password.'
        },
        {
          question: 'The website is loading slowly. Why?',
          answer: 'This could be due to your internet connection, browser cache, or server load. Try clearing your cache, using a different browser, or checking your internet speed. Contact us if the problem continues.'
        }
      ]
    },
    {
      category: 'Certificates & Progress',
      questions: [
        {
          question: 'Do I get a certificate after completing a course?',
          answer: 'Yes! You\'ll receive a certificate of completion that you can download and share on LinkedIn or include in your portfolio.'
        },
        {
          question: 'How is my progress tracked?',
          answer: 'Your progress is automatically tracked as you complete lessons. You can view your overall progress in your dashboard and within each course.'
        },
        {
          question: 'Are the certificates recognized by employers?',
          answer: 'Our certificates demonstrate your commitment to learning and skill development. While they\'re not accredited credentials, many employers value them as proof of professional development.'
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  let questionCounter = 0;

  return (
    <div className="faq-page">
      <div className="faq-container">
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about Talentinsulin</p>
        </div>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="faq-content">
          {filteredFAQ.length === 0 ? (
            <div className="no-results">
              <p>No questions found matching "{searchTerm}"</p>
              <button onClick={() => setSearchTerm('')} className="clear-search-btn">
                Clear search
              </button>
            </div>
          ) : (
            filteredFAQ.map((category, categoryIndex) => {
              const startIndex = questionCounter;
              questionCounter += category.questions.length;
              return (
                <CategorySection
                  key={categoryIndex}
                  category={category.category}
                  questions={category.questions}
                  openIndex={openIndex}
                  toggleQuestion={toggleQuestion}
                  startIndex={startIndex}
                />
              );
            })
          )}
        </div>

        <div className="faq-footer">
          <h3>Still have questions?</h3>
          <p>Can't find what you're looking for? Our support team is here to help.</p>
          <a href="/contact-us" className="contact-btn">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
