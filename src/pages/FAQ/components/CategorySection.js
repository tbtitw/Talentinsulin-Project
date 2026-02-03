import React from 'react';
import QuestionItem from './QuestionItem';
import './CategorySection.css';

function CategorySection({ category, questions, openIndex, toggleQuestion, startIndex }) {
  return (
    <div className="faq-category">
      <h2 className="category-title">{category}</h2>
      <div className="category-questions">
        {questions.map((item, index) => {
          const globalIndex = startIndex + index;
          return (
            <QuestionItem
              key={globalIndex}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === globalIndex}
              onClick={() => toggleQuestion(globalIndex)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategorySection;
