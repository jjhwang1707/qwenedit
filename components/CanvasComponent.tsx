'use client'

export default function CanvasComponent({ originalUrl, finalUrl, analysis }: { originalUrl: string | null, finalUrl: string | null, analysis: any }) {
  if (!originalUrl) return null

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-4 mb-4 h-[60%]">
        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border flex flex-col">
          <h3 className="font-semibold mb-2 text-gray-700">Original Image</h3>
          <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={originalUrl} 
              alt="Original" 
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border flex flex-col">
          <h3 className="font-semibold mb-2 text-gray-700">Final Preview</h3>
          <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {finalUrl ? (
               <img 
                 src={finalUrl} 
                 alt="Final Edit" 
                 className="absolute inset-0 w-full h-full object-contain"
               />
            ) : (
              <span className="text-gray-400">Awaiting edits...</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border flex-1 overflow-y-auto">
        <h3 className="font-semibold mb-2 text-gray-700">Gemini Vision Analysis</h3>
        <div className="flex gap-2 flex-wrap">
          {analysis ? (
            Object.entries(analysis).map(([key, value], idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {key}: {String(value)}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No analysis available</span>
          )}
        </div>
      </div>
    </div>
  )
}
