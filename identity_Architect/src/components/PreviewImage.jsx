import React from 'react'

function PreviewImage({ imageSrc, onRemove }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative inline-block">
        <img
          src={imageSrc}
          alt="Uploaded technical problem"
          className="max-w-full h-auto rounded-lg shadow-lg"
          style={{ maxHeight: '400px' }}
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default PreviewImage
