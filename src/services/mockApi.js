/**
 * Mock API Service for Development
 * Use this when your Python backend is not yet ready
 * 
 * To use: import mockApi from './services/mockApi'
 * Then in your components, call mockApi instead of api
 */

// Simulate network delay (like time.sleep() in Python)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock itinerary data
const mockItinerary = {
  destination: "Tokyo, Japan",
  startDate: "2024-06-15",
  endDate: "2024-06-20",
  totalCost: 2500,
  days: [
    {
      dayNumber: 1,
      date: "2024-06-15",
      title: "Arrival & Shibuya Exploration",
      activities: [
        {
          name: "Arrive at Narita Airport",
          description: "Land at Tokyo Narita International Airport and take the Narita Express to central Tokyo",
          time: "09:00 AM",
          duration: "2 hours",
          location: "Narita Airport",
          coordinates: {
            lat: 35.7720,
            lng: 140.3929
          },
          cost: 30,
          category: "transport"
        },
        {
          name: "Check into Hotel",
          description: "Check into your hotel in Shibuya, drop off luggage and freshen up",
          time: "12:00 PM",
          duration: "1 hour",
          location: "Shibuya",
          coordinates: {
            lat: 35.6595,
            lng: 139.7004
          },
          cost: 150,
          category: "accommodation"
        },
        {
          name: "Shibuya Crossing & Shopping",
          description: "Visit the world's busiest pedestrian crossing and explore the vibrant shopping district",
          time: "02:00 PM",
          duration: "3 hours",
          location: "Shibuya Crossing",
          coordinates: {
            lat: 35.6595,
            lng: 139.7004
          },
          cost: 50,
          category: "attraction"
        },
        {
          name: "Dinner at Ichiran Ramen",
          description: "Experience authentic tonkotsu ramen at this famous chain with individual booths",
          time: "07:00 PM",
          duration: "1.5 hours",
          location: "Shibuya",
          coordinates: {
            lat: 35.6603,
            lng: 139.6980
          },
          cost: 15,
          category: "food"
        }
      ]
    },
    {
      dayNumber: 2,
      date: "2024-06-16",
      title: "Traditional Tokyo: Asakusa & Senso-ji Temple",
      activities: [
        {
          name: "Senso-ji Temple Visit",
          description: "Explore Tokyo's oldest Buddhist temple, walk through Nakamise Shopping Street",
          time: "09:00 AM",
          duration: "2.5 hours",
          location: "Asakusa",
          coordinates: {
            lat: 35.7148,
            lng: 139.7967
          },
          cost: 0,
          category: "attraction"
        },
        {
          name: "Traditional Japanese Lunch",
          description: "Enjoy tempura at a local restaurant near Senso-ji",
          time: "12:00 PM",
          duration: "1.5 hours",
          location: "Asakusa",
          coordinates: {
            lat: 35.7120,
            lng: 139.7950
          },
          cost: 25,
          category: "food"
        },
        {
          name: "Tokyo Skytree",
          description: "Visit the tallest structure in Japan for panoramic city views",
          time: "02:30 PM",
          duration: "2 hours",
          location: "Sumida",
          coordinates: {
            lat: 35.7101,
            lng: 139.8107
          },
          cost: 35,
          category: "attraction"
        },
        {
          name: "Sumida River Cruise",
          description: "Evening river cruise with views of Tokyo's illuminated skyline",
          time: "06:00 PM",
          duration: "1.5 hours",
          location: "Sumida River",
          coordinates: {
            lat: 35.7095,
            lng: 139.8070
          },
          cost: 20,
          category: "activity"
        }
      ]
    },
    {
      dayNumber: 3,
      date: "2024-06-17",
      title: "Modern Tokyo: Harajuku & Roppongi",
      activities: [
        {
          name: "Meiji Shrine",
          description: "Visit this serene Shinto shrine surrounded by forest in the heart of the city",
          time: "08:30 AM",
          duration: "1.5 hours",
          location: "Harajuku",
          coordinates: {
            lat: 35.6762,
            lng: 139.6993
          },
          cost: 0,
          category: "attraction"
        },
        {
          name: "Harajuku & Takeshita Street",
          description: "Explore youth fashion culture and quirky shops",
          time: "10:30 AM",
          duration: "2 hours",
          location: "Harajuku",
          coordinates: {
            lat: 35.6702,
            lng: 139.7027
          },
          cost: 40,
          category: "shopping"
        },
        {
          name: "Omotesando Lunch",
          description: "Lunch at a trendy cafe on Tokyo's Champs-Élysées",
          time: "01:00 PM",
          duration: "1 hour",
          location: "Omotesando",
          coordinates: {
            lat: 35.6657,
            lng: 139.7108
          },
          cost: 30,
          category: "food"
        },
        {
          name: "TeamLab Borderless",
          description: "Immersive digital art museum - must book in advance!",
          time: "03:00 PM",
          duration: "2.5 hours",
          location: "Odaiba",
          coordinates: {
            lat: 35.6250,
            lng: 139.7751
          },
          cost: 45,
          category: "attraction"
        },
        {
          name: "Roppongi Hills Dinner",
          description: "Dinner with a view at Roppongi's modern complex",
          time: "07:00 PM",
          duration: "2 hours",
          location: "Roppongi",
          coordinates: {
            lat: 35.6606,
            lng: 139.7298
          },
          cost: 60,
          category: "food"
        }
      ]
    }
  ]
};

class MockApiService {
  /**
   * Generate a mock itinerary
   * Simulates the backend processing time
   */
  async generateItinerary(prompt) {
    console.log('🔧 Mock API: Generating itinerary for:', prompt);
    
    // Simulate API delay (1-3 seconds)
    await delay(1500 + Math.random() * 1500);
    
    // Return mock data with a message
    return {
      success: true,
      message: `I've created a ${mockItinerary.days.length}-day itinerary for ${mockItinerary.destination}! Check it out on the right.`,
      itinerary: mockItinerary
    };
  }

  /**
   * Get mock POI details
   */
  async getPOIDetails(placeId) {
    console.log('🔧 Mock API: Getting POI details for:', placeId);
    await delay(500);
    
    return {
      placeId,
      name: "Sample Location",
      description: "This is a mock POI returned by the mock API",
      coordinates: { lat: 35.6762, lng: 139.6503 },
      rating: 4.5,
      reviews: 1234
    };
  }

  /**
   * Mock place search
   */
  async searchPlaces(query, location) {
    console.log('🔧 Mock API: Searching for:', query, 'near', location);
    await delay(800);
    
    return {
      results: [
        {
          name: `${query} - Result 1`,
          location: location,
          coordinates: { lat: 35.6762, lng: 139.6503 }
        },
        {
          name: `${query} - Result 2`,
          location: location,
          coordinates: { lat: 35.6812, lng: 139.6553 }
        }
      ]
    };
  }

  /**
   * Mock geocoding
   */
  async geocodeAddress(address) {
    console.log('🔧 Mock API: Geocoding:', address);
    await delay(500);
    
    return {
      address,
      coordinates: { 
        lat: 35.6762 + (Math.random() - 0.5) * 0.1, 
        lng: 139.6503 + (Math.random() - 0.5) * 0.1 
      }
    };
  }
}

// Export singleton instance
export default new MockApiService();

// Also export the mock data for testing
export { mockItinerary };
