import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers"


// assets
import Nav from "../components/Nav";

const [page, setPage] = useState("")

export function mainLoader() {
    const [page, setPage] = useState("")
    setPage("Landing");
    const loggedUser = fetchData("loggedUser");
    return { loggedUser, page }
}


const Main = () => {
    const { page } = useLoaderData();

    return (
        <div className="layout">
        <Nav page={page}/>
            <main>
            <Outlet />
            </main>
        </div>
    )
}

export default Main
