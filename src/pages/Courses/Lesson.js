import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Lesson.css';

function Lesson() {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLesson();
    fetchCourse();
  }, [courseId, lessonId]);

  const fetchLesson = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/lessons/${lessonId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLesson(data);
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const handleAnswer = (questionIndex, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer
    });
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const completeLesson = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/courses/${courseId}/lessons/${lessonId}/complete`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate(`/courses/${courseId}`);
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  if (loading) {
    return (
      <div className="lesson-page">
        <div className="loading">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="lesson-page">
        <div className="error">Lesson not found</div>
      </div>
    );
  }

  const correctAnswers = lesson.exercises?.reduce((count, exercise, index) => {
    return count + (userAnswers[index] === exercise.correctAnswer ? 1 : 0);
  }, 0) || 0;

  const score = lesson.exercises?.length > 0 
    ? Math.round((correctAnswers / lesson.exercises.length) * 100) 
    : 0;

  return (
    <div className="lesson-page">
      <div className="lesson-container">
        <div className="lesson-header">
          <Link to={`/courses/${courseId}`} className="back-link">← Back to Course</Link>
          <div className="lesson-meta">
            <span className="lesson-duration">⏱ {lesson.duration} minutes</span>
            {course && <span className="course-name">{course.title}</span>}
          </div>
        </div>

        <h1>{lesson.title}</h1>

        <div className="lesson-content">
          <h2>Lesson Content</h2>
          <div className="content-text">
            {lesson.content}
          </div>
        </div>

        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <div className="vocabulary-section">
            <h2>Vocabulary</h2>
            <div className="vocabulary-grid">
              {lesson.vocabulary.map((item, index) => (
                <div key={index} className="vocabulary-card">
                  <div className="vocab-word">{item.word}</div>
                  <div className="vocab-translation">{item.translation}</div>
                  {item.example && (
                    <div className="vocab-example">"{item.example}"</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {lesson.exercises && lesson.exercises.length > 0 && (
          <div className="exercises-section">
            <h2>Practice Exercises</h2>
            {lesson.exercises.map((exercise, index) => (
              <div key={index} className="exercise-card">
                <h3>Question {index + 1}</h3>
                <p className="exercise-question">{exercise.question}</p>

                {exercise.type === 'multiple-choice' && (
                  <div className="exercise-options">
                    {exercise.options.map((option, optIndex) => {
                      const isSelected = userAnswers[index] === option;
                      const isCorrect = exercise.correctAnswer === option;
                      const showFeedback = showResults && isSelected;

                      return (
                        <button
                          key={optIndex}
                          className={`option-btn ${
                            isSelected ? 'selected' : ''
                          } ${
                            showFeedback
                              ? isCorrect
                                ? 'correct'
                                : 'incorrect'
                              : ''
                          }`}
                          onClick={() => !showResults && handleAnswer(index, option)}
                          disabled={showResults}
                        >
                          {option}
                          {showFeedback && (
                            <span className="feedback-icon">
                              {isCorrect ? ' ✓' : ' ✗'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {showResults && userAnswers[index] !== exercise.correctAnswer && (
                  <div className="correct-answer">
                    Correct answer: {exercise.correctAnswer}
                  </div>
                )}
              </div>
            ))}

            {!showResults ? (
              <button
                className="check-answers-btn"
                onClick={checkAnswers}
                disabled={Object.keys(userAnswers).length !== lesson.exercises.length}
              >
                Check Answers
              </button>
            ) : (
              <div className="results-section">
                <h3>Your Score: {score}%</h3>
                <p>You got {correctAnswers} out of {lesson.exercises.length} correct!</p>
                <button className="complete-lesson-btn" onClick={completeLesson}>
                  Complete Lesson
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Lesson;
