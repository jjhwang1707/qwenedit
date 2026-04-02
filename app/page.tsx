'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import UploadComponent from '@/components/UploadComponent'
import CanvasComponent from '@/components/CanvasComponent'
import JsonControlPanel from '@/components/JsonControlPanel'

export default function HomePage() {
  const [activeImageId, setActiveImageId] = useState<string | null>(null)
  const [imageState, setImageState] = useState<any>(null)

  const fetchImageState = async (id: string) => {
    const { data, error } = await supabase.from('app1_images').select('*').eq('id', id).single()
    if (!error && data) {
      setImageState(data)
      setActiveImageId(data.id)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">QwenEdit Workspace</h1>
        <div className="text-sm text-gray-500">Public Beta</div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left/Main Area: Canvas & Upload */}
        <div className="flex-1 flex flex-col bg-gray-100 p-6 overflow-y-auto">
          {!activeImageId ? (
            <UploadComponent onUploadComplete={fetchImageState} />
          ) : (
            <CanvasComponent imageState={imageState} />
          )}
        </div>

        {/* Right Sidebar: JSON Control */}
        <div className="w-96 bg-white border-l flex flex-col">
          <JsonControlPanel 
            imageId={activeImageId} 
            decomposedState={imageState?.decomposed_state} 
            onEditComplete={() => activeImageId && fetchImageState(activeImageId)}
          />
        </div>
      </main>
    </div>
  )
}
