import axios from "axios";
import { useState, useEffect } from "react";

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// API Firing
export const getAuth = async ({ formdata = null, token = null }) => {
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
    // `http://192.168.68.114/portal/public/api/game/${mobile}/${gmID}`
    `https://mocki.io/v1/18c7f8b8-88ea-4c8d-8889-a1c3daa40c18`
  );

  if (response.data.success) {
    const res = response.data;
    const loggedUser = {
      userID: res.data.user.userID,
      userName: res.data.user.userName,
      userMobile: res.data.user.userMobile,
      userCurrGame: res.data.user.joinedGameID,
    };

    if (res.data.user._token) {
      localStorage.setItem("_token", JSON.stringify(res.data.user._token));
    }
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

    return true;
  } else {
    return false;
  }
};
