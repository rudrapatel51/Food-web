import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Navbar from '../Components/navbar/Navbar';


const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout
