import React from 'react';
import FoodData from '../../Data/FoodData';
import { Link } from 'react-router-dom';


const FeatureItem = () => {
    const featuredProducts = FoodData.filter(product => product.category === 'feature');

    return (
        <div className='p-10'>
            <div className='mb-5'>
                <h1 className='text-2xl font-bold mb-2'>Featured Items</h1>
                <div className='w-44 h-1 bg-green-500'></div>
            </div>
            <Link to="/shop">
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {featuredProducts.map((product) => (
                        <div key={product.id} className='text-center p-4  rounded-lg'>
                            <img
                                src={product.img}
                                alt={product.name}
                                className='w-36 h-36 mx-auto mb-4 rounded-full object-cover'
                            />
                            <h2 className='text-lg font-semibold'>{product.name}</h2>
                            <p className='text-green-600 text-xl font-bold'>{product.price}</p>
                            <p className='text-gray-500'>Rating: {product.rating}</p>
                        </div>
                    ))}
                </div>
            </Link>
        </div>
    );
}

export default FeatureItem;
