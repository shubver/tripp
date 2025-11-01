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
  "destination": "Paris, France",
  "startDate": "2025-11-01",
  "endDate": "2025-11-03",
  "totalCost": 1500.0,
  "days": [
    {
      "dayNumber": 1,
      "date": null,
      "title": "Iconic Art and Parisian Charm",
      "activities": [
        {
          "name": "Louvre Museum Visit",
          "description": "Explore masterpieces like the Mona Lisa and Venus de Milo.",
          "time": "09:00 AM",
          "duration": "3 hours",
          "location": "Louvre Museum",
          "coordinates": {
            "lat": 48.8611473,
            "lng": 2.33802768704666
          },
          "cost": 20.0,
          "category": "museum"
        },
        {
          "name": "Lunch at a Traditional Bistro",
          "description": "Enjoy classic French cuisine at a local bistro.",
          "time": "12:30 PM",
          "duration": "2 hours",
          "location": "Le Bouillon Chartier",
          "coordinates": {
            "lat": 48.8719356,
            "lng": 2.3430137
          },
          "cost": 30.0,
          "category": "food"
        },
        {
          "name": "Tuileries Garden Stroll",
          "description": "Relax and enjoy the beautiful Tuileries Garden.",
          "time": "03:00 PM",
          "duration": "2 hours",
          "location": "Tuileries Garden",
          "coordinates": {
            "lat": 48.863566199999994,
            "lng": 2.326955235215837
          },
          "cost": 0.0,
          "category": "sightseeing"
        },
        {
          "name": "Mus\u00e9e d'Orsay",
          "description": "Visit Mus\u00e9e d'Orsay, housed in a former railway station, and admire Impressionist and Post-Impressionist masterpieces.",
          "time": "05:30 PM",
          "duration": "2 hours",
          "location": "Mus\u00e9e d'Orsay",
          "coordinates": {
            "lat": 48.85991785,
            "lng": 2.3265849372230356
          },
          "cost": 16.0,
          "category": "museum"
        },
        {
          "name": "Dinner near the Seine",
          "description": "Enjoy a delightful dinner at a restaurant with views of the Seine River.",
          "time": "08:00 PM",
          "duration": "2 hours",
          "location": "Les Ombres",
          "coordinates": {
            "lat": 48.861112,
            "lng": 2.2985572
          },
          "cost": 70.0,
          "category": "food"
        }
      ]
    },
    {
      "dayNumber": 2,
      "date": null,
      "title": "Montmartre and Culinary Delights",
      "activities": [
        {
          "name": "Visit Sacr\u00e9-C\u0153ur Basilica",
          "description": "Explore the stunning Sacr\u00e9-C\u0153ur Basilica in Montmartre.",
          "time": "09:00 AM",
          "duration": "2 hours",
          "location": "Sacr\u00e9-C\u0153ur Basilica",
          "coordinates": {
            "lat": 48.890241,
            "lng": 2.325361
          },
          "cost": 0.0,
          "category": "sightseeing"
        },
        {
          "name": "Explore Montmartre",
          "description": "Wander through the charming streets of Montmartre, known for its artistic history.",
          "time": "11:30 AM",
          "duration": "1.5 hours",
          "location": "Place du Tertre",
          "coordinates": {
            "lat": 48.886527400000006,
            "lng": 2.3408043041413396
          },
          "cost": 0.0,
          "category": "sightseeing"
        },
        {
          "name": "Lunch in Montmartre",
          "description": "Enjoy a delicious lunch at a traditional French restaurant in Montmartre.",
          "time": "01:00 PM",
          "duration": "2 hours",
          "location": "Le Consulat",
          "coordinates": {
            "lat": 48.8595685,
            "lng": 2.3795089
          },
          "cost": 40.0,
          "category": "food"
        },
        {
          "name": "Picasso Museum",
          "description": "Explore the world's most extensive collection of works by the Spanish artist Pablo Picasso.",
          "time": "03:30 PM",
          "duration": "2 hours",
          "location": "Picasso Museum",
          "coordinates": {
            "lat": 48.842182,
            "lng": 2.365046
          },
          "cost": 14.0,
          "category": "museum"
        },
        {
          "name": "Wine and Cheese Tasting",
          "description": "Indulge in a wine and cheese tasting experience.",
          "time": "06:00 PM",
          "duration": "2 hours",
          "location": "\u00d4 Chateau",
          "coordinates": {
            "lat": 48.8642723,
            "lng": 2.3441257
          },
          "cost": 60.0,
          "category": "food"
        },
        {
          "name": "Dinner in Le Marais",
          "description": "Discover the diverse culinary scene in Le Marais.",
          "time": "08:30 PM",
          "duration": "2 hours",
          "location": "L'As du Fallafel",
          "coordinates": {
            "lat": 48.857415,
            "lng": 2.3590682
          },
          "cost": 25.0,
          "category": "food"
        }
      ]
    },
    {
      "dayNumber": 3,
      "date": null,
      "title": "Eiffel Tower and Latin Quarter Exploration",
      "activities": [
        {
          "name": "Eiffel Tower Visit",
          "description": "Visit the iconic Eiffel Tower and enjoy panoramic views of Paris.",
          "time": "09:00 AM",
          "duration": "2.5 hours",
          "location": "Eiffel Tower",
          "coordinates": {
            "lat": 48.8582599,
            "lng": 2.2945006358633115
          },
          "cost": 26.0,
          "category": "sightseeing"
        },
        {
          "name": "Lunch in the Latin Quarter",
          "description": "Enjoy a traditional French lunch in the vibrant Latin Quarter.",
          "time": "12:00 PM",
          "duration": "2 hours",
          "location": "La Jacobine",
          "coordinates": {
            "lat": 48.8533357,
            "lng": 2.3389536
          },
          "cost": 35.0,
          "category": "food"
        },
        {
          "name": "Shakespeare and Company Bookstore",
          "description": "Browse through the famous Shakespeare and Company bookstore.",
          "time": "02:30 PM",
          "duration": "2 hours",
          "location": "Shakespeare and Company",
          "coordinates": {
            "lat": 48.8525747,
            "lng": 2.3471123
          },
          "cost": 0.0,
          "category": "sightseeing"
        },
        {
          "name": "Sainte-Chapelle",
          "description": "Visit Sainte-Chapelle, a stunning Gothic chapel known for its beautiful stained glass windows.",
          "time": "05:00 PM",
          "duration": "2 hours",
          "location": "Sainte-Chapelle",
          "coordinates": {
            "lat": 48.8553933,
            "lng": 2.34499406295433
          },
          "cost": 11.5,
          "category": "sightseeing"
        },
        {
          "name": "Farewell Dinner",
          "description": "Enjoy a final Parisian dinner at a restaurant of your choice.",
          "time": "07:30 PM",
          "duration": "2 hours",
          "location": "Le Coupe-Chou",
          "coordinates": {
            "lat": 48.8484873,
            "lng": 2.3463043
          },
          "cost": 75.0,
          "category": "food"
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
