import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config';
import './CourseDetails.css';

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/courses');
        return;
      }

      const response = await fetch(`${API_URL}/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else {
        navigate('/courses');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      navigate('/courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        navigate('/courses');
      } else {
        alert('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  if (loading) {
    return (
      <div className="course-details-page">
        <div className="loading">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-details-page">
        <div className="error">Course not found</div>
      </div>
    );
  }

  const completedLessons = course.lessons?.filter(lesson => lesson.completed).length || 0;
  const totalLessons = course.lessons?.length || 0;
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="course-details-page">
      <div className="course-details-container">
        <div className="course-header">
          <Link to="/courses" className="back-link">← Back to Courses</Link>
          <button className="delete-course-btn" onClick={handleDeleteCourse}>
            Delete Course
          </button>
        </div>

        <div className="course-banner">
          <div className="course-language-badge">{course.language}</div>
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>
          <div className="course-stats">
            <div className="stat">
              <span className="stat-label">Level:</span>
              <span className="stat-value">{course.level}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Lessons:</span>
              <span className="stat-value">{totalLessons}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Duration:</span>
              <span className="stat-value">{course.duration} min each</span>
            </div>
          </div>

          {totalLessons > 0 && (
            <div className="progress-container">
              <div className="progress-header">
                <span>Course Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="progress-text">
                {completedLessons} of {totalLessons} lessons completed
              </div>
            </div>
          )}
        </div>

        <div className="lessons-section">
          <h2>Lessons</h2>
          {course.lessons && course.lessons.length > 0 ? (
            <div className="lessons-list">
              {course.lessons
                .sort((a, b) => a.order - b.order)
                .map((lesson, index) => (
                  <Link
                    key={lesson._id}
                    to={`/courses/${courseId}/lessons/${lesson._id}`}
                    className={`lesson-item ${lesson.completed ? 'completed' : ''}`}
                  >
                    <div className="lesson-number">{index + 1}</div>
                    <div className="lesson-details">
                      <h3>{lesson.title}</h3>
                      <div className="lesson-meta">
                        <span>⏱ {lesson.duration} minutes</span>
                        {lesson.vocabulary && (
                          <span>📝 {lesson.vocabulary.length} words</span>
                        )}
                        {lesson.exercises && (
                          <span>✏️ {lesson.exercises.length} exercises</span>
                        )}
                      </div>
                    </div>
                    {lesson.completed && (
                      <div className="completion-badge">✓ Completed</div>
                    )}
                  </Link>
                ))}
            </div>
          ) : (
            <div className="no-lessons">No lessons available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
