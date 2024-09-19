import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';

const FoodCart = ({ id, name, price, desc, rating, img }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addItemToCart({ id, name, price, img }));
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
        </>
    );
};

export default FoodCart;
