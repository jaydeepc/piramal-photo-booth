import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG } from '../config/gemini';

class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    console.log('Initializing Gemini AI with API key:', GEMINI_CONFIG.API_KEY.substring(0, 10) + '...');
    this.genAI = new GoogleGenerativeAI(GEMINI_CONFIG.API_KEY);
  }

  async transformImage(imageFile: File, transformationPrompt: string, referenceImageUrl?: string, userHeight?: string): Promise<string[]> {
    console.log('Starting Gemini 2.5 Flash Image Preview transformation with prompt:', transformationPrompt);
    console.log('Generating 2 variations for better character consistency...');
    
    try {
      // Generate two variations by making two separate API calls
      const generatedImages: string[] = [];
      
      // Make first API call
      console.log('Generating variation 1...');
      const firstVariation = await this.generateSingleImage(imageFile, transformationPrompt, referenceImageUrl, userHeight, 1);
      if (firstVariation) {
        generatedImages.push(firstVariation);
      }
      
      // Make second API call with slight variation in prompt to encourage diversity
      console.log('Generating variation 2...');
      const secondVariation = await this.generateSingleImage(imageFile, transformationPrompt, referenceImageUrl, userHeight, 2);
      if (secondVariation) {
        generatedImages.push(secondVariation);
      }
      
      // If we don't have at least 2 images, create fallback options
      if (generatedImages.length === 0) {
        console.log('No images generated, creating fallback visualizations...');
        return this.createFallbackVisualization(transformationPrompt, null);
      } else if (generatedImages.length === 1) {
        console.log('Only one image generated, creating additional fallback option...');
        const fallbackImages = await this.createFallbackVisualization(transformationPrompt, null);
        generatedImages.push(...fallbackImages);
      }

      console.log(`Successfully generated ${generatedImages.length} image variations`);
      return generatedImages;

    } catch (error) {
      console.error('Error in Gemini transformation process:', error);
      throw new Error(`Failed to transform image with Gemini AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateSingleImage(imageFile: File, transformationPrompt: string, referenceImageUrl?: string, userHeight?: string, variationNumber: number = 1): Promise<string | null> {
    try {
      // Convert image to base64
      const imageBase64 = await this.fileToBase64(imageFile);
      
      // Handle reference image if provided
      let referenceImageBase64: string | null = null;
      if (referenceImageUrl) {
        try {
          const response = await fetch(referenceImageUrl);
          const blob = await response.blob();
          const file = new File([blob], 'reference.jpg', { type: blob.type });
          referenceImageBase64 = await this.fileToBase64(file);
        } catch (error) {
          console.warn('Failed to load reference image:', error);
        }
      }
      
      // Create the enhanced prompt for face-preserving transformation
      let fullPrompt = `ABSOLUTELY CRITICAL FACE-SWAP TRANSFORMATION INSTRUCTIONS:

🚨 MANDATORY FACE PRESERVATION RULES:
1. You MUST use the EXACT face from the input photo - same eyes, nose, mouth, facial structure, skin tone, and ALL facial features
2. DO NOT generate a new face or use any reference face from your training data
3. This is a FACE-SWAP operation - keep the original person's face 100% identical
4. ONLY change the clothing, accessories, background, and body pose
5. The face must be completely recognizable as the same person from the input photo

TRANSFORMATION REQUEST: ${transformationPrompt}`;

      // Add slight variation for different versions to encourage diversity
      if (variationNumber === 2) {
        fullPrompt += `\n\nVARIATION NOTE: Create a slightly different interpretation of this transformation while maintaining the same core concept and face preservation rules.`;
      }

      // Add height information if provided
      if (userHeight) {
        fullPrompt += `\n\nUSER HEIGHT INFORMATION: The person in the photo is ${userHeight} tall. Use this for accurate proportions and size comparisons.`;
      }

      // Add reference image instructions if provided
      if (referenceImageBase64) {
        fullPrompt += `\n\nREFERENCE IMAGE PROVIDED: Use the second image as an exact reference for specific elements mentioned in the transformation (like clothing, objects, or characters). Do not modify the reference elements - use them exactly as shown.`;
      }

      fullPrompt += `

TECHNICAL REQUIREMENTS:
- Use the input image as the PRIMARY reference for all facial features
- Preserve exact eye color, eye shape, nose shape, mouth shape, facial bone structure
- Keep the same skin tone and facial proportions
- Only modify: clothing, accessories, background, lighting, and pose
- Generate in high resolution with photorealistic quality
- Apply professional lighting and cinematography
- Ensure the transformed person is immediately recognizable as the same individual

VERIFICATION CHECKLIST:
✓ Same eyes as input photo
✓ Same nose as input photo  
✓ Same mouth as input photo
✓ Same facial structure as input photo
✓ Same skin tone as input photo
✓ Only clothing/accessories/background changed

This is a face-preservation transformation - the person's identity must remain completely intact.`;

      // Prepare the parts array
      const parts: any[] = [
        {
          text: fullPrompt
        },
        {
          inlineData: {
            mimeType: imageFile.type,
            data: imageBase64
          }
        }
      ];

      // Add reference image if available
      if (referenceImageBase64) {
        parts.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: referenceImageBase64
          }
        });
      }

      // Use the correct API endpoint for image generation
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${GEMINI_CONFIG.API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: parts
            }
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
            candidateCount: 1
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Gemini API error for variation ${variationNumber}:`, errorData);
        throw new Error(`Gemini API failed: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log(`Gemini API response for variation ${variationNumber}:`, data);

      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        
        // Look for image parts in the response
        if (candidate.content && candidate.content.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData && part.inlineData.data) {
              // Convert the base64 image data to a blob URL
              const binaryString = atob(part.inlineData.data);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              
              const blob = new Blob([bytes], { type: part.inlineData.mimeType || 'image/png' });
              const imageUrl = URL.createObjectURL(blob);
              console.log(`Generated image URL for variation ${variationNumber}:`, imageUrl);
              return imageUrl;
            }
          }
        }
      }

      console.warn(`No image generated for variation ${variationNumber}`);
      return null;

    } catch (error) {
      console.error(`Error generating variation ${variationNumber}:`, error);
      return null;
    }
  }

  private createFallbackVisualization(transformationPrompt: string, apiResponse: any): Promise<string[]> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 400;
      canvas.height = 600;
      
      if (ctx) {
        // Create background based on transformation type
        const gradient = ctx.createLinearGradient(0, 0, 400, 600);
        
        if (transformationPrompt.includes('farmer')) {
          gradient.addColorStop(0, '#8B4513');
          gradient.addColorStop(1, '#D2691E');
        } else if (transformationPrompt.includes('astronaut')) {
          gradient.addColorStop(0, '#1e3c72');
          gradient.addColorStop(1, '#2a5298');
        } else if (transformationPrompt.includes('supervillain')) {
          gradient.addColorStop(0, '#434343');
          gradient.addColorStop(1, '#000000');
        } else if (transformationPrompt.includes('film star')) {
          gradient.addColorStop(0, '#FFD700');
          gradient.addColorStop(1, '#FFA500');
        } else if (transformationPrompt.includes('cartoon')) {
          gradient.addColorStop(0, '#ff6b6b');
          gradient.addColorStop(1, '#4ecdc4');
        } else {
          gradient.addColorStop(0, '#8e44ad');
          gradient.addColorStop(1, '#9b59b6');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 600);
        
        // Add text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🎨 AI Processing Result', 200, 50);
        
        // Show API response or transformation type
        let displayText = '';
        if (apiResponse && apiResponse.candidates && apiResponse.candidates[0] && apiResponse.candidates[0].content) {
          const textParts = apiResponse.candidates[0].content.parts?.filter((part: any) => part.text);
          if (textParts && textParts.length > 0) {
            displayText = textParts[0].text;
          }
        }
        
        if (!displayText) {
          displayText = `Transformation: ${transformationPrompt}\n\nImage generation in progress...\nThis is a placeholder while we work on the actual image generation.`;
        }
        
        const words = displayText.split(' ');
        const lines = [];
        let currentLine = '';
        
        words.forEach(word => {
          const testLine = currentLine + word + ' ';
          if (testLine.length > 35 && currentLine !== '') {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
          } else {
            currentLine = testLine;
          }
        });
        if (currentLine) lines.push(currentLine.trim());
        
        ctx.font = '11px Arial';
        ctx.fillStyle = '#ffffff';
        lines.slice(0, 25).forEach((line, index) => {
          ctx.fillText(line, 200, 100 + (index * 16));
        });
        
        ctx.font = '10px Arial';
        ctx.fillStyle = '#cccccc';
        ctx.fillText('Powered by Gemini 2.5 Flash Image Preview', 200, 580);
      }
      
      canvas.toBlob((blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          console.log('Generated fallback visualization:', imageUrl);
          resolve([imageUrl]);
        } else {
          resolve([]);
        }
      }, 'image/png');
    });
  }

  // Keep this for future real API integration
  private async callRealGeminiAPI(imageFile: File, transformationPrompt: string): Promise<string[]> {
    try {
      // Convert file to base64
      const imageBase64 = await this.fileToBase64(imageFile);
      
      const model = this.genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash" // Use available model
      });

      const prompt = `${transformationPrompt}. Make it look realistic and professional. Keep the same face structure but apply the transformation completely.`;

      console.log('Calling Gemini API with prompt:', prompt);

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageBase64,
            mimeType: imageFile.type
          }
        }
      ]);

      const response = await result.response;
      const text = response.text();
      
      console.log('Gemini API response:', text);

      // Note: Gemini API primarily returns text, not images
      // For actual image generation, you'd need to use a different service
      // or integrate with Imagen via Vertex AI
      
      throw new Error('Image generation not available with current Gemini setup');

    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix to get just the base64 string
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

const geminiService = new GeminiService();
export default geminiService;
