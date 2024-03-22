import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Components
import AuthForm from "../components/AuthForm";

// Helpers
import { fetchData, getLobby, joinRoom } from "../helpers";
import { useLoaderData } from "react-router-dom";
import Lobby from "../components/Lobby";
import Room from "../components/Room";

export async function dashboardLoader() {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");

  if (!getLobby()) {
    toast.error("Error validating token. Please login and try again.");
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

  useEffect(() => {
    // If either `loggedUser` or `_token` exists, set loading to false
    if (roomNum) {
      if (joinRoom(roomNum)) {
        setJoinedRoom(true);
        setBoardData(fetchData("boardData"));

        loggedUser.userCurrGame = roomNum;
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      }
    }
  }, [roomNum]);

  const handleClickJoin = (gmID) => {
    // Inner function that acts as the event handler
    return (event) => {
      event.stopPropagation(); // Stop the event from propagating to parent elements
      console.log("Join this room: " + gmID); // Use the parameter in the handler
      setRoomNum(gmID); // Update state based on the parameter
    };
  };

  return (
    <>
      {!joinedRoom ? (
        <Lobby gamesAvailable={gamesAvailable} handleClick={handleClickJoin} />
      ) : (
        <Room boardData={boardData} boardRoles={boardRoles}/>
      )}
    </>
  );
};

export default Dashboard;
