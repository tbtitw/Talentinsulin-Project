import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Courses.css';

function Courses() {
  const [allCourses, setAllCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [user, setUser] = useState(null);
  const [userTokens, setUserTokens] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [formData, setFormData] = useState({
    language: '',
    level: 'beginner',
    numberOfLessons: 10
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchAllCourses();
  }, [filterLanguage, filterLevel]);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setUserTokens(data.user.tokens || 0);
        // Extract purchased course IDs
        const purchasedIds = data.user.purchasedCourses?.map(pc => pc.courseId) || [];
        setPurchasedCourses(purchasedIds);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      let url = `${API_URL}/courses/all`;
      const params = new URLSearchParams();
      if (filterLanguage) params.append('language', filterLanguage);
      if (filterLevel) params.append('level', filterLevel);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setAllCourses(data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/courses/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setShowCreateModal(false);
        fetchAllCourses(); // Обновить список курсов
        setFormData({ language: '', level: 'beginner', numberOfLessons: 10 });
        alert('Course created successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const handleBuyCourse = async (courseId, price, courseTitle) => {
    if (userTokens < price) {
      alert(`You need ${price} tokens to purchase this course. You have ${userTokens} tokens.`);
      return;
    }

    if (!window.confirm(`Purchase "${courseTitle}" for ${price} tokens?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/courses/${courseId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        alert('Course purchased successfully!');
        setUserTokens(data.remainingTokens);
        checkAuth();
        fetchAllCourses();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to purchase course');
      }
    } catch (error) {
      console.error('Error purchasing course:', error);
      alert('Failed to purchase course. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="courses-page">
        <div className="loading">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="courses-container">
        <div className="courses-header">
          <div>
            <h1>Language Courses</h1>
            {user && (
              <div className="tokens-display">
                Your Tokens: <span className="token-count">{userTokens}</span>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="courses-search-section">
          <div className="search-bar">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search courses by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          
          <div className="courses-filters">
            <select 
              value={filterLanguage} 
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="filter-select"
            >
              <option value="">All Languages</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Japanese">Japanese</option>
              <option value="Italian">Italian</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Chinese">Chinese</option>
              <option value="Korean">Korean</option>
              <option value="Russian">Russian</option>
              <option value="Arabic">Arabic</option>
              <option value="Dutch">Dutch</option>
            </select>

            <select 
              value={filterLevel} 
              onChange={(e) => setFilterLevel(e.target.value)}
              className="filter-select"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {allCourses.length === 0 ? (
          <div className="no-courses">
            <p>No courses found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="courses-grid">
            {allCourses
              .filter(course => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                return (
                  course.title.toLowerCase().includes(query) ||
                  course.description.toLowerCase().includes(query) ||
                  course.language.toLowerCase().includes(query) ||
                  course.teacher.name.toLowerCase().includes(query)
                );
              })
              .map(course => {
              const isPurchased = purchasedCourses.includes(course._id);
              
              return (
                <div key={course._id} className="course-card">
                  <div className="course-thumbnail">{course.thumbnail}</div>
                  <div className="course-language-badge">{course.language}</div>
                  <h3>{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  
                  {/* Teacher Info */}
                  <div className="course-teacher">
                    <span className="teacher-avatar">{course.teacher.avatar}</span>
                    <div className="teacher-info">
                      <div className="teacher-name">{course.teacher.name}</div>
                      <div className="teacher-rating">
                        ⭐ {course.teacher.rating} • {course.teacher.students} students
                      </div>
                    </div>
                  </div>

                  <div className="course-info">
                    <span className="course-level">{course.level}</span>
                    <span className="course-lessons">{course.totalLessons} lessons</span>
                    <span className="course-duration">⏱ {course.duration} min each</span>
                  </div>

                  <div className="course-footer">
                    <div className="course-price">{course.price} tokens</div>
                    {user ? (
                      isPurchased ? (
                        <Link to={`/courses/${course._id}`} className="course-action-btn purchased">
                          ✓ Open Course
                        </Link>
                      ) : (
                        <button
                          className={`course-action-btn buy ${userTokens < course.price ? 'disabled' : ''}`}
                          onClick={() => handleBuyCourse(course._id, course.price, course.title)}
                          disabled={userTokens < course.price}
                        >
                          {userTokens < course.price 
                            ? `Need ${course.price} tokens` 
                            : `Buy Course`
                          }
                        </button>
                      )
                    ) : (
                      <button
                        className="course-action-btn buy"
                        onClick={() => navigate('/')}
                      >
                        Sign In to Purchase
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
