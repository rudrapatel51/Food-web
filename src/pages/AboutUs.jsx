import React from 'react';

const AboutUs = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100">
            {/* Right Section - Image with Floating Icons */}
            <div className="relative flex justify-center p-4 sm:p-8 md:p-12 lg:p-24">
                <div className="w-[60vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] h-auto relative">
                    <img
                        src="https://images.unsplash.com/photo-1503810473512-f64b56827964?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="food"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Floating Icons */}
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="w-60 h-60 rounded-full absolute animate-pulse"></div>
                </div>
            </div>

            {/* Left Section - Text */}
            <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Hello Our Clients
                </h1>
                <p className="text-lg md:text-xl text-gray-700">
                    We provide the best solutions to help you grow your business and reach your goals. Join us to unlock the full potential of your business with our innovative services.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
