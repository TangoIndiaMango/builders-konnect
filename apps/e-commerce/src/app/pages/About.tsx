import AboutBuildersConnect from '../components/About/AboutBuildersConnect';
import AtBuildersConnect from '../components/About/AtBuildersConnect';
import CoreValues from '../components/About/CoreValues';
import WhyChooseSection from '../components/About/whyChooseUs';
import HeroBanner from '../components/Banners';
import { coreValuesData } from '../lib/Constants';
import { AboutBannerBackground, startSellingBg } from '../lib/assets/background';


function About() {
  return (
    <div className="">
      <HeroBanner
        title="Your One-Stop Marketplace for Builders & Suppliers"
        description="Find top-quality building materials, tools, and equipment all in one place. Whether you are a contractor sourcing supplies or a vendor looking to sell, builder's Konnect makes construction procurement effortless. Join the network that builds the future!"
        buttonText="Shop Now"
        onButtonClick={() => console.log('clicked')}
        backgroundImage={AboutBannerBackground}
      />
      <div className="container px-4 2xl:px-0  mx-auto">
        <AboutBuildersConnect />
        <CoreValues heading="Our Core Values" values={coreValuesData} />
        <WhyChooseSection />
      </div>
      <AtBuildersConnect />
      <HeroBanner
        title="Start Selling on Builder’s Konnect Today!"
        description="Join a growing marketplace designed exclusively for construction professionals. Whether you're a supplier, manufacturer, or distributor, Builder’s Konnect helps you reach more customers, increase sales, and grow your business effortlessly."
        buttonText="Become a Vendor Now!"
        onButtonClick={() => console.log('clicked')}
        backgroundImage={startSellingBg}
      />
    </div>
  );
}

export default About