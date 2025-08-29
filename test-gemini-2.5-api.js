const fs = require('fs');

// Test image (a simple test image in base64 - a small red square)
const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9QzwAJj6nGkfT0AAAA//8DAP//AwDrJgEAAAAASUVORK5CYII=';

const API_KEY = 'AIzaSyDaFkYid0S_1AD6ReRHV5SYMd1JPvHqX-s';

const payload = {
  contents: [
    {
      parts: [
        {
          text: "Based on this input image, generate a new image showing the same content but transformed into a cartoon style."
        },
        {
          inlineData: {
            mimeType: "image/png",
            data: testImageBase64
          }
        }
      ]
    }
  ],
  generationConfig: {
    responseModalities: ["TEXT", "IMAGE"],
    candidateCount: 1
  }
};

console.log('Testing Gemini 2.5 Flash Image Preview API...');
console.log('API Key:', API_KEY.substring(0, 10) + '...');
console.log('Payload:', JSON.stringify(payload, null, 2));

// Generate curl command
const curlCommand = `curl -X POST \\
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${API_KEY}' \\
  -H 'Content-Type: application/json' \\
  -d '${JSON.stringify(payload)}'`;

console.log('\n=== CURL COMMAND ===');
console.log(curlCommand);

console.log('\n=== Running fetch test ===');

// Test with fetch
fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${API_KEY}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload)
})
.then(response => {
  console.log('Response status:', response.status);
  console.log('Response headers:', [...response.headers.entries()]);
  return response.json();
})
.then(data => {
  console.log('API Response:', JSON.stringify(data, null, 2));
  
  // Check if there are any images in the response
  if (data.candidates && data.candidates.length > 0) {
    const candidate = data.candidates[0];
    if (candidate.content && candidate.content.parts) {
      candidate.content.parts.forEach((part, index) => {
        if (part.inlineData && part.inlineData.data) {
          console.log(`Found image in part ${index}:`, {
            mimeType: part.inlineData.mimeType,
            dataLength: part.inlineData.data.length
          });
        }
        if (part.text) {
          console.log(`Text in part ${index}:`, part.text.substring(0, 200) + '...');
        }
      });
    }
  }
})
.catch(error => {
  console.error('Error:', error);
});
