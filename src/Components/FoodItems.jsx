import React, { useState } from 'react';
import FoodCart from './FoodCart';
import FoodData from "../Data/FoodData";
import CategoryMenu from './CategoryMenu';
import Navbar from './Navbar';

const   FoodItems = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState(FoodData);

    const filteredFoodData = selectedCategory === 'All'
        ? filteredProducts
        : filteredProducts.filter(food => food.category === selectedCategory);

    const handleSearch = (query) => {
        const filtered = FoodData.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div>
            <Navbar onSearch={handleSearch} />
            <CategoryMenu
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <div className='flex flex-wrap gap-10 justify-center lg:justify-start mx-6 my-10'>
                {
                    filteredFoodData.map((food) => (
                        <FoodCart
                            key={food.id}
                            id={food.id}
                            name={food.name}
                            price={food.price}
                            desc={food.desc}
                            rating={food.rating}
                            img={food.img}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default FoodItems;
