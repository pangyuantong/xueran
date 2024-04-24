import React, { useEffect, useState } from "react";
import { getAPI, fetchData } from "../helpers";
import { toast } from "react-toastify";

const PowerCard = ({ seatNum, drawnRole, setDrawnRole, setLoading }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClickFlip = async () => {
    if (Object.keys(drawnRole).length === 0) {
      // setLoading(true);
      try {
        var res = await getAPI("drawRole");
        var res = JSON.parse(res);
        if (res.success === true) {
          const role = res.data.roleInfo;
          setDrawnRole(role);
          // setLoading(false);
          setIsFlipped(!isFlipped);
        } else {
          console.log(res.message);
          toast.error("Oops! " + res.message);
        }
      } catch (e) {
        // setLoading(false);
        console.error("Error retrieving data:", e);
        throw new Error("Error retrieving data.");
      }
    } else {
      console.log(drawnRole);
      setIsFlipped(!isFlipped);
    }
    // Toggle the isFlipped state
  };

  useEffect(() => {
    // If either `loggedUser` or `_token` exists, set loading to false
  }, []);

  return (
    <div className="power-card">
      <div className="container">
        <div
          className={`card ${isFlipped ? "flip" : ""}`}
          onClick={handleClickFlip}
        >
          <div className="front">
            <h1>{seatNum}</h1>
          </div>
          <div className="back">
            {drawnRole && (
              <>
                <div className="role-name">{drawnRole.roleName}</div>
                <img
                  src={drawnRole.roleImg}
                  alt="Character"
                  className="character-image"
                />
                <p className="description">{drawnRole.roleDesc}</p>
                <div className="category">
                  {drawnRole.roleFaction === 0 && "镇民"}
                  {drawnRole.roleFaction === 1 && "外来者"}
                  {drawnRole.roleFaction === 2 && "爪牙"}
                  {drawnRole.roleFaction === 3 && "恶魔"}
                  {drawnRole.roleFaction === 4 && "旅行者"}
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
