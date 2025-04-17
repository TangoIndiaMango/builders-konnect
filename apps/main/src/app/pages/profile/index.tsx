import ProfileBanner from '../../components/profile/ProfileBanner';
import WelcomeSection from '../../components/profile/WelcomeSection';
import BusinessProfile from '../../components/profile/BusinessProfile';
import FinanceSection from '../../components/profile/FinanceSection';
import DocumentsSection from '../../components/profile/DocumentsSection';
const businessInfo = {
  name: "Builder's Hub Construction",
  email: 'buildershub@gmail.com',
  category: 'Construction',
  type: 'Limited liability',
  phone: '(+234) 80 2424 24212',
  vendorId: '689937',
  address: '35 Umueze street, Amawbia',
  location: 'Awka South, Anambra state',
};

const financeInfo = {
  bankName: 'Sterling Bank',
  accountNumber: '0063077730',
  accountName: "Builder's Hub Construction",
};

const documents = {
  cac: {
    number: 'BH-818360838',
    document: '/documents/buildershub-cac.pdf',
  },
  tin: {
    number: 'BH-818360838',
    document: '/documents/buildershub-tin.pdf',
  },
  proofOfAddress: '/documents/buildershub-address.pdf',
};


const ProfilePage = () => {
  
  return (
    <>
      <ProfileBanner />
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <WelcomeSection />
          <BusinessProfile businessInfo={businessInfo} />
          <FinanceSection financeInfo={financeInfo} />
          <DocumentsSection documents={documents} />
          <div className="mt-6">
            <a href="#" className="text-blue-600">
              Change password
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
