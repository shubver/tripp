import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import MapView from './components/MapView';
import ItineraryCalendar from './components/ItineraryCalendar';
import { useItinerary } from './hooks/useItinerary';
import { Plane } from 'lucide-react';

function App() {
  const { itinerary, isLoading, error, generateItinerary } = useItinerary();
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (userMessage) => {
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    try {
      // Call the custom hook to generate itinerary
      const response = await generateItinerary(userMessage);
      
      // Add AI response to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.message || 'I\'ve created your itinerary! Check it out on the right.' 
      }]);
    } catch (err) {
      // Add error message to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Sorry, I encountered an error: ${err.message}. Please try again.` 
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Plane className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Travel Planner</h1>
              <p className="text-sm text-gray-600">Your personal travel assistant powered by AI</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Chat Interface */}
          <div className="space-y-4">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Map & Itinerary */}
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {itinerary ? (
              <>
                <MapView itinerary={itinerary} />
                <ItineraryCalendar itinerary={itinerary} />
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plane className="text-blue-600" size={40} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready to Plan Your Trip?
                  </h3>
                  <p className="text-gray-600">
                    Start by telling me about your dream destination in the chat. 
                    I'll create a personalized itinerary just for you!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 pb-6 text-center text-gray-500 text-sm">
        <p>Built with React, Tailwind CSS, and AI • V1 MVP</p>
      </footer>
    </div>
  );
}

export default App;
