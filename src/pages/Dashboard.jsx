import React from "react";
import { toast } from "react-toastify";

// Components
import AuthForm from "../components/AuthForm";

// Helpers
import { fetchData, getAuth } from "../helpers";
import { useLoaderData } from "react-router-dom";

export async function dashboardLoader() {
  const _token = fetchData("_token");
  const loggedUser = fetchData("loggedUser");

  if (_token) {
    try {
      if (
        await getAuth({
          token: _token,
        })
      ) {
        return toast.success(`Welcome back.`, {
          autoClose: 2500,
        });
      } else {
        return toast.error(`Token expired. Please login again.`);
      }
    } catch (e) {
      console.error("Error retrieving data:", e);
      throw new Error("Error retrieving data.");
    }
  }

  return { loggedUser, _token };
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action == "authContact") {
    try {
      if (
        await getAuth({
          formdata: data,
        })
      ) {
        return toast.success(`Welcome.`, {
          autoClose: 2500,
        });
      } else {
        return toast.error(`Error retrieving user.`);
      }
    } catch (e) {
      console.error("Error retrieving data:", e);
      throw new Error("Error retrieving data.");
    }
  }
}

const Dashboard = () => {
  const { loggedUser, _token } = useLoaderData();

  return <>{!loggedUser && !_token && <AuthForm />}</>;
};

export default Dashboard;
