import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    // Securely extract the base64 string regardless of mime-type prefix length
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: "Analyze this image and extract its core visual elements into a strict JSON object. Include keys like 'subject', 'color', 'background', 'style', and 'action'. Return ONLY valid JSON without markdown formatting." },
            { inline_data: { mime_type: "image/jpeg", data: base64Data } }
          ]
        }],
        generationConfig: {
          response_mime_type: "application/json"
        }
      })
    });
    
    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      if (data.error) {
         throw new Error(`Gemini API Error: ${data.error.message}`);
      }
      throw new Error("Failed to get a valid response from Gemini API");
    }

    let jsonString = data.candidates[0].content.parts[0].text;
    jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsedJson = JSON.parse(jsonString);
    return NextResponse.json({ success: true, data: parsedJson });
  } catch (e: any) {
    console.error("Analysis route error:", e);
    return NextResponse.json({ success: false, error: e.message || String(e) }, { status: 500 });
  }
}
