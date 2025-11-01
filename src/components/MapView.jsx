import { useState, useEffect } from 'react';
import { MapPin, Map as MapIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Category colors matching your existing design
const categoryColors = {
  transport: '#3B82F6',
  accommodation: '#8B5CF6',
  attraction: '#EC4899',
  food: '#F59E0B',
  activity: '#10B981',
  shopping: '#EF4444'
};

// Create custom marker icons
const createCustomIcon = (category, number, isSelected = false) => {
  const color = categoryColors[category] || '#6B7280';
  const size = isSelected ? 40 : 32;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${isSelected ? '16px' : '14px'};
        transition: all 0.3s ease;
        cursor: pointer;
      ">
        ${number}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

function MapView({ itinerary, selectedActivity, onActivitySelect }) {
  const [selectedDay, setSelectedDay] = useState(null);
  
  // Replace with your Geoapify API key
  const GEOAPIFY_API_KEY = '80edaf02dfb3492b8ad792619eeb5f33';

  if (!itinerary) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <MapPin className="mx-auto text-gray-300 mb-3" size={48} />
        <p className="text-gray-500">Your trip map will appear here</p>
      </div>
    );
  }

  // Extract all activities with coordinates
  const activities = itinerary.days?.flatMap(day => 
    day.activities?.map(activity => ({
      ...activity,
      dayNumber: day.dayNumber,
      date: day.date
    })) || []
  ) || [];
  
  const locationsWithCoordinates = activities.filter(
    activity => activity.coordinates?.lat && activity.coordinates?.lng
  );

  // Get activities for selected day
  const displayActivities = selectedDay
    ? locationsWithCoordinates.filter(act => act.dayNumber === selectedDay)
    : locationsWithCoordinates;

  if (locationsWithCoordinates.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <MapPin className="mx-auto text-gray-300 mb-3" size={48} />
        <p className="text-gray-500">No locations with coordinates found</p>
      </div>
    );
  }

  // Calculate center and bounds
  const centerLat = displayActivities.reduce((sum, act) => sum + act.coordinates.lat, 0) / displayActivities.length;
  const centerLng = displayActivities.reduce((sum, act) => sum + act.coordinates.lng, 0) / displayActivities.length;
  
  const bounds = displayActivities.map(act => [act.coordinates.lat, act.coordinates.lng]);

  // Create route polyline coordinates
  const routeCoordinates = displayActivities.map(act => [act.coordinates.lat, act.coordinates.lng]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Map Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapIcon size={20} />
            <h3 className="font-semibold">Trip Map</h3>
          </div>
          
          {/* Day Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={selectedDay || ''}
              onChange={(e) => setSelectedDay(e.target.value ? parseInt(e.target.value) : null)}
              className="px-3 py-1 rounded-md text-sm bg-white/20 text-white border border-white/30 
                       hover:bg-white/30 transition-colors cursor-pointer"
            >
              <option value="">All Days</option>
              {itinerary.days?.map(day => (
                <option key={day.dayNumber} value={day.dayNumber}>
                  Day {day.dayNumber}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[500px]">
        <MapContainer 
          center={[centerLat, centerLng]} 
          zoom={12} 
          style={{ height: "100%", width: "100%" }}
          bounds={bounds}
          boundsOptions={{ padding: [50, 50] }}
        >
          {/* Geoapify Tile Layer */}
          <TileLayer
            url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`}
            attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors'
            maxZoom={20}
          />
          
          {/* Route Line */}
          {displayActivities.length > 1 && (
            <Polyline
              positions={routeCoordinates}
              pathOptions={{
                color: '#6366F1',
                weight: 3,
                opacity: 0.6,
                dashArray: '10, 10'
              }}
            />
          )}
          
          {/* Markers */}
          {displayActivities.map((activity, idx) => {
            const isSelected = selectedActivity?.name === activity.name;
            const activityNumber = idx + 1;
            
            return (
              <Marker
                key={idx}
                position={[activity.coordinates.lat, activity.coordinates.lng]}
                icon={createCustomIcon(activity.category, activityNumber, isSelected)}
                eventHandlers={{
                  click: () => {
                    if (onActivitySelect) {
                      onActivitySelect(activity);
                    }
                  }
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <div className="font-bold text-sm mb-1" style={{ color: categoryColors[activity.category] }}>
                      {activity.name}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {activity.time} • {activity.duration}
                    </div>
                    <div className="text-xs mb-2">
                      {activity.description}
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-green-600">📍 {activity.location}</span>
                      <span className="text-orange-600 font-semibold">💰 ${activity.cost}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      
      {/* Selected Activity Info */}
      {selectedActivity && (
        <div className="p-4 border-t bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
              style={{ backgroundColor: categoryColors[selectedActivity.category] }}
            >
              <MapPin className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{selectedActivity.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{selectedActivity.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-gray-600">
                  ⏰ {selectedActivity.time} • {selectedActivity.duration}
                </span>
                <span className="text-green-600 font-semibold">
                  ${selectedActivity.cost}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Location Summary Footer */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-700">
            {selectedDay ? `Day ${selectedDay} Locations` : 'All Locations'}
          </h4>
          <span className="text-sm text-gray-500">
            {displayActivities.length} activities
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {displayActivities.slice(0, 8).map((activity, idx) => (
            <button
              key={idx}
              onClick={() => onActivitySelect && onActivitySelect(activity)}
              className="px-3 py-1 rounded-full text-xs font-medium hover:shadow-md 
                       transition-all cursor-pointer"
              style={{
                backgroundColor: `${categoryColors[activity.category]}15`,
                color: categoryColors[activity.category],
                border: selectedActivity?.name === activity.name 
                  ? `2px solid ${categoryColors[activity.category]}` 
                  : 'none'
              }}
              title={activity.description}
            >
              {idx + 1}. {activity.name}
            </button>
          ))}
          {displayActivities.length > 8 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{displayActivities.length - 8} more
            </span>
          )}
        </div>
      </div>

      {/* Category Legend */}
      <div className="p-4 border-t bg-white">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">Category Legend</h4>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-600 capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MapView;