import React from 'react'

function UploadBox({ onFileSelect, disabled }) {
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      onFileSelect(files[0])
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      onFileSelect(files[0])
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed border-gray-300 rounded-xl p-12 text-center transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}>
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">📸</div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Upload your technical problem
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Drag & drop an image here, or click to browse
            </p>
            <p className="text-xs text-gray-400">
              Supports: JPG, PNG, GIF, WebP (Max 10MB)
            </p>
          </div>
        </label>
      </div>
    </div>
  )
}

export default UploadBox
