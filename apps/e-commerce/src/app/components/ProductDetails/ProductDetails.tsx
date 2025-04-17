import { productInfo, specs } from "../../lib/Constants";

export default function SimilarProductDetails() {
  return (
    <div className="flex flex-col md:flex-row gap-10  bg-white text-gray-800">
      <div className="md:w-2/3">
        <h2 className="md:text-2xl text-lg text-[#000000D9] font-medium mb-4">
          Product Details
        </h2>
        <h3 className="md:text-xl text-base text-[#1E1E1E] font-medium mb-4">
          Product Information
        </h3>
        <ul className="list-disc list-inside space-y-3 text-sm md:text-base">
          {productInfo.map((info, index) => (
            <li className="text-[#00000073] leading-[24px]" key={index}>
              {info}
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-1/3">
        <h2 className="md:text-xl text-base text-[#1E1E1E] font-medium mt-10 mb-6">
          Specifications
        </h2>
        <dl className="divide-y border-b  divide-gray-200">
          {specs.map(([label, value], index) => (
            <div
              key={label}
              className="py-4 flex flex-col  sm:flex-row sm:justify-between sm:items-center"
            >
              <dt className="  text-[#000000D9]">{label}</dt>
              <dd className="mt-1 sm:mt-0 text-[#00000073]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
