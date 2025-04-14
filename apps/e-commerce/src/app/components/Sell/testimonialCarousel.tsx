'use client';

import { useRef, useState } from 'react';
import { Carousel as AntCarousel } from 'antd';

import 'antd/dist/reset.css';
import { testimonials } from '../../lib/assets/Constants';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  image: string;
}

export default function TestimonialCarousel() {
  const carouselRef = useRef<any>(null);
  const [activeSlide, setActiveSlide] = useState(1); // Start with middle dot active

  
  const handleSlideChange = (current: number) => {
    setActiveSlide(current);
  };

  const totalDots = 3;

  return (
    <div className="py-16">
      <div className="mb-8">
        <h2 className="text-xl md:text-3xl font-medium leading-[40px] text-[#000000D9] flex items-center">
          <span className="w-1.5 h-8 bg-red-600 mr-4 inline-block"></span>
         What Our Vendor Say
        </h2>
      </div>

      <div className="relative">
        <AntCarousel
          ref={carouselRef}
          afterChange={handleSlideChange}
          dots={false}
          className="testimonial-carousel"
          initialSlide={1}
        >
          {[0, 1, 2].map((pageIndex) => (
            <div key={pageIndex} className="px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials
                  .slice(pageIndex * 3, pageIndex * 3 + 3)
                  .map((testimonial) => (
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                    />
                  ))}
              </div>
            </div>
          ))}
        </AntCarousel>
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalDots }).map((_, index) => (
          <button
            key={index}
            onClick={() => carouselRef.current?.goTo(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              activeSlide === index ? 'w-6 bg-gray-600' : 'w-3 bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-lg border border-[#4F4C4C] p-4 h-full flex flex-col">
      <div className="flex-grow">
        <p className="text-[#101010] text-sm md:text-base leading-[24px] mb-2">
          "{testimonial.quote}"
        </p>
      </div>
      <div className="flex items-center mt-2">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <img
            src={testimonial.image || '/placeholder.svg'}
            alt={testimonial.name}
            className="object-cover"
          />
        </div>
        <div className="ml-4">
          <h4 className="md:text-xl text-lg font-medium text-[#000000D9]">
            {testimonial.name}
          </h4>
          <p className="text-[#00000073]  text-xs md:text-sm">
            {testimonial.title} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
