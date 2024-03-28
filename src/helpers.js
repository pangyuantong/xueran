import axios from "axios";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const DEBUG_MODE = "MOCK";

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
      response = await axios.post(`http://13.229.197.176/api/user`, formdata);
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
      response = await axios.get(`http://13.229.197.176/api/user`, {
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
  if (_token == null) {
    localStorage.clear();
    return false;
  }

  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        // `https://mocki.io/v1/e7811454-b731-450d-8fe3-8ae9b040be62`
        // below without joined room
        `https://mocki.io/v1/61cf67d3-79f8-4cf2-b109-eaa212c58897`
      );
    } else {
      response = await axios.get(`http://13.229.197.176/api/user/games`, {
        headers: {
          Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
        },
      });
    }

    const res = response.data;
    if (response.data.success) {
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));

      if (res.data.user.joinedGameID != null) {
        toast.success("To Room");
        window.location.href = "/room";
        return;
      }
      console.log("cont");
      return JSON.stringify(res.data.games);
    } else {
      localStorage.clear();
      toast.error("Oops!" + res.message);
      return redirect(`/`);
    }
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error("Error retrieving data.");
  }
};

export const joinRoom = async (roomNum) => {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");
  console.log("jshelper: " + roomNum);
  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        `https://mocki.io/v1/98929258-930c-46aa-9fd5-0f38f2ecda3f`
      );
    } else {
      response = await axios.get(
        `http://13.229.197.176/api/user/games/join?gmID=${roomNum}`,
        {
          headers: {
            Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
          },
        }
      );
    }

    console.log(response);

    if (response.data.success) {
      const res = response.data;
      const boardRoles = res.data.boardRoles;
      const boardData = res.data.boardData;

      localStorage.setItem("boardRoles", JSON.stringify(boardRoles));
      localStorage.setItem("boardData", JSON.stringify(boardData));

      loggedUser.userCurrGame = roomNum;
      console.log(roomNum);
      console.log(JSON.stringify(loggedUser));
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      return true;
    } else {
      return false;
    }
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
        `https://mocki.io/v1/a502efe6-4589-44f7-bb84-2a48dd72ee72`
      );
    } else {
      response = await axios.get(
        `http://13.229.197.176/api/user/games/draw?drawType=Seat`,
        {
          headers: {
            Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
          },
        }
      );
    }

    console.log(response);

    if (response.data.success) {
      const res = response.data;

      const roleInfo = {
        roleID: res.data.role,
        roleImg: res.data.roleInfo.roleImg,
        roleName: res.data.roleInfo.roleName,
        roleDesc: res.data.roleInfo.roleDesc,
        roleFaction: res.data.roleInfo.roleFaction,
      };

      localStorage.setItem("roleInfo", JSON.stringify(roleInfo));
      localStorage.setItem("seatNum", res.data.seat);
      // toast.success("Seat Number Retrieved.");

      return true;
    } else {
      return false;
    }
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
        `https://mocki.io/v1/b82e1a08-57e0-4a06-9393-c035d5b343b6`
      );
    } else {
      response = await axios.get(
        `http://13.229.197.176/api/user/games/draw?drawType=Role`,
        {
          headers: {
            Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
          },
        }
      );
    }

    console.log(response);

    if (response.data.success) {
      const res = response.data;

      const roleInfo = {
        roleID: res.data.role,
        roleImg: res.data.roleInfo.roleImg,
        roleName: res.data.roleInfo.roleName,
        roleDesc: res.data.roleInfo.roleDesc,
        roleFaction: res.data.roleInfo.roleFaction,
      };

      localStorage.setItem("roleInfo", JSON.stringify(roleInfo));
      localStorage.setItem("seatNum", res.data.seat);
      // toast.success("Seat Number Retrieved.");

      return true;
    } else {
      return false;
    }
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
        `https://mocki.io/v1/85af7970-7ced-475d-a0e8-ec325abe661b`
      );
    } else {
      response = await axios.get(`http://13.229.197.176/api/user/games/quit`, {
        headers: {
          Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
        },
      });
    }

    if (response.data.success) {
      localStorage.removeItem("boardRoles");
      localStorage.removeItem("gamesAvailable");
      localStorage.removeItem("boardData");
      localStorage.removeItem("roleInfo");
      localStorage.removeItem("seatNum");

      loggedUser.userCurrGame = null;
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error("Error retrieving data.");
  }
};
