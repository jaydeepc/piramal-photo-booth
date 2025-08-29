import React, { useState, useCallback } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import CameraCapture from './components/CameraCapture';
import TransformationOptions from './components/TransformationOptions';
import ImagePreview from './components/ImagePreview';
import geminiService from './services/geminiService';
import { TRANSFORMATION_OPTIONS } from './config/gemini';
import { Sparkles, Camera, Image as ImageIcon } from 'lucide-react';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #ff4d2e;
    --primary-2: #ff7a59;
    --text: #e6e9ef;
    --text-secondary: #b3b9c6;
    --text-muted: var(--text-secondary);
    --surface: rgba(255, 255, 255, 0.04);
    --surface-2: rgba(255, 255, 255, 0.08);
    --border: rgba(255, 255, 255, 0.12);
    --shadow-primary: 0 10px 30px rgba(255, 77, 46, 0.25);
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
    background: radial-gradient(1200px 600px at 20% 0%, #0f172a 0%, #0b1020 60%, #060912 100%);
    min-height: 100vh;
    color: var(--text);
  }

  html, body {
    overflow-x: hidden;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const BackgroundAnimation = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 60vw;
    height: 60vw;
    filter: blur(60px);
    opacity: 0.25;
    border-radius: 50%;
  }

  &::before {
    top: -10vw;
    left: -10vw;
    background: radial-gradient(circle at 30% 30%, rgba(255, 77, 46, 0.35), rgba(255, 77, 46, 0) 60%);
  }

  &::after {
    right: -10vw;
    bottom: -10vw;
    background: radial-gradient(circle at 70% 70%, rgba(255, 122, 89, 0.35), rgba(255, 122, 89, 0) 60%);
  }
`;

const BrandBar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  padding: calc(env(safe-area-inset-top) + 12px) 16px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(15, 15, 35, 0.9), rgba(15, 15, 35, 0.6));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const BrandInner = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BrandLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoImg = styled.img`
  height: 28px;
  width: auto;
  filter: brightness(0) invert(1);

  @media (min-width: 768px) {
    height: 32px;
  }
`;

const BrandRight = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
`;

const Header = styled.header`
  text-align: center;
  padding: 40px 20px;
  position: relative;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin: 0;
  background: linear-gradient(90deg, var(--primary), var(--primary-2));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 6s ease infinite;

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 10px 0 0 0;
  color: var(--text-secondary);
  font-weight: 300;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  padding: 12px 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 640px) {
    justify-content: flex-start;
    padding: 12px 10px;
    gap: 12px;
  }
`;

const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;

  @media (max-width: 640px) {
    padding: 8px 14px;
    font-size: 14px;
  }
  
  ${props => props.$completed ? `
    background: linear-gradient(45deg, var(--primary), var(--primary-2));
    color: #000;
    box-shadow: var(--shadow-primary);
  ` : props.$active ? `
    background: rgba(255, 255, 255, 0.06);
    border: 2px solid var(--primary);
    color: var(--primary);
    box-shadow: 0 0 20px rgba(255, 77, 46, 0.2);
  ` : `
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.6);
  `}
`;

const StepConnector = styled.div<{ $completed: boolean }>`
  width: 40px;
  height: 2px;
  background: ${props => props.$completed 
    ? 'linear-gradient(45deg, var(--primary), var(--primary-2))' 
    : 'rgba(255, 255, 255, 0.2)'};
  transition: all 0.3s ease;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid rgba(255, 68, 68, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
  color: #ff4444;
  font-weight: 500;
`;


type AppStep = 'camera' | 'selection' | 'preview';

interface AppState {
  currentStep: AppStep;
  originalImage: string | null;
  originalImageFile: File | null;
  selectedTransformation: string | null;
  transformedImage: string | null;
  isProcessing: boolean;
  error: string | null;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentStep: 'camera',
    originalImage: null,
    originalImageFile: null,
    selectedTransformation: null,
    transformedImage: null,
    isProcessing: false,
    error: null
  });

  const handlePhotoCapture = useCallback((imageSrc: string, imageFile: File) => {
    setState(prev => ({
      ...prev,
      originalImage: imageSrc,
      originalImageFile: imageFile,
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
      transformedImage: null
    }));

    try {
      const transformedImages = await geminiService.transformImage(
        state.originalImageFile,
        transformation.prompt
      );

      if (transformedImages.length > 0) {
        setState(prev => ({
          ...prev,
          transformedImage: transformedImages[0],
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

  const handleStartOver = useCallback(() => {
    setState({
      currentStep: 'camera',
      originalImage: null,
      originalImageFile: null,
      selectedTransformation: null,
      transformedImage: null,
      isProcessing: false,
      error: null
    });
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
        Take Photo
      </Step>
      <StepConnector $completed={state.originalImage !== null} />
      <Step 
        $active={state.currentStep === 'selection'} 
        $completed={state.selectedTransformation !== null}
      >
        <Sparkles size={20} />
        Choose Style
      </Step>
      <StepConnector $completed={state.selectedTransformation !== null} />
      <Step 
        $active={state.currentStep === 'preview'} 
        $completed={state.transformedImage !== null}
      >
        <ImageIcon size={20} />
        Preview & Print
      </Step>
    </StepIndicator>
  );

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 'camera':
        return <CameraCapture onCapture={handlePhotoCapture} />;
      
      case 'selection':
        return (
          <div>
            {state.originalImage && (
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <img 
                  src={state.originalImage} 
                  alt="Captured" 
                  style={{ 
                    maxWidth: '200px', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' 
                  }} 
                />
              </div>
            )}
            <TransformationOptions
              selectedOption={state.selectedTransformation}
              onSelect={handleTransformationSelect}
            />
          </div>
        );
      
      case 'preview':
        return state.originalImage ? (
          <ImagePreview
            originalImage={state.originalImage}
            transformedImage={state.transformedImage}
            isLoading={state.isProcessing}
            error={state.error}
            transformationType={getSelectedTransformationName()}
            onRetake={handleRetake}
            onStartOver={handleStartOver}
          />
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <AppContainer>
        <BackgroundAnimation />
        <BrandBar>
          <BrandInner>
            <BrandLeft>
              <LogoImg src="/piramal-logo.svg" alt="Piramal" />
            </BrandLeft>
            <BrandRight>AI Powered</BrandRight>
          </BrandInner>
        </BrandBar>
        
        <MainContent>
          {renderStepIndicator()}
          {state.error && state.currentStep !== 'preview' && (
            <ErrorMessage>{state.error}</ErrorMessage>
          )}
          {renderCurrentStep()}
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
