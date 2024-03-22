import React, { useEffect, useState } from "react";

const PowerCard = ({seatNum}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped); // Toggle the isFlipped state
  };

  useEffect(() => {
    // If either `loggedUser` or `_token` exists, set loading to false
    
  }, []);

  return (
    <div className="power-card">
      <div className="container">
        <div
          className={`card ${isFlipped ? "flip" : ""}`}
          onClick={handleClick}
        >
          <div className="front">
            <h1>{seatNum}</h1>
          </div>
          <div className="back">{/* Back side content */}</div>
        </div>
      </div>
    </div>
  );
};

export default PowerCard;
