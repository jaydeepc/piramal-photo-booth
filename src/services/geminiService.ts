import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG } from '../config/gemini';

class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    console.log('Initializing Gemini AI with API key:', GEMINI_CONFIG.API_KEY.substring(0, 10) + '...');
    this.genAI = new GoogleGenerativeAI(GEMINI_CONFIG.API_KEY);
  }

  async transformImage(imageFile: File, transformationPrompt: string): Promise<string[]> {
    console.log('Starting Gemini 2.5 Flash Image Preview transformation with prompt:', transformationPrompt);
    
    try {
      // Convert image to base64
      const imageBase64 = await this.fileToBase64(imageFile);
      
      // Create the enhanced prompt for 4K cinematic image generation
      const fullPrompt = `Based on this input image, generate a stunning 4K ultra-high resolution cinematic image showing the same person transformed as: ${transformationPrompt}. 

CRITICAL REQUIREMENTS:
- Maintain the person's facial structure, bone structure, and key identifying features
- Apply the transformation completely while preserving their identity
- Generate in 4K resolution (3840x2160) with exceptional detail and clarity
- Use professional cinematic lighting techniques with dramatic shadows and highlights
- Apply advanced post-processing effects: color grading, depth of field, lens flares where appropriate
- Ensure photorealistic quality with fine textures, realistic materials, and natural lighting
- Add atmospheric effects like volumetric lighting, particle effects, or environmental ambiance
- Use cinematic composition with rule of thirds, leading lines, and dynamic framing
- Apply HDR photography techniques for enhanced dynamic range
- Include subtle film grain and color correction for a professional movie-quality finish

TECHNICAL SPECIFICATIONS:
- Resolution: 4K (3840x2160) minimum
- Color depth: 16-bit per channel
- Dynamic range: HDR compatible
- Compression: Minimal, preserve maximum detail
- Format: High-quality PNG or JPEG with maximum quality settings

Make this image look like it was captured by a professional cinematographer using the highest-end camera equipment and post-production techniques.`;

      console.log('Calling Gemini 2.5 Flash Image Preview API...');

      // Use the correct API endpoint for image generation
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${GEMINI_CONFIG.API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt
                },
                {
                  inlineData: {
                    mimeType: imageFile.type,
                    data: imageBase64
                  }
                }
              ]
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
        console.error('Gemini API error:', errorData);
        throw new Error(`Gemini API failed: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('Gemini API response:', data);

      const generatedImages: string[] = [];

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
              generatedImages.push(imageUrl);
              console.log('Generated image URL:', imageUrl);
            }
          }
        }
      }

      if (generatedImages.length === 0) {
        console.log('No images generated, creating fallback visualization...');
        // Fallback: create a text-based visualization
        return this.createFallbackVisualization(transformationPrompt, data);
      }

      return generatedImages;

    } catch (error) {
      console.error('Error in Gemini transformation process:', error);
      throw new Error(`Failed to transform image with Gemini AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
