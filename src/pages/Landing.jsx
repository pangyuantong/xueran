import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Components
import AuthForm from "../components/AuthForm";

// Helpers
import { fetchData, getAuth, getAuthToken } from "../helpers";
import { useLoaderData } from "react-router-dom";

export async function landingLoader() {
  const _token = fetchData("_token");

  if (_token) {
    return await getAuthToken({
      token: _token,
    });
  }

  const loggedUser = fetchData("loggedUser");

  return { loggedUser, _token };
}

export async function landingAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action == "authContact") {
    return await getAuth({
      formdata: data,
    });
  }
  return null;
}

const Landing = () => {
  const { loggedUser, _token } = useLoaderData();

  return <>{!loggedUser && !_token && <AuthForm />}</>;
};

export default Landing;
