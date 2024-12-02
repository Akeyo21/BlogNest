import React from "react";
import useStore from "../store/useStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const {accessToken} = useStore();

    if(!accessToken){
        return <Navigate to='/login' replace/>
    }
    
    return children;
};

export default ProtectedRoute;
