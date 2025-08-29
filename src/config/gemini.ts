export const GEMINI_CONFIG = {
  API_KEY: 'AIzaSyDaFkYid0S_1AD6ReRHV5SYMd1JPvHqX-s',
  MODEL_NAME: 'gemini-2.5-flash-image-preview',
  PROJECT_ID: process.env.REACT_APP_GOOGLE_CLOUD_PROJECT || '',
  LOCATION: process.env.REACT_APP_GOOGLE_CLOUD_LOCATION || 'us-central1'
};

export const TRANSFORMATION_OPTIONS = [
  {
    id: 'farmer',
    name: 'Farmer',
    description: 'Transform into a hardworking farmer',
    prompt: 'Transform this person into a farmer wearing overalls and a straw hat in a countryside setting'
  },
  {
    id: 'astronaut',
    name: 'Astronaut',
    description: 'Become a space explorer',
    prompt: 'Transform this person into an astronaut in a space suit with a helmet in a space setting'
  },
  {
    id: 'supervillain',
    name: 'Supervillain',
    description: 'Become a powerful supervillain',
    prompt: 'Transform this person into a dramatic supervillain with a dark costume and cape'
  },
  {
    id: 'filmstar',
    name: 'Film Star',
    description: 'Glamorous movie star',
    prompt: 'Transform this person into a glamorous film star in elegant attire on a red carpet'
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    description: 'Animated cartoon version',
    prompt: 'Transform this person into a colorful animated cartoon character with exaggerated features'
  },
  {
    id: 'elderly',
    name: '70 Year Old',
    description: 'See yourself in the future',
    prompt: 'Transform this person to look 70 years old with aged features, gray hair, and wrinkles'
  }
];
