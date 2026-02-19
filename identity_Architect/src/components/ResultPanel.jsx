import React from 'react'

function ResultPanel({ result }) {
  if (!result) return null

  const formatText = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') return null
      
      // Check if it's a heading (all caps or contains numbers like 1., 2., etc.)
      if (line.match(/^[A-Z][A-Z\s]+$/) || line.match(/^\d+\./)) {
        return (
          <h3 key={index} className="text-lg font-bold text-gray-800 mt-6 mb-3">
            {line}
          </h3>
        )
      }
      
      // Check if it's a bullet point
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        return (
          <li key={index} className="ml-4 text-gray-700 mb-2">
            {line.trim().replace(/^[•\-\*]\s*/, '')}
          </li>
        )
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 mb-3 leading-relaxed">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Analysis Results
        </h2>
        
        <div className="space-y-6">
          {result.split('\n\n').map((section, index) => {
            const lines = section.split('\n')
            const heading = lines[0]
            const content = lines.slice(1).join('\n')
            
            return (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {heading}
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  {formatText(content)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ResultPanel
