import React, { useEffect, useState } from "react";
import {
  Stack,
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
} from "react-bootstrap";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import {
  ArrowLeftEndOnRectangleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/solid";
import { fetchData, getAPI, joinRoom } from "../helpers";
import { toast } from "react-toastify";

import { useWebSocket } from '../WebSocketContext.jsx';

export async function lobbyLoader() {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");

  return { loggedUser, _token };
}

export async function lobbyAction({ request }) { }

const LobbyPage = () => {
  const navigate = useNavigate();

  const { _token, loggedUser } = useLoaderData();
  if (_token === null || loggedUser === null) {
    // One or both are null, handle the scenario, maybe navigate to a login page
    navigate("/"); // Replace '/login' with the actual path you need
  }
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  //laravel echo
  const echo = useWebSocket();

  useEffect(() => {
    async function loadLobby() {
      console.log("load lobby");
      try {
        var res = await getAPI("getLobby");
        var res = JSON.parse(res);
        if (res.success === true) {
          const userInfo = res.data.user;
          localStorage.setItem("loggedUser", JSON.stringify(userInfo));
          if (userInfo.joinedGameID !== null) {
            return navigate("/room");
          }
          setGames(...games, res.data.games);
        } else {
          localStorage.clear();
          toast.error("Oops! " + res.message);
        }

        //Lobby websocket
        if (echo) {
          const channel = echo.private('lobby');

          channel.listen('.lobby.updated', (e) => {
            console.log('Lobby updated:', e);
          });

          // Listen for successful subscription
          channel.subscribed(() => {
            console.log('Successfully subscribed to the lobby channel!');
          });

          return () => channel.stopListening('.lobby.updated');
        }

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error("Error retrieving data:", e);
        throw new Error("Error retrieving data.");
      }
    }
    loadLobby();
  }, [echo]);

  const handleClickJoin = async (gmID) => {
    console.log(gmID);
    var res = await joinRoom(gmID);
    var res = JSON.parse(res);
    if (res.success === true) {
      const userInfo = res.data.user;
      localStorage.setItem("loggedUser", JSON.stringify(userInfo));
      navigate("/room");
    } else {
      toast.error("Oops! " + res.message);
    }
  };

  const handleClickLogout = () => {
    // Use the confirm method to display a confirmation dialog box
    console.log("Logout!");
    const userConfirmed = window.confirm("Are you sure you want to logout?");

    if (userConfirmed) {
      console.log("Logged Out!");
      localStorage.clear();
      navigate("/");
    } else {
      console.log("User canceled.");
    }
  };

  return (
    <>
      <Container fluid className="my-4 booklet">
        <section style={{ marginBottom: "10px" }}>
          <Row>
            <div className="col-2 pt-1">
              <Button className="btn-fail" onClick={handleClickLogout}>
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
          {games.length > 0 ? (
            games.map((game, index) => (
              <details key={index} onClick={() => handleClickJoin(game.gmID)}>
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
            ))
          ) : (
            <div className="d-flex justify-content-center align-items-center my-5">
              <Spinner animation="border" variant="light" />
            </div>
          )}
        </section>
      </Container>
    </>
  );
};

export default LobbyPage;
