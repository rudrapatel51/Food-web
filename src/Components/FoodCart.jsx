import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';
import Cart from './Cart';
import { PiShoppingCartFill } from "react-icons/pi";

const FoodCart = ({ id, name, price, desc, rating, img }) => {
    const dispatch = useDispatch();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleAddToCart = () => {
        dispatch(addItemToCart({ id, name, price }));
        setIsCartOpen(true); // Open the cart when an item is added
    };

    const handleCloseCart = () => {
        setIsCartOpen(false); // Close the cart
    };

    const handleCartButtonClick = () => {
        setIsCartOpen(prevState => !prevState); // Toggle cart visibility
    };

    return (
        <>
            <div key={id} className='relative w-full md:w-[calc(50%-20px)] lg:w-[250px] bg-white p-4 flex flex-col rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <div className='relative overflow-hidden rounded-lg'>
                    <img
                        className='h-32 w-full object-cover transform hover:scale-105 transition-transform duration-300'
                        src={img}
                        alt={name}
                    />
                </div>
                <div className='mt-3 flex-grow'>
                    <h2 className='text-lg font-semibold'>{name}</h2>
                    <p className='text-sm text-gray-500 mt-1'>{desc.slice(0, 50)}...</p>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <span className='text-green-500 font-semibold'>₹ {price}</span>
                    <span className='flex items-center text-yellow-400'>
                        <AiFillStar className='mr-1' /> {rating}
                    </span>
                </div>
                <button
                    onClick={handleAddToCart}
                    className='mt-4 p-2 text-white bg-green-500 hover:bg-green-600 rounded-lg text-sm'>
                    Add to Cart
                </button>
            </div>
            <div className='absolute top-20 right-8'>
                <button
                    onClick={handleCartButtonClick}
                    className='p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300'>
                    <PiShoppingCartFill className='text-2xl' />
                </button>
            </div>
            <Cart isOpen={isCartOpen} onClose={handleCloseCart} />
        </>
    );
};

export default FoodCart;
