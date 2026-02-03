import React from 'react';
import './InfoCard.css';

function InfoCard({ icon, title, description, label }) {
  return (
    <div className="info-card">
      <div className="info-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="info-label">{label}</span>
    </div>
  );
}

export default InfoCard;
