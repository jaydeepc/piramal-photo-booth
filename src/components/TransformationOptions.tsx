import React from 'react';
import styled from 'styled-components';
import { TRANSFORMATION_OPTIONS } from '../config/gemini';
import { Sparkles, User, Rocket, Zap, Star, Palette, Clock } from 'lucide-react';

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const OptionCard = styled.div<{ $selected: boolean }>`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${props => props.$selected ? '#00ff88' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px);
    border-color: #00ff88;
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
    background: rgba(255, 255, 255, 0.1);
  }

  ${props => props.$selected && `
    background: rgba(0, 255, 136, 0.1);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  `}
`;

const IconContainer = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const OptionTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const OptionDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
`;

const SelectionIndicator = styled.div<{ show: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 12px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 30px 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

interface TransformationOptionsProps {
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
}

const getIconAndColor = (id: string) => {
  const iconMap = {
    farmer: { icon: <Sparkles size={24} />, color: 'linear-gradient(45deg, #8B4513, #D2691E)' },
    astronaut: { icon: <Rocket size={24} />, color: 'linear-gradient(45deg, #1e3c72, #2a5298)' },
    supervillain: { icon: <Zap size={24} />, color: 'linear-gradient(45deg, #434343, #000000)' },
    filmstar: { icon: <Star size={24} />, color: 'linear-gradient(45deg, #FFD700, #FFA500)' },
    cartoon: { icon: <Palette size={24} />, color: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' },
    elderly: { icon: <Clock size={24} />, color: 'linear-gradient(45deg, #8e44ad, #9b59b6)' }
  };
  return iconMap[id as keyof typeof iconMap] || { icon: <User size={24} />, color: '#666' };
};

const TransformationOptions: React.FC<TransformationOptionsProps> = ({ 
  selectedOption, 
  onSelect 
}) => {
  return (
    <div>
      <SectionTitle>Choose Your Transformation</SectionTitle>
      <OptionsContainer>
        {TRANSFORMATION_OPTIONS.map((option) => {
          const { icon, color } = getIconAndColor(option.id);
          return (
            <OptionCard
              key={option.id}
              $selected={selectedOption === option.id}
              onClick={() => onSelect(option.id)}
            >
              <SelectionIndicator show={selectedOption === option.id}>
                ✓
              </SelectionIndicator>
              <IconContainer color={color}>
                {icon}
              </IconContainer>
              <OptionTitle>{option.name}</OptionTitle>
              <OptionDescription>{option.description}</OptionDescription>
            </OptionCard>
          );
        })}
      </OptionsContainer>
    </div>
  );
};

export default TransformationOptions;
