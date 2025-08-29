import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Camera, Sparkles, Zap, ArrowRight } from 'lucide-react';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  50% { transform: translateY(-5px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(0.5deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LandingContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: radial-gradient(1200px 600px at 20% 0%, #0f172a 0%, #0b1020 60%, #060912 100%);
  color: #e6e9ef;
`;

const BackgroundElements = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 80vw;
    height: 80vw;
    background: radial-gradient(circle at 30% 30%, rgba(220, 38, 127, 0.4), rgba(220, 38, 127, 0) 70%);
    filter: blur(80px);
    animation: ${pulse} 4s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle at 70% 70%, rgba(255, 77, 46, 0.3), rgba(255, 77, 46, 0) 70%);
    filter: blur(60px);
    animation: ${pulse} 3s ease-in-out infinite reverse;
  }
`;

const GeometricShapes = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  .shape {
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: ${float} 6s ease-in-out infinite;
  }

  .shape-1 {
    top: 10%;
    left: 10%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    animation-delay: 0s;
  }

  .shape-2 {
    top: 20%;
    right: 15%;
    width: 40px;
    height: 40px;
    transform: rotate(45deg);
    animation-delay: 1s;
  }

  .shape-3 {
    bottom: 30%;
    left: 20%;
    width: 80px;
    height: 80px;
    border-radius: 20px;
    animation-delay: 2s;
  }

  .shape-4 {
    bottom: 20%;
    right: 10%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation-delay: 3s;
  }
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  filter: brightness(0) invert(1);

  @media (min-width: 768px) {
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
  min-height: calc(100vh - 100px);
  padding: 40px 20px;
  text-align: center;
`;

const HeroSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  animation: ${slideInUp} 1s ease-out;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 12vw, 6rem);
  font-weight: 900;
  line-height: 0.9;
  margin: 0 0 30px 0;
  background: linear-gradient(135deg, #ffffff 0%, #ff4d2e 40%, #dc267f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 50px rgba(255, 77, 46, 0.4);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    margin-bottom: 24px;
    line-height: 0.95;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 50px 0;
  line-height: 1.4;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 300;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #ff4d2e 0%, #dc267f 100%);
  border: none;
  border-radius: 50px;
  padding: 18px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(255, 77, 46, 0.4);
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(255, 77, 46, 0.6);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 1rem;
  }
`;

const FloatingIcons = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;

  .floating-icon {
    position: absolute;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #ff4d2e, #dc267f);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    animation: ${float} 8s ease-in-out infinite;
    opacity: 0.7;
  }

  .icon-1 {
    top: 15%;
    left: 15%;
    animation-delay: 0s;
  }

  .icon-2 {
    top: 25%;
    right: 20%;
    animation-delay: 2s;
  }

  .icon-3 {
    bottom: 35%;
    left: 25%;
    animation-delay: 4s;
  }

  .icon-4 {
    bottom: 25%;
    right: 15%;
    animation-delay: 6s;
  }

  .icon-5 {
    top: 40%;
    left: 8%;
    animation-delay: 1s;
  }

  .icon-6 {
    top: 60%;
    right: 12%;
    animation-delay: 3s;
  }

  @media (max-width: 768px) {
    .floating-icon {
      width: 30px;
      height: 30px;
    }
  }
`;

const MagicText = styled.div`
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  animation: ${pulse} 3s ease-in-out infinite;
  font-weight: 300;
  letter-spacing: 0.1em;

  @media (max-width: 768px) {
    bottom: 10%;
  }
`;


interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <LandingContainer>
      <BackgroundElements />
      <GeometricShapes>
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
      </GeometricShapes>
      
      <Header>
        <Logo src="/piramal-logo.svg" alt="Piramal" />
      </Header>

      <MainContent>
        <HeroSection>
          <Title>AI Photo Booth</Title>
          <Subtitle>
            Transform. Create. Amaze.
          </Subtitle>
          <CTAButton onClick={onEnterApp}>
            Enter
            <ArrowRight size={20} />
          </CTAButton>
        </HeroSection>
      </MainContent>

      <FloatingIcons>
        <div className="floating-icon icon-1">
          <Camera size={20} />
        </div>
        <div className="floating-icon icon-2">
          <Sparkles size={20} />
        </div>
        <div className="floating-icon icon-3">
          <Zap size={20} />
        </div>
        <div className="floating-icon icon-4">
          <Camera size={20} />
        </div>
        <div className="floating-icon icon-5">
          <Sparkles size={20} />
        </div>
        <div className="floating-icon icon-6">
          <Zap size={20} />
        </div>
      </FloatingIcons>

      <MagicText>
        ✨ Where AI meets creativity ✨
      </MagicText>
    </LandingContainer>
  );
};

export default LandingPage;
