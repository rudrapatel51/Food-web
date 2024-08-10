import React from 'react';
import { PiShoppingCartFill } from "react-icons/pi";
import { useCart } from './context/CartContext';

const CategoryMenu = ({ selectedCategory, setSelectedCategory }) => {
    const buttonValue = ["All", "Lunch", "Breakfast", "Dinner", "Snacks", "feature"];
    const { toggleCart } = useCart();

    return (
        <div className='ml-6 relative lg:mr-8'>
            <div className='flex justify-between items-center'>
                <h3 className='text-xl font-semibold'>
                    Find The Best Food
                </h3>

                {/* Cart Button - Always on the right of the heading */}
                <div className='ml-auto'>
                    <button
                        onClick={toggleCart}
                        className='p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300'>
                        <PiShoppingCartFill className='text-2xl' />
                    </button>
                </div>
            </div>

            <div className='my-5 flex gap-3 overflow-x-scroll scroll-smooth lg:overflow-x-hidden'>
                {
                    buttonValue.map((btn) => (
                        <button
                            key={btn}
                            className={`px-3 py-2 font-bold rounded-lg 
                                ${selectedCategory === btn ? 'bg-green-500 text-white' : 'bg-gray-200'}
                                hover:bg-green-500 hover:text-white`}
                            onClick={() => setSelectedCategory(btn)}
                        >
                            {btn}
                        </button>
                    ))
                }
            </div>
        </div>
    );
};

export default CategoryMenu;
