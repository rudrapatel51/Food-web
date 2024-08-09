import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Hero = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100">
            {/* Left Section - Text */}
            <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to Our Platform
                </h1>
                <p className="text-lg md:text-xl text-gray-700">
                    We provide the best solutions to help you grow your business and reach your goals. Join us to unlock the full potential of your business with our innovative services.
                </p>
            </div>

            {/* Right Section - Image with Floating Icons */}
            <div className="relative md:w-1/2 flex justify-center">
                {/* Circular Image */}
                <div className="w-74 h-74 rounded-full overflow-hidden relative"> {/* Adjusted size */}
                    <img
                        src="https://media.gettyimages.com/id/554929247/photo/spice-colour-wheel.jpg?s=1024x1024&w=gi&k=20&c=OEvLZT6T8otXxmhwxfdPDtY999tgZBLhNZ5_ITQn8ns="
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Floating Icons */}
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="w-60 h-60 rounded-full absolute animate-pulse"></div>
                    <FaFacebook className="text-blue-600 text-3xl absolute top-4 left-12 animate-bounce" />
                    <FaTwitter className="text-blue-400 text-3xl absolute bottom-4 right-12 animate-bounce" />
                    <FaLinkedin className="text-blue-700 text-3xl absolute top-16 right-4 animate-bounce" />
                    <FaInstagram className="text-pink-500 text-3xl absolute bottom-16 left-4 animate-bounce" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
