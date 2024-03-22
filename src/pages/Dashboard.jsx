import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Components
import AuthForm from "../components/AuthForm";

// Helpers
import { fetchData } from "../helpers";
import { useLoaderData } from "react-router-dom";
import Lobby from "../components/Lobby";

export async function dashboardLoader() {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");
  const gamesAvailable = fetchData("gamesAvailable");

  return { loggedUser, _token, gamesAvailable };
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action == "authContact") {
  }
  return null;
}

const Dashboard = () => {
  const { loggedUser, _token, gamesAvailable } = useLoaderData();

  return (
    <>
      <Lobby gamesAvailable={gamesAvailable}/>
    </>
  );
};

export default Dashboard;
