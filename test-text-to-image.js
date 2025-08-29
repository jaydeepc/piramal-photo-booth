const API_KEY = 'AIzaSyDaFkYid0S_1AD6ReRHV5SYMd1JPvHqX-s';

const payload = {
  contents: [
    {
      parts: [
        {
          text: "Generate an image of a person transformed into a superhero with a cape and mask, standing heroically with city skyline in background."
        }
      ]
    }
  ],
  generationConfig: {
    responseModalities: ["TEXT", "IMAGE"],
    candidateCount: 1,
    safetySettings: [
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ]
  }
};

console.log('Testing text-to-image generation with Gemini 2.5 Flash Image Preview...');
console.log('API Key:', API_KEY.substring(0, 10) + '...');

fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${API_KEY}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload)
})
.then(response => {
  console.log('Response status:', response.status);
  return response.json();
})
.then(data => {
  console.log('API Response:', JSON.stringify(data, null, 2));
  
  if (data.candidates && data.candidates.length > 0) {
    const candidate = data.candidates[0];
    if (candidate.content && candidate.content.parts) {
      candidate.content.parts.forEach((part, index) => {
        if (part.inlineData && part.inlineData.data) {
          console.log(`✅ Found generated image in part ${index}:`, {
            mimeType: part.inlineData.mimeType,
            dataLength: part.inlineData.data.length
          });
          
          // Save the image to a file for testing
          const fs = require('fs');
          const imageData = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync('test-generated-image.png', imageData);
          console.log('💾 Image saved as test-generated-image.png');
        }
        if (part.text) {
          console.log(`📝 Text in part ${index}:`, part.text);
        }
      });
    }
  }
})
.catch(error => {
  console.error('❌ Error:', error);
});
