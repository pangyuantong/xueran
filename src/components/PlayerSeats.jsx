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

  const SeatItem = ({ seatNumber, seatInfo }) => (
    <ListGroup.Item
      as="li" 
      className={`d-flex justify-content-between align-items-start `}
      variant={seatInfo && seatInfo.userID === user.userID ? "info" : ""}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{seatNumber}</div>
        {seatInfo ? seatInfo.userName :"-"}
      </div>
    </ListGroup.Item>
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
    </div>
  );
};

export default PlayerSeats;
