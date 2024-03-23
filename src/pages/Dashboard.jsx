import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Components
import AuthForm from "../components/AuthForm";

// Helpers
import { fetchData, getLobby, joinRoom, leaveGame } from "../helpers";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import Lobby from "../components/Lobby";
import Room from "../components/Room";

export async function dashboardLoader() {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");
  if ((await getLobby()) !== true) {
    toast.error("Error validating token. Please login and try again.");
    return redirect("/");
  }

  const gamesAvailable = fetchData("gamesAvailable");

  return { loggedUser, _token, gamesAvailable };
}

export async function dashboardAction({ request }) {
  // const data = await request.formData();
  // const { _action, ...values } = Object.fromEntries(data);
}

const Dashboard = () => {
  const { loggedUser, _token, gamesAvailable } = useLoaderData();
  const [roomNum, setRoomNum] = useState(loggedUser.userCurrGame);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [boardData, setBoardData] = useState();
  const [boardRoles, setBoardRoles] = useState(false);
  const [currGamesAvailable, setCurrGamesAvailable] = useState(gamesAvailable);
  const navigate = useNavigate();

  useEffect(() => {
    // If either `loggedUser` or `_token` exists, set loading to false
    async function attemptJoinRoom() {
      if (roomNum) {
        try {
          if (await joinRoom(roomNum)) {
            setJoinedRoom(true);
            setBoardData(fetchData("boardData"));
          }
        } catch (e) {
          console.error("Error retrieving data:", e);
          throw new Error("Error retrieving data.");
        }
      }
    }
    attemptJoinRoom();
  }, [roomNum]);

  const handleClickJoin = (gmID) => {
    // Inner function that acts as the event handler
    return (event) => {
      event.stopPropagation(); // Stop the event from propagating to parent elements
      console.log("Join this room: " + gmID); // Use the parameter in the handler
      setRoomNum(gmID); // Update state based on the parameter
    };
  };

  const handleClickLeave = async () => {
    try {
      if (await leaveGame()) {
        setJoinedRoom(false);
        if (await getLobby()) {
          setCurrGamesAvailable(fetchData("gamesAvailable"));
        }
      }
    } catch (e) {
      console.error("Error leaving game:", e);
      throw new Error("Error leaving game.");
    }
  };

  const handleClickLogout = () => {
    // Use the confirm method to display a confirmation dialog box
      console.log("Logged Out!");
    const userConfirmed = window.confirm("Are you sure you want to logout?");

    if (userConfirmed) { 
      console.log("Logged Out!");
      localStorage.clear();
      navigate('/');
    } else {
      console.log("User canceled.");
    }
  };

  return (
    <>
      {!joinedRoom ? (
        <Lobby
          gamesAvailable={gamesAvailable}
          handleClickJoin={handleClickJoin}
          handleClickLogout={handleClickLogout}
        />
      ) : (
        <Room
          boardData={boardData}
          boardRoles={boardRoles}
          handleClickLeave={handleClickLeave}
        />
      )}
    </>
  );
};

export default Dashboard;
