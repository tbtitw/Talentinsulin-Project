import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Sign Up',
      description: 'Create your free account and choose your learning goals'
    },
    {
      number: '2',
      title: 'Choose a Course',
      description: 'Browse our catalog and select the perfect course for your level'
    },
    {
      number: '3',
      title: 'Start Learning',
      description: 'Follow structured lessons with interactive exercises and videos'
    },
    {
      number: '4',
      title: 'Practice Live',
      description: 'Join conversation sessions with teachers and other learners'
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        <div className="how-it-works-header">
          <h2>How It Works</h2>
          <p>Start your language learning journey in 4 simple steps</p>
        </div>
        <div className="steps-container">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="step-card">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-arrow">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
