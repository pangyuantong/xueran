// import "./styles.css";

import { useState } from "react";
import { getAPI } from "../helpers";
import { Button } from "react-bootstrap";

export const PowerCardV2 = ({
  seatNum,
  drawnRole,
  setDrawnRole,
  setLoading,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const toggleDescExpand = () => {
    setIsDescExpanded((prev) => !prev);
  };

  const [isRoleHidden, setIsRoleHidden] = useState(false);

  const toggleHideRole = () => {
    setIsRoleHidden((prev) => !prev);
    setIsDescExpanded(false);
  };

  const handleClickFlip = async () => {
    if (Object.keys(drawnRole).length === 0) {
      // setLoading(true);
      try {
        var res = await getAPI("drawRole");
        var res = JSON.parse(res);
        if (res.success === true) {
          const role = res.data.roleInfo;
          setDrawnRole(role);
          setLoading(false);
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

  const roleNames = {
    0: "镇民",
    1: "外来者",
    2: "爪牙",
    3: "恶魔",
    4: "旅行者",
  };

  const roleDisplay = isRoleHidden
    ? "- 隐藏 -"
    : roleNames[drawnRole.roleFaction] || "Unknown";

  return (
    <div className="power-card-v2">
      <div className="row">
        <Button
          // 开始狙击
          className={` btn-primary ${isRoleHidden ? "glowing" : ""}`}
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            padding: "0",
            position: "fixed",
            top: "1.25rem",
            right: "1.25rem",
            zIndex: "200",
          }}
          onClick={toggleHideRole}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-crosshair"
            viewBox="0 0 16 16"
          >
            {isRoleHidden ? (
              <>
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
              </>
            ) : (
              <>
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
              </>
            )}
          </svg>
        </Button>
      </div>
      <section className=" card-1-page">
        <div className="cards" style={{ height: "auto" }}>
          <label id={seatNum}>
            <input
              type="checkbox"
              checked={isFlipped}
              onChange={handleClickFlip}
            />
            <div
              className="card"
              style={{
                height: isDescExpanded && isFlipped ? "550px" : "450px", // Adjust collapsed height as needed
                transition: "height 0.3s ease", // Smooth height transition
              }}
            >
              <div className="front">
                <h1>{seatNum}</h1>
              </div>
              <div className="back">
                {drawnRole && (
                  <>
                    <div className="role-name">
                      {isRoleHidden ? "- 隐藏 -" : drawnRole.roleName}
                    </div>
                    <img
                      src={drawnRole.roleImg}
                      alt="Character"
                      className="character-image w-100"
                    />
                    {!isRoleHidden ? (
                      <>
                        <p className="description fw-bold mb-0">
                          {drawnRole.roleDesc}
                        </p>
                        {drawnRole.roleDescLong && (
                          <div className="w-100">
                            <p
                              className="m-0 w-100"
                              style={{
                                overflow: isDescExpanded ? "auto" : "hidden",
                                maxHeight: "250px",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {isDescExpanded
                                ? drawnRole.roleDescLong
                                : `${drawnRole.roleDescLong.slice(0, 100)}${
                                    drawnRole.roleDescLong.length > 100
                                      ? "..."
                                      : ""
                                  }`}
                            </p>
                            {drawnRole.roleDescLong.length > 100 && (
                              <button
                                className="border-0 text-primary"
                                style={{ color: "#f0f0f0" }}
                                onClick={() =>
                                  setIsDescExpanded(!isDescExpanded)
                                }
                              >
                                {isDescExpanded ? "Read Less" : "Read More"}
                              </button>
                            )}
                          </div>
                        )}
                        <div className="category">{roleDisplay}</div>
                      </>
                    ) : (
                      <div className="category">- 隐藏 -</div>
                    )}
                  </>
                )}
              </div>
            </div>
          </label>
        </div>
      </section>
    </div>
  );
};
