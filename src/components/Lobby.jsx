import React, { useEffect, useState } from "react";
import { Stack, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Form } from "react-router-dom";
import { LifebuoyIcon } from "@heroicons/react/24/solid";
import { fetchData, joinRoom } from "../helpers";
import "../index.scss";

const Lobby = ({ gamesAvailable, handleClick }) => {

  return (
    <Container fluid className="my-4 booklet">
      <section style={{ marginBottom: "10px" }}>
        <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
          大厅
        </h1>
        {gamesAvailable.map((game, index) => (
          <details onClick={handleClick(game.gmID)}>
            <summary>
              <div>
                {game.gmStatus === 0 && <Badge bg="danger">LIVE</Badge>}
                {game.gmStatus === 1 && <Badge bg="primary">Ongoing</Badge>}
                {game.gmStatus === 2 && <Badge bg="secondary">Ended</Badge>}
                <h3>
                  <strong>{game.gmName}</strong>
                  <small>{game.bdName}</small>
                </h3>
              </div>
            </summary>
          </details>
        ))}
      </section>
    </Container>
  );
};

export default Lobby;
