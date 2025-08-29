import React, { useState, useCallback } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import CameraCapture from './components/CameraCapture';
import TransformationOptions from './components/TransformationOptions';
import ImagePreview from './components/ImagePreview';
import geminiService from './services/geminiService';
import { TRANSFORMATION_OPTIONS } from './config/gemini';
import { Sparkles, Camera, Image as ImageIcon } from 'lucide-react';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
    min-height: 100vh;
    color: #fff;
  }

  html, body {
    overflow-x: hidden;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const BackgroundAnimation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.3;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 98px,
      rgba(0, 255, 136, 0.1) 100px
    );
    animation: grid-move 20s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 98px,
      rgba(0, 255, 136, 0.1) 100px
    );
    animation: grid-move 20s linear infinite;
  }

  @keyframes grid-move {
    0% { transform: translate(0, 0); }
    100% { transform: translate(100px, 100px); }
  }
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
  background: linear-gradient(45deg, #00ff88, #00d4ff, #88ff00, #ff0088);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease infinite;
  text-shadow: 0 0 30px rgba(0, 255, 136, 0.5);

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 10px 0 0 0;
  color: rgba(255, 255, 255, 0.7);
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
  padding: 20px;
`;

const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  ${props => props.$completed ? `
    background: linear-gradient(45deg, #00ff88, #00d4ff);
    color: #000;
    box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
  ` : props.$active ? `
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid #00ff88;
    color: #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
  ` : `
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.5);
  `}
`;

const StepConnector = styled.div<{ $completed: boolean }>`
  width: 40px;
  height: 2px;
  background: ${props => props.$completed 
    ? 'linear-gradient(45deg, #00ff88, #00d4ff)' 
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

const ContinueButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  margin: 30px auto 0;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: #000;
  box-shadow: 0 8px 20px rgba(0, 255, 136, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(0, 255, 136, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
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
        <Header>
          <Title>🚀 AI Photo Booth</Title>
          <Subtitle>Transform yourself with the power of AI</Subtitle>
        </Header>
        
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
