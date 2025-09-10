import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ArrowRight } from 'lucide-react';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const subtleFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
`;

const LandingContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: var(--background);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
`;

const BackgroundElements = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.02;
  background-image: 
    radial-gradient(circle at 20% 20%, var(--primary) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, var(--secondary) 0%, transparent 40%);
  background-size: 800px 800px;
  background-position: 0 0, 100% 100%;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  padding: 32px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const Logo = styled.img`
  height: 56px;
  width: auto;
  animation: ${subtleFloat} 6s ease-in-out infinite;

  @media (min-width: 768px) {
    height: 64px;
  }
  
  @media (max-width: 768px) {
    height: 48px;
  }
`;

const MainContent = styled.main`
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 40px 24px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const HeroSection = styled.div`
  animation: ${fadeInUp} 1.2s ease-out;
`;

const Title = styled.h1`
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 32px 0;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    margin-bottom: 24px;
    line-height: 1.15;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--text-secondary);
  margin: 0 0 24px 0;
  line-height: 1.4;
  font-weight: 400;
  max-width: 600px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const TagLine = styled.p`
  font-size: 1.125rem;
  color: var(--text-muted);
  margin: 0 0 64px 0;
  font-weight: 500;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    margin-bottom: 48px;
    font-size: 1rem;
  }
`;

const CTAButton = styled.button`
  background: var(--gradient-primary);
  border: none;
  border-radius: 20px;
  padding: 24px 56px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--white);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-primary);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.8s;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 20px 44px;
    font-size: 1.125rem;
    border-radius: 18px;
    gap: 12px;
  }
`;

const Footer = styled.footer`
  position: relative;
  z-index: 5;
  padding: 32px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const BrandBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface-elevated);
  padding: 16px 32px;
  border-radius: 50px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-md);
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 0.8rem;
  }
`;

const PoweredByText = styled.span`
  color: var(--text-muted);
`;

const AIText = styled.span`
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;

const QualityIndicator = styled.div`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  background: var(--surface-elevated);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-md);
  text-align: center;
  animation: ${subtleFloat} 8s ease-in-out infinite;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const QualityTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const QualitySubtext = styled.p`
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0;
`;

const TrustIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  background: var(--surface-elevated);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-md);
  text-align: center;
  animation: ${subtleFloat} 8s ease-in-out infinite 2s;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const TrustTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TrustSubtext = styled.p`
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0;
`;

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <LandingContainer>
      <BackgroundElements />
      
      <Header>
        <Logo src="/piramal-logo.svg" alt="Piramal" />
      </Header>

      <MainContent>
        <HeroSection>
          <Title>AI Photo Studio</Title>
          <Subtitle>
            Professional AI-powered photo transformations for executives and investors
          </Subtitle>
          <TagLine>Instant • Professional • Extraordinary</TagLine>
          <CTAButton onClick={onEnterApp}>
            Get Started
            <ArrowRight size={28} />
          </CTAButton>
        </HeroSection>
      </MainContent>

      <QualityIndicator>
        <QualityTitle>Enterprise Grade</QualityTitle>
        <QualitySubtext>Professional Quality</QualitySubtext>
      </QualityIndicator>

      <TrustIndicator>
        <TrustTitle>Secure & Private</TrustTitle>
        <TrustSubtext>Your Data Protected</TrustSubtext>
      </TrustIndicator>

      <Footer>
        <BrandBadge>
          <PoweredByText>Powered by</PoweredByText>
          <AIText>Artificial Intelligence</AIText>
        </BrandBadge>
      </Footer>
    </LandingContainer>
  );
};

export default LandingPage;
