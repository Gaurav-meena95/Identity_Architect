import React from 'react'

function ResultPanel({ result }) {
  if (!result) return null

  // Clean the text by removing markdown symbols and extra characters
  const cleanText = (text) => {
    return text
      .replace(/\*\*/g, '') // Remove bold markdown **
      .replace(/\*/g, '') // Remove asterisks *
      .replace(/#{1,6}\s/g, '') // Remove markdown headers #
      .replace(/`{1,3}/g, '') // Remove code blocks ```
      .replace(/[\\\/]{2,}/g, '') // Remove multiple slashes //
      .replace(/[;,]{2,}/g, '') // Remove multiple semicolons/commas
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim()
  }

  const formatText = (text) => {
    const cleanedText = cleanText(text)
    
    return cleanedText.split('\n').map((line, index) => {
      if (line.trim() === '') return null
      
      // Check if it's a heading (all caps or contains numbers like 1., 2., etc.)
      if (line.match(/^[A-Z][A-Z\s]+$/) || line.match(/^\d+\./)) {
        return (
          <h3 key={index} className="text-lg font-bold text-gray-800 mt-6 mb-3">
            {cleanText(line)}
          </h3>
        )
      }
      
      // Check if it's a bullet point
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <li key={index} className="ml-4 text-gray-700 mb-2">
            {cleanText(line.trim().replace(/^[•\-]\s*/, ''))}
          </li>
        )
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 mb-3 leading-relaxed">
          {cleanText(line)}
        </p>
      )
    })
  }

  const processResult = () => {
    const cleanedResult = cleanText(result)
    const sections = cleanedResult.split('\n\n').filter(s => s.trim())
    
    return sections.map((section, index) => {
      const lines = section.split('\n').filter(l => l.trim())
      if (lines.length === 0) return null
      
      const heading = lines[0]
      const content = lines.slice(1).join('\n')
      
      return (
        <div key={index} className="border-l-4 border-blue-500 pl-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            {cleanText(heading)}
          </h3>
          <div className="text-gray-700 leading-relaxed">
            {content && formatText(content)}
          </div>
        </div>
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
          {processResult()}
        </div>
      </div>
    </div>
  )
}

export default ResultPanel
