import React, { useState } from 'react'
import FoodCart from './FoodCart'
import FoodData from "../Data/FoodData"
import CategoryMenu from './CategoryMenu'

const FoodItems = () => {
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredFoodData = selectedCategory === 'All'
        ? FoodData
        : FoodData.filter(food => food.category === selectedCategory)

    return (
        <div>
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
    )
}

export default FoodItems
