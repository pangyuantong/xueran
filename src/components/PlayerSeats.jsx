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
  Col,
} from "react-bootstrap";
import { fetchData, viewPlayers } from "../helpers";

const PlayerSeats = ({ capacity, user }) => {
  console.log(user.userID);
  const leftCount = Math.ceil(capacity / 2);
  const [seatData, setSeatData] = useState({});
  const [loading, setLoading] = useState(true);

  // State to manage badge visibility
  const [demons, setDemons] = useState([]);
  const [pickMode, setPickMode] = useState(false);

  // Function to toggle the visibility of the badge
  const toggleSeat = (id) => {
    if (pickMode === true) {
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
    }
  };

  const togglePickMode = () => {
    setPickMode(!pickMode);
  };

  const LeftSeat = ({ seatNumber, seatInfo }) => (
    <div
      className={`pe-2 list-item list-item-left ${
        seatInfo && seatInfo.userID === user.userID ? "list-item-self" : ""
      }`}
      onClick={() => toggleSeat(seatNumber)}
    >
      <div class="badge badge-left">{seatNumber}</div>
      <div class="image-slot image-slot-left">
        <div class="nametag nametag-left">
          <p style={{ whiteSpace: "nowrap" }}>
            {seatInfo ? seatInfo.userName : "-"}
          </p>
        </div>
      </div>
      {demons.includes(seatNumber) && (
        <Badge bg="danger" pill style={{ position: "relative" }}>
          恶
        </Badge>
      )}
    </div>
  );

  const RightSeat = ({ seatNumber, seatInfo }) => (
    <div
      className={`ps-2 list-item list-item-right ${
        seatInfo && seatInfo.userID === user.userID ? "list-item-self" : ""
      }`}
      onClick={() => toggleSeat(seatNumber)}
    >
      <div class="badge badge-right">{seatNumber}</div>
      <div class="image-slot image-slot-right ">
        <div class="nametag nametag-right">
          <p style={{ whiteSpace: "nowrap" }}>
            {seatInfo ? seatInfo.userName : "-"}
          </p>
        </div>
      </div>
      <div className="d-flex flex-row-reverse">
        {demons.includes(seatNumber) && (
          <Badge bg="danger" pill style={{ position: "relative" }}>
            恶
          </Badge>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    async function fetchPlayers() {
      try {
        var res = await viewPlayers();
        var res = JSON.parse(res);
        if (res.success === true) {
          // console.log(res.data.playersData.seats);
          setSeatData(res.data);
          console.log(seatData);
          console.log("test");
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

  return (
    <div className="my-3">
      {leftCount < 1 || loading === true ? (
        <Container
          fluid
          style={{
            height: "50vh",
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
          <Row className="mx-0 mb-3 p-0" style={{ maxWidth: "100vw" }}>
            <Col className="d-flex justify-content-center">
              <Button
                className="btn-danger"
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  padding: "0",
                }}
                onClick={togglePickMode}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-crosshair"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                </svg>
              </Button>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <Row style={{ paddingInline: "3%" }}>
            <div className="col-6 cust-seat">
              <ListGroup style={{ paddingLeft: "10px" }}>
                {leftCount > 0 &&
                  Object.entries(seatData)
                    .slice(leftCount, capacity)
                    .reverse()
                    .map(([seatNumber, seatInfo]) => {
                      return (
                        <LeftSeat
                          key={seatNumber}
                          seatNumber={seatNumber}
                          seatInfo={seatInfo}
                        />
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
                        <RightSeat
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
