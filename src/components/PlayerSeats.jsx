import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Row,
  Spinner,
  ListGroup,
  Tab,
  Tabs,
} from "react-bootstrap";
import { fetchData, viewPlayers } from "../helpers";

const PlayerSeats = ({ capacity, user }) => {
  console.log(user.userID);
  const leftCount = Math.ceil(capacity / 2);
  const [seatData, setSeatData] = useState({});

  // State to manage badge visibility
  const [demons, setDemons] = useState([]);

  // Function to toggle the visibility of the badge
  const toggleSeat = (id) => {
    if (demons.includes(id)) {
      // If the id is already in the demons array, remove it
      setDemons(demons.filter((demon) => demon !== id));
    } else {
      // If the id is not in the demons array, add it
      setDemons([...demons, id]);
    }
  };

  const SeatItem = ({ seatNumber, seatInfo }) => (
    <div className="mb-3 seats" onClick={()=>toggleSeat(seatNumber)}>
      {" "}
      {/* Added onClick event here */}
      <ListGroup.Item
        as="li"
        action
        className="d-flex justify-content-between align-items-start"
        variant={seatInfo && seatInfo.userID === user.userID ? "info" : ""}
        style={{ backgroundColor: "#eaeaea", minHeight: "90px" }}
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{seatNumber}</div>
          {seatInfo ? seatInfo.userName : "-"}
        </div>
        {/* Conditional rendering of the badge based on showBadge state */}
        {demons.includes(seatNumber) && (
          <Badge bg="danger" pill>
            恶
          </Badge>
        )}
      </ListGroup.Item>
    </div>
  );

  useEffect(() => {
    async function fetchPlayers() {
      try {
        var res = await viewPlayers();
        var res = JSON.parse(res);
        if (res.success === true) {
          // console.log(res.data.playersData.seats);
          setSeatData(res.data.playersData.seats);
          console.log(seatData);
          console.log("test");
        } else {
          toast.error("Oops! " + res.message);
        }
      } catch (e) {
        // setLoading(false);
        console.error("Error retrieving data:", e);
        throw new Error("Error retrieving data.");
      }
    }
    fetchPlayers();
  }, []);

  return (
    <div>
      <Row>
        <div className="col-6">
          <ListGroup>
            {Object.entries(seatData)
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
        <div className="col-6">
          <ListGroup>
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
      </Row>
      <Row>
        <Button className="btn">SUBMIT PICK</Button>
      </Row>
    </div>
  );
};

export default PlayerSeats;
