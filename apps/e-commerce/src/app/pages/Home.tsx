import { Carousel, Button } from 'antd';
import ProductCard from '../components/ProductCard';
import { paint } from '../lib/assets/images';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const featuredProducts = [
  {
    id: 1,
    title: 'Montreal Serene Paint',
    price: 23803,
    originalPrice: 48577,
    discount: 51,
    rating: 4.5,
    reviews: 567,
    imageUrl: '/paint-1.jpg'
  },
  // Add more products here
];

const patterns = [
  {
    id: 1,
    title: 'Pattern 1',
    rating: 4.0,
    reviews: 120,
    imageUrl: '/pattern-1.jpg',
    price: 15000
  },
  // Add more patterns
];

const dealItems = [
  {
    id: 1,
    title: 'Kitchens',
    discount: '25% OFF',
    image: '/kitchen-sale.jpg',
    brandText: 'BIG BRAND',
    buttonText: 'Shop Now',
    bgColor: 'bg-red-700'
  },
  {
    id: 2,
    title: 'Bathroom',
    discount: '25% OFF',
    image: '/bathroom-sale.jpg',
    brandText: 'BIG BRAND',
    buttonText: 'Shop Now',
    bgColor: 'bg-red-700'
  },
  {
    id: 3,
    title: 'Goodwill Tiles',
    discount: '25% OFF',
    subtext: 'Quality and affordable tiles',
    image: '/tiles-sale.jpg',
    buttonText: 'Shop Now',
    bgColor: 'bg-blue-700'
  },
  {
    id: 4,
    title: 'Hurry Up',
    discount: '25% OFF',
    image: '/clearance-sale.jpg',
    brandText: 'Clearance',
    buttonText: 'Shop Now',
    bgColor: 'bg-red-700'
  }
];

const Home = () => {
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
      <section className="mb-8">
        <Carousel autoplay dots={true}>
          <div>
            <div className="h-[450px] bg-[#00205B] relative flex items-center justify-between px-8 text-white overflow-hidden">
              <div className="hidden md:block absolute right-0 top-0 w-[450px] h-[450px] rounded-full bg-[#D92D20] opacity-80 translate-x-1/2 translate-y-1/2"></div>
              <div className="hidden md:block absolute right-0 bottom-0 w-[350px] h-[350px] rounded-full bg-[#003399] opacity-80 translate-x-1/3 -translate-y-1/3"></div>
              <div className="md:text-left text-center z-10 max-w-xl px-10 flex flex-col items-center md:items-start">
                <h1 className="md:text-[60px] text-[25px] font-bold mb-4">Transform Your Home with Dulux Premium Paints</h1>
                <Button type="primary" size="large" className="bg-white text-black">
                  Shop Now
                </Button>
              </div>
              <div className="hidden md:block w-1/2">
                <img src={paint} alt="Dulux Paint" className="z-10 object-contain w-full h-full" />
              </div>
            </div>
          </div>
          {/* Add more carousel items */}
        </Carousel>
      </section>

      {/* Deals Section */}
      <section className="mb-12 container mx-auto px-4 mt-6">
        <div className="relative">
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
            prevArrow={<div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
              <Button 
                icon={<LeftOutlined />} 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100"
              />
            </div>}
            nextArrow={<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
              <Button 
                icon={<RightOutlined />} 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100"
              />
            </div>}
          >
            {dealItems.map(item => (
              <div key={item.id} className="px-2">
                <div className={`${item.bgColor} rounded-lg p-4 relative aspect-square flex flex-col items-center justify-center text-white text-center`}>
                  {item.brandText && (
                    <div className="absolute top-4 left-4 right-4">
                      <div className="inline-block border-2 border-white rounded-full px-4 py-1">
                        {item.brandText}
                      </div>
                    </div>
                  )}
                  <div className="text-4xl font-bold mb-2">{item.title}</div>
                  <div className="text-3xl font-bold mb-2">{item.discount}</div>
                  {item.subtext && <div className="text-sm mb-4">{item.subtext}</div>}
                  <Button type="primary" className="bg-white text-black hover:bg-gray-100">
                    {item.buttonText}
                  </Button>
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

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              rating={product.rating}
              reviews={product.reviews}
              imageUrl={product.imageUrl}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          ))}
        </div>
      </section>

      {/* Patterns Section */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Browse By Pattern</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {patterns.map(pattern => (
            <ProductCard
              key={pattern.id}
              title={pattern.title}
              price={pattern.price}
              rating={pattern.rating}
              reviews={pattern.reviews}
              imageUrl={pattern.imageUrl}
              onAddToCart={() => handleAddToCart(pattern.id)}
            />
          ))}
        </div>
      </section>

      {/* New Selling Items */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold mb-6">New Selling Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Add new selling items using ProductCard */}
        </div>
      </section>
    </div>
  );
};

export default Home;