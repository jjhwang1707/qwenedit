'use client'

import { useState, useEffect } from 'react'

export default function JsonControlPanel({ 
  imageId, 
  originalBase64,
  initialJson, 
  onEditComplete 
}: { 
  imageId: string | null, 
  originalBase64: string | null,
  initialJson: any, 
  onEditComplete: (finalUrl: string) => void 
}) {
  const [jsonInput, setJsonInput] = useState('')
  const [processing, setProcessing] = useState(false)

  // Sync the incoming Gemini JSON into the textarea
  useEffect(() => {
    if (initialJson) {
      setJsonInput(JSON.stringify(initialJson, null, 2))
    }
  }, [initialJson])

  const handleProcess = async () => {
    if (!imageId || !originalBase64) return
    setProcessing(true)
    
    try {
      const parsedParams = JSON.parse(jsonInput)
      
      // Call our Nanobanana Edit API route
      const response = await fetch('/api/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imageBase64: originalBase64,
          editParams: parsedParams
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        onEditComplete(result.finalImageUrl)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Edit processing failed:', error)
      alert('Failed to process edit. Ensure JSON is valid.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="flex flex-col h-full p-4">
      <h3 className="font-semibold mb-4 text-gray-800">Nanobanana JSON Control</h3>
      <div className="flex-1 flex flex-col gap-4">
        <textarea 
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="flex-1 w-full bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Awaiting Gemini analysis..."
          disabled={!imageId || processing}
        />
        <button 
          onClick={handleProcess}
          disabled={!imageId || processing}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? 'Rendering with Nanobanana...' : 'Process Edit'}
        </button>
      </div>
    </div>
  )
}
