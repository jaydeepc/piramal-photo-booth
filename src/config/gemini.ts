export const GEMINI_CONFIG = {
  API_KEY: 'AIzaSyDaFkYid0S_1AD6ReRHV5SYMd1JPvHqX-s',
  MODEL_NAME: 'gemini-2.5-flash-image-preview',
  PROJECT_ID: process.env.REACT_APP_GOOGLE_CLOUD_PROJECT || '',
  LOCATION: process.env.REACT_APP_GOOGLE_CLOUD_LOCATION || 'us-central1'
};

export const TRANSFORMATION_OPTIONS = [
  // Superhero Collection
  {
    id: 'superhero-classic',
    name: 'Classic Superhero',
    description: 'Iconic superhero with cape and emblem',
    category: 'superhero',
    prompt: 'Transform this person into a classic superhero with a vibrant costume, flowing cape, heroic emblem on chest, dramatic lighting with cinematic effects, epic cityscape background at sunset, 4K ultra-high resolution, photorealistic, dynamic pose, wind-blown cape, lens flares, volumetric lighting, HDR photography style'
  },
  {
    id: 'superhero-dark',
    name: 'Dark Knight',
    description: 'Brooding vigilante superhero',
    category: 'superhero',
    prompt: 'Transform this person into a dark vigilante superhero with tactical armor, utility belt, dramatic shadows, moody Gotham-style cityscape background at night, rain effects, neon reflections, 4K cinematic quality, photorealistic, intense expression, atmospheric fog, dramatic backlighting, noir photography style'
  },
  {
    id: 'superhero-cosmic',
    name: 'Cosmic Guardian',
    description: 'Space-powered cosmic superhero',
    category: 'superhero',
    prompt: 'Transform this person into a cosmic superhero with glowing energy effects, stellar costume with galaxy patterns, floating in space with nebula background, cosmic energy aura, 4K ultra-high resolution, photorealistic, dramatic pose, particle effects, lens flares, deep space cinematography, ethereal lighting'
  },
  
  // Fantasy Collection
  {
    id: 'wizard',
    name: 'Arcane Wizard',
    description: 'Powerful magical spellcaster',
    category: 'fantasy',
    prompt: 'Transform this person into a powerful wizard with ornate robes, magical staff, glowing runes, mystical forest background with floating magical particles, ethereal lighting, 4K cinematic quality, photorealistic, dramatic pose, spell effects, volumetric fog, fantasy movie cinematography'
  },
  {
    id: 'warrior-princess',
    name: 'Warrior Princess',
    description: 'Fierce royal warrior',
    category: 'fantasy',
    prompt: 'Transform this person into a warrior princess with elegant armor, royal crown, enchanted sword, majestic castle background, golden hour lighting, 4K ultra-high resolution, photorealistic, heroic pose, flowing hair, cinematic depth of field, epic fantasy cinematography'
  },
  {
    id: 'dragon-rider',
    name: 'Dragon Rider',
    description: 'Legendary dragon companion',
    category: 'fantasy',
    prompt: 'Transform this person into a dragon rider with leather armor, dragon-scale accessories, majestic dragon in background, mountain peaks and clouds, dramatic sky, 4K cinematic quality, photorealistic, wind effects, epic scale, volumetric lighting, fantasy adventure cinematography'
  },
  
  // Sci-Fi Collection
  {
    id: 'cyberpunk-hacker',
    name: 'Cyberpunk Hacker',
    description: 'Futuristic cyber warrior',
    category: 'sci-fi',
    prompt: 'Transform this person into a cyberpunk hacker with neon-lit cybernetic implants, futuristic clothing, holographic displays, dystopian city background with neon signs, rain effects, 4K ultra-high resolution, photorealistic, dramatic lighting, lens flares, blade runner cinematography style'
  },
  {
    id: 'space-marine',
    name: 'Space Marine',
    description: 'Elite galactic soldier',
    category: 'sci-fi',
    prompt: 'Transform this person into a space marine with advanced power armor, futuristic weapons, alien planet background with multiple moons, atmospheric effects, 4K cinematic quality, photorealistic, heroic pose, particle effects, sci-fi movie lighting, epic scale'
  },
  {
    id: 'time-traveler',
    name: 'Time Traveler',
    description: 'Interdimensional explorer',
    category: 'sci-fi',
    prompt: 'Transform this person into a time traveler with steampunk-futuristic outfit, temporal energy effects, swirling time vortex background, multiple reality fragments, 4K ultra-high resolution, photorealistic, dynamic pose, energy particles, cinematic lighting, sci-fi adventure style'
  },
  
  // Classic Collection
  {
    id: 'pirate-captain',
    name: 'Pirate Captain',
    description: 'Legendary sea captain',
    category: 'classic',
    prompt: 'Transform this person into a pirate captain with ornate coat, tricorn hat, cutlass, ship deck background with stormy seas, dramatic lighting, 4K cinematic quality, photorealistic, wind effects, ocean spray, adventure movie cinematography, golden hour lighting'
  },
  {
    id: 'royal-monarch',
    name: 'Royal Monarch',
    description: 'Majestic ruler with crown',
    category: 'classic',
    prompt: 'Transform this person into a royal monarch with elaborate crown, royal robes, throne room background with ornate architecture, regal lighting, 4K ultra-high resolution, photorealistic, dignified pose, rich textures, cinematic depth of field, period drama cinematography'
  },
  {
    id: 'steampunk-inventor',
    name: 'Steampunk Inventor',
    description: 'Victorian-era mad scientist',
    category: 'classic',
    prompt: 'Transform this person into a steampunk inventor with brass goggles, leather apron, mechanical gadgets, Victorian workshop background with steam and gears, warm lighting, 4K cinematic quality, photorealistic, intricate details, atmospheric effects, steampunk movie style'
  },
  
  // Modern Collection
  {
    id: 'secret-agent',
    name: 'Secret Agent',
    description: 'Elite international spy',
    category: 'modern',
    prompt: 'Transform this person into a secret agent with sleek suit, high-tech gadgets, luxury casino background, dramatic lighting, 4K ultra-high resolution, photorealistic, confident pose, lens flares, spy movie cinematography, sophisticated atmosphere'
  },
  {
    id: 'rockstar',
    name: 'Rock Star',
    description: 'Legendary music performer',
    category: 'modern',
    prompt: 'Transform this person into a rock star with leather outfit, electric guitar, concert stage background with spotlights and crowd, dynamic lighting, 4K cinematic quality, photorealistic, energetic pose, stage effects, concert photography style, dramatic shadows'
  },
  {
    id: 'film-noir-detective',
    name: 'Film Noir Detective',
    description: 'Classic 1940s investigator',
    category: 'modern',
    prompt: 'Transform this person into a film noir detective with trench coat, fedora hat, cigarette smoke, rainy city street background at night, dramatic shadows, 4K ultra-high resolution, photorealistic, moody lighting, black and white with color accents, classic cinema style'
  },
  
  // Professional Collection
  {
    id: 'linkedin-photo',
    name: 'LinkedIn Photo',
    description: 'Professional headshot for career',
    category: 'professional',
    prompt: 'Transform this person into a professional LinkedIn headshot with business attire, confident smile, clean corporate background, professional studio lighting, 4K ultra-high resolution, photorealistic, approachable expression, corporate photography style, sharp focus, professional color grading'
  },
  {
    id: 'studio-photo-black',
    name: 'Studio Photo - Black Background',
    description: 'Elegant studio portrait with black backdrop',
    category: 'professional',
    prompt: 'Transform this person into an elegant studio portrait with pure black background, dramatic studio lighting, professional attire, sophisticated pose, 4K ultra-high resolution, photorealistic, high contrast lighting, fashion photography style, sharp details, professional color grading'
  },
  {
    id: 'studio-photo-white',
    name: 'Studio Photo - White Background',
    description: 'Bright studio portrait with dramatic lights',
    category: 'professional',
    prompt: 'Transform this person into a bright studio portrait with pure white background, dramatic studio lighting with multiple light sources, professional attire, confident pose, 4K ultra-high resolution, photorealistic, high-key lighting, fashion photography style, crisp details, professional color grading, dramatic shadows and highlights'
  }
];
