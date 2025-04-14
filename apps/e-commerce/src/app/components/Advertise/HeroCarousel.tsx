'use client';

import { Button, Carousel } from 'antd';
import { useRef, useState } from 'react';
import type { CarouselRef } from 'antd/es/carousel';
import { slides } from '../../lib/Constants';

type SlideType = {
  title: string;
  description: string;
  button: string;
  onClick?: () => void;
};

export default function HeroCarousel() {
  const carouselRef = useRef<CarouselRef>(null);
  const [current, setCurrent] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrent(index);
    carouselRef.current?.goTo(index);
  };

  const onButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="w-full bg-[#002766] px-14 py-10 md:py-20 text-white">
      <Carousel
        ref={carouselRef}
        afterChange={(currentSlide) => setCurrent(currentSlide)}
        autoplay
        effect="fade"
        dots={false}
      >
        {slides.map((slide, index) => (
          <div key={index} className="">
            <div className="2xl:px-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white max-w-4xl font-bold mb-6 md:mb-8">
                {slide.title}
              </h2>
              <p className="text-sm md:text-base text-white max-w-3xl leading-[24px] md:leading-[28px] mb-6 md:mb-8">
                {slide.description}
              </p>
              <Button
                type="default"
                size="large"
                onClick={slide.onClick ?? onButtonClick}
                className="bg-white text-black rounded-md hover:bg-gray-100 border-none shadow-md"
              >
                {slide.button}
              </Button>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="flex justify-center">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            className={`mx-1 w-2 h-2 rounded-full cursor-pointer ${
              current === index ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
