const API_KEY = 'AIzaSyDaFkYid0S_1AD6ReRHV5SYMd1JPvHqX-s';

const payload = {
  contents: [
    {
      parts: [
        {
          text: "Generate an image of a superhero standing heroically."
        }
      ]
    }
  ],
  generationConfig: {
    responseModalities: ["TEXT", "IMAGE"],
    candidateCount: 1
  }
};

console.log('Testing simple text-to-image generation...');

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
          console.log(`✅ SUCCESS! Found generated image in part ${index}:`, {
            mimeType: part.inlineData.mimeType,
            dataLength: part.inlineData.data.length
          });
          
          // Save the image to a file for testing
          const fs = require('fs');
          const imageData = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync('test-generated-superhero.png', imageData);
          console.log('💾 Image saved as test-generated-superhero.png');
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
