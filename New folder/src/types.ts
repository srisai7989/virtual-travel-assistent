export interface User {
  id: string;
  email: string;
  name: string;
}

export interface TripDetails {
  type: 'solo' | 'family' | 'couple' | 'friends';
  budget: number;
  members: number;
  startDate: string;
  endDate: string;
  destination: {
    type: 'domestic' | 'international';
    location: string;
  };
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
  accommodation: Accommodation;
  weather: Weather;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: string;
  cost: number;
  type: 'sightseeing' | 'adventure' | 'cultural' | 'relaxation';
}

export interface Accommodation {
  name: string;
  type: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
}

export interface Weather {
  temperature: number;
  condition: string;
  icon: string;
}