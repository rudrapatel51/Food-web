import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';
import ItemCard from './ItemCard';
import { useCart } from './context/CartContext';
import { clearCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import CheckoutModal from './checkout/CheckOutModal';



const Cart = () => {
  const cartItems = useSelector(state => state.cart.items) || []
  const totalQuantity = useSelector(state => state.cart.totalQuantity) || 0
  const { isCartOpen, closeCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const dispatch = useDispatch()

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleOrderPlaced = (orderId) => {
    dispatch(clearCart()); 
    setIsCheckoutModalOpen(false); 
    closeCart(); 
    navigate('/shop');
    alert('Order placed successfully!');
  };

  return (
    <>
      <div 
        className={`fixed right-0 top-0 lg:w-[20vw] h-full p-5 bg-white w-full transform 
          ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} 
          transition-transform duration-300 shadow-lg z-40`}
      >
        <div className='flex justify-between items-center'>
          <span className='text-xl font-bold text-gray-800'>
            My Orders ({totalQuantity})
          </span>
          <IoIosCloseCircle
            className='border-2 border-gray-600 text-gray-600 font-bold p-1 text-xl rounded-md 
              hover:text-red-300 hover:border-red-300 cursor-pointer'
            onClick={closeCart}
          />
        </div>

        <div className='mt-5 overflow-y-auto max-h-[calc(100vh-200px)]'>
        {cartItems && cartItems.length > 0 ? (
            cartItems.map(item => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                img={item.img}
              />
            ))
          ) : (
            <p className='text-center text-gray-500'>Your cart is empty</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className='absolute bottom-0 left-0 p-5 w-full bg-white border-t'>
            <h3 className='font-semibold text-gray-800'>
              Total Amount: ₹{cartItems.reduce((total, item) => total + item.totalPrice, 0)}
            </h3>
            <hr className='w-[90%] lg:w-[18vw] my-2' />
            <button 
              onClick={handleCheckout}
              className='bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-[90%] 
                lg:w-[18vw] mb-5 transition-transform duration-200 hover:bg-green-600'
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={cartItems}
        onPlaceOrder={handleOrderPlaced}
      />
    </>
  );
};

export default Cart;