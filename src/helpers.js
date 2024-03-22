import axios from "axios";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// API Firing
export const getAuth = async ({ formdata = null, token = null }) => {
  try {
    //   if (formdata) {
    //     const response = await axios.post(
    //       `http://192.168.68.114/portal/public/api/user`,
    //       formdata
    //     );
    //   } else {
    //     const response = await axios.get(
    //       `http://192.168.68.114/portal/public/api/user`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`, // Use 'Bearer' if required by your API
    //         },
    //       }
    //     );
    //   }

    const response = await axios.get(
      // with token
      //   `https://mocki.io/v1/18c7f8b8-88ea-4c8d-8889-a1c3daa40c18`
      // without token
      // `https://mocki.io/v1/db9bdf03-6474-41ed-8c33-771d794f48f1`

      //   without joined game
      `https://mocki.io/v1/e8486685-b60d-423f-997b-d5e0841df9cc`
    );

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

      if (!loggedUser.userCurrGame) {
        getLobby();
      }
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      toast.success(`Welcome back...${token}`, {
        autoClose: 1800,
      });
      console.log("go dashboard")
      return redirect("/dashboard")
    } else {
      localStorage.clear();
      toast.error(`Token expired. Please login again.`);
    }
  } catch (e) {
    console.error("Error retrieving data:", e);
    throw new Error("Error retrieving data.");
  }
};

export const getLobby = async () => {
  const _token = fetchData("_token");

  //   const response = await axios.get(
  //     `http://192.168.68.114/portal/public/api/user/games`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${_token}`, // Use 'Bearer' if required by your API
  //       },
  //     }
  //   );

  const response = await axios.get(
    `https://mocki.io/v1/103ca5a5-440a-48aa-a5d3-d8bec8230cec`
  );

  console.log(response);

  if (response.data.success) {
    const res = response.data;

    localStorage.setItem("gamesAvailable", JSON.stringify(res.data));

    return true;
  } else {
    return false;
  }
};
