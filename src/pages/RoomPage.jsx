import React from "react";

export async function roomLoader() {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");

  return { loggedUser, _token };
}

export async function roomAction({ request }) {}
const RoomPage = () => {
  return <div></div>;
};

export default RoomPage;
