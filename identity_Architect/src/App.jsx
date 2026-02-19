import { useState } from 'react'
import UploadBox from './components/UploadBox'
import PreviewImage from './components/PreviewImage'
import ResultPanel from './components/ResultPanel'
import Loader from './components/Loader'
import { analyzeImage, convertImageToBase64, listAvailableModels } from './services/geminiService'

function App() {
  const [image, setImage] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleFileSelect = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    setError(null)
    setImage(file)
    setImageSrc(URL.createObjectURL(file))
    setResult(null)
  }

  const handleRemoveImage = () => {
    setImage(null)
    setImageSrc(null)
    setResult(null)
    setError(null)
  }

  const handleAnalyze = async () => {
    if (!image) {
      setError('Please upload an image first')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Debug: Check available models
      const models = await listAvailableModels()
      console.log('Available models:', models)
      
      const imageBase64 = await convertImageToBase64(image)
      const analysisResult = await analyzeImage(imageBase64)
      setResult(analysisResult)
    } catch (err) {
      setError(err.message || 'Failed to analyze image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔍 Logic Lens Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image of your technical problem and get AI-powered explanations, 
            step-by-step reasoning, and actionable next steps.
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto">
          {!imageSrc ? (
            /* Upload Section */
            <div className="bg-white rounded-xl shadow-lg p-8">
              <UploadBox onFileSelect={handleFileSelect} disabled={loading} />
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>
          ) : (
            /* Preview and Analyze Section */
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Uploaded Image
                  </h2>
                  <button
                    onClick={handleRemoveImage}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove Image
                  </button>
                </div>
                
                <PreviewImage 
                  imageSrc={imageSrc} 
                  onRemove={handleRemoveImage}
                />
                
                <div className="mt-6 text-center">
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Image'}
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <Loader />
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Analysis Failed
                  </h3>
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Results */}
              {result && !loading && (
                <ResultPanel result={result} />
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-600">
          <p className="text-sm">
            Powered by Google Gemini Vision API • Upload circuit diagrams, equations, code, and more
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
