export const GEMINI_CONFIG = {
  API_KEY: process.env.REACT_APP_GEMINI_API_KEY || '',
  MODEL_NAME: process.env.REACT_APP_GEMINI_MODEL_NAME || 'gemini-2.5-flash-image-preview',
  PROJECT_ID: process.env.REACT_APP_GOOGLE_CLOUD_PROJECT || '',
  LOCATION: process.env.REACT_APP_GOOGLE_CLOUD_LOCATION || 'us-central1'
};

export const TRANSFORMATION_OPTIONS = [
  // Professional Collection - Keep all 3
  {
    id: 'linkedin-photo',
    name: 'LinkedIn Photo',
    description: 'Professional headshot for career',
    category: 'professional',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Create a full body professional LinkedIn portrait with business attire (suit or professional shirt), clean corporate office background with desk and computer, professional studio lighting, confident and approachable expression. Show full body standing pose in professional environment. Keep the person\'s face completely unchanged. 4K ultra-high resolution, photorealistic, corporate photography style, sharp focus, professional color grading. Keep face 100% identical to original.'
  },
  {
    id: 'studio-photo-black',
    name: 'Studio Photo - Black Background',
    description: 'Elegant studio portrait with black backdrop',
    category: 'professional',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Create a full body elegant studio portrait with professional attire, pure black background, dramatic studio lighting setup with professional photography equipment visible. Show full body standing pose in studio environment. Keep the person\'s face completely unchanged. 4K ultra-high resolution, photorealistic, high contrast lighting, fashion photography style, sharp details, professional color grading. Keep face 100% identical to original.'
  },
  {
    id: 'studio-photo-white',
    name: 'Studio Photo - White Background',
    description: 'Bright studio portrait with dramatic lights',
    category: 'professional',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Create a full body bright studio portrait with professional attire, pure white background, dramatic studio lighting with multiple light sources and photography equipment. Show full body standing pose in professional studio setting. Keep the person\'s face completely unchanged. 4K ultra-high resolution, photorealistic, high-key lighting, fashion photography style, crisp details, professional color grading. Keep face 100% identical to original.'
  },

  // Superhero Collection - Classic superhero, Dark knight
  {
    id: 'superhero-classic',
    name: 'Classic Superhero',
    description: 'Iconic superhero with cape and emblem',
    category: 'superhero',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a classic superhero with full body view, vibrant costume, flowing cape, heroic emblem on chest, dynamic heroic pose, epic cityscape background at sunset with skyscrapers. Show complete full body transformation in superhero environment. 4K ultra-high resolution, photorealistic, dynamic pose, wind-blown cape, lens flares, volumetric lighting, HDR photography style. Keep face 100% identical to original.'
  },
  {
    id: 'superhero-dark',
    name: 'Dark Knight',
    description: 'Brooding vigilante superhero',
    category: 'superhero',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a dark vigilante superhero with full body tactical armor, utility belt, dramatic shadows, moody Gotham-style cityscape background at night with rain effects and neon reflections. Show complete full body transformation in dark urban environment. 4K cinematic quality, photorealistic, intense expression, atmospheric fog, dramatic backlighting, noir photography style. Keep face 100% identical to original.'
  },

  // Fantasy Collection - Wizard, Warrior princess
  {
    id: 'wizard',
    name: 'Arcane Wizard',
    description: 'Powerful magical spellcaster',
    category: 'fantasy',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a powerful wizard with full body ornate robes, magical staff, glowing runes, mystical forest background with ancient towers, floating magical particles, spell books and magical artifacts around. Show complete full body transformation in magical environment. 4K cinematic quality, photorealistic, dramatic pose, spell effects, volumetric fog, fantasy movie cinematography. Keep face 100% identical to original.'
  },
  {
    id: 'warrior-princess',
    name: 'Warrior Princess',
    description: 'Fierce royal warrior',
    category: 'fantasy',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a warrior princess with full body elegant armor, royal crown, enchanted sword, majestic castle background with throne room, royal banners and medieval weapons displayed. Show complete full body transformation in royal castle environment. 4K ultra-high resolution, photorealistic, heroic pose, flowing hair, cinematic depth of field, epic fantasy cinematography. Keep face 100% identical to original.'
  },

  // Classic Collection - Royal monarch, Wild west gunslinger
  {
    id: 'royal-monarch',
    name: 'Royal Monarch',
    description: 'Majestic ruler with crown',
    category: 'classic',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a royal monarch with full body elaborate crown, royal robes, ornate throne room background with grand architecture, royal scepter, golden decorations and royal court elements. Show complete full body transformation in royal palace environment. 4K ultra-high resolution, photorealistic, dignified pose, rich textures, cinematic depth of field, period drama cinematography. Keep face 100% identical to original.'
  },
  {
    id: 'wild-west-gunslinger',
    name: 'Wild West Gunslinger',
    description: 'Frontier cowboy hero',
    category: 'classic',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a Wild West gunslinger with full body cowboy hat, leather vest, revolvers, desert town background with saloon, horses, wooden buildings and western frontier elements. Show complete full body transformation in old west town environment. 4K ultra-high resolution, photorealistic, confident stance, western movie cinematography, dust effects, dramatic shadows. Keep face 100% identical to original.'
  },

  // Modern Collection - Rock star, Race car driver
  {
    id: 'rockstar',
    name: 'Rock Star',
    description: 'Legendary music performer',
    category: 'modern',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a rock star with full body leather outfit, electric guitar, concert stage background with spotlights, crowd, amplifiers, drums and complete rock concert setup. Show complete full body transformation in concert venue environment. 4K cinematic quality, photorealistic, energetic pose, stage effects, concert photography style, dramatic shadows. Keep face 100% identical to original.'
  },
  {
    id: 'race-car-driver',
    name: 'Race Car Driver',
    description: 'Professional racing champion',
    category: 'modern',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a race car driver with full body racing suit, helmet, race car background, speedway track with racing cars, pit crew, racing flags and motorsport environment. Show complete full body transformation in racing track environment. 4K cinematic quality, photorealistic, determined expression, speed effects, motorsport photography style, dynamic lighting. Keep face 100% identical to original.'
  },

  // Lifestyle & Career Collection - Business executive, Master chef, Artist painter, Surgeon doctor, University professor
  {
    id: 'business-executive',
    name: 'Business Executive',
    description: 'Corporate leader in boardroom',
    category: 'lifestyle',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a business executive with full body premium suit, corporate boardroom background with conference table, charts, laptops, office equipment and professional business environment. Show complete full body transformation in executive boardroom setting. 4K cinematic quality, photorealistic, authoritative and confident expression, corporate photography style, executive presence. Keep face 100% identical to original.'
  },
  {
    id: 'chef-master',
    name: 'Master Chef',
    description: 'World-renowned culinary expert',
    category: 'lifestyle',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a master chef with full body chef\'s hat and apron, professional kitchen background with stoves, cooking utensils, ingredients, pots, pans and complete restaurant kitchen setup. Show complete full body transformation in professional kitchen environment. 4K cinematic quality, photorealistic, passionate culinary expression, food photography style, warm kitchen lighting. Keep face 100% identical to original.'
  },
  {
    id: 'artist-painter',
    name: 'Artist Painter',
    description: 'Creative artist in studio',
    category: 'lifestyle',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into an artist with full body paint-splattered apron, holding paintbrush, art studio background with canvases, easels, paint palettes, brushes and complete artist studio setup. Show complete full body transformation in art studio environment. 4K ultra-high resolution, photorealistic, creative and inspired expression, artistic photography style, natural studio lighting. Keep face 100% identical to original.'
  },
  {
    id: 'doctor-surgeon',
    name: 'Surgeon Doctor',
    description: 'Medical professional in scrubs',
    category: 'lifestyle',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a surgeon with full body medical scrubs, stethoscope, hospital background with medical equipment, operating room, monitors, medical instruments and complete hospital environment. Show complete full body transformation in medical facility setting. 4K cinematic quality, photorealistic, professional and caring expression, medical photography style, clean hospital lighting. Keep face 100% identical to original.'
  },
  {
    id: 'teacher-professor',
    name: 'University Professor',
    description: 'Academic scholar and educator',
    category: 'lifestyle',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a university professor with full body academic attire, library or classroom background with bookshelves, desk, blackboard, books, academic materials and complete educational environment. Show complete full body transformation in academic setting. 4K cinematic quality, photorealistic, wise and intellectual expression, academic photography style, scholarly lighting. Keep face 100% identical to original.'
  },

  // Arya Collection - Photos with Arya - Business Formal
  {
    id: 'photo-with-arya-formal',
    name: 'Photo with Arya - Business Formal',
    description: 'Professional business attire with Arya',
    category: 'arya',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Create a full body photo showing this person in professional business formal attire (suit, blazer, or formal shirt) posing alongside Arya as a real-life human-sized character. POSITIONING: Position them standing shoulder-to-shoulder with NO GAP between them - they should be touching shoulders and standing very close together like close friends posing for a photo with warm, friendly smiles and relaxed body language. Use the provided Arya image exactly as reference for Arya\'s appearance - do not modify Arya\'s look, clothing, or design at all. Scale Arya to normal human proportions (similar height to the person) so they appear as two people standing together intimately. Background should be an elegant Indian tech/fintech product launch event with modern stage setup, professional lighting, elegant backdrop, and sophisticated event ambiance - NO TEXT, BANNERS, OR WRITING visible anywhere in the background. Clean, upscale launch event environment with contemporary Indian corporate event styling. Both individuals should appear as normal human-sized people at a high-end product launch event in India, positioned very close together with no space between them, displaying friendly and approachable expressions. 4K ultra-high resolution, photorealistic, event photography style, professional lighting. Keep the person\'s face 100% identical to original and keep Arya\'s design exactly as shown in the reference image but scaled to human size.',
    requiresAryaImage: true
  },

  // Arya Collection - Photos with Arya - Smart Casual
  {
    id: 'photo-with-arya-casual',
    name: 'Photo with Arya - Smart Casual',
    description: 'Smart casual outfit with Arya',
    category: 'arya',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Create a full body photo showing this person in smart casual attire (polo shirt, casual blazer, or neat shirt with trousers) posing alongside Arya as a real-life human-sized character. POSITIONING: Position them standing shoulder-to-shoulder with NO GAP between them - they should be touching shoulders and standing very close together like close friends posing for a photo with warm, friendly smiles and relaxed body language. Use the provided Arya image exactly as reference for Arya\'s appearance - do not modify Arya\'s look, clothing, or design at all. Scale Arya to normal human proportions (similar height to the person) so they appear as two people standing together intimately. Background should be an elegant Indian tech/fintech product launch event with modern stage setup, professional lighting, elegant backdrop, and sophisticated event ambiance - NO TEXT, BANNERS, OR WRITING visible anywhere in the background. Clean, upscale launch event environment with contemporary Indian corporate event styling. Both individuals should appear as normal human-sized people at a high-end product launch event in India, positioned very close together with no space between them, displaying friendly and approachable expressions. 4K ultra-high resolution, photorealistic, event photography style, natural lighting. Keep the person\'s face 100% identical to original and keep Arya\'s design exactly as shown in the reference image but scaled to human size.',
    requiresAryaImage: true
  },

  // Arya Collection - Photos with Arya - Traditional Indian
  {
    id: 'photo-with-arya-traditional',
    name: 'Photo with Arya - Traditional Indian',
    description: 'Traditional Indian attire with Arya',
    category: 'arya',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Create a full body photo showing this person in elegant traditional Indian attire (kurta, sherwani, or traditional shirt with appropriate bottoms) posing alongside Arya as a real-life human-sized character. POSITIONING: Position them standing shoulder-to-shoulder with NO GAP between them - they should be touching shoulders and standing very close together like close friends posing for a photo with warm, friendly smiles and relaxed body language. Use the provided Arya image exactly as reference for Arya\'s appearance - do not modify Arya\'s look, clothing, or design at all. Scale Arya to normal human proportions (similar height to the person) so they appear as two people standing together intimately. Background should be an elegant Indian tech/fintech product launch event with modern stage setup, professional lighting, elegant backdrop, and sophisticated event ambiance - NO TEXT, BANNERS, OR WRITING visible anywhere in the background. Clean, upscale launch event environment that blends modern and traditional Indian elements. Both individuals should appear as normal human-sized people at a high-end product launch event in India, positioned very close together with no space between them, displaying friendly and approachable expressions. 4K ultra-high resolution, photorealistic, event photography style, warm professional lighting. Keep the person\'s face 100% identical to original and keep Arya\'s design exactly as shown in the reference image but scaled to human size.',
    requiresAryaImage: true
  },

  // Arya Collection - Podcast Interview
  {
    id: 'photo-with-arya-podcast',
    name: 'Podcast Interview with Arya',
    description: 'Sitting interview setup with microphones',
    category: 'arya',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Create a photo showing this person and Arya sitting side by side in comfortable chairs for a podcast interview setup. POSITIONING: Position them sitting close together with professional microphones in front of both of them, displaying warm, friendly smiles and engaged conversation body language. Use the provided Arya image exactly as reference for Arya\'s appearance - do not modify Arya\'s look, clothing, or design at all. Scale Arya to normal human proportions (similar height to the person) so they appear as two people in an interview setting. Background should be an elegant Indian tech/fintech product launch event interview area with modern setup, professional lighting, elegant backdrop, and sophisticated event ambiance - NO TEXT, BANNERS, OR WRITING visible anywhere in the background. Clean, upscale podcast interview setup at a high-end product launch event in India. Both individuals should appear as normal human-sized people sitting comfortably in an interview setting, displaying friendly and engaging expressions as if having a great conversation. Include professional podcast microphones, headphones on a table, and modern interview setup elements. 4K ultra-high resolution, photorealistic, interview photography style, warm professional lighting. Keep the person\'s face 100% identical to original and keep Arya\'s design exactly as shown in the reference image but scaled to human size.',
    requiresAryaImage: true
  },

  // Arya Collection - T-shirt Photos
  {
    id: 'arya-tshirt',
    name: 'Arya T-shirt Photo',
    description: 'Wear the official Arya branded T-shirt',
    category: 'arya',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person to be wearing the exact T-shirt shown in the reference image. Use the provided T-shirt image as the exact reference for the T-shirt design, colors, and branding - replicate it perfectly on the person. Background should be an elegant Indian tech/fintech product launch event with modern stage setup, professional lighting, elegant backdrop, and sophisticated event ambiance - NO TEXT, BANNERS, OR WRITING visible anywhere in the background. Clean, upscale launch event environment with contemporary Indian corporate event styling. Show complete full body view with the person wearing the exact branded T-shirt from the reference image in a natural, confident pose with friendly expression. 4K ultra-high resolution, photorealistic, event photography style, natural lighting. Keep the person\'s face 100% identical to original and make them wear the exact T-shirt from the reference image.',
    requiresTshirtImage: true
  }
];

// Category definitions for better UX
export const CATEGORY_INFO = {
  professional: {
    name: 'Professional',
    description: 'Business and career-focused portraits',
    icon: '💼'
  },
  superhero: {
    name: 'Superhero',
    description: 'Heroic characters with superpowers',
    icon: '🦸'
  },
  fantasy: {
    name: 'Fantasy',
    description: 'Magical and mythical characters',
    icon: '🧙'
  },
  classic: {
    name: 'Classic',
    description: 'Historical and timeless characters',
    icon: '🎭'
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary and lifestyle characters',
    icon: '🎸'
  },
  lifestyle: {
    name: 'Lifestyle & Career',
    description: 'Professional careers and lifestyle portraits',
    icon: '👔'
  },
  arya: {
    name: 'Arya Collection',
    description: 'Photos with Arya, our AI mascot',
    icon: '🤖'
  }
};

// Arya setup images for preloaded backgrounds
export const ARYA_SETUP_IMAGES = [
  { id: 'arya-setup-1', name: 'Office Setup', image: '/arya-photos/different-setups/arya-setup-1.jpeg' },
  { id: 'arya-setup-2', name: 'Conference Room', image: '/arya-photos/different-setups/arya-setup-2.jpeg' },
  { id: 'arya-setup-3', name: 'Tech Lab', image: '/arya-photos/different-setups/arya-setup-3.jpeg' },
  { id: 'arya-setup-4', name: 'Innovation Hub', image: '/arya-photos/different-setups/arya-setup-4.jpeg' },
  { id: 'arya-setup-5', name: 'Modern Workspace', image: '/arya-photos/different-setups/arya-setup-5.jpeg' },
  { id: 'arya-setup-6', name: 'Event Stage', image: '/arya-photos/different-setups/arya-setup-6.jpeg' },
  { id: 'arya-setup-7', name: 'Exhibition Hall', image: '/arya-photos/different-setups/arya-setup-7.jpeg' },
  { id: 'arya-setup-8', name: 'Presentation Room', image: '/arya-photos/different-setups/arya-setup-8.jpeg' },
  { id: 'arya-setup-9', name: 'Networking Area', image: '/arya-photos/different-setups/arya-setup-9.jpeg' },
  { id: 'arya-setup-10', name: 'Demo Station', image: '/arya-photos/different-setups/arya-setup-10.jpeg' },
  { id: 'arya-setup-11', name: 'Meeting Space', image: '/arya-photos/different-setups/arya-setup-11.jpeg' },
  { id: 'arya-setup-12', name: 'Creative Corner', image: '/arya-photos/different-setups/arya-setup-12.jpeg' },
  { id: 'arya-setup-13', name: 'Tech Showcase', image: '/arya-photos/different-setups/arya-setup-13.jpeg' },
  { id: 'arya-setup-14', name: 'Innovation Center', image: '/arya-photos/different-setups/arya-setup-14.jpeg' },
  { id: 'arya-setup-15', name: 'Digital Lounge', image: '/arya-photos/different-setups/arya-setup-15.jpeg' },
  { id: 'arya-setup-16', name: 'AI Lab', image: '/arya-photos/different-setups/arya-setup-16.jpeg' },
  { id: 'arya-setup-17', name: 'Future Zone', image: '/arya-photos/different-setups/arya-setup-17.jpeg' },
  { id: 'arya-setup-18', name: 'Smart Office', image: '/arya-photos/different-setups/arya-setup-18.jpeg' },
  { id: 'arya-setup-19', name: 'Tech Hub', image: '/arya-photos/different-setups/arya-setup-19.jpeg' },
  { id: 'arya-setup-20', name: 'Innovation Studio', image: '/arya-photos/different-setups/arya-setup-20.jpeg' }
];
