import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers"


// assets
import Nav from "../components/Nav";

export function mainLoader() {
    const loggedUser = fetchData("loggedUser");
    return { loggedUser }
}


const Main = () => {
    const { loggedUser } = useLoaderData();

    return (
        <div className="custom-background">
        <Nav/>
            <Outlet />
        </div>
    )
}

export default Main
