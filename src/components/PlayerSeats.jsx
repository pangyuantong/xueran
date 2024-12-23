import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Row,
  Spinner,
  ListGroup,
  Col,
} from "react-bootstrap";
import { getAPI, postAPI } from "../helpers";
import { toast } from "react-toastify";

const PlayerSeats = ({ capacity, user }) => {
  // console.log(user.userID);
  const leftCount = Math.ceil(capacity / 2);
  const [seatData, setSeatData] = useState({});
  const [loading, setLoading] = useState(true);

  // State to manage badge visibility
  const [picks, setPicks] = useState([]);
  const [submittedPicks, setSubmittedPicks] = useState([]);
  const [pickMode, setPickMode] = useState(false);

  // Function to toggle the visibility of the badge
  const toggleSeat = (id) => {
    console.log(id);
    if (id != user.userID && submittedPicks.length == 0) {
      if (picks.includes(id)) {
        // If the id is already in the picks array, remove it
        setPicks(picks.filter((pick) => pick !== id));
      } else {
        // If the id is not in the picks array, add it
        let updatedDemons = [...picks, id];

        // Check if the updated array length exceeds 3
        if (updatedDemons.length > 3) {
          // Remove the first element
          updatedDemons.shift();
        }
        setPicks(updatedDemons);
      }
    }
  };

  const togglePickMode = () => {
    setPickMode(!pickMode);
  };

  const submitPicks = async () => {
    // if (picks.length == 3) {
    try {
      const postData = {
        picks: picks,
      };
      var res = await postAPI("pickEvils", postData);
      var res = JSON.parse(res);
      if (res.success === true) {
        setSubmittedPicks(picks);
        setPicks([]);
        toast.success("Submitted successfully!");
      } else {
        console.log(res.message);
        toast.error("Oops! " + res.message);
      }
    } catch (e) {
      // setLoading(false);
      console.error("Error retrieving data:", e);
      throw new Error("Error retrieving data.");
    }
    // } else {
    //   toast.error("Please select 3 players.");
    // }
  };

  useEffect(() => {
    async function fetchPlayers() {
      try {
        var res = await getAPI("viewPlayers");
        var res = JSON.parse(res);
        if (res.success === true) {
          console.log("test");
          console.log(res.data);
          // console.log(res.data.playersData.seats);
          setSeatData(res.data.seatList);
          setSubmittedPicks(res.data.votedEvils);
          setLoading(false);
        } else {
          toast.error("Oops! " + res.message);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.error("Error retrieving data:", e);
        throw new Error("Error retrieving data.");
      }
    }
    fetchPlayers();
  }, []);

  const SeatItem = ({ seatNumber, seatInfo }) => (
    <div
      className={` list-item ${
        seatInfo && (seatInfo.userID === user.userID ? "list-item-self" : "")
      }`}
      style={{ backgroundColor: `${pickMode ? "#bb2d3b85" : ""}` }}
      onClick={
        seatInfo && (pickMode ? () => toggleSeat(seatInfo.userID) : undefined)
      }
    >
      <div className="badge ">{seatNumber}</div>

      {seatInfo && (
        <div className="image-slot">
          <img src="https://i.ibb.co/CQ6Nz19/Whats-App-Image-2024-04-19-at-4-28-43-PM.jpg" alt="" style={{height:"100%", borderRadius:"50%"}} />
          <div className="nametag ">
            <p style={{ whiteSpace: "nowrap" }}>{seatInfo.userName}</p>
          </div>
        </div>
      )}
      {/* {seatInfo && (
        <div className="nametag ">
          <p style={{ whiteSpace: "nowrap" }}>{seatInfo.userName}</p>
        </div>
      )} */}
      <div className="content">
        {seatInfo &&
          ((picks.includes(seatInfo.userID) ||
            submittedPicks.includes(seatInfo.userID)) &&
          pickMode === true ? (
            <Badge bg="danger" pill style={{ position: "relative" }}>
              恶
            </Badge>
          ) : (
            <></>
          ))}
      </div>
    </div>
  );

  return (
    <div className="mt-4">
      {leftCount < 1 || loading === true ? (
        <Container
          fluid
          style={{
            height: "50dvh",
            maxWidth: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="border" variant="light" />
        </Container>
      ) : (
        <div>
          <Button
            // 开始狙击
            className={` btn-danger ${pickMode ? "glowing" : ""}`}
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
            onClick={togglePickMode}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-crosshair"
              viewBox="0 0 16 16"
            >
              <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
            </svg>
          </Button>
          {pickMode && submittedPicks.length == 0 && (
            <Button
              // 开始狙击
              className="btn-danger glowing py-2"
              onClick={submitPicks}
              style={{
                position: "fixed",
                right: "10%",
                top: "90%",
                zIndex: "200",
              }}
            >
              Submit
            </Button>
          )}
          <Row
            style={{
              paddingInline: "0%",
              maxWidth: "100vw",
              alignItems: "center",
              marginInline: 0,
            }}
          >
            <div className="col-6 cust-seat-left pe-1">
              <ListGroup style={{ paddingLeft: "10px" }}>
                {leftCount > 0 &&
                  Object.entries(seatData)
                    .slice(leftCount, capacity)
                    .reverse()
                    .map(([seatNumber, seatInfo]) => {
                      return (
                        <SeatItem
                          key={seatNumber}
                          seatNumber={seatNumber}
                          seatInfo={seatInfo}
                        />
                      );
                    })}
              </ListGroup>
            </div>
            <div className="col-6 cust-seat-right ps-1">
              <ListGroup style={{ paddingRight: "10px" }}>
                {leftCount > 0 &&
                  Object.entries(seatData)
                    .slice(0, leftCount)
                    .map(([seatNumber, seatInfo]) => {
                      return (
                        <SeatItem
                          key={seatNumber}
                          seatNumber={seatNumber}
                          seatInfo={seatInfo}
                        />
                      );
                    })}
              </ListGroup>
            </div>
          </Row>
        </div>
      )}
    </div>
  );
};

export default PlayerSeats;
