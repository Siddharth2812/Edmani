import React from 'react';
import Subject from './Subject';

const Maths = () => {
  const mathsData = {
    name: "Maths",
    topics: [
      {
        name: "Trigonometry",
        topics: [
          'sin',
          'cos'
        ]
      },
      {
        name: "Algebra",
        topics: [
          'Equations',
          'Inequalities'
        ]
      },
      {
        name: "Lines",
        topics: [
          'Parallel Lines',
          'Perpendicular Lines'
        ]
      },
      {
        name: "Geometry",
        topics: [
          'Circles',
          'Polygons'
        ]
      },
    ]
  };

  return (
    <div className="maths-container">
      {mathsData.topics.map((subject, index) => (
        <Subject key={index} {...subject} />
      ))}
    </div>
  );
};

export default Maths;
