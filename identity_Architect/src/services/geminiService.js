import { buildPrompt } from '../utils/promptBuilder.js'

export async function analyzeImage(imageBase64) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
  
  if (!API_KEY) {
    throw new Error('Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your environment variables.')
  }

  const prompt = buildPrompt()

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: imageBase64
                  }
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Gemini API Error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API')
    }

    return data.candidates[0].content.parts[0].text
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw error
  }
}

export function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = () => {
      // Remove the data:image/...;base64, prefix
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
