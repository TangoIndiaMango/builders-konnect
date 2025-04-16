import { FC } from 'react';
import {
  ceramic,
  flooring,
  woodlikeeight,
  woodlikethree,
} from '../../lib/assets/images';
import { Link } from 'react-router-dom';

const LargePromoTile: FC = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="relative h-[500px] md:h-[600px] overflow-hidden ">
          <img
            src={flooring}
            alt="Flooring"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-8 text-white">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">
              Flooring
            </h2>
            <p className="text-sm w-[250px] md:text-base mb-4">
              Black and White version of the tiles coming out on sale.
            </p>
            <Link
              to="/"
              className="text-white text-base font-semibold underline hover:opacity-80 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative h-[250px] md:h-[290px] overflow-hidden ">
            <img
              src={ceramic}
              alt="Ceramic"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-6 text-white">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Ceramic Tiles
              </h2>
              <p className="text-sm w-[250px] mb-2">
                Featured tiles collections that give you another vibe.
              </p>
              <Link
                to="/"
                className="text-white text-sm font-semibold underline hover:opacity-80 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-[250px] md:h-[290px] overflow-hidden ">
              <img
                src={woodlikeeight}
                alt="Wood Look"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-4 text-white">
                <h2 className="text-lg font-semibold mb-1">Painting</h2>
                <p className="text-xs mb-1">Virony pantone paint</p>
                <Link
                  to="/"
                  className="text-white text-sm underline hover:opacity-80 transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="relative h-[250px] md:h-[290px] overflow-hidden">
              <img
                src={woodlikethree}
                alt="Kitchen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-4 text-white">
                <h2 className="text-lg font-semibold mb-1">Kitchen</h2>
                <p className="text-xs mb-1">Virony Kitchen</p>
                <Link
                  to="/"
                  className="text-white text-sm underline hover:opacity-80 transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LargePromoTile;
