/**
 * API Service Layer
 * This is like Python's requests library but organized into a class
 * Handles all communication with your Python backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Generic request handler (like Python's requests.request())
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          errorData.error || 
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  /**
   * Generate itinerary from user prompt
   * POST /api/generate-itinerary
   * 
   * Python equivalent:
   * response = requests.post(f"{base_url}/api/generate-itinerary", 
   *                          json={"prompt": prompt})
   */
  async generateItinerary(prompt) {
    return this.request('/api/generate-itinerary', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  }

  /**
   * Get POI (Point of Interest) details
   * GET /api/poi/{placeId}
   * 
   * Python equivalent:
   * response = requests.get(f"{base_url}/api/poi/{place_id}")
   */
  async getPOIDetails(placeId) {
    return this.request(`/api/poi/${placeId}`, {
      method: 'GET',
    });
  }

  /**
   * Search for places near a location
   * GET /api/places/search?query=...&location=...
   * 
   * Python equivalent:
   * params = {"query": query, "location": location}
   * response = requests.get(f"{base_url}/api/places/search", params=params)
   */
  async searchPlaces(query, location, options = {}) {
    const params = new URLSearchParams({
      query,
      location,
      ...options,
    });
    
    return this.request(`/api/places/search?${params}`, {
      method: 'GET',
    });
  }

  /**
   * Geocode an address to coordinates
   * GET /api/geocode?address=...
   * 
   * Python equivalent:
   * response = requests.get(f"{base_url}/api/geocode", 
   *                         params={"address": address})
   */
  async geocodeAddress(address) {
    const params = new URLSearchParams({ address });
    return this.request(`/api/geocode?${params}`, {
      method: 'GET',
    });
  }

  /**
   * Update an activity in the itinerary
   * PUT /api/itinerary/{itineraryId}/activity
   * 
   * Python equivalent:
   * response = requests.put(f"{base_url}/api/itinerary/{id}/activity",
   *                         json=activity_data)
   */
  async updateActivity(itineraryId, dayIndex, activityIndex, updates) {
    return this.request(`/api/itinerary/${itineraryId}/activity`, {
      method: 'PUT',
      body: JSON.stringify({
        dayIndex,
        activityIndex,
        updates,
      }),
    });
  }

  /**
   * Save itinerary to backend
   * POST /api/itinerary/save
   */
  async saveItinerary(itinerary) {
    return this.request('/api/itinerary/save', {
      method: 'POST',
      body: JSON.stringify({ itinerary }),
    });
  }

  /**
   * Load saved itinerary
   * GET /api/itinerary/{itineraryId}
   */
  async loadItinerary(itineraryId) {
    return this.request(`/api/itinerary/${itineraryId}`, {
      method: 'GET',
    });
  }
}

// Export a singleton instance (like a Python module-level object)
export default new ApiService();
