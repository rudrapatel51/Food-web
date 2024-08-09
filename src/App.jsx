import React from 'react'
import Shop from './pages/Shop'
import { CartProvider } from './Components/context/CartContext'

const App = () => {

  return (
    <CartProvider>
      <div>
        <Shop />
      </div>
    </CartProvider>
  )
}

export default App
