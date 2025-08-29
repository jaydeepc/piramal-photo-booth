import React, { useRef } from 'react';
import styled from 'styled-components';
import { Download, Printer, RotateCcw, Loader } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const PreviewContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ImageCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ImageTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 15px 0;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 3/4;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #00ff88;
  font-size: 16px;
  font-weight: 600;
`;

const LoadingSpinner = styled(Loader)`
  animation: spin 2s linear infinite;
  margin-bottom: 10px;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
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
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(45deg, #00ff88, #00d4ff);
          color: #000;
          box-shadow: 0 8px 20px rgba(0, 255, 136, 0.3);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(0, 255, 136, 0.4);
          }
        `;
      case 'danger':
        return `
          background: linear-gradient(45deg, #ff4444, #ff6b6b);
          color: #fff;
          box-shadow: 0 8px 20px rgba(255, 68, 68, 0.3);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(255, 68, 68, 0.4);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          
          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }
`;

const PrintableContent = styled.div`
  @media print {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
`;

const PrintTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  
  @media screen {
    display: none;
  }
`;

const PrintImagesContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  
  @media print {
    gap: 30px;
  }
`;

const PrintImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media print {
    page-break-inside: avoid;
  }
`;

const PrintImageTitle = styled.p`
  text-align: center;
  color: #333;
  font-weight: bold;
  margin: 10px 0;
  
  @media screen {
    display: none;
  }
`;

const PrintImage = styled.img`
  max-width: 300px;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  text-align: center;
  margin: 20px 0;
  padding: 15px;
  background: rgba(255, 68, 68, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 68, 68, 0.3);
`;

interface ImagePreviewProps {
  originalImage: string;
  transformedImage: string | null;
  isLoading: boolean;
  error: string | null;
  transformationType: string;
  onRetake: () => void;
  onStartOver: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  originalImage,
  transformedImage,
  isLoading,
  error,
  transformationType,
  onRetake,
  onStartOver
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Photo Booth - ${transformationType} Transformation`
  });

  const handleDownload = () => {
    if (transformedImage) {
      const link = document.createElement('a');
      link.href = transformedImage;
      link.download = `photo-booth-${transformationType}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <PreviewContainer>
      <ImagesContainer>
        <ImageCard>
          <ImageTitle>Original Photo</ImageTitle>
          <ImageWrapper>
            <Image src={originalImage} alt="Original" />
          </ImageWrapper>
        </ImageCard>

        <ImageCard>
          <ImageTitle>{transformationType} Transformation</ImageTitle>
          <ImageWrapper>
            {transformedImage && <Image src={transformedImage} alt="Transformed" />}
            {isLoading && (
              <LoadingOverlay>
                <LoadingSpinner size={48} />
                Creating your transformation...
              </LoadingOverlay>
            )}
            {error && !isLoading && (
              <LoadingOverlay>
                <div style={{ textAlign: 'center', color: '#ff4444' }}>
                  ❌
                  <div style={{ marginTop: '10px', fontSize: '14px' }}>
                    Failed to generate transformation
                  </div>
                </div>
              </LoadingOverlay>
            )}
          </ImageWrapper>
        </ImageCard>
      </ImagesContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ControlsContainer>
        {transformedImage && (
          <>
            <ActionButton variant="primary" onClick={handlePrint}>
              <Printer size={20} />
              Print Photo
            </ActionButton>
            <ActionButton onClick={handleDownload}>
              <Download size={20} />
              Download
            </ActionButton>
          </>
        )}
        <ActionButton onClick={onRetake}>
          <RotateCcw size={20} />
          Retake Photo
        </ActionButton>
        <ActionButton variant="danger" onClick={onStartOver}>
          Start Over
        </ActionButton>
      </ControlsContainer>

      {/* Hidden printable content */}
      <div style={{ display: 'none' }}>
        <PrintableContent ref={printRef}>
          <PrintTitle>AI Photo Booth - {transformationType} Transformation</PrintTitle>
          <PrintImagesContainer>
            <PrintImageWrapper>
              <PrintImageTitle>Original</PrintImageTitle>
              <PrintImage src={originalImage} alt="Original" />
            </PrintImageWrapper>
            {transformedImage && (
              <PrintImageWrapper>
                <PrintImageTitle>{transformationType}</PrintImageTitle>
                <PrintImage src={transformedImage} alt="Transformed" />
              </PrintImageWrapper>
            )}
          </PrintImagesContainer>
        </PrintableContent>
      </div>
    </PreviewContainer>
  );
};

export default ImagePreview;
