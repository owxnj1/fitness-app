// Hero section for the home page

import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-black opacity-40 z-10"
        aria-hidden="true"
      />
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/gym.jpeg")',
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          OwNnit Fitness
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Exercise, Nutrition and community. Start your journey today.
        </p>
        
        <Link 
          href="/login" 
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
        >
          Sign Up / Log In
        </Link>
      </div>
    </div>
  );
};

export default HeroSection; 