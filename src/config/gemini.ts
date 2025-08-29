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
  }
};
