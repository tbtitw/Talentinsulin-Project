import React from 'react';
import './QuestionItem.css';

function QuestionItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="faq-item">
      <div
        className={`faq-question ${isOpen ? 'open' : ''}`}
        onClick={onClick}
      >
        <span>{question}</span>
        <span className="toggle-icon">{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && (
        <div className="faq-answer">
          {answer}
        </div>
      )}
    </div>
  );
}

export default QuestionItem;
