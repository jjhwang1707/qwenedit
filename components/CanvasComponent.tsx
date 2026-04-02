'use client'

export default function CanvasComponent({ imageState }: { imageState: any }) {
  if (!imageState) return null

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border flex flex-col">
          <h3 className="font-semibold mb-2 text-gray-700">Original Image</h3>
          <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden min-h-[300px]">
            <img 
              src={imageState.original_image_url} 
              alt="Original" 
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border flex flex-col">
          <h3 className="font-semibold mb-2 text-gray-700">Final Preview</h3>
          <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center">
            {imageState.final_image_url ? (
               <img 
                 src={imageState.final_image_url} 
                 alt="Final Edit" 
                 className="absolute inset-0 w-full h-full object-contain"
               />
            ) : (
              <span className="text-gray-400">Awaiting edits...</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <h3 className="font-semibold mb-2 text-gray-700">Qwen Decomposed State Map</h3>
        <div className="flex gap-2 flex-wrap">
          {imageState.decomposed_state?.layers?.map((layer: string, idx: number) => (
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Layer: {layer}
            </span>
          )) || <span className="text-gray-500 text-sm">No layers available</span>}
        </div>
      </div>
    </div>
  )
}
