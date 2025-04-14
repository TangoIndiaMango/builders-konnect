import { Carousel, Button } from 'antd';
import { paint, starburst } from '../lib/assets/images';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import { featuredProducts, patterns, dealItems, heroSlides } from '../lib/Constants';
import type { CarouselRef } from 'antd/es/carousel';

const Home = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [current, setCurrent] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrent(index);
    carouselRef.current?.goTo(index);
  };

  const getSlideImage = (imageName: string) => {
    switch (imageName) {
      case 'paint':
        return paint;
      case 'tools':
        return paint;
      default:
        return paint;
    }
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (productId: number) => {
    console.log('Added to cart:', productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <section className="mb-8 relative">
        <Carousel
          ref={carouselRef}
          afterChange={(currentSlide) => setCurrent(currentSlide)}
          autoplay
          effect="fade"
          dots={false}
        >
          {heroSlides.map((slide) => (
            <div key={slide.id}>
              <div 
                className="h-[450px] relative flex items-center justify-between px-8 text-white overflow-hidden"
                style={{ backgroundColor: slide.bgColor }}
              >
                {slide.circles.map((circle, i) => (
                  <div
                    key={i}
                    className="hidden md:block absolute right-0 z-0"
                    style={{
                      top: circle.position === 'top' ? 0 : 'auto',
                      bottom: circle.position === 'bottom' ? 0 : 'auto',
                      width: circle.size,
                      height: circle.size,
                      borderRadius: '50%',
                      backgroundColor: circle.color,
                      opacity: circle.opacity,
                      transform: circle.transform
                    }}
                  />
                ))}
                <div className="md:text-left text-center z-10 max-w-xl px-10 flex flex-col items-center md:items-start">
                  <h1 className="md:text-[60px] text-[25px] font-bold mb-4">{slide.title}</h1>
                  <Button type="primary" size="large" className="bg-white text-black hover:bg-gray-100">
                    {slide.buttonText}
                  </Button>
                </div>
                <div className="hidden md:block w-1/2 z-10 relative">
                  <img 
                    src={getSlideImage(slide.image)} 
                    alt={slide.title} 
                    className="object-contain w-full h-full" 
                  />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          {heroSlides.map((_, index) => (
            <span
              key={index}
              onClick={() => handleDotClick(index)}
              className={`mx-1 w-2 h-2 rounded-full cursor-pointer ${
                current === index ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Deals Section */}
      <section className="mb-12 container mx-auto px-4 mt-6">
        <div className="relative px-8">
          <Carousel
            arrows
            infinite={false}
            slidesToShow={4}
            slidesToScroll={1}
            dots={false}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]}
          >
            {dealItems.map(item => (
              <div key={item.id} className="px-2">
                <div 
                  className={`${item.bgColor} rounded-lg relative aspect-square flex flex-col items-center justify-center text-white text-center overflow-hidden`}
                  style={{
                    ...(item.bgImage && {
                      backgroundImage: `url(${item.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    })
                  }}
                >
                  {/* Overlay for background image */}
                  {/* {item.bgImage && (
                    <div className="absolute inset-0 bg-black/40 z-0"></div>
                  )} */}
                  
                  {/* Black diagonal banner */}
                  {item.brandText && (
                    <div className="absolute top-0 left-0 w-72 h-72 z-10">
                      <div className="absolute top-[10px] left-[-35px] bg-black text-white text-sm py-1 px-12 font-semibold">
                        {item.brandText}
                      </div>
                    </div>
                  )}
                  
                  {/* Main content */}
                  {
                    !item.bgImage && (
                      <div className="relative z-10 flex flex-col items-center">
                        <div>
                          <div  style={{ 
                              backgroundImage: `url(${starburst})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }} className="w-[240px] h-[240px] flex items-center justify-center mb-6">
              <div className='border border-white border-dotted border-[2px] rounded-full h-[220px] w-[220px] flex flex-col items-center justify-center'>
                <span className="text-3xl font-bold leading-none mb-3 text-white">SALE!</span>
                <span className="text-2xl font-bold leading-none mb-3 text-white">{item.discount}</span>
                <span className="text-2xl font-bold text-white mb-4">{item.title}</span>
              </div>
            </div>
                        </div>
                        <Button 
                          type="primary" 
                          className="bg-white text-black hover:bg-gray-100 mt-2 border-0 shadow-md font-semibold"
                        >
                          {item.buttonText}
                        </Button>
                      </div>
                    )
                  }
              
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="bg-[#003399] text-white py-4 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-10 md:justify-between md:items-center">
              <h2 className="text-2xl font-bold">Deals of the Day</h2>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <span className="text-[#FBEAE9]">Ends In</span>
                  <div className="flex items-center gap-2">
                    <div className=" px-2 py-1 rounded">
                      <h1>Days</h1>
                      <p className='font-semibold text-[25px]'>{String(timeLeft.days).padStart(2, '0')}</p>
                    </div>
                    <span>:</span>
                    <div className=" px-2 py-1 rounded">
                      <h1>Hours</h1>
                      <p className='font-semibold text-[25px]'>{String(timeLeft.hours).padStart(2, '0')}</p>
                    </div>
                    <span>:</span>
                    <div className=" px-2 py-1 rounded">
                      <h1>Minutes</h1>
                      <p className='font-semibold text-[25px]'>{String(timeLeft.minutes).padStart(2, '0')}</p>
                    </div>
                    <span>:</span>
                    <div className=" px-2 py-1 rounded">
                      <h1>Seconds</h1>
                      <p className='font-semibold text-[25px]'>{String(timeLeft.seconds).padStart(2, '0')}</p>
                    </div>
                  </div>
                </div>
               
              </div>
              <div>
              <Link className="text-" to="/deals">
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;