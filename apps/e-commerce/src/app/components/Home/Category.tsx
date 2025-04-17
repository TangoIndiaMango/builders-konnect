import { useState } from 'react';
import { Button} from 'antd';
import type { FC } from 'react';
import { categories, filterCards } from '../../lib/Constants'; 
import { Link } from 'react-router-dom';
import ProductCards from '../ProductListing/ProductListingHomePage';






const CategoryFilter: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    'Painting & Decoration'
  );

  const filteredCards = filterCards.filter(
    (card) => card.category === selectedCategory
  );

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-8">
        <h2 className="md:text-3xl text-lg font-medium leading-[40px] text-[#000000D9] flex items-center">
          <span className="w-1.5 h-8 bg-red-600 mr-4 inline-block"></span>
          Browse By Category
        </h2>
      </div>

      <div className="flex gap-4 justify-center flex-wrap mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            type={selectedCategory === category ? 'primary' : 'default'}
            size="large"
            className={`min-w-[150px] h-16 rounded-xl text-lg font-semibold transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-[#D64545] border-none text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="">
        {filteredCards.map((item) => (
          <ProductCards key={item.id} item={item} />
        ))}
      </div>
      <Link to="/">
        <div className="mt-10 flex justify-center">
          <Button
            type="primary"
            size="large"
            className="min-w-[150px] h-16 rounded-xl text-lg font-semibold transition-all duration-200 bg-[#D64545] border-none text-white"
          >
            View All
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryFilter;
