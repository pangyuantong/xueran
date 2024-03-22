import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Components
import AuthForm from "../components/AuthForm";

// Helpers
import { fetchData, getAuth, getLobby } from "../helpers";
import { useLoaderData } from "react-router-dom";

export async function dashboardLoader() {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");

  return { loggedUser, _token };
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action == "authContact") {
    
  }
  return null;
}

const Dashboard = () => {
  const { loggedUser, _token } = useLoaderData();

  return <><p>testtttttttttttttt</p></>;
};

export default Dashboard;
