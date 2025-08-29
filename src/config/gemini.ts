export const GEMINI_CONFIG = {
  API_KEY: process.env.REACT_APP_GEMINI_API_KEY || '',
  MODEL_NAME: process.env.REACT_APP_GEMINI_MODEL_NAME || 'gemini-2.5-flash-image-preview',
  PROJECT_ID: process.env.REACT_APP_GOOGLE_CLOUD_PROJECT || '',
  LOCATION: process.env.REACT_APP_GOOGLE_CLOUD_LOCATION || 'us-central1'
};

export const TRANSFORMATION_OPTIONS = [
  // Professional Collection
  {
    id: 'linkedin-photo',
    name: 'LinkedIn Photo',
    description: 'Professional headshot for career',
    category: 'professional',
    prompt: 'Create a professional LinkedIn headshot while preserving the person\'s exact facial features, skin tone, and bone structure. Only change: business attire (suit or professional shirt), clean corporate background, professional studio lighting, confident and approachable expression. Keep the person\'s face completely unchanged. 4K ultra-high resolution, photorealistic, corporate photography style, sharp focus, professional color grading'
  },
  {
    id: 'studio-photo-black',
    name: 'Studio Photo - Black Background',
    description: 'Elegant studio portrait with black backdrop',
    category: 'professional',
    prompt: 'Create an elegant studio portrait while preserving the person\'s exact facial features, skin tone, and bone structure. Only change: professional attire, pure black background, dramatic studio lighting setup. Keep the person\'s face completely unchanged. 4K ultra-high resolution, photorealistic, high contrast lighting, fashion photography style, sharp details, professional color grading'
  },
  {
    id: 'studio-photo-white',
    name: 'Studio Photo - White Background',
    description: 'Bright studio portrait with dramatic lights',
    category: 'professional',
    prompt: 'Create a bright studio portrait while preserving the person\'s exact facial features, skin tone, and bone structure. Only change: professional attire, pure white background, dramatic studio lighting with multiple light sources. Keep the person\'s face completely unchanged. 4K ultra-high resolution, photorealistic, high-key lighting, fashion photography style, crisp details, professional color grading'
  },

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
  {
    id: 'super-villain',
    name: 'Super Villain',
    description: 'Menacing arch-nemesis',
    category: 'superhero',
    prompt: 'Transform this person into a menacing super villain with dark armor, evil cape, sinister expression, lightning effects, dark fortress background, stormy sky, 4K ultra-high resolution, photorealistic, dramatic pose, red glowing eyes, dark energy effects, villain movie cinematography'
  },

  // Action & Adventure Collection
  {
    id: 'alien-fighter',
    name: 'Alien Fighter',
    description: 'Warrior battling extraterrestrial forces',
    category: 'action',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into an alien fighter in dynamic combat pose with futuristic weapons, battle armor, actively fighting alien creatures in background, alien planet landscape, energy blasts and explosions, 4K ultra-high resolution, photorealistic, intense action pose mid-battle, sci-fi battle effects, epic scale, cinematic lighting. Keep face 100% identical to original.'
  },
  {
    id: 'monster-hunter',
    name: 'Monster Hunter',
    description: 'Brave hunter facing mythical beasts',
    category: 'action',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a monster hunter with enchanted weapons, leather armor, actively battling giant monsters in background, dark forest setting, magical effects, 4K cinematic quality, photorealistic, heroic battle stance mid-fight, fantasy creature effects, dramatic lighting, adventure movie style. Keep face 100% identical to original.'
  },
  {
    id: 'zombie-survivor',
    name: 'Zombie Survivor',
    description: 'Post-apocalyptic survivor',
    category: 'action',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a zombie apocalypse survivor with tactical gear, weapons, fighting zombies in ruined city background, dramatic lighting, 4K ultra-high resolution, photorealistic, determined expression in combat, post-apocalyptic atmosphere, survival movie cinematography, gritty effects. Keep face 100% identical to original.'
  },
  {
    id: 'ninja-warrior',
    name: 'Ninja Warrior',
    description: 'Stealthy martial arts master',
    category: 'action',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a ninja warrior with traditional black outfit, katana swords, rooftop background at night, moonlight, 4K cinematic quality, photorealistic, dynamic fighting pose in mid-combat, shadow effects, martial arts movie style, atmospheric fog. Keep face 100% identical to original.'
  },
  {
    id: 'villain-fighter',
    name: 'Villain Fighter',
    description: 'Hero battling evil villains',
    category: 'action',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a hero fighting villains in dynamic combat pose, heroic costume, actively battling masked villains in urban setting, explosions and action effects, 4K ultra-high resolution, photorealistic, intense action scene mid-fight, superhero movie cinematography, dramatic lighting. Keep face 100% identical to original.'
  },
  {
    id: 'space-warrior',
    name: 'Space Warrior',
    description: 'Galactic fighter in space battle',
    category: 'action',
    prompt: 'CRITICAL: Preserve the person\'s exact facial features, skin tone, eye color, nose shape, and bone structure completely unchanged. Transform this person into a space warrior in zero gravity combat, futuristic armor, fighting in space with laser weapons, starship battle background, energy effects, 4K ultra-high resolution, photorealistic, dynamic floating combat pose, sci-fi action cinematography, cosmic lighting. Keep face 100% identical to original.'
  },

  // Cultural & Traditional Collection
  {
    id: 'indian-farmer',
    name: 'Indian Farmer',
    description: 'Traditional Indian agricultural worker',
    category: 'cultural',
    prompt: 'Transform this person into a traditional Indian farmer with authentic rural clothing, turban, farming tools, lush green fields background, golden hour lighting, 4K ultra-high resolution, photorealistic, dignified pose, cultural authenticity, documentary photography style, warm natural lighting'
  },
  {
    id: 'samurai-warrior',
    name: 'Samurai Warrior',
    description: 'Honorable Japanese warrior',
    category: 'cultural',
    prompt: 'Transform this person into a samurai warrior with traditional armor, katana sword, cherry blossom background, ancient Japanese temple, 4K cinematic quality, photorealistic, honorable stance, cultural details, period drama cinematography, dramatic lighting'
  },
  {
    id: 'viking-berserker',
    name: 'Viking Berserker',
    description: 'Fierce Norse warrior',
    category: 'cultural',
    prompt: 'Transform this person into a Viking berserker with fur armor, battle axe, longship background, stormy seas, 4K ultra-high resolution, photorealistic, fierce expression, Nordic atmosphere, epic movie cinematography, dramatic weather effects'
  },
  {
    id: 'egyptian-pharaoh',
    name: 'Egyptian Pharaoh',
    description: 'Ancient Egyptian ruler',
    category: 'cultural',
    prompt: 'Transform this person into an Egyptian pharaoh with golden headdress, royal robes, pyramid background, desert landscape, 4K cinematic quality, photorealistic, regal pose, ancient Egyptian aesthetics, golden hour lighting, historical epic style'
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
  {
    id: 'elven-archer',
    name: 'Elven Archer',
    description: 'Graceful forest guardian',
    category: 'fantasy',
    prompt: 'Transform this person into an elven archer with elegant bow, forest armor, pointed ears, enchanted forest background, magical lighting, 4K ultra-high resolution, photorealistic, graceful pose, nature magic effects, fantasy movie style, ethereal atmosphere'
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
  {
    id: 'robot-pilot',
    name: 'Mech Pilot',
    description: 'Giant robot operator',
    category: 'sci-fi',
    prompt: 'Transform this person into a mech pilot with high-tech suit, neural interface, giant robot in background, futuristic battlefield, 4K cinematic quality, photorealistic, determined expression, sci-fi battle effects, mecha anime style, dramatic lighting'
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
  {
    id: 'wild-west-gunslinger',
    name: 'Wild West Gunslinger',
    description: 'Frontier cowboy hero',
    category: 'classic',
    prompt: 'Transform this person into a Wild West gunslinger with cowboy hat, leather vest, revolvers, desert town background, sunset lighting, 4K ultra-high resolution, photorealistic, confident stance, western movie cinematography, dust effects, dramatic shadows'
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
  {
    id: 'race-car-driver',
    name: 'Race Car Driver',
    description: 'Professional racing champion',
    category: 'modern',
    prompt: 'Transform this person into a race car driver with racing suit, helmet, race car background, speedway track, 4K cinematic quality, photorealistic, determined expression, speed effects, motorsport photography style, dynamic lighting'
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
  action: {
    name: 'Action & Adventure',
    description: 'Dynamic action and combat scenes',
    icon: '⚔️'
  },
  cultural: {
    name: 'Cultural & Traditional',
    description: 'Traditional and cultural characters',
    icon: '🌍'
  },
  fantasy: {
    name: 'Fantasy',
    description: 'Magical and mythical characters',
    icon: '🧙'
  },
  'sci-fi': {
    name: 'Sci-Fi',
    description: 'Futuristic and space-age characters',
    icon: '🚀'
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
  }
};
