import { MapPin, Map as MapIcon } from 'lucide-react';

function MapView({ itinerary }) {
  if (!itinerary) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <MapPin className="mx-auto text-gray-300 mb-3" size={48} />
        <p className="text-gray-500">Your trip map will appear here</p>
      </div>
    );
  }

  // Extract all activities with coordinates
  const activities = itinerary.days?.flatMap(day => day.activities || []) || [];
  const locationsWithCoordinates = activities.filter(
    activity => activity.coordinates?.lat && activity.coordinates?.lng
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Map Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
        <div className="flex items-center space-x-2">
          <MapIcon size={20} />
          <h3 className="font-semibold">Trip Map</h3>
        </div>
      </div>

      {/* Map Container - Replace with actual map library later */}
      <div className="relative w-full h-[400px] bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Placeholder for map - integrate Leaflet, Mapbox, or Geoapify later */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-3 p-8">
            <MapPin className="mx-auto text-blue-500" size={64} />
            <p className="text-gray-600 font-medium">Map Integration Coming Soon</p>
            <p className="text-sm text-gray-500">
              {locationsWithCoordinates.length} locations will be displayed here
            </p>
          </div>
        </div>

        {/* Location markers overlay (for demonstration) */}
        {locationsWithCoordinates.length > 0 && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-white rounded-lg shadow-md p-3 text-xs">
              <p className="font-semibold text-gray-700 mb-1">Locations to map:</p>
              <ul className="space-y-1">
                {locationsWithCoordinates.slice(0, 5).map((activity, idx) => (
                  <li key={idx} className="text-gray-600 flex items-center space-x-1">
                    <MapPin size={12} className="text-blue-500" />
                    <span>{activity.name}</span>
                  </li>
                ))}
                {locationsWithCoordinates.length > 5 && (
                  <li className="text-gray-500 italic">
                    +{locationsWithCoordinates.length - 5} more locations
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      
      {/* Location Summary Footer */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-700">All Locations</h4>
          <span className="text-sm text-gray-500">
            {activities.length} activities
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {activities.slice(0, 8).map((activity, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs 
                       font-medium hover:bg-blue-100 transition-colors cursor-pointer"
              title={activity.description}
            >
              {activity.name}
            </span>
          ))}
          {activities.length > 8 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{activities.length - 8} more
            </span>
          )}
        </div>
      </div>

      {/* Integration Instructions */}
      <div className="p-4 border-t bg-blue-50">
        <p className="text-xs text-blue-800">
          <strong>🗺️ Next Step:</strong> Integrate Leaflet or Geoapify to display interactive maps.
          See the REACT_STARTER_GUIDE.md for instructions.
        </p>
      </div>
    </div>
  );
}

export default MapView;
