import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Wallet, MapPin, AlertCircle } from 'lucide-react';
import type { TripDetails } from '../types';
import { differenceInDays } from 'date-fns';

const TripPlanner = () => {
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    type: 'solo',
    budget: 0,
    members: 1,
    startDate: '',
    endDate: '',
    destination: {
      type: 'domestic',
      location: '',
    },
  });
  const [error, setError] = useState<string>('');

  const validateDates = (start: string, end: string) => {
    if (!start || !end) return false;
    const days = differenceInDays(new Date(end), new Date(start)) + 1;
    return days <= 10 && days > 0;
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    const newDetails = { ...tripDetails, [field]: value };
    setTripDetails(newDetails);
    
    if (newDetails.startDate && newDetails.endDate) {
      if (!validateDates(newDetails.startDate, newDetails.endDate)) {
        setError('Trip duration must be between 1 and 10 days');
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDates(tripDetails.startDate, tripDetails.endDate)) {
      setError('Trip duration must be between 1 and 10 days');
      return;
    }
    navigate('/itinerary', { state: { tripDetails } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Plan Your Trip</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trip Type
                </label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={tripDetails.type}
                  onChange={(e) => setTripDetails({ ...tripDetails, type: e.target.value as TripDetails['type'] })}
                >
                  <option value="solo">Solo</option>
                  <option value="couple">Couple</option>
                  <option value="family">Family</option>
                  <option value="friends">Friends</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Travelers
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={tripDetails.members}
                  onChange={(e) => setTripDetails({ ...tripDetails, members: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (INR)
                </label>
                <input
                  type="number"
                  min="5000"
                  step="1000"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={tripDetails.budget}
                  onChange={(e) => setTripDetails({ ...tripDetails, budget: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Type
                </label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={tripDetails.destination.type}
                  onChange={(e) => setTripDetails({
                    ...tripDetails,
                    destination: { ...tripDetails.destination, type: e.target.value as 'domestic' | 'international' }
                  })}
                >
                  <option value="domestic">Domestic (India)</option>
                  <option value="international">International</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={tripDetails.startDate}
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={tripDetails.endDate}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  min={tripDetails.startDate || new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={tripDetails.destination.location}
                  onChange={(e) => setTripDetails({
                    ...tripDetails,
                    destination: { ...tripDetails.destination, location: e.target.value }
                  })}
                >
                  <option value="">Select a destination</option>
                  {tripDetails.destination.type === 'domestic' ? (
                    <>
                      <option value="kerala">Kerala</option>
                      <option value="rajasthan">Rajasthan</option>
                      <option value="goa">Goa</option>
                      <option value="himachal">Himachal Pradesh</option>
                      <option value="kashmir">Kashmir</option>
                      <option value="tamil-nadu">Tamil Nadu</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="madhya-pradesh">Madhya Pradesh</option>
                      <option value="west-bengal">West Bengal</option>
                      <option value="assam">Assam</option>
                      <option value="odisha">Odisha</option>
                      <option value="punjab">Punjab</option>
                      <option value="uttarakhand">Uttarakhand</option>
                    </>
                  ) : (
                    <>
                      <option value="thailand">Thailand</option>
                      <option value="singapore">Singapore</option>
                      <option value="dubai">Dubai</option>
                      <option value="maldives">Maldives</option>
                      <option value="bali">Bali</option>
                      <option value="japan">Japan</option>
                      <option value="south-korea">South Korea</option>
                      <option value="vietnam">Vietnam</option>
                      <option value="malaysia">Malaysia</option>
                      <option value="nepal">Nepal</option>
                      <option value="sri-lanka">Sri Lanka</option>
                      <option value="australia">Australia</option>
                      <option value="new-zealand">New Zealand</option>
                      <option value="egypt">Egypt</option>
                      <option value="turkey">Turkey</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={!!error}
              >
                Generate Itinerary
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;