import React, { useState } from 'react';
import styled from 'styled-components';
import { TRANSFORMATION_OPTIONS } from '../config/gemini';
import { 
  Sparkles, User, Rocket, Zap, Star, Palette, Clock, 
  Shield, Wand2, Cpu, Crown, Anchor, Eye, Guitar, 
  Sword, Globe, Cog, Briefcase, Camera
} from 'lucide-react';

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  padding: 0 10px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 640px) {
    justify-content: flex-start;
    flex-wrap: nowrap;
    gap: 8px;
  }
`;

const CategoryTab = styled.button<{ $active: boolean }>`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: capitalize;
  white-space: nowrap;

  @media (max-width: 640px) {
    padding: 10px 16px;
    font-size: 14px;
  }
  
  ${props => props.$active ? `
    background: linear-gradient(45deg, var(--primary), var(--primary-2));
    color: #000;
    box-shadow: var(--shadow-primary);
  ` : `
    background: var(--surface);
    color: var(--text-muted);
    border: 1px solid var(--border);
    
    &:hover {
      background: var(--surface-2);
      color: var(--text);
    }
  `}
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 10px;
  }
`;

const OptionCard = styled.div<{ $selected: boolean }>`
  position: relative;
  background: var(--surface);
  border: 2px solid ${props => props.$selected ? 'var(--primary)' : 'var(--surface-2)'};
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 10px 30px rgba(255, 77, 46, 0.2);
    background: var(--surface-2);
  }

  ${props => props.$selected && `
    background: rgba(255, 77, 46, 0.12);
    box-shadow: 0 0 20px rgba(255, 77, 46, 0.35);
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
  color: var(--text);
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const OptionDescription = styled.p`
  color: var(--text-muted);
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
  background: linear-gradient(45deg, var(--primary), var(--primary-2));
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
  background: linear-gradient(90deg, var(--primary), var(--primary-2));
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
    // Superhero Collection
    'superhero-classic': { icon: <Shield size={24} />, color: 'linear-gradient(45deg, #FF6B35, #F7931E)' },
    'superhero-dark': { icon: <Zap size={24} />, color: 'linear-gradient(45deg, #2C3E50, #34495E)' },
    'superhero-cosmic': { icon: <Globe size={24} />, color: 'linear-gradient(45deg, #667eea, #764ba2)' },
    
    // Fantasy Collection
    'wizard': { icon: <Wand2 size={24} />, color: 'linear-gradient(45deg, #8E44AD, #9B59B6)' },
    'warrior-princess': { icon: <Sword size={24} />, color: 'linear-gradient(45deg, #E74C3C, #C0392B)' },
    'dragon-rider': { icon: <Sparkles size={24} />, color: 'linear-gradient(45deg, #27AE60, #2ECC71)' },
    
    // Sci-Fi Collection
    'cyberpunk-hacker': { icon: <Cpu size={24} />, color: 'linear-gradient(45deg, #00D4FF, #0099CC)' },
    'space-marine': { icon: <Rocket size={24} />, color: 'linear-gradient(45deg, #1e3c72, #2a5298)' },
    'time-traveler': { icon: <Clock size={24} />, color: 'linear-gradient(45deg, #FF8A80, #FF5722)' },
    
    // Classic Collection
    'pirate-captain': { icon: <Anchor size={24} />, color: 'linear-gradient(45deg, #8B4513, #D2691E)' },
    'royal-monarch': { icon: <Crown size={24} />, color: 'linear-gradient(45deg, #FFD700, #FFA500)' },
    'steampunk-inventor': { icon: <Cog size={24} />, color: 'linear-gradient(45deg, #795548, #8D6E63)' },
    
    // Modern Collection
    'secret-agent': { icon: <Eye size={24} />, color: 'linear-gradient(45deg, #37474F, #455A64)' },
    'rockstar': { icon: <Guitar size={24} />, color: 'linear-gradient(45deg, #E91E63, #AD1457)' },
    'film-noir-detective': { icon: <User size={24} />, color: 'linear-gradient(45deg, #424242, #616161)' },
    
    // Professional Collection
    'linkedin-photo': { icon: <Briefcase size={24} />, color: 'linear-gradient(45deg, #0077B5, #005885)' },
    'studio-photo-black': { icon: <Camera size={24} />, color: 'linear-gradient(45deg, #000000, #333333)' },
    'studio-photo-white': { icon: <Camera size={24} />, color: 'linear-gradient(45deg, #FFFFFF, #F0F0F0)' },
    
    // Legacy options
    farmer: { icon: <Sparkles size={24} />, color: 'linear-gradient(45deg, #8B4513, #D2691E)' },
    astronaut: { icon: <Rocket size={24} />, color: 'linear-gradient(45deg, #1e3c72, #2a5298)' },
    supervillain: { icon: <Zap size={24} />, color: 'linear-gradient(45deg, #434343, #000000)' },
    filmstar: { icon: <Star size={24} />, color: 'linear-gradient(45deg, #FFD700, #FFA500)' },
    cartoon: { icon: <Palette size={24} />, color: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' },
    elderly: { icon: <Clock size={24} />, color: 'linear-gradient(45deg, #8e44ad, #9b59b6)' }
  };
  return iconMap[id as keyof typeof iconMap] || { icon: <User size={24} />, color: 'linear-gradient(45deg, #666, #888)' };
};

const TransformationOptions: React.FC<TransformationOptionsProps> = ({ 
  selectedOption, 
  onSelect 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(TRANSFORMATION_OPTIONS.map(option => option.category).filter(Boolean)))];
  
  // Filter options by category
  const filteredOptions = selectedCategory === 'all' 
    ? TRANSFORMATION_OPTIONS 
    : TRANSFORMATION_OPTIONS.filter(option => option.category === selectedCategory);

  return (
    <div>
      <SectionTitle>Choose Your Transformation</SectionTitle>
      
      <CategoryTabs>
        {categories.map((category) => (
          <CategoryTab
            key={category}
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'All Styles' : category}
          </CategoryTab>
        ))}
      </CategoryTabs>
      
      <OptionsContainer>
        {filteredOptions.map((option) => {
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
