import React, { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import Navbar from '../Components/navbar/Navbar';
import Loader from '../loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
                    <Navbar />
                    <Outlet />
                </div>
            )}
        </div>
    )
}

export default Layout
