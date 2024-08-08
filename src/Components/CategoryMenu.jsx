import React from 'react'

const CategoryMenu = ({ selectedCategory, setSelectedCategory }) => {
    const buttonValue = ["All", "Lunch", "Breakfast", "Dinner", "Snacks"]

    return (
        <div className='ml-6'>
            <h3 className='text-xl font-semibold'>
                Find The Best Food
            </h3>
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
    )
}

export default CategoryMenu
