import axios from "axios";
import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DEBUG_MODE = "XMOCK";
const DOMAIN = "http://47.129.37.254";

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// API Firing
export const getAuthByForm = async ({ formdata = null }) => {
  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        // `https://mocki.io/v1/bc652a04-c12e-48f9-b16d-1228a6d00d41`
        // without game below
        `https://mocki.io/v1/16ba4592-e461-47e7-8f37-ff11f2e2c9c0`
        // false below
        // `https://mocki.io/v1/241f87ae-2931-4576-b109-913bb86eb94f`
      );
    } else {
      response = await axios.post(`${DOMAIN}/api/user`, formdata);
    }

    const res = response.data;
    if (response.data.success === true) {
      localStorage.setItem("_token", JSON.stringify(res.data.user._token));
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));

      if (res.data.user.joinedGameID === null) {
        toast.success("To Lobby");
        return redirect(`/lobby`);
      } else {
        toast.success("To Room");
        return redirect(`/room`);
      }
    } else {
      localStorage.clear();
      toast.error("Oops! " + res.message);
      return redirect("/");
    }
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error(e);
  }
};

export const getAuthByToken = async () => {
  const _token = fetchData("_token");
  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        // `https://mocki.io/v1/27977a22-46f4-4a68-9d82-d8422a58b389`
        // without game below
        `https://mocki.io/v1/16ba4592-e461-47e7-8f37-ff11f2e2c9c0`
        // false below
        // `https://mocki.io/v1/241f87ae-2931-4576-b109-913bb86eb94f`
      );
    } else {
      response = await axios.get(`${DOMAIN}/api/user`, {
        headers: {
          Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
        },
      });
    }

    const res = response.data;
    if (response.data.success === true) {
      toast.success("Welcome Back");
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));

      if (res.data.user.joinedGameID === null) {
        toast.success("To Lobby");
        return redirect(`/lobby`);
      } else {
        toast.success("To Room");
        return redirect(`/room`);
      }
    } else {
      localStorage.clear();
      toast.error("Oops!" + res.message);
      return redirect(`/`);
    }
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error(e);
  }
};

export const getLobby = async () => {
  const _token = fetchData("_token");
  // const navigate = useNavigate();

  if (_token == null) {
    localStorage.clear();
    return false;
  }
  
  console.log('load lobby JS')

  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        // `https://mocki.io/v1/e7811454-b731-450d-8fe3-8ae9b040be62`
        // below without joined room
        `https://mocki.io/v1/61cf67d3-79f8-4cf2-b109-eaa212c58897`
      );
    } else {
      response = await axios.get(`${DOMAIN}/api/user/games`, {
        headers: {
          Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
        },
      });
    }

    const res = response.data;
    return JSON.stringify(res);
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error("Error retrieving data.");
  }
};

export const joinRoom = async (roomNum) => {
  const _token = fetchData("_token");
  console.log("jshelper: " + roomNum);
  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        `https://mocki.io/v1/d1811817-dbf9-4bb8-bca0-f8da53e42bbb`
        // FAIL BELOW
        // `https://mocki.io/v1/64212e22-99be-4680-8cdb-39a28dafbe8c`
      );
    } else {
      response = await axios.get(
        `${DOMAIN}/api/user/games/join?gmID=${roomNum}`,
        {
          headers: {
            Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
          },
        }
      );
    }

    const res = response.data;
    return JSON.stringify(res);
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error("Error retrieving data.");
  }
};

export const getRoom = async () => {
  const _token = fetchData("_token");
  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        `https://mocki.io/v1/b16cb1a8-4f61-45db-bdaf-0a58487aa1e7`
        // WITHOUT ROOM
        // `https://mocki.io/v1/b43cf359-3ab2-4d4d-b54f-49184d3ef6b1`
      );
    } else {
      response = await axios.get(`${DOMAIN}/api/user/games/info`, {
        headers: {
          Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
        },
      });
    }

    const res = response.data;
    return JSON.stringify(res);
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error("Error retrieving data.");
  }
};

export const drawSeat = async () => {
  const _token = fetchData("_token");
  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        `https://mocki.io/v1/796cf1c2-ff4a-4efc-8ebd-c67eec70f4aa`
      );
    } else {
      response = await axios.get(
        `${DOMAIN}/api/user/games/draw?drawType=Seat`,
        {
          headers: {
            Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
          },
        }
      );
    }

    const res = response.data;
    return JSON.stringify(res);
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error("Error retrieving data.");
  }
};

export const drawRole = async () => {
  const _token = fetchData("_token");
  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        `https://mocki.io/v1/c3979403-0b30-483d-93de-ae3fecf8a52d`
        // BELOW IS GAME NOT STARTED
        // `https://mocki.io/v1/6373e301-3bec-4657-b43f-8d1289c98fb9`
      );
    } else {
      response = await axios.get(
        `${DOMAIN}/api/user/games/draw?drawType=Role`,
        {
          headers: {
            Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
          },
        }
      );
    }

    const res = response.data;
    return JSON.stringify(res);
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error("Error retrieving data.");
  }
};

export const leaveGame = async () => {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");
  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        `https://mocki.io/v1/b45dbd45-330d-49d1-b79e-2d37ea243c69`
      );
    } else {
      response = await axios.get(`${DOMAIN}/api/user/games/quit`, {
        headers: {
          Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
        },
      });
    }
    const res = response.data;
    return JSON.stringify(res);
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error("Error retrieving data.");
  }
};
