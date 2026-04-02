'use client'

import { useState } from 'react'

export default function UploadComponent({ onUploadComplete }: { onUploadComplete: (id: string) => void }) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // 1. Mock Local Upload (Generate an object URL instead of uploading to Supabase)
      const mockImageUrl = URL.createObjectURL(file)

      // 2. Mock Qwen Decomposition Call (Simulate delay)
      await new Promise(resolve => setTimeout(resolve, 1500))
      const mockDecomposedState = { layers: ["background", "subject", "foreground"], analysis: "Subject is centered." }

      // 3. Create a Local State Record instead of DB
      const mockDbData = {
        id: Math.random().toString(36).substring(7),
        original_image_url: mockImageUrl,
        decomposed_state: mockDecomposedState
      }

      // Hack: Store in sessionStorage or a global variable so the parent can fetch it
      sessionStorage.setItem(`app1_image_${mockDbData.id}`, JSON.stringify(mockDbData))

      onUploadComplete(mockDbData.id)

    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">AI-Powered Precision Image Editing</h2>
        <p className="text-gray-500">Upload an image to instantly decompose and edit via JSON control.</p>
      </div>
      <label className="flex flex-col items-center justify-center w-full max-w-xl h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-gray-50 transition-colors shadow-sm">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
          <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 10MB)</p>
          {uploading && <p className="mt-4 text-blue-500 font-medium">Processing via Qwen...</p>}
        </div>
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      </label>
    </div>
  )
}
