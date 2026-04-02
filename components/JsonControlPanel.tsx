'use client'

import { useState } from 'react'

export default function JsonControlPanel({ imageId, decomposedState, onEditComplete }: { imageId: string | null, decomposedState: any, onEditComplete: () => void }) {
  const [jsonInput, setJsonInput] = useState('{\n  "action": "replace",\n  "target": "background",\n  "prompt": "A cyberpunk city at night"\n}')
  const [processing, setProcessing] = useState(false)

  const handleProcess = async () => {
    if (!imageId) return
    setProcessing(true)
    
    // Mock nanobanana API processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update local state instead of DB
    const mockFinalImageUrl = 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1000&auto=format&fit=crop'
    
    const existingData = sessionStorage.getItem(`app1_image_${imageId}`)
    if (existingData) {
      const parsedData = JSON.parse(existingData)
      parsedData.final_image_url = mockFinalImageUrl
      sessionStorage.setItem(`app1_image_${imageId}`, JSON.stringify(parsedData))
    }

    onEditComplete()
    setProcessing(false)
  }

  return (
    <div className="flex flex-col h-full p-4">
      <h3 className="font-semibold mb-4 text-gray-800">Nanobanana JSON Control</h3>
      <div className="flex-1 flex flex-col gap-4">
        <textarea 
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="flex-1 w-full bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter JSON edit parameters..."
          disabled={!imageId || processing}
        />
        <button 
          onClick={handleProcess}
          disabled={!imageId || processing}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? 'Generating Edit...' : 'Process Edit'}
        </button>
      </div>
    </div>
  )
}
