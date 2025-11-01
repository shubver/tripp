// src/components/LoadingSpinner.jsx
function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-4 
                    border-blue-500 border-t-transparent" />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
}

export default LoadingSpinner;