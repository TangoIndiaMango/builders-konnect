import { Link, useParams } from 'react-router-dom';
import { categoriess } from '../lib/Constants';
import { TilingAndFlooringData } from '../lib/Constants';

const TilingAndFlooring = () => {
  const { category } = useParams();

  const currentCategory = categoriess.find((cat) => cat.slug === category);

  return (
    <div className="min-h-screen bg-white pb-20">
      <h1 className="text-sm text-[#00000073] py-8">
        Home /{' '}
        <span className="text-[#000000D9]">
          {currentCategory?.name || 'Category'}
        </span>
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {TilingAndFlooringData.map((item) => (
          <Link to={`/category/${category}/${item?.name}`}>
            <div key={item.id} className="bg-white overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full object-cover"
              />
              <div className="text-left mt-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TilingAndFlooring;
