import CoreValues from "../components/About/CoreValues";
import HeroCarousel from "../components/Advertise/HeroCarousel";
import HeroBanner from "../components/Banners";
import { advertbg } from "../lib/assets/background";
import { WhyAdvertiseOnBuildersConnectData } from "../lib/assets/Constants";

function Advertise() {
  return (
    <div>
      <HeroCarousel />
      <div className="container px-4 2xl:px-0  mx-auto">
        <CoreValues
          heading="Why Advertise on Builder’s Konnect?"
          values={WhyAdvertiseOnBuildersConnectData}
        />
      </div>
      <HeroBanner
        title="Get Started Today!"
        description="Ready to take your brand to the next level? Contact us today to learn more about our advertising opportunities and find the perfect package for your business."
        buttonText="Contact Us"
        onButtonClick={() => console.log('clicked')}
        backgroundImage={advertbg}
      />
    </div>
  );
}

export default Advertise;