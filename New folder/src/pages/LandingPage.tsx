import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Users, Calendar, MapPin } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="text-white max-w-lg">
              <h1 className="text-5xl font-bold mb-6">Plan Your Perfect Journey</h1>
              <p className="text-xl mb-8">
                Let our AI-powered travel assistant help you create unforgettable experiences
              </p>
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Plane className="w-8 h-8 text-blue-600" />}
              title="Smart Recommendations"
              description="AI-powered suggestions tailored to your preferences"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-blue-600" />}
              title="Group Planning"
              description="Perfect for solo travelers, families, and groups"
            />
            <FeatureCard
              icon={<Calendar className="w-8 h-8 text-blue-600" />}
              title="Dynamic Itineraries"
              description="Day-wise planning with multiple options"
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8 text-blue-600" />}
              title="Extensive Coverage"
              description="Both domestic and international destinations"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;