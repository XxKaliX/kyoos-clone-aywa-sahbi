
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import UserSupportChat from '../components/UserSupportChat';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
      <UserSupportChat />
    </div>
  );
};

export default Index;
