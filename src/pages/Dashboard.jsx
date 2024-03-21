import React from "react";
import { fetchData } from "../helpers";
import AuthForm from "../components/AuthForm";

export function dashboardLoader() {
  const loggedUser = fetchData("loggedUser");
  return { loggedUser };
}

export function dashboardAction() {

  
}

const Dashboard = () => {
  return (
    <AuthForm />
  );
};

export default Dashboard;
