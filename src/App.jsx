import React from 'react'
import Shop from './pages/Shop'
import { CartProvider } from './Components/context/CartContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from './layout/Layout';
import Orders from './Components/cartComponent/Orders';
import Login from './adminAuth/Login';
import Register from './adminAuth/Register';



const App = () => {

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Shop" element={<Shop />} />
            <Route path="register/admin" element={<Register />} />
            <Route path="login/admin" element={<Login />} />
            <Route path="admin/order" element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider >
  )
}

export default App
