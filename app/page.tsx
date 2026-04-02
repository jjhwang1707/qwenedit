'use client'

import { useState } from 'react'
import UploadComponent from '@/components/UploadComponent'
import CanvasComponent from '@/components/CanvasComponent'
import JsonControlPanel from '@/components/JsonControlPanel'

export default function HomePage() {
  const [activeImageId, setActiveImageId] = useState<string | null>(null)
  const [originalImageBase64, setOriginalImageBase64] = useState<string | null>(null)
  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null)
  const [analysisJson, setAnalysisJson] = useState<any>(null)

  const handleUploadComplete = (id: string, base64: string, analysis: any) => {
    setActiveImageId(id)
    setOriginalImageBase64(base64)
    setAnalysisJson(analysis)
    setFinalImageUrl(null) // Reset final image on new upload
  }

  const handleEditComplete = (finalUrl: string) => {
    setFinalImageUrl(finalUrl)
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">QwenEdit Workspace <span className="text-sm font-normal text-gray-500 ml-2">(Powered by Gemini & Nanobanana)</span></h1>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left/Main Area: Canvas & Upload */}
        <div className="flex-1 flex flex-col bg-gray-100 p-6 overflow-y-auto">
          {!activeImageId ? (
            <UploadComponent onUploadComplete={handleUploadComplete} />
          ) : (
            <CanvasComponent 
              originalUrl={originalImageBase64} 
              finalUrl={finalImageUrl} 
              analysis={analysisJson} 
            />
          )}
        </div>

        {/* Right Sidebar: JSON Control */}
        <div className="w-96 bg-white border-l flex flex-col">
          <JsonControlPanel 
            imageId={activeImageId}
            originalBase64={originalImageBase64}
            initialJson={analysisJson} 
            onEditComplete={handleEditComplete}
          />
        </div>
      </main>
    </div>
  )
}
