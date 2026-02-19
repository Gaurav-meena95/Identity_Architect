import { buildPrompt } from '../utils/promptBuilder.js'

export async function listAvailableModels() {
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
  
  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/models',
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    )
    const data = await response.json()
    console.log('Available models:', data.data?.map(m => m.id))
    return data.data
  } catch (error) {
    console.error('Error fetching models:', error)
    return []
  }
}

export async function analyzeImage(imageBase64) {
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
  
  if (!API_KEY) {
    throw new Error('OpenRouter API key is missing. Please set VITE_OPENROUTER_API_KEY in your environment variables.')
  }

  const prompt = buildPrompt()

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Identity Architect'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBase64}`
                  }
                }
              ]
            }
          ],
          temperature: 0.7,
          max_tokens: 2048
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`OpenRouter API Error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenRouter API')
    }

    return data.choices[0].message.content
  } catch (error) {
    console.error('OpenRouter API Error:', error)
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
