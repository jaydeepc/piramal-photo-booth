import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { Camera, RotateCcw, SwitchCamera } from 'lucide-react';

const CameraSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  max-width: 600px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 8px 0;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin: 0 0 32px 0;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
`;

const CameraContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 24px;
  overflow: hidden;
  background: var(--gradient-primary);
  padding: 4px;
  box-shadow: var(--shadow-primary);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl);
  }
  
  @media (max-width: 768px) {
    max-width: 320px;
    border-radius: 20px;
  }
`;

const CameraWrapper = styled.div`
  position: relative;
  background: var(--secondary-dark);
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 3/4;
  
  @media (max-width: 768px) {
    border-radius: 16px;
  }
`;

const StyledWebcam = styled(Webcam)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scaleX(-1);
`;

const CountdownOverlay = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(43, 64, 84, 0.95);
  display: ${props => props.$show ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(10px);
`;

const CountdownText = styled.div`
  font-size: 4rem;
  font-weight: 800;
  color: var(--primary);
  text-shadow: 0 0 30px var(--primary);
  animation: pulse 1s ease-in-out;
  margin-bottom: 16px;

  @keyframes pulse {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const CountdownMessage = styled.p`
  color: var(--white);
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;


const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
    font-size: 0.875rem;
    border-radius: 14px;
  }
  
  ${props => props.variant === 'primary' ? `
    background: var(--gradient-primary);
    color: var(--white);
    box-shadow: var(--shadow-primary);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-xl);
    }
    
    &:active {
      transform: translateY(-1px);
    }
  ` : `
    background: var(--surface-elevated);
    color: var(--text-primary);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      background: var(--white);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.2);
  border-radius: 16px;
  padding: 20px;
  margin-top: 24px;
  text-align: center;
  color: #dc3545;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  
  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 14px;
    margin-top: 20px;
  }
`;

const CameraPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background-secondary);
  color: var(--text-muted);
  text-align: center;
  padding: 40px 20px;
`;

const PlaceholderIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: var(--gradient-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  margin-bottom: 20px;
  box-shadow: var(--shadow-md);
`;

const PlaceholderText = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text-primary);
`;

const PlaceholderSubtext = styled.p`
  font-size: 0.875rem;
  margin: 0;
  color: var(--text-muted);
  line-height: 1.4;
`;

interface CameraCaptureProps {
  onCapture: (imageSrc: string, imageFile: File, userHeight?: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCountdown, setIsCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [error, setError] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraReady, setCameraReady] = useState(false);

  const capture = useCallback(() => {
    setIsCountdown(true);
    setError('');
    
    let count = 3;
    setCountdown(count);
    
    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);
      
      if (count === 0) {
        clearInterval(countdownInterval);
        
        if (webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();
          if (imageSrc) {
            // Create a canvas to flip the captured image back to normal orientation
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              
              // Flip the image horizontally to correct the mirrored capture
              ctx!.scale(-1, 1);
              ctx!.drawImage(img, -img.width, 0);
              
              // Convert back to data URL
              const correctedImageSrc = canvas.toDataURL('image/jpeg', 0.9);
              
              // Convert data URL to File
              fetch(correctedImageSrc)
                .then(res => res.blob())
                .then(blob => {
                  const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
                  onCapture(correctedImageSrc, file);
                })
                .catch(err => {
                  console.error('Error creating file:', err);
                  setError('Failed to capture photo. Please try again.');
                });
            };
            
            img.src = imageSrc;
          } else {
            setError('Failed to capture photo. Please check camera permissions.');
          }
        }
        
        setIsCountdown(false);
      }
    }, 1000);
  }, [onCapture]);

  const retake = useCallback(() => {
    setError('');
    setCameraReady(false);
  }, []);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    setError('');
    setCameraReady(false);
  }, []);

  const handleUserMedia = useCallback(() => {
    setCameraReady(true);
    setError('');
  }, []);

  const handleUserMediaError = useCallback((error: any) => {
    console.error('Camera error:', error);
    setError('Camera access denied. Please allow camera permissions and refresh the page.');
    setCameraReady(false);
  }, []);

  return (
    <CameraSection>
      <div>
        <SectionTitle>Capture Your Photo</SectionTitle>
        <SectionSubtitle>
          Position yourself in the frame and click capture when ready
        </SectionSubtitle>
      </div>

      <CameraContainer>
        <CameraWrapper>
          <StyledWebcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.9}
            videoConstraints={{
              width: 480,
              height: 640,
              facingMode: facingMode
            }}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
          />
          {!cameraReady && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--background-secondary)',
              borderRadius: '20px'
            }}>
              <CameraPlaceholder>
                <PlaceholderIcon>
                  <Camera size={40} />
                </PlaceholderIcon>
                <PlaceholderText>Camera Loading...</PlaceholderText>
                <PlaceholderSubtext>
                  Please allow camera access when prompted
                </PlaceholderSubtext>
              </CameraPlaceholder>
            </div>
          )}
          <CountdownOverlay $show={isCountdown}>
            <CountdownText>
              {countdown > 0 ? countdown : '📸'}
            </CountdownText>
            <CountdownMessage>
              {countdown > 0 ? 'Get ready...' : 'Perfect!'}
            </CountdownMessage>
          </CountdownOverlay>
        </CameraWrapper>
      </CameraContainer>
      
      
      <ControlsContainer>
        <ActionButton variant="primary" onClick={capture} disabled={isCountdown || !cameraReady}>
          <Camera size={20} />
          Capture Photo
        </ActionButton>
        <ActionButton onClick={switchCamera} disabled={isCountdown}>
          <SwitchCamera size={20} />
          Switch Camera
        </ActionButton>
        <ActionButton onClick={retake} disabled={isCountdown}>
          <RotateCcw size={20} />
          Reset
        </ActionButton>
      </ControlsContainer>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </CameraSection>
  );
};

export default CameraCapture;
