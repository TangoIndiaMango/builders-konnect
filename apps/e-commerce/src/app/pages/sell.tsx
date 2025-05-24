import CoreValues from "../components/About/CoreValues";
import Banner from "../components/Banners";
import HeroBanner from "../components/Sell/HeroBanner";
import HowToSell from "../components/Sell/HowToSellOnBuildersKonnect";
import SubscriptionPlans from "../components/Sell/SubscriptionPlans";
import TestimonialCarousel from "../components/Sell/testimonialCarousel";
import { startSellingBg } from "../lib/assets/background";
import { WhySellOnBuildersConnectData } from "../lib/Constants";

function Sell() {
  const scrollToSubscriptionPlans = () => {
    const plansSection = document.getElementById('subscription-plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="">
      <HeroBanner
        title="Sell on Builder’s Konnect – Expand Your Reach, Boost Your Sales"
        description="Are you a supplier, manufacturer, or distributor of building materials, tools, or equipment? Builder’s Konnect gives you direct access to a growing network of builders, contractors, and construction professionals actively searching for high-quality products."
        backgroundColor="#002766"
        buttonText="Become A Seller Today!"
        onButtonClick={scrollToSubscriptionPlans}
      />
      <div className="container px-4 2xl:px-0  mx-auto">
        <CoreValues
          heading="Why Sell on Builder’s Konnect?"
          values={WhySellOnBuildersConnectData}
        />
        <HowToSell />
        <TestimonialCarousel />
      </div>
      <Banner
        title="Start Selling on Builder’s Konnect Today!"
        description="Join a growing marketplace designed exclusively for construction professionals. Whether you're a supplier, manufacturer, or distributor, Builder’s Konnect helps you reach more customers, increase sales, and grow your business effortlessly."
        buttonText="Become a Vendor Now!"
        onButtonClick={scrollToSubscriptionPlans}
        backgroundImage={startSellingBg}
      />

      <div id="subscription-plans">
        <SubscriptionPlans />
      </div>
    </div>
  );
}

export default Sell