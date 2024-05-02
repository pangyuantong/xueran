import axios from "axios";
import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DEBUG_MODE = "XMOCK";
export const DOMAIN = "https://xueran.site/portal";

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
      console.log("formdata")
      console.log(formdata)
      response = await axios.post(`${DOMAIN}/api/user`, formdata);
    }

    const res = response.data;
    if (response.data.success === true) {
      localStorage.setItem("_token", JSON.stringify(res.data.user._token));
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));

      if (res.data.user.joinedGameID === null) {
        // toast.success("To Lobby");
        return redirect(`/lobby`);
      } else {
        // toast.success("To Room");
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
        // toast.success("To Lobby");
        return redirect(`/lobby`);
      } else {
        // toast.success("To Room");
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



export const getAPI = async (action) => {
  const _token = fetchData("_token");
  // const navigate = useNavigate();

  if (_token == null) {
    localStorage.clear();
    return false;
  }

  console.log("load lobby JS");

  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        `https://mocki.io/v1/61cf67d3-79f8-4cf2-b109-eaa212c58897`
      );
    } else {
      var url = "";
      switch (action) {
        case "getLobby":
          url = `${DOMAIN}/api/user/games`;
          break;
        case "getRoom":
          url = `${DOMAIN}/api/user/games/info`;
          break;
        case "drawSeat":
          url = `${DOMAIN}/api/user/games/draw?drawType=Seat`;
          break;
        case "drawRole":
          url = `${DOMAIN}/api/user/games/draw?drawType=Role`;
          break;
        case "leaveGame":
          url = `${DOMAIN}/api/user/games/quit`;
          break;
        case "viewPlayers":
          url = `${DOMAIN}/api/user/games/all-player-seats`;
          break;
        default:
        // code block
      }

      response = await axios.get(url, {
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

export const postAPI = async (action, data) => {
  const _token = fetchData("_token");
  // const navigate = useNavigate();

  if (_token == null) {
    localStorage.clear();
    return false;
  }

  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        `https://mocki.io/v1/61cf67d3-79f8-4cf2-b109-eaa212c58897`
      );
    } else {
      var url = "";
      switch (action) {
        case "pickEvils":
          url = `${DOMAIN}/api/user/games/vote`;
          break;
         
        default:
        // code block
      }

      response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
          "Content-Type": 'application/json'
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
