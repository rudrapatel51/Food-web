import React from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import ItemCard from './ItemCard';

const Cart = () => {
    return (
        <>
            <div className='fixed right-0 top-0 lg:w-[20vw] h-full p-5 bg-white w-full'>
                <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold text-gray-800'>My Orders</span>
                    <IoIosCloseCircle className='border-2 border-gray-600 text-gray-600 font-bold p-1 text-xl rounded-md hover:text-red-300 hover:border-red-300 cursor-pointer' />
                </div>

                <div>
                    <ItemCard />
                </div>

                <div className='absolute bottom-0 left-0 p-5 w-full'>
                    <h3 className='font-semibold text-gray-800'>Items :</h3>
                    <h3 className='font-semibold text-gray-800'>Total Amount :</h3>
                    <hr className='w-[90%] lg:w-[18vw] my-2' />
                    <button className='bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-[90%] lg:w-[18vw] mb-5'>Checkout</button>
                </div>
            </div>
        </>
    )
}

export default Cart;
