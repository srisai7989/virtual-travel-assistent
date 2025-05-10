import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sun, Cloud, Hotel, MapPin, Coffee, Camera, MessageSquare, Send, X } from 'lucide-react';
import type { TripDetails, ItineraryDay } from '../types';
import { differenceInDays, addDays, format } from 'date-fns';

const activities = {
  kerala: [
    { name: 'Backwater Cruise', type: 'cultural', cost: 2000, duration: '4 hours' },
    { name: 'Ayurvedic Spa', type: 'relaxation', cost: 3000, duration: '2 hours' },
    { name: 'Kathakali Show', type: 'cultural', cost: 1000, duration: '2 hours' },
    { name: 'Spice Plantation Tour', type: 'sightseeing', cost: 1500, duration: '3 hours' },
    { name: 'Beach Visit', type: 'relaxation', cost: 500, duration: '4 hours' },
    { name: 'Temple Visit', type: 'cultural', cost: 200, duration: '2 hours' },
  ],
  rajasthan: [
    { name: 'Fort Tour', type: 'sightseeing', cost: 2500, duration: '4 hours' },
    { name: 'Desert Safari', type: 'adventure', cost: 4000, duration: '6 hours' },
    { name: 'Palace Visit', type: 'cultural', cost: 1500, duration: '3 hours' },
    { name: 'Folk Dance Show', type: 'cultural', cost: 1000, duration: '2 hours' },
    { name: 'Camel Ride', type: 'adventure', cost: 1200, duration: '1 hour' },
    { name: 'Local Market Tour', type: 'cultural', cost: 500, duration: '2 hours' },
  ],
  // Add more destinations with their specific activities
};

const hotels = {
  kerala: [
    { name: 'Backwater Resort', type: '5-star', rating: 4.8, pricePerNight: 15000 },
    { name: 'Beach Resort', type: '4-star', rating: 4.5, pricePerNight: 10000 },
    { name: 'Ayurveda Retreat', type: '4-star', rating: 4.6, pricePerNight: 12000 },
  ],
  rajasthan: [
    { name: 'Palace Hotel', type: '5-star', rating: 4.9, pricePerNight: 20000 },
    { name: 'Desert Resort', type: '4-star', rating: 4.4, pricePerNight: 12000 },
    { name: 'Heritage Hotel', type: '5-star', rating: 4.7, pricePerNight: 18000 },
  ],
  // Add more destinations with their specific hotels
};

const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const tripDetails = location.state?.tripDetails as TripDetails;

  useEffect(() => {
    if (!tripDetails) {
      navigate('/plan-trip');
      return;
    }

    const days = differenceInDays(new Date(tripDetails.endDate), new Date(tripDetails.startDate)) + 1;
    const generatedItinerary = generateItinerary(tripDetails, days);
    setItinerary(generatedItinerary);
  }, [tripDetails, navigate]);

  const generateItinerary = (details: TripDetails, days: number): ItineraryDay[] => {
    const destinationActivities = activities[details.destination.location as keyof typeof activities] || activities.kerala;
    const destinationHotels = hotels[details.destination.location as keyof typeof hotels] || hotels.kerala;

    return Array.from({ length: days }, (_, index) => {
      // Shuffle activities for each day
      const shuffledActivities = [...destinationActivities]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((activity, actIndex) => ({
          id: `act-${index}-${actIndex}`,
          ...activity,
          description: `Experience ${activity.name.toLowerCase()} in ${details.destination.location}`,
        }));

      // Randomly select hotel for each day
      const randomHotel = destinationHotels[Math.floor(Math.random() * destinationHotels.length)];

      return {
        day: index + 1,
        date: format(addDays(new Date(details.startDate), index), 'yyyy-MM-dd'),
        weather: {
          temperature: Math.floor(Math.random() * 15) + 20,
          condition: Math.random() > 0.5 ? 'sunny' : 'cloudy',
          icon: Math.random() > 0.5 ? 'sun' : 'cloud',
        },
        activities: shuffledActivities,
        accommodation: {
          ...randomHotel,
          amenities: ['WiFi', 'Pool', 'Restaurant', 'Spa', 'Gym', '24/7 Room Service'].sort(() => Math.random() - 0.5).slice(0, 4),
        },
      };
    });
  };

  const handleFeedback = () => {
    navigate('/feedback');
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    setMessages([...messages, { text: currentMessage, isUser: true }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm your AI travel assistant. I can help you with recommendations, local tips, and travel advice. How can I assist you today?",
        isUser: false
      }]);
    }, 1000);
    setCurrentMessage('');
  };

  if (!tripDetails) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Travel Itinerary</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAIChat(!showAIChat)}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                AI Assistant
              </button>
              <button
                onClick={handleFeedback}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Provide Feedback
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {itinerary.map((day) => (
              <div key={day.day} className="border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Day {day.day} - {format(new Date(day.date), 'MMMM d, yyyy')}</h3>
                  <div className="flex items-center space-x-2">
                    {day.weather.icon === 'sun' ? <Sun className="w-6 h-6 text-yellow-500" /> : <Cloud className="w-6 h-6 text-gray-500" />}
                    <span>{day.weather.temperature}°C</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Activities</h4>
                    <div className="space-y-4">
                      {day.activities.map((activity) => (
                        <div key={activity.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            {activity.type === 'sightseeing' && <Camera className="w-5 h-5 mr-2 text-blue-500" />}
                            {activity.type === 'cultural' && <Coffee className="w-5 h-5 mr-2 text-orange-500" />}
                            <h5 className="font-medium">{activity.name}</h5>
                          </div>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <div className="mt-2 text-sm text-gray-500">
                            <span>Duration: {activity.duration}</span>
                            <span className="ml-4">Cost: ₹{activity.cost}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Accommodation</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Hotel className="w-5 h-5 mr-2 text-purple-500" />
                        <h5 className="font-medium">{day.accommodation.name}</h5>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Type: {day.accommodation.type}</p>
                        <p>Rating: {day.accommodation.rating}/5</p>
                        <p>Price per night: ₹{day.accommodation.pricePerNight}</p>
                        <div className="mt-2">
                          <p className="font-medium">Amenities:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {day.accommodation.amenities.map((amenity) => (
                              <span
                                key={amenity}
                                className="bg-gray-200 px-2 py-1 rounded-full text-xs"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Chat Assistant */}
      {showAIChat && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">AI Travel Assistant</h3>
            <button
              onClick={() => setShowAIChat(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Ask me anything about your trip..."
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Itinerary;