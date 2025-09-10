import React, { useState, useCallback } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import LandingPage from './components/LandingPage';
import CameraCapture from './components/CameraCapture';
import TransformationOptions from './components/TransformationOptions';
import ImagePreview from './components/ImagePreview';
import geminiService from './services/geminiService';
import { TRANSFORMATION_OPTIONS } from './config/gemini';
import { Sparkles, Camera, Image as ImageIcon } from 'lucide-react';

const GlobalStyle = createGlobalStyle`
  :root {
    /* Piramal Brand Colors */
    --piramal-orange: #F26841;
    --piramal-blue: #2B4054;
    --piramal-green: #088B4C;
    --piramal-yellow: #FFBD07;
    --piramal-background: #FCFCFC;
    
    /* Extended Color Palette */
    --primary: var(--piramal-orange);
    --primary-light: #F58A6A;
    --primary-dark: #E04A1F;
    --secondary: var(--piramal-blue);
    --secondary-light: #3A5470;
    --secondary-dark: #1C2B3A;
    --accent: var(--piramal-green);
    --accent-light: #2AA366;
    --accent-dark: #066B39;
    --warning: var(--piramal-yellow);
    --warning-light: #FFD040;
    --warning-dark: #E6A600;
    
    /* Neutral Colors */
    --white: #FFFFFF;
    --background: var(--piramal-background);
    --background-secondary: #F8F9FA;
    --background-tertiary: #F1F3F5;
    --surface: rgba(255, 255, 255, 0.95);
    --surface-elevated: rgba(255, 255, 255, 0.98);
    --border: rgba(43, 64, 84, 0.12);
    --border-light: rgba(43, 64, 84, 0.08);
    
    /* Text Colors */
    --text-primary: var(--piramal-blue);
    --text-secondary: #6C757D;
    --text-muted: #ADB5BD;
    --text-inverse: var(--white);
    
    /* Shadows */
    --shadow-sm: 0 2px 4px rgba(43, 64, 84, 0.08);
    --shadow-md: 0 4px 12px rgba(43, 64, 84, 0.12);
    --shadow-lg: 0 8px 24px rgba(43, 64, 84, 0.16);
    --shadow-xl: 0 16px 48px rgba(43, 64, 84, 0.20);
    --shadow-primary: 0 8px 24px rgba(242, 104, 65, 0.24);
    --shadow-accent: 0 8px 24px rgba(8, 139, 76, 0.24);
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    --gradient-secondary: linear-gradient(135deg, var(--secondary) 0%, var(--secondary-light) 100%);
    --gradient-accent: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
    --gradient-surface: linear-gradient(135deg, var(--surface) 0%, var(--background) 100%);
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--background);
    min-height: 100vh;
    color: var(--text-primary);
    line-height: 1.6;
  }

  html, body {
    overflow-x: hidden;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Professional Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    color: var(--text-primary);
    margin: 0;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  h5 { font-size: 1.125rem; }
  h6 { font-size: 1rem; }

  p {
    margin: 0;
    color: var(--text-secondary);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--text-muted);
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background: var(--background);
`;

const BackgroundPattern = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.03;
  background-image: 
    radial-gradient(circle at 25% 25%, var(--primary) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, var(--secondary) 0%, transparent 50%);
  background-size: 800px 800px;
  background-position: 0 0, 400px 400px;
`;

const BrandHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--surface-elevated);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-light);
  padding: 16px 0;
  box-shadow: var(--shadow-sm);
`;

const BrandContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BrandLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LogoImg = styled.img`
  height: 36px;
  width: auto;
  
  @media (min-width: 768px) {
    height: 40px;
  }
`;

const BrandTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const BrandRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const AIBadge = styled.span`
  background: var(--gradient-accent);
  color: var(--white);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  
  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 48px;
  padding: 24px;
  background: var(--surface);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
  
  @media (max-width: 768px) {
    gap: 16px;
    padding: 20px 16px;
    margin-bottom: 32px;
    overflow-x: auto;
    justify-content: flex-start;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 16px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 0.875rem;
  }
  
  ${props => props.$completed ? `
    background: var(--gradient-primary);
    color: var(--white);
    box-shadow: var(--shadow-primary);
    transform: translateY(-2px);
  ` : props.$active ? `
    background: var(--surface-elevated);
    border: 2px solid var(--primary);
    color: var(--primary);
    box-shadow: var(--shadow-md);
  ` : `
    background: var(--background-secondary);
    color: var(--text-muted);
    border: 1px solid var(--border-light);
  `}
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
  }
`;

const StepConnector = styled.div<{ $completed: boolean }>`
  width: 48px;
  height: 3px;
  border-radius: 2px;
  background: ${props => props.$completed 
    ? 'var(--gradient-primary)' 
    : 'var(--border)'};
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 32px;
    height: 2px;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.2);
  border-radius: 12px;
  padding: 20px;
  margin: 24px auto;
  max-width: 600px;
  text-align: center;
  color: #dc3545;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const ContentCard = styled.div`
  background: var(--surface);
  border-radius: 24px;
  padding: 32px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  
  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 20px;
  }
`;

type AppStep = 'camera' | 'selection' | 'preview';

interface AppState {
  currentStep: AppStep;
  originalImage: string | null;
  originalImageFile: File | null;
  selectedTransformation: string | null;
  transformedImages: string[];
  selectedImageIndex: number;
  isProcessing: boolean;
  error: string | null;
  userHeight: string | null;
}

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [state, setState] = useState<AppState>({
    currentStep: 'camera',
    originalImage: null,
    originalImageFile: null,
    selectedTransformation: null,
    transformedImages: [],
    selectedImageIndex: 0,
    isProcessing: false,
    error: null,
    userHeight: null
  });

  const handleEnterApp = useCallback(() => {
    setShowLanding(false);
  }, []);

  const handlePhotoCapture = useCallback((imageSrc: string, imageFile: File) => {
    setState(prev => ({
      ...prev,
      originalImage: imageSrc,
      originalImageFile: imageFile,
      userHeight: null,
      currentStep: 'selection',
      error: null
    }));
  }, []);

  const handleTransformationSelect = useCallback(async (transformationId: string) => {
    const transformation = TRANSFORMATION_OPTIONS.find(opt => opt.id === transformationId);
    if (!transformation || !state.originalImageFile) return;

      setState(prev => ({
        ...prev,
        selectedTransformation: transformationId,
        currentStep: 'preview',
        isProcessing: true,
        error: null,
        transformedImages: [],
        selectedImageIndex: 0
      }));

    try {
      // Determine reference image URL based on transformation type
      let referenceImageUrl: string | undefined;
      
      if (transformation.requiresAryaImage) {
        referenceImageUrl = '/arya-photos/photo-with-arya/Arya.png';
      } else if (transformation.requiresTshirtImage) {
        referenceImageUrl = '/arya-photos/tshirt/arya-tshirt.jpeg';
      }

      const transformedImages = await geminiService.transformImage(
        state.originalImageFile,
        transformation.prompt,
        referenceImageUrl,
        undefined
      );

      if (transformedImages.length > 0) {
        setState(prev => ({
          ...prev,
          transformedImages: transformedImages,
          selectedImageIndex: 0,
          isProcessing: false
        }));
      } else {
        throw new Error('No transformed image received');
      }
    } catch (error) {
      console.error('Transformation error:', error);
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Failed to transform image'
      }));
    }
  }, [state.originalImageFile]);

  const handleRetake = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: 'camera',
      error: null
    }));
  }, []);

  const handleTryAnotherStyle = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: 'selection',
      selectedTransformation: null,
      transformedImages: [],
      selectedImageIndex: 0,
      isProcessing: false,
      error: null
    }));
  }, []);

  const handleStartOver = useCallback(() => {
    setState({
      currentStep: 'camera',
      originalImage: null,
      originalImageFile: null,
      selectedTransformation: null,
      transformedImages: [],
      selectedImageIndex: 0,
      isProcessing: false,
      error: null,
      userHeight: null
    });
  }, []);

  const handleRegenerate = useCallback(async () => {
    if (!state.selectedTransformation || !state.originalImageFile) return;

    const transformation = TRANSFORMATION_OPTIONS.find(opt => opt.id === state.selectedTransformation);
    if (!transformation) return;

    setState(prev => ({
      ...prev,
      isProcessing: true,
      error: null,
      transformedImages: [],
      selectedImageIndex: 0
    }));

    try {
      // Determine reference image URL based on transformation type
      let referenceImageUrl: string | undefined;
      
      if (transformation.requiresAryaImage) {
        referenceImageUrl = '/arya-photos/photo-with-arya/Arya.png';
      } else if (transformation.requiresTshirtImage) {
        referenceImageUrl = '/arya-photos/tshirt/arya-tshirt.jpeg';
      }

      const transformedImages = await geminiService.transformImage(
        state.originalImageFile,
        transformation.prompt,
        referenceImageUrl,
        undefined
      );

      if (transformedImages.length > 0) {
        setState(prev => ({
          ...prev,
          transformedImages: transformedImages,
          selectedImageIndex: 0,
          isProcessing: false
        }));
      } else {
        throw new Error('No transformed image received');
      }
    } catch (error) {
      console.error('Regeneration error:', error);
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Failed to regenerate image'
      }));
    }
  }, [state.selectedTransformation, state.originalImageFile]);

  const handleImageSelect = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      selectedImageIndex: index
    }));
  }, []);

  const getSelectedTransformationName = () => {
    if (!state.selectedTransformation) return '';
    const option = TRANSFORMATION_OPTIONS.find(opt => opt.id === state.selectedTransformation);
    return option?.name || '';
  };

  const renderStepIndicator = () => (
    <StepIndicator>
      <Step 
        $active={state.currentStep === 'camera'} 
        $completed={state.originalImage !== null}
      >
        <Camera size={20} />
        Capture Photo
      </Step>
      <StepConnector $completed={state.originalImage !== null} />
      <Step 
        $active={state.currentStep === 'selection'} 
        $completed={state.selectedTransformation !== null}
      >
        <Sparkles size={20} />
        Select Style
      </Step>
      <StepConnector $completed={state.selectedTransformation !== null} />
      <Step 
        $active={state.currentStep === 'preview'} 
        $completed={state.transformedImages.length > 0}
      >
        <ImageIcon size={20} />
        Preview & Export
      </Step>
    </StepIndicator>
  );

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 'camera':
        return (
          <ContentCard>
            <CameraCapture onCapture={handlePhotoCapture} />
          </ContentCard>
        );
      
      case 'selection':
        return (
          <div>
            {state.originalImage && (
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <img 
                  src={state.originalImage} 
                  alt="Captured" 
                  style={{ 
                    maxWidth: '240px', 
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--border-light)'
                  }} 
                />
              </div>
            )}
            <ContentCard>
              <TransformationOptions
                selectedOption={state.selectedTransformation}
                onSelect={handleTransformationSelect}
              />
            </ContentCard>
          </div>
        );
      
      case 'preview':
        return state.originalImage ? (
          <ContentCard>
            <ImagePreview
              originalImage={state.originalImage}
              transformedImages={state.transformedImages}
              selectedImageIndex={state.selectedImageIndex}
              isLoading={state.isProcessing}
              error={state.error}
              transformationType={getSelectedTransformationName()}
              onRetake={handleRetake}
              onStartOver={handleStartOver}
              onRegenerate={handleRegenerate}
              onTryAnotherStyle={handleTryAnotherStyle}
              onImageSelect={handleImageSelect}
            />
          </ContentCard>
        ) : null;
      
      default:
        return null;
    }
  };

  if (showLanding) {
    return (
      <ThemeProvider theme={{}}>
        <GlobalStyle />
        <LandingPage onEnterApp={handleEnterApp} />
        <Analytics />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <AppContainer>
        <BackgroundPattern />
        <BrandHeader>
          <BrandContainer>
            <BrandLeft>
              <LogoImg src="/piramal-logo.svg" alt="Piramal" />
              <BrandTitle>AI Photo Studio</BrandTitle>
            </BrandLeft>
            <BrandRight>
              <AIBadge>AI Powered</AIBadge>
            </BrandRight>
          </BrandContainer>
        </BrandHeader>
        
        <MainContent>
          {renderStepIndicator()}
          {state.error && state.currentStep !== 'preview' && (
            <ErrorMessage>{state.error}</ErrorMessage>
          )}
          {renderCurrentStep()}
        </MainContent>
      </AppContainer>
      <Analytics />
    </ThemeProvider>
  );
};

export default App;
