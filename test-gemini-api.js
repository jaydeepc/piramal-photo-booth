const fs = require('fs');
const path = require('path');

// Test image (a simple 1x1 pixel PNG in base64)
const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77wgAAAABJRU5ErkJggg==';

const API_KEY = 'AIzaSyDaFkYid0S_1AD6ReRHV5SYMd1JPvHqX-s';

const payload = {
  contents: [
    {
      parts: [
        {
          text: "Describe this image and tell me what you see."
        },
        {
          inlineData: {
            mimeType: "image/png",
            data: testImageBase64
          }
        }
      ]
    }
  ]
};

console.log('Testing Gemini API with image...');
console.log('API Key:', API_KEY.substring(0, 10) + '...');
console.log('Payload:', JSON.stringify(payload, null, 2));

// Generate curl command
const curlCommand = `curl -X POST \
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}' \
  -H 'Content-Type: application/json' \
  -d '${JSON.stringify(payload)}'`;

console.log('\n=== CURL COMMAND ===');
console.log(curlCommand);

console.log('\n=== Running fetch test ===');

// Also test with fetch
fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
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
})
.catch(error => {
  console.error('Error:', error);
});
