import React, { useRef } from 'react';
import styled from 'styled-components';
import { Download, Printer, RotateCcw, Loader, RefreshCw, Sparkles, ArrowLeft, Share2, Heart } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const PreviewSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
  
  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 16px 0;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 12px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 48px;
  margin-bottom: 48px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 32px;
  }
`;

const OriginalSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OriginalCard = styled.div`
  background: var(--surface-elevated);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-md);
  width: 100%;
  max-width: 300px;
  
  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 20px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 12px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: var(--background-secondary);
  aspect-ratio: 3/4;
  
  @media (max-width: 768px) {
    border-radius: 14px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const TransformedSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransformedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const TransformedCard = styled.div<{ $selected: boolean }>`
  background: var(--surface-elevated);
  border: 3px solid ${props => props.$selected ? 'var(--primary)' : 'var(--border-light)'};
  border-radius: 24px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
    transform: scaleX(${props => props.$selected ? 1 : 0});
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 16px;
  }
  
  &:hover {
    transform: translateY(-4px);
    border-color: var(--primary);
    box-shadow: var(--shadow-lg);
    
    &::before {
      transform: scaleX(1);
    }
  }

  ${props => props.$selected && `
    background: rgba(242, 104, 65, 0.05);
    box-shadow: var(--shadow-primary);
    transform: translateY(-2px);
  `}
`;

const VariationTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 12px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const SelectedBadge = styled.span`
  background: var(--gradient-primary);
  color: var(--white);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LoadingCard = styled.div`
  background: var(--surface-elevated);
  border: 1px solid var(--border-light);
  border-radius: 24px;
  padding: 20px;
  
  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 16px;
  }
`;

const LoadingOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background-secondary);
  border-radius: 16px;
  aspect-ratio: 3/4;
  color: var(--primary);
  
  @media (max-width: 768px) {
    border-radius: 14px;
  }
`;

const LoadingSpinner = styled(Loader)`
  animation: spin 2s linear infinite;
  margin-bottom: 16px;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const SelectionIndicator = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: 700;
  font-size: 1rem;
  box-shadow: var(--shadow-primary);
  
  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
    font-size: 0.875rem;
  }
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

const PrimaryActions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const SecondaryActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' | 'success' }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
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
    padding: 14px 24px;
    font-size: 0.875rem;
    border-radius: 14px;
  }
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: var(--gradient-primary);
          color: var(--white);
          box-shadow: var(--shadow-primary);
          
          &:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl);
          }
        `;
      case 'success':
        return `
          background: var(--gradient-accent);
          color: var(--white);
          box-shadow: var(--shadow-accent);
          
          &:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl);
          }
        `;
      case 'danger':
        return `
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: var(--white);
          box-shadow: 0 8px 24px rgba(220, 53, 69, 0.24);
          
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 16px 48px rgba(220, 53, 69, 0.32);
          }
        `;
      default:
        return `
          background: var(--surface-elevated);
          color: var(--text-primary);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
            background: var(--white);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }

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
  padding: 24px;
  margin: 24px 0;
  text-align: center;
  color: #dc3545;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 14px;
    margin: 20px 0;
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
  color: var(--text-primary);
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 700;
  
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

const PrintImage = styled.img`
  max-width: 300px;
  max-height: 400px;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
`;

const QualityBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--gradient-accent);
  color: var(--white);
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-accent);
  
  @media (max-width: 768px) {
    top: 12px;
    left: 12px;
    padding: 4px 10px;
    font-size: 0.7rem;
  }
`;

interface ImagePreviewProps {
  originalImage: string;
  transformedImages: string[];
  selectedImageIndex: number;
  isLoading: boolean;
  error: string | null;
  transformationType: string;
  onRetake: () => void;
  onStartOver: () => void;
  onRegenerate: () => void;
  onTryAnotherStyle?: () => void;
  onImageSelect?: (index: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  originalImage,
  transformedImages,
  selectedImageIndex,
  isLoading,
  error,
  transformationType,
  onRetake,
  onStartOver,
  onRegenerate,
  onTryAnotherStyle,
  onImageSelect
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  
  // Get the currently selected transformed image
  const currentTransformedImage = transformedImages.length > 0 ? transformedImages[selectedImageIndex] : null;

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Piramal AI Photo Studio - ${transformationType}`
  });

  const handleDownload = async () => {
    if (currentTransformedImage) {
      try {
        // Convert the image to a blob with proper MIME type
        const response = await fetch(currentTransformedImage);
        const blob = await response.blob();
        
        // Create a new blob with explicit PNG MIME type
        const pngBlob = new Blob([blob], { type: 'image/png' });
        
        // Create object URL for the blob
        const blobUrl = URL.createObjectURL(pngBlob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `piramal-ai-photo-${transformationType.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
        
        // For mobile compatibility
        link.setAttribute('target', '_blank');
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the object URL
        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback to original method
        const link = document.createElement('a');
        link.href = currentTransformedImage;
        link.download = `piramal-ai-photo-${transformationType.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <PreviewSection>
      <SectionHeader>
        <SectionTitle>{transformationType}</SectionTitle>
        <SectionSubtitle>
          Your AI-transformed photos are ready! Choose your favorite and download or print.
        </SectionSubtitle>
      </SectionHeader>

      <ContentGrid>
        {/* Original Image */}
        <OriginalSection>
          <OriginalCard>
            <CardTitle>Original Photo</CardTitle>
            <ImageWrapper>
              <Image src={originalImage} alt="Original" />
              <QualityBadge>Original</QualityBadge>
            </ImageWrapper>
          </OriginalCard>
        </OriginalSection>

        {/* Transformed Images */}
        <TransformedSection>
          <TransformedGrid>
            {isLoading && transformedImages.length === 0 && (
              <>
                {/* Show loading placeholders for both variations */}
                <LoadingCard>
                  <VariationTitle>Variation 1</VariationTitle>
                  <LoadingOverlay>
                    <LoadingSpinner size={48} />
                    <LoadingText>Generating your first variation...</LoadingText>
                  </LoadingOverlay>
                </LoadingCard>
                <LoadingCard>
                  <VariationTitle>Variation 2</VariationTitle>
                  <LoadingOverlay>
                    <LoadingSpinner size={48} />
                    <LoadingText>Generating your second variation...</LoadingText>
                  </LoadingOverlay>
                </LoadingCard>
              </>
            )}
            
            {transformedImages.map((imageUrl, index) => (
              <TransformedCard 
                key={index}
                $selected={selectedImageIndex === index}
                onClick={() => onImageSelect && onImageSelect(index)}
              >
                <VariationTitle>
                  Variation {index + 1}
                  {selectedImageIndex === index && <SelectedBadge>Selected</SelectedBadge>}
                </VariationTitle>
                <ImageWrapper>
                  <Image src={imageUrl} alt={`Transformed variation ${index + 1}`} />
                  <QualityBadge>AI Enhanced</QualityBadge>
                  {selectedImageIndex === index && (
                    <SelectionIndicator>
                      <Heart size={16} fill="currentColor" />
                    </SelectionIndicator>
                  )}
                </ImageWrapper>
              </TransformedCard>
            ))}
            
            {/* Show loading for remaining variations if still generating */}
            {isLoading && transformedImages.length > 0 && transformedImages.length < 2 && (
              <LoadingCard>
                <VariationTitle>Variation {transformedImages.length + 1}</VariationTitle>
                <LoadingOverlay>
                  <LoadingSpinner size={48} />
                  <LoadingText>Generating variation {transformedImages.length + 1}...</LoadingText>
                </LoadingOverlay>
              </LoadingCard>
            )}
          </TransformedGrid>
        </TransformedSection>
      </ContentGrid>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ActionSection>
        {currentTransformedImage && (
          <PrimaryActions>
            <ActionButton variant="primary" onClick={handleDownload}>
              <Download size={20} />
              Download Photo
            </ActionButton>
            <ActionButton variant="success" onClick={handlePrint}>
              <Printer size={20} />
              Print Photo
            </ActionButton>
            <ActionButton onClick={onRegenerate} disabled={isLoading}>
              <RefreshCw size={20} />
              Regenerate
            </ActionButton>
          </PrimaryActions>
        )}
        
        <SecondaryActions>
          {onTryAnotherStyle && (
            <ActionButton onClick={onTryAnotherStyle}>
              <Sparkles size={20} />
              Try Another Style
            </ActionButton>
          )}
          <ActionButton onClick={onRetake}>
            <ArrowLeft size={20} />
            Retake Photo
          </ActionButton>
          <ActionButton variant="danger" onClick={onStartOver}>
            <RotateCcw size={20} />
            Start Over
          </ActionButton>
        </SecondaryActions>
      </ActionSection>

      {/* Hidden printable content */}
      <div style={{ display: 'none' }}>
        <PrintableContent ref={printRef}>
          <PrintTitle>Piramal AI Photo Studio - {transformationType}</PrintTitle>
          <PrintImagesContainer>
            {currentTransformedImage && (
              <PrintImageWrapper>
                <PrintImage src={currentTransformedImage} alt="AI Transformed" />
              </PrintImageWrapper>
            )}
          </PrintImagesContainer>
        </PrintableContent>
      </div>
    </PreviewSection>
  );
};

export default ImagePreview;
