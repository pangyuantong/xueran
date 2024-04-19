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
  const [loading, setLoading] = useState(true);

  // State to manage badge visibility
  const [demons, setDemons] = useState([]);

  // Function to toggle the visibility of the badge
  const toggleSeat = (id) => {
    if (demons.includes(id)) {
      // If the id is already in the demons array, remove it
      setDemons(demons.filter((demon) => demon !== id));
    } else {
      // If the id is not in the demons array, add it
      let updatedDemons = [...demons, id];

      // Check if the updated array length exceeds 3
      if (updatedDemons.length > 3) {
        // Remove the first element
        updatedDemons.shift();
      }
      setDemons(updatedDemons);
    }
  };

  const SeatItem = ({ seatNumber, seatInfo }) => (
    <div className="mb-3 seats" onClick={() => toggleSeat(seatNumber)}>
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
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error("Error retrieving data:", e);
        throw new Error("Error retrieving data.");
      }
    }
    fetchPlayers();
  }, []);

  return (
    <div className="my-3">
      {leftCount < 1 ? (
        <Container
          fluid
          style={{
            height: "100vh",
            width: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="border" variant="light" />
        </Container>
      ) : (
        <div>
          <Row>
            <div className="col-6 cust-seat">
              <ListGroup style={{ paddingLeft: "10px" }}>
                {leftCount > 0 &&
                  Object.entries(seatData)
                    .slice(leftCount, capacity)
                    .reverse()
                    .map(([seatNumber, seatInfo]) => {
                      return (
                        // <SeatItem
                        //   key={seatNumber}
                        //   seatNumber={seatNumber}
                        //   seatInfo={seatInfo}
                        // />
                        <div class="list-item list-item-left">
                          <div class="badge badge-left">{seatNumber}</div>
                          <div class="content-left">
                            <div class="text-content-left"></div>
                          </div>
                          <div class="image-slot image-slot-left">
                            <div class="nametag nametag-left">
                              {seatInfo ? seatInfo.userName : "-"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </ListGroup>
            </div>
            <div className="col-6 cust-seat">
              <ListGroup style={{ paddingRight: "10px" }}>
                {leftCount > 0 &&
                  Object.entries(seatData)
                    .slice(0, leftCount)
                    .map(([seatNumber, seatInfo]) => {
                      return (
                        <div
                          class=""
                          className={`list-item list-item-right ${
                            seatInfo ? "occupied" : ""
                          }`}
                        >
                          <div class="badge badge-right">{seatNumber}</div>
                          <div class="content-right">
                            <div class="text-content-right"></div>
                          </div>
                          <div class="image-slot image-slot-right ">
                            <div class="nametag nametag-right">
                              {seatInfo ? seatInfo.userName : "-"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </ListGroup>
            </div>
          </Row>
          <Row>
            <Button className="btn">PICK</Button>
          </Row>
        </div>
      )}
    </div>
  );
};

export default PlayerSeats;
