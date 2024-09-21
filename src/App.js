import React from 'react'
import Shop from './pages/Shop'
import { CartProvider } from './Components/context/CartContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from './pages/Home';
import Layout from './layout/Layout';



const App = () => {

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Shop" element={<Shop />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider >
  )
}

export default App
