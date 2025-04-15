import { Link } from "react-router";
import { TilingAndFlooringData } from "../lib/Constants";

const TilingAndFlooring= () => {
  return (
    <div className="min-h-screen bg-white pb-20">
      <h1 className="text-sm text-[#00000073]  py-8">
        {' '}
        Home / <span className="text-[#000000D9]">Tiling and Flooring</span>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4  gap-6">
        {TilingAndFlooringData.map((item) => (
          <Link to={`/category/flooring-wall-tiles/${item.id}`}>
            <div key={item.id} className="bg-white  overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full  object-cover"
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
