// This is the main landing page 

import React from 'react';
import Navbar from '../../components/navbar';
import HeroSection from '@/components/HeroSection';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Testimonials />
        
        {/* Footer Links Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* About Us */}
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-600">
                Learn more about OwNnit Fitness, and our vision.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-600">
                Get in touch with us.
              </p>
            </div>

            {/* Terms & Conditions */}
            <div>
              <h3 className="text-xl font-bold mb-4">Terms & Conditions</h3>
              <p className="text-gray-600">
                Understand our terms and conditions.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 