import React, { useState } from 'react';
import './AudioSamples.css';

function AudioSamples() {
  const [playingId, setPlayingId] = useState(null);

  const samples = [
    {
      id: 1,
      language: 'Spanish',
      phrase: 'Hola, ¿cómo estás?',
      translation: 'Hello, how are you?',
      level: 'Beginner',
      icon: '🇪🇸'
    },
    {
      id: 2,
      language: 'French',
      phrase: 'Bonjour, comment allez-vous?',
      translation: 'Hello, how are you?',
      level: 'Beginner',
      icon: '🇫🇷'
    },
    {
      id: 3,
      language: 'German',
      phrase: 'Guten Tag, wie geht es Ihnen?',
      translation: 'Good day, how are you?',
      level: 'Beginner',
      icon: '🇩🇪'
    },
    {
      id: 4,
      language: 'Japanese',
      phrase: 'こんにちは、お元気ですか？',
      translation: 'Hello, how are you?',
      level: 'Beginner',
      icon: '🇯🇵'
    },
    {
      id: 5,
      language: 'Italian',
      phrase: 'Ciao, come stai?',
      translation: 'Hello, how are you?',
      level: 'Beginner',
      icon: '🇮🇹'
    },
    {
      id: 6,
      language: 'Portuguese',
      phrase: 'Olá, como você está?',
      translation: 'Hello, how are you?',
      level: 'Beginner',
      icon: '🇵🇹'
    }
  ];

  const handlePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // Simulate audio playback
      setTimeout(() => {
        setPlayingId(null);
      }, 2000);
    }
  };

  return (
    <section className="audio-samples-section">
      <div className="audio-samples-container">
        <div className="section-header">
          <h2>Hear the Languages</h2>
          <p>Listen to native pronunciation and practice your listening skills</p>
        </div>

        <div className="audio-grid">
          {samples.map((sample) => (
            <div key={sample.id} className="audio-card">
              <div className="audio-header">
                <div className="language-icon">{sample.icon}</div>
                <div className="language-info">
                  <h4>{sample.language}</h4>
                  <span className="level-badge">{sample.level}</span>
                </div>
              </div>
              
              <div className="phrase-content">
                <p className="phrase">{sample.phrase}</p>
                <p className="translation">{sample.translation}</p>
              </div>

              <button 
                className={`play-button ${playingId === sample.id ? 'playing' : ''}`}
                onClick={() => handlePlay(sample.id)}
              >
                {playingId === sample.id ? (
                  <>
                    <span className="pause-icon">⏸</span>
                    <span>Playing...</span>
                  </>
                ) : (
                  <>
                    <span className="play-icon">▶</span>
                    <span>Listen</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="audio-features">
          <div className="feature-item">
            <div className="feature-icon">🎧</div>
            <h4>Native Speakers</h4>
            <p>Learn authentic pronunciation from native language teachers</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔊</div>
            <h4>Interactive Audio</h4>
            <p>Practice listening comprehension with thousands of audio lessons</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎤</div>
            <h4>Speech Recognition</h4>
            <p>Get instant feedback on your pronunciation and speaking skills</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AudioSamples;
