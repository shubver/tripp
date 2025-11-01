import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

function ChatInterface({ messages, onSendMessage, isLoading }) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter, but allow Shift+Enter for new lines
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Pre-made suggestion pills for quick start
  const suggestions = [
    "Plan a 5-day romantic trip to Paris for $3000",
    "Weekend getaway in Tokyo, focus on food and culture",
    "Family-friendly week in Barcelona with kids activities",
    "Budget backpacking through Thailand for 2 weeks"
  ];

  const handleSuggestionClick = (suggestion) => {
    onSendMessage(suggestion);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.length === 0 ? (
          // Empty state with suggestions
          <div className="h-full flex flex-col items-center justify-center space-y-6 p-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 
                            rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Where would you like to go?
              </h2>
              <p className="text-gray-600 max-w-md">
                Tell me your destination, dates, budget, and preferences.
                I'll create a personalized itinerary just for you!
              </p>
            </div>
            
            {/* Suggestion Pills */}
            <div className="w-full max-w-lg space-y-2">
              <p className="text-sm font-medium text-gray-700 text-center mb-3">
                Try these examples:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 
                             hover:from-blue-100 hover:to-indigo-100 
                             text-gray-700 rounded-lg text-sm text-left
                             transition-all duration-200 hover:shadow-md
                             border border-blue-100 hover:border-blue-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Messages display
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                         style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                         style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your ideal trip... (Press Enter to send, Shift+Enter for new line)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     resize-none min-h-[60px] max-h-[120px]"
            disabled={isLoading}
            rows={2}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white rounded-lg hover:from-blue-700 hover:to-indigo-700
                     disabled:from-gray-300 disabled:to-gray-300
                     disabled:cursor-not-allowed transition-all duration-200
                     flex items-center space-x-2 shadow-md hover:shadow-lg
                     self-end"
          >
            <Send size={18} />
            <span className="font-medium">Send</span>
          </button>
        </form>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          💡 Be specific! Include destination, dates, budget, and your interests
        </p>
      </div>
    </div>
  );
}

export default ChatInterface;
