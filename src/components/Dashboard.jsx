import React from "react";
import { fetchData } from "../helpers";

export function dashboardLoader() {
  const loggedUser = fetchData("loggedUser");
  return { loggedUser };
}

export function dashboardAction() {

}

const Dashboard = () => {
  return <div>test</div>;
};

export default Dashboard;
