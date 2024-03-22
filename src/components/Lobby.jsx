import React, { useEffect, useState } from "react";
import { Stack, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Form } from "react-router-dom";
import { LifebuoyIcon } from "@heroicons/react/24/solid";

const Lobby = ({ gamesAvailable }) => {
  const [roomNum, setRoomNum] = useState(null);

  useEffect(() => {
    // If either `loggedUser` or `_token` exists, set loading to false
    if (roomNum) {
      console.log("Join this room" + roomNum);
    }
  }, [roomNum]);

  const handleClick = (gmID) => {
    // Inner function that acts as the event handler
    return (event) => {
      event.stopPropagation(); // Stop the event from propagating to parent elements
      console.log("Join this room: " + gmID); // Use the parameter in the handler
      setRoomNum(gmID); // Update state based on the parameter
    };
  };

  return (
    <Container fluid className="my-4">
      <Row className="my-4">
        <Col xs={12} sm={6}>
          <Row>
            <h1 className="spooky-title">大厅</h1>
          </Row>
        </Col>
      </Row>

      <Row className="px-4">
        {gamesAvailable.map((game, index) => (
          
          <Card className="mb-3" style={{ padding: 0 }}>
            <Card.Body
              style={{ paddingTop: 10, paddingBottom: 10 }}
              onClick={handleClick(game.gmID)}
            >
              <Row>
                <Col xs="2">
                  {game.gmStatus === 0 && <Badge bg="danger">LIVE</Badge>}
                  {game.gmStatus === 1 && <Badge bg="primary">Ongoing</Badge>}
                  {game.gmStatus === 2 && <Badge bg="danger">secondary</Badge>}
                </Col>
                <Col xs="10">
                  <h3>
                    <strong>{game.gmID}</strong>
                    <small> - {game.gmName}</small>
                  </h3>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Lobby;
