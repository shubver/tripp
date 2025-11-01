import { useState, useCallback } from 'react';
// import api from '../services/api';
import mockApi from '../services/mockApi'

/**
 * Custom hook for managing itinerary state and API calls
 * Similar to a Python class that manages trip data
 */
export function useItinerary() {
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Generate a new itinerary from user prompt
   * Like calling: trip = TripPlanner.generate(prompt) in Python
   */
  const generateItinerary = useCallback(async (userPrompt) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call your Python backend API
      const response = await mockApi.generateItinerary(userPrompt);
      
      // Update state with the returned itinerary
      setItinerary(response.itinerary);
      
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to generate itinerary';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Update a specific activity
   * Like: trip.days[0].activities[0].update(new_data) in Python
   */
  const updateActivity = useCallback((dayIndex, activityIndex, updates) => {
    setItinerary(prev => {
      if (!prev) return prev;
      
      // Create a deep copy to avoid mutation
      const newItinerary = JSON.parse(JSON.stringify(prev));
      
      // Update the specific activity
      newItinerary.days[dayIndex].activities[activityIndex] = {
        ...newItinerary.days[dayIndex].activities[activityIndex],
        ...updates
      };
      
      return newItinerary;
    });
  }, []);

  /**
   * Remove an activity from a day
   * Like: trip.days[0].activities.pop(index) in Python
   */
  const removeActivity = useCallback((dayIndex, activityIndex) => {
    setItinerary(prev => {
      if (!prev) return prev;
      
      const newItinerary = JSON.parse(JSON.stringify(prev));
      newItinerary.days[dayIndex].activities.splice(activityIndex, 1);
      
      return newItinerary;
    });
  }, []);

  /**
   * Add a new activity to a specific day
   * Like: trip.days[0].activities.append(new_activity) in Python
   */
  const addActivity = useCallback((dayIndex, newActivity) => {
    setItinerary(prev => {
      if (!prev) return prev;
      
      const newItinerary = JSON.parse(JSON.stringify(prev));
      newItinerary.days[dayIndex].activities.push(newActivity);
      
      return newItinerary;
    });
  }, []);

  /**
   * Reorder activities within a day
   * Like: trip.days[0].activities = reorder(activities) in Python
   */
  const reorderActivities = useCallback((dayIndex, fromIndex, toIndex) => {
    setItinerary(prev => {
      if (!prev) return prev;
      
      const newItinerary = JSON.parse(JSON.stringify(prev));
      const activities = newItinerary.days[dayIndex].activities;
      
      // Remove and insert at new position
      const [removed] = activities.splice(fromIndex, 1);
      activities.splice(toIndex, 0, removed);
      
      return newItinerary;
    });
  }, []);

  /**
   * Clear the current itinerary
   * Like: trip = None in Python
   */
  const clearItinerary = useCallback(() => {
    setItinerary(null);
    setError(null);
  }, []);

  /**
   * Save itinerary to local storage
   * Like: pickle.dump(trip, file) in Python
   */
  const saveToLocalStorage = useCallback(() => {
    if (itinerary) {
      localStorage.setItem('savedItinerary', JSON.stringify(itinerary));
      localStorage.setItem('savedItineraryDate', new Date().toISOString());
    }
  }, [itinerary]);

  /**
   * Load itinerary from local storage
   * Like: trip = pickle.load(file) in Python
   */
  const loadFromLocalStorage = useCallback(() => {
    const saved = localStorage.getItem('savedItinerary');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setItinerary(parsed);
        return true;
      } catch (err) {
        console.error('Failed to load saved itinerary:', err);
        return false;
      }
    }
    return false;
  }, []);

  return {
    // State
    itinerary,
    isLoading,
    error,
    
    // Methods
    generateItinerary,
    updateActivity,
    removeActivity,
    addActivity,
    reorderActivities,
    clearItinerary,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
}
