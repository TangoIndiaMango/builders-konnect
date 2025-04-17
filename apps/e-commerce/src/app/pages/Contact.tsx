import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import { MdEmail, MdOutlinePhonelinkRing, MdPhone } from 'react-icons/md';
import Hero from '../components/ProductDetails/Hero';

const ContactPage = () => {
  return (
    <div>
      <Hero title="Contact Us" />

      <div className="py-16 px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-[#000000D9] text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
              Hello!
            </h3>
            <p className="text-[#00000073] mb-8">
              At Builder’s Konnect, we value our vendors, buyers, and partners.
              Whether you have a question, need support, or want to explore
              business opportunities, our team is here to assist you.
            </p>

            <div className="space-y-8">
              <div>
                <div className="flex  items-center gap-2">
                  <MdEmail className=" text-[#000000D9] text-lg md:text-2xl" />
                  <span className="font-medium text-[#000000D9] text-base md:text-xl">
                    Email
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-[#00000073]">
                    Support:{' '}
                    <a href="mailto:support@builderskonnect.com">
                      <span className="text-[#003399]">
                        support@builderskonnect.com
                      </span>{' '}
                    </a>
                  </p>
                  <p className="mt-1 text-[#00000073]">
                    Partnership & Advertising:{' '}
                    <span>
                      <a
                        href="mailto:advertise@builderskonnect.com"
                        className="text-[#003399]"
                      >
                        advertise@builderskonnect.com
                      </a>
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <MdPhone className="md:text-xl text-base text-black" />
                  <span className="text-black md:text-xl text-base font-medium">
                    Phone
                  </span>
                </div>
                <p className="text-[#00000073]">
                  Customer Support:
                  <span className="text-[#000000D9] "> [+123 456 7890]</span>
                </p>
                <p className="text-[#00000073]">
                  Vendor Assistance:
                  <span className="text-[#000000D9]"> [+123 456 7891]</span>
                </p>
              </div>

              <div>
                <h4 className="font-medium flex gap-2 items-center text-[#000000D9] mb-1">
                  <MdOutlinePhonelinkRing />
                  Connect With Us
                </h4>
                <div className="flex gap-4 text-2xl text-[#000000D9]">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaFacebookSquare />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaTwitterSquare />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-[#1d3b87] text-white py-2 rounded-md hover:bg-[#152b6c] transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
