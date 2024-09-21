import React, { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import Navbar from '../Components/navbar/Navbar';
import Loader from '../loader/Loader';


const Layout = () => {
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 2000);
    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <Navbar />
                    <Outlet />
                </div>
            )}
        </div>
    )
}

export default Layout
