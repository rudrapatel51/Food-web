import React from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

const ItemCard = () => {
    return (
        <div className='flex justify-between items-center gap-2 shadow-md rounded-lg p-3 mb-3 bg-white'>
            <img
                src='https://w7.pngwing.com/pngs/356/675/png-transparent-falafel-lebanese-cuisine-take-out-mediterranean-cuisine-hummus-bed-miscellaneous-furniture-food-thumbnail.png'
                alt='product'
                className='w-[60px] h-[60px] object-cover rounded-md'
            />
            <div className='flex-1'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-gray-800'>Onion Pizza</h2>
                    <MdDeleteForever className='text-red-500 text-2xl cursor-pointer hover:text-red-700 transition-all ease-linear' />
                </div>
                <div className='flex justify-between items-center mt-2'>
                    <span className='text-green-500 font-bold'>₹120</span>
                    <div className='flex justify-center items-center gap-2'>
                        <AiOutlinePlus className='border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer' />
                        <span className='text-gray-800'>1</span>
                        <AiOutlineMinus className='border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;