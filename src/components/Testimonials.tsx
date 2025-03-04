// This component shows what our awesome users are saying about FitWeb
// We're using a grid layout to show multiple testimonials side by side

import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  borderColor?: string;
}

const TestimonialSection = ({ quote, author, borderColor = 'border-gray-200' }: TestimonialProps) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border-2 ${borderColor} hover:shadow-lg transition duration-300`}>
    <p className="text-gray-700 mb-4">&quot;{quote}&quot;</p>
    <p className="text-purple-600 font-semibold">- {author}</p>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      quote: "OwNit Fitness has helped me transform my life. The workouts are challenging and help me push myself to be better.",
      author: "Jeevan Purewal",
      borderColor: "border-purple-200"
    },
    {
      quote: "The calorie counter , helped me lose weight and gain muscle. ",
      author: "Joshua Hickling",
      borderColor: "border-purple-300"
    },
    {
      quote: "The meal planner, allowed me to hit my protein goals aswell as being easy to follow.",
      author: "Josh Stevens",
      borderColor: "border-purple-400"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialSection
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              borderColor={testimonial.borderColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 