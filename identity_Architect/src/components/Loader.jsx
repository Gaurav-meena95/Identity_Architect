import React from 'react'

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin border-b-blue-300 animation-delay-150"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Analyzing your image...</p>
      <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
      
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  )
}

export default Loader
