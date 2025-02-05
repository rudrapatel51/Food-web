import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
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
        items: [cartItems],
        totalAmount: cartItems.reduce((total, item) => total + item.totalPrice, 0),
        orderDate: new Date(),
        status: 'pending'
      };
  
      try {
        const response = await fetch('https://food-web-a0je.onrender.com/api/orders', {
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
          onClose(  );
        }
      } catch (error) {
        console.error('Error placing order:', error);
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
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

export default CheckoutModal