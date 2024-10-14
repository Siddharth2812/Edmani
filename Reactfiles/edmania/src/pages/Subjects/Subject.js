import React, { useState } from 'react';
import './Subject.css'
const Subject = ({ name, topics }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectClick = () => {
    setSelectedSubject(!selectedSubject);
  };

  return (
    <div className="subject-container">
      <h1 onClick={handleSubjectClick}>{name}</h1>
      {selectedSubject && (
        <div className="topics-list">
          {topics && topics.map((topic, index) => (
            <button
              key={index}
              className="topic-item"
              onClick={() => window.location.href = `/${name.toLowerCase()}/${encodeURIComponent(topic)}`}
            >
              {topic}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subject;
