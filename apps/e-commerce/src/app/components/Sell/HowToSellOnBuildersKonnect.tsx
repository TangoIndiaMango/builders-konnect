import { HowToSellOnBuildersKonnectData } from '../../lib/Constants';
import { onlineIsBetter } from '../../lib/assets/images';

export default function HowToSell() {
  return (
    <div className="py-16">
      <div className="mb-8">
        <h2 className="text-xl md:text-3xl font-medium leading-[40px] text-[#000000D9] flex items-center">
          <span className="w-1.5 h-8 bg-red-600 mr-4 inline-block"></span>
          How to Sell with Builder’s Konnect?
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="relative rounded-lg overflow-hidden h-full">
          <img
            src={onlineIsBetter}
            alt="Online is Better sign"
            className="w-full h-full lg:h-[650px] object-cover rounded-lg"
          />
        </div>

        <div className="space-y-10 h-full  flex flex-col justify-center">
          {HowToSellOnBuildersKonnectData.map((step) => (
            <div key={step.number}>
              <div className="mb-4">
                <img
                  src={step.imageUrl}
                  alt={`Step ${step.number} image`}
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-[#000000D9] mb-4">
                  {step.title}
                </h3>
                <p className="text-[#00000073] text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
