import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
const Logout = () =>{
    useEffect(() =>{
        sessionStorage.removeItem("UserData")
    }, [])

    return(
        <>
            <Navigate replace to="/" />
        </>
    )
}
export default Logout;