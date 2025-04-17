import { image } from '../../lib/assets/images';

function AtBuildersConnect() {
  return (
    <div className="bg-[#002766]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch container py-16 px-4 2xl:px-0 mx-auto">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={image}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            alt="man"
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <p className="font-medium text-lg lg:text-xl leading-[28px] text-[#F0F0F0]">
            At Builder’s Konnect, we believe that the construction industry
            deserves a smarter, more efficient way to source materials, tools,
            and equipment. As someone who understands the challenges builders
            and suppliers face delays, unreliable sourcing, and fragmented
            supply chains I knew there had to be a better way. That’s why we
            created Builder’s Konnect, a marketplace built specifically for
            construction professionals. Our goal is simple: to connect builders
            with trusted suppliers, making procurement seamless, cost-effective,
            and reliable. For vendors, this platform is an opportunity to expand
            your reach, grow your business, and sell directly to the people who
            need your products most. For builders, it’s a hassle-free way to
            find quality materials and tools, all in one place. We’re not just
            building a marketplace we’re building a community where the
            construction industry thrives. Whether you're a contractor looking
            for materials or a supplier ready to scale, Builder’s Konnect is
            here to power your success. Thank you for being part of this
            journey. Together, we are building the future.
          </p>
          <h3 className="font-medium text-lg md:text-xl my-4 text-[#FFFFFF]">
            [CEO’s Name]
          </h3>
          <h6 className="text-sm md:text-base  leading-[28px] text-[#F0F0F0]">
            Founder & CEO, Builder’s Konnect
          </h6>
        </div>
      </div>
    </div>
  );
}

export default AtBuildersConnect;
