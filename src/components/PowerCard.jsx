import React, { useEffect, useState } from "react";
import { fetchData } from "../helpers";

const PowerCard = ({ seatNum }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const roleInfo = fetchData("roleInfo");
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
            {roleInfo && (
              <>
                <div className="role-name">{roleInfo.roleName}</div>
                <img
                  src={roleInfo.roleImg}
                  alt="Character"
                  className="character-image"
                />
                <p className="description">{roleInfo.roleDesc}</p>
                <div className="category">
                  {roleInfo.roleFaction === 0 && '镇民'}
                  {roleInfo.roleFaction === 1 && '外来者'}
                  {roleInfo.roleFaction === 2 && '爪牙'}
                  {roleInfo.roleFaction === 3 && '恶魔'}
                  {roleInfo.roleFaction === 4 && '旅行者'}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerCard;
