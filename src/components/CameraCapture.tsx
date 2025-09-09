import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { Camera, RotateCcw, SwitchCamera } from 'lucide-react';

const CameraContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(45deg, var(--primary), var(--primary-2));
  padding: 4px;
  box-shadow: var(--shadow-primary);
`;

const CameraWrapper = styled.div`
  position: relative;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
`;

const StyledWebcam = styled(Webcam)`
  width: 100%;
  height: auto;
  display: block;
  transform: scaleX(-1);
`;

const CountdownOverlay = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.$show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const CountdownText = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: var(--primary);
  text-shadow: 0 0 20px var(--primary);
  animation: pulse 1s ease-in-out;

  @keyframes pulse {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  padding: 0 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
  }
  
  ${props => props.primary ? `
    background: linear-gradient(45deg, var(--primary), var(--primary-2));
    color: #000;
    box-shadow: var(--shadow-primary);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(255, 77, 46, 0.35);
    }
  ` : `
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
    
    &:hover {
      background: var(--surface-2);
    }
  `}

  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  text-align: center;
  margin-top: 10px;
  padding: 10px;
  background: rgba(255, 68, 68, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 68, 68, 0.3);
`;

const HeightInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 0 10px;
`;

const HeightLabel = styled.label`
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

const HeightInput = styled.input`
  padding: 12px 16px;
  border: 2px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  color: var(--text);
  font-size: 16px;
  text-align: center;
  width: 200px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 77, 46, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }

  @media (max-width: 640px) {
    width: 100%;
    max-width: 300px;
  }
`;

const HeightNote = styled.p`
  color: var(--text-muted);
  font-size: 12px;
  text-align: center;
  margin: 0;
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
  const [userHeight, setUserHeight] = useState<string>('');

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
                  onCapture(correctedImageSrc, file, userHeight);
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
  }, [onCapture, userHeight]);

  const retake = useCallback(() => {
    setError('');
  }, []);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    setError('');
  }, []);

  return (
    <div>
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
            onUserMediaError={(error) => {
              console.error('Camera error:', error);
              setError('Camera access denied. Please allow camera permissions and refresh the page.');
            }}
          />
          <CountdownOverlay $show={isCountdown}>
            <CountdownText>
              {countdown > 0 ? countdown : '📸'}
            </CountdownText>
          </CountdownOverlay>
        </CameraWrapper>
      </CameraContainer>
      
      <HeightInputContainer>
        <HeightLabel htmlFor="height-input">
          Your Height (optional)
        </HeightLabel>
        <HeightInput
          id="height-input"
          type="text"
          value={userHeight}
          onChange={(e) => setUserHeight(e.target.value)}
          placeholder="e.g., 5'8&quot; or 170cm"
        />
        <HeightNote>
          Optional: Provide your height for better proportions in AI-generated photos.
        </HeightNote>
      </HeightInputContainer>
      
      <ControlsContainer>
        <ActionButton primary onClick={capture} disabled={isCountdown}>
          <Camera size={20} />
          Take Photo
        </ActionButton>
        <ActionButton onClick={switchCamera}>
          <SwitchCamera size={20} />
          Switch Camera
        </ActionButton>
        <ActionButton onClick={retake}>
          <RotateCcw size={20} />
          Reset
        </ActionButton>
      </ControlsContainer>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default CameraCapture;
