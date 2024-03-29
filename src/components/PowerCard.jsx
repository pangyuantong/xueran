import React, { useEffect, useState } from "react";
import { fetchData } from "../helpers";

const PowerCard = ({ seatNum, roleInfo }) => {
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
          <div className="back">
            {roleInfo ? (
              <>
                <div className="role-name">{roleInfo.roleName}</div>
                <img
                  src={roleInfo.roleImg}
                  alt="Character"
                  className="character-image"
                />
                <p className="description">{roleInfo.roleDesc}</p>
                <div className="category">
                  {roleInfo.roleFaction === 0 && "镇民"}
                  {roleInfo.roleFaction === 1 && "外来者"}
                  {roleInfo.roleFaction === 2 && "爪牙"}
                  {roleInfo.roleFaction === 3 && "恶魔"}
                  {roleInfo.roleFaction === 4 && "旅行者"}
                </div>
              </>
            ) : (
              <div>
                <div className="role-name">尽情期待</div>
                <img
                  src="https://i.ibb.co/2jZYc3L/Screenshot-2024-03-20-141658.png"
                  alt="Character"
                  className="character-image"
                />
                <p className="description">你，冒汗了吗？你，要一瓶还是五瓶？</p>
                <div className="category">
                  还没有开始
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerCard;
