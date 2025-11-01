import { Clock, DollarSign, MapPin, Calendar as CalendarIcon, Edit2, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// Category colors matching MapView
const categoryColors = {
  transport: '#3B82F6',
  accommodation: '#8B5CF6',
  attraction: '#EC4899',
  food: '#F59E0B',
  activity: '#10B981',
  shopping: '#EF4444'
};

function ItineraryCalendar({ itinerary, selectedActivity, onActivitySelect }) {
  const [expandedDays, setExpandedDays] = useState([1]); // First day expanded by default

  if (!itinerary) return null;

  // Calculate total cost
  const totalCost = itinerary.days?.reduce((sum, day) => {
    return sum + (day.activities?.reduce((daySum, activity) => {
      return daySum + (activity.cost || 0);
    }, 0) || 0);
  }, 0) || itinerary.totalCost || 0;

  const toggleDay = (dayNumber) => {
    setExpandedDays(prev => 
      prev.includes(dayNumber) 
        ? prev.filter(d => d !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-6">
        <div className="flex items-center space-x-2 mb-2">
          <CalendarIcon size={24} />
          <h2 className="text-2xl font-bold">{itinerary.destination || 'Your Trip'}</h2>
        </div>
        <div className="flex items-center space-x-4 text-blue-100">
          <span className="text-sm">
            📅 {itinerary.startDate || 'Start date'} - {itinerary.endDate || 'End date'}
          </span>
          <span className="text-sm">
            ⏱️ {itinerary.days?.length || 0} days
          </span>
        </div>
      </div>

      {/* Days and Activities */}
      <div className="p-6 space-y-4">
        {itinerary.days?.map((day, dayIdx) => {
          const isExpanded = expandedDays.includes(day.dayNumber || dayIdx + 1);
          const dayNumber = day.dayNumber || dayIdx + 1;
          
          return (
            <div key={dayIdx} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Day Header - Clickable to expand/collapse */}
              <button
                onClick={() => toggleDay(dayNumber)}
                className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 
                         hover:to-indigo-100 transition-colors px-4 py-3 flex items-center 
                         justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 
                                 bg-blue-500 text-white rounded-full text-sm font-bold 
                                 shadow-md">
                    {dayNumber}
                  </span>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-900">
                      {day.title || `Day ${dayNumber}`}
                    </h3>
                    {day.date && (
                      <p className="text-xs text-gray-600">{day.date}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {day.activities?.length || 0} activities
                  </span>
                  {isExpanded ? (
                    <ChevronDown size={20} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-500" />
                  )}
                </div>
              </button>
              
              {/* Activities - Only show when expanded */}
              {isExpanded && (
                <div className="p-4 space-y-3 bg-gray-50">
                  {day.activities?.map((activity, actIdx) => {
                    const isSelected = selectedActivity?.name === activity.name && 
                                      selectedActivity?.time === activity.time;
                    
                    return (
                      <button
                        key={actIdx}
                        onClick={() => onActivitySelect && onActivitySelect(activity)}
                        className={`w-full text-left group bg-white rounded-lg border-2 p-4 
                                   hover:shadow-md transition-all duration-200 cursor-pointer
                                   ${isSelected 
                                     ? 'border-blue-500 shadow-md' 
                                     : 'border-gray-200 hover:border-blue-300'
                                   }`}
                      >
                        {/* Activity Header */}
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 flex items-start gap-3">
                            {/* Activity Number Badge */}
                            <div 
                              className="w-7 h-7 rounded-full flex items-center justify-center 
                                       text-white text-xs font-bold flex-shrink-0"
                              style={{ backgroundColor: categoryColors[activity.category] || '#6B7280' }}
                            >
                              {actIdx + 1}
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {activity.name}
                              </h4>
                              {activity.category && (
                                <span 
                                  className="inline-block px-2 py-1 rounded text-xs font-medium"
                                  style={{
                                    backgroundColor: `${categoryColors[activity.category]}15`,
                                    color: categoryColors[activity.category]
                                  }}
                                >
                                  {activity.category}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Cost Badge */}
                          {activity.cost > 0 && (
                            <div className="flex items-center space-x-1 text-green-600 font-semibold">
                              <DollarSign size={16} />
                              <span>{activity.cost}</span>
                            </div>
                          )}
                          {activity.cost === 0 && (
                            <span className="text-xs text-gray-500 font-medium">Free</span>
                          )}
                        </div>
                        
                        {/* Activity Description */}
                        <p className="text-sm text-gray-700 mb-3 leading-relaxed ml-10">
                          {activity.description}
                        </p>
                        
                        {/* Activity Metadata */}
                        <div className="flex flex-wrap gap-3 text-xs text-gray-600 ml-10">
                          {activity.time && (
                            <div className="flex items-center space-x-1">
                              <Clock size={14} className="text-blue-500" />
                              <span>{activity.time}</span>
                            </div>
                          )}
                          
                          {activity.duration && (
                            <div className="flex items-center space-x-1">
                              <Clock size={14} className="text-blue-500" />
                              <span>{activity.duration}</span>
                            </div>
                          )}
                          
                          {activity.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin size={14} className="text-red-500" />
                              <span>{activity.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Coordinates Info (for debugging/development) */}
                        {activity.coordinates && (
                          <div className="mt-2 ml-10 text-xs text-gray-400 font-mono">
                            📍 {activity.coordinates.lat.toFixed(4)}, {activity.coordinates.lng.toFixed(4)}
                          </div>
                        )}

                        {/* Action Buttons (Hidden, shown on hover) */}
                        <div className="mt-3 pt-3 border-t border-gray-200 flex space-x-2 ml-10
                                      opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Edit activity:', activity);
                            }}
                            className="px-3 py-1 text-xs bg-blue-50 text-blue-600 
                                     rounded hover:bg-blue-100 flex items-center space-x-1"
                          >
                            <Edit2 size={12} />
                            <span>Edit</span>
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Remove activity:', activity);
                            }}
                            className="px-3 py-1 text-xs bg-red-50 text-red-600 
                                     rounded hover:bg-red-100 flex items-center space-x-1"
                          >
                            <Trash2 size={12} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Budget Summary Footer */}
      <div className="p-6 border-t bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Estimated Cost</p>
            <p className="text-3xl font-bold text-blue-600 flex items-center">
              <DollarSign size={28} />
              {totalCost.toFixed(2)}
            </p>
          </div>
          
          <div className="text-right text-sm text-gray-600">
            <p>Per Day: ${(totalCost / (itinerary.days?.length || 1)).toFixed(2)}</p>
            {itinerary.days && (
              <p className="text-xs text-gray-500 mt-1">
                {itinerary.days.reduce((sum, day) => sum + (day.activities?.length || 0), 0)} activities total
              </p>
            )}
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg 
                           hover:bg-blue-700 transition-colors text-sm font-medium">
            📥 Export to PDF
          </button>
          <button className="flex-1 px-4 py-2 bg-white border border-gray-300 
                           text-gray-700 rounded-lg hover:bg-gray-50 transition-colors 
                           text-sm font-medium">
            🔗 Share Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItineraryCalendar;