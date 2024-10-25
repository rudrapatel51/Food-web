import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';
import ItemCard from './ItemCard';
import { useCart } from './context/CartContext';

const CheckoutModal = ({ isOpen, onClose, cartItems, onPlaceOrder }) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      customerName,
      address,
      phone,
      items: cartItems,
      totalAmount: cartItems.reduce((total, item) => total + item.totalPrice, 0),
      orderDate: new Date(),
      status: 'pending'
    };

    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const data = await response.json();
        onPlaceOrder(data.orderId);
        setCustomerName('');
        setAddress('');
        setPhone('');
        onClose();
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-[90%] max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Checkout Details</h2>
            <IoIosCloseCircle
              className="text-gray-600 hover:text-red-500 cursor-pointer text-xl"
              onClick={onClose}
            />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none min-h-[100px]"
                required
                placeholder="Enter your full address"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="mb-4">
                <h3 className="font-semibold">Order Summary</h3>
                <p className="text-gray-600">Total Items: {cartItems.length}</p>
                <p className="text-gray-600">Total Amount: ₹{cartItems.reduce((total, item) => total + item.totalPrice, 0)}</p>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Cart component
const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const { isCartOpen, closeCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleOrderPlaced = (orderId) => {
    // You can dispatch an action here to clear the cart
    console.log(`Order placed successfully! Order ID: ${orderId}`);
    // Show success notification
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
          {cartItems.length > 0 ? (
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