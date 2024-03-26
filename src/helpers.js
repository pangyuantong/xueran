import axios from "axios";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const DEBUG_MODE = "MOCK";

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// API Firing
export const getAuthByForm = async ({ formdata = null, token = null }) => {
  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        //   // with token
        //   //   `https://mocki.io/v1/18c7f8b8-88ea-4c8d-8889-a1c3daa40c18`
        //   // without token
        //   // `https://mocki.io/v1/db9bdf03-6474-41ed-8c33-771d794f48f1`
        `https://mocki.io/v1/e8486685-b60d-423f-997b-d5e0841df9cc`
      );
    } else {
      response = await axios.post(
        `http://192.168.68.114/portal/public/api/user`,
        formdata
      );
    }

    if (response.data.success) {
      const res = response.data;
      const loggedUser = {
        userID: res.data.user.userID,
        userName: res.data.user.userName,
        userMobile: res.data.user.userMobile,
        userCurrGame: res.data.user.joinedGameID,
      };

      console.log(res.data.user._token);
      if (res.data.user._token) {
        localStorage.setItem("_token", JSON.stringify(res.data.user._token));
      }
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      // toast.success(`Welcome back...${token}`, {
      //   autoClose: 1800,
      // });
      console.log("go dashboard");
      return redirect("/dashboard");
    } else {
      localStorage.clear();
      toast.error(`Token expired. Please login again.`);
    }
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error(e);
  }
};

export const getAuthByToken = async ({ formdata = null, token = null }) => {
  const _token = fetchData("_token");
  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        //   // with token
        //   //   `https://mocki.io/v1/18c7f8b8-88ea-4c8d-8889-a1c3daa40c18`
        //   // without token
        //   // `https://mocki.io/v1/db9bdf03-6474-41ed-8c33-771d794f48f1`
        `https://mocki.io/v1/e8486685-b60d-423f-997b-d5e0841df9cc`
      );
    } else {
      response = await axios.get(
        `http://192.168.68.114/portal/public/api/user`,
        {
          headers: {
            Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
          },
        }
      );
    }

    if (response.data.success) {
      const res = response.data;
      const loggedUser = {
        userID: res.data.user.userID,
        userName: res.data.user.userName,
        userMobile: res.data.user.userMobile,
        userCurrGame: res.data.user.joinedGameID,
      };

      console.log(res.data.user._token);
      if (res.data.user._token) {
        localStorage.setItem("_token", JSON.stringify(res.data.user._token));
      }
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      // toast.success(`Welcome back...${token}`, {
      //   autoClose: 1800,
      // });
      console.log("go dashboard");
      return redirect("/dashboard");
    } else {
      localStorage.clear();
      toast.error(`Token expired. Please login again.`);
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
        `https://mocki.io/v1/103ca5a5-440a-48aa-a5d3-d8bec8230cec`
      );
    } else {
      response = await axios.get(
        `http://192.168.68.114/portal/public/api/user/games`,
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

      localStorage.setItem("gamesAvailable", JSON.stringify(res.data));

      return true;
    } else {
      localStorage.clear();
      return false;
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
        `https://mocki.io/v1/e7d4344f-cfb6-42ea-afc8-2eecf509c12a`
      );
    } else {
      response = await axios.get(
        `http://192.168.68.114/portal/public/api/user/games/join?gmID=${roomNum}`,
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

export const drawSR = async () => {
  const _token = fetchData("_token");
  try {
    var response;
    if (DEBUG_MODE === "MOCK") {
      response = await axios.get(
        `https://mocki.io/v1/8f772f63-3ba9-4f8f-ac79-e39c736b883e`
      );
    } else {
      response = await axios.get(
        `http://192.168.68.114/portal/public/api/user/games/draw`,
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
        `https://mocki.io/v1/8f772f63-3ba9-4f8f-ac79-e39c736b883e`
      );
    } else {
      response = await axios.get(
        `http://192.168.68.114/portal/public/api/user/games/quit`,
        {
          headers: {
            Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
          },
        }
      );
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
