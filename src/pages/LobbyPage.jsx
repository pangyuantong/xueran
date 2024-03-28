import React, { useEffect, useState } from "react";
import {
  Stack,
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
} from "react-bootstrap";
import { Form, redirect, useLoaderData } from "react-router-dom";
import {
  ArrowLeftEndOnRectangleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/solid";
import { fetchData, getLobby, joinRoom } from "../helpers";

export async function lobbyLoader() {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");

  return { loggedUser, _token };
}

export async function lobbyAction({ request }) {}

const LobbyPage = () => {
  const { loggedUser, _token } = useLoaderData();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLobby() {
      try {
        var lobby = await getLobby();
        var arr = JSON.parse(lobby);
        setGames(...games, arr);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error("Error retrieving data:", e);
        throw new Error("Error retrieving data.");
      }
    }
    loadLobby();
  }, []);

  if (loading) {
    return <></>; 
  }

  return (
    <>
      <Container fluid className="my-4 booklet">
        <section style={{ marginBottom: "10px" }}>
          <Row>
            <div className="col-2 pt-1">
              <Button className="btn-fail">
                <ArrowLeftEndOnRectangleIcon width={20} />
              </Button>
            </div>
            <div className="col-8">
              <h1 className="spooky-title" style={{ marginBottom: "10px" }}>
                大厅
              </h1>
            </div>
            <div className="col-2"></div>
          </Row>
          {games.length > 0 && games.map((game, index) => (
            <details key={index}>
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
    </>
  );
};

export default LobbyPage;
