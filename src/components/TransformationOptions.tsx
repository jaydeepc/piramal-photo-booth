import React, { useState } from 'react';
import styled from 'styled-components';
import { TRANSFORMATION_OPTIONS, CATEGORY_INFO } from '../config/gemini';
import { 
  Sparkles, User, Rocket, Zap, Star, Palette, Clock, 
  Shield, Wand2, Cpu, Crown, Anchor, Eye, Guitar, 
  Sword, Globe, Cog, Briefcase, Camera, Swords, 
  Skull, Target, Gamepad2, Wheat,
  Axe, Pyramid, Car, Heart, Flower, Mountain, 
  Feather
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

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 8px;
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
  
  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 10px;
  }
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 10px 30px rgba(255, 77, 46, 0.2);
    background: var(--surface-2);
  }

  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-2px);
    }
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
    // Professional Collection
    'linkedin-photo': { icon: <Briefcase size={24} />, color: 'linear-gradient(45deg, #0077B5, #005885)' },
    'studio-photo-black': { icon: <Camera size={24} />, color: 'linear-gradient(45deg, #000000, #333333)' },
    'studio-photo-white': { icon: <Camera size={24} />, color: 'linear-gradient(45deg, #FFFFFF, #F0F0F0)' },
    
    // Superhero Collection
    'superhero-classic': { icon: <Shield size={24} />, color: 'linear-gradient(45deg, #FF6B35, #F7931E)' },
    'superhero-dark': { icon: <Zap size={24} />, color: 'linear-gradient(45deg, #2C3E50, #34495E)' },
    'superhero-cosmic': { icon: <Globe size={24} />, color: 'linear-gradient(45deg, #667eea, #764ba2)' },
    'super-villain': { icon: <Skull size={24} />, color: 'linear-gradient(45deg, #8B0000, #DC143C)' },
    
    // Action & Adventure Collection
    'alien-fighter': { icon: <Rocket size={24} />, color: 'linear-gradient(45deg, #00FF7F, #32CD32)' },
    'monster-hunter': { icon: <Target size={24} />, color: 'linear-gradient(45deg, #8B4513, #A0522D)' },
    'zombie-survivor': { icon: <Skull size={24} />, color: 'linear-gradient(45deg, #556B2F, #6B8E23)' },
    'ninja-warrior': { icon: <Swords size={24} />, color: 'linear-gradient(45deg, #2F4F4F, #708090)' },
    
    // Cultural & Traditional Collection
    'indian-farmer': { icon: <Wheat size={24} />, color: 'linear-gradient(45deg, #DAA520, #B8860B)' },
    'samurai-warrior': { icon: <Sword size={24} />, color: 'linear-gradient(45deg, #DC143C, #B22222)' },
    'viking-berserker': { icon: <Axe size={24} />, color: 'linear-gradient(45deg, #4682B4, #5F9EA0)' },
    'egyptian-pharaoh': { icon: <Pyramid size={24} />, color: 'linear-gradient(45deg, #FFD700, #FFA500)' },
    
    // Fantasy Collection
    'wizard': { icon: <Wand2 size={24} />, color: 'linear-gradient(45deg, #8E44AD, #9B59B6)' },
    'warrior-princess': { icon: <Sword size={24} />, color: 'linear-gradient(45deg, #E74C3C, #C0392B)' },
    'dragon-rider': { icon: <Sparkles size={24} />, color: 'linear-gradient(45deg, #27AE60, #2ECC71)' },
    'elven-archer': { icon: <Target size={24} />, color: 'linear-gradient(45deg, #228B22, #32CD32)' },
    
    // Sci-Fi Collection
    'cyberpunk-hacker': { icon: <Cpu size={24} />, color: 'linear-gradient(45deg, #00D4FF, #0099CC)' },
    'space-marine': { icon: <Rocket size={24} />, color: 'linear-gradient(45deg, #1e3c72, #2a5298)' },
    'time-traveler': { icon: <Clock size={24} />, color: 'linear-gradient(45deg, #FF8A80, #FF5722)' },
    'robot-pilot': { icon: <Gamepad2 size={24} />, color: 'linear-gradient(45deg, #FF4500, #FF6347)' },
    
    // Classic Collection
    'pirate-captain': { icon: <Anchor size={24} />, color: 'linear-gradient(45deg, #8B4513, #D2691E)' },
    'royal-monarch': { icon: <Crown size={24} />, color: 'linear-gradient(45deg, #FFD700, #FFA500)' },
    'steampunk-inventor': { icon: <Cog size={24} />, color: 'linear-gradient(45deg, #795548, #8D6E63)' },
    'wild-west-gunslinger': { icon: <Target size={24} />, color: 'linear-gradient(45deg, #D2691E, #CD853F)' },
    
    // Modern Collection
    'secret-agent': { icon: <Eye size={24} />, color: 'linear-gradient(45deg, #37474F, #455A64)' },
    'rockstar': { icon: <Guitar size={24} />, color: 'linear-gradient(45deg, #E91E63, #AD1457)' },
    'film-noir-detective': { icon: <User size={24} />, color: 'linear-gradient(45deg, #424242, #616161)' },
    'race-car-driver': { icon: <Car size={24} />, color: 'linear-gradient(45deg, #FF0000, #FF4500)' },
    
    // Indian Mythology Collection
    'lord-krishna': { icon: <Feather size={24} />, color: 'linear-gradient(45deg, #FFD700, #FFA500)' },
    'lord-rama': { icon: <Target size={24} />, color: 'linear-gradient(45deg, #FF8C00, #FF6347)' },
    'lord-hanuman': { icon: <Mountain size={24} />, color: 'linear-gradient(45deg, #FF4500, #DC143C)' },
    'goddess-durga': { icon: <Sword size={24} />, color: 'linear-gradient(45deg, #DC143C, #B22222)' },
    'lord-shiva': { icon: <Zap size={24} />, color: 'linear-gradient(45deg, #4169E1, #1E90FF)' },
    'goddess-lakshmi': { icon: <Flower size={24} />, color: 'linear-gradient(45deg, #FFB6C1, #FF69B4)' },
    'lord-ganesha': { icon: <Heart size={24} />, color: 'linear-gradient(45deg, #FF6347, #FF4500)' },
    'goddess-saraswati': { icon: <Feather size={24} />, color: 'linear-gradient(45deg, #FFFFFF, #F0F8FF)' },
    
    // Indian Men Attire Collection
    'punjabi-groom': { icon: <Crown size={24} />, color: 'linear-gradient(45deg, #FF8C00, #DAA520)' },
    'south-indian-groom': { icon: <Flower size={24} />, color: 'linear-gradient(45deg, #FFD700, #FFA500)' },
    'rajasthani-man': { icon: <Crown size={24} />, color: 'linear-gradient(45deg, #FFD700, #FFA500)' },
    'bengali-man': { icon: <User size={24} />, color: 'linear-gradient(45deg, #4682B4, #5F9EA0)' },
    'gujarati-man': { icon: <Star size={24} />, color: 'linear-gradient(45deg, #32CD32, #228B22)' },
    'kashmiri-man': { icon: <Mountain size={24} />, color: 'linear-gradient(45deg, #87CEEB, #4682B4)' },
    
    // Indian Women Attire Collection
    'punjabi-bride': { icon: <Heart size={24} />, color: 'linear-gradient(45deg, #DC143C, #B22222)' },
    'south-indian-bride': { icon: <Flower size={24} />, color: 'linear-gradient(45deg, #FFD700, #FFA500)' },
    'rajasthani-woman': { icon: <Crown size={24} />, color: 'linear-gradient(45deg, #FFD700, #FFA500)' },
    'bengali-woman': { icon: <Flower size={24} />, color: 'linear-gradient(45deg, #DC143C, #B22222)' },
    'gujarati-woman': { icon: <Star size={24} />, color: 'linear-gradient(45deg, #FF69B4, #FF1493)' },
    'kashmiri-woman': { icon: <Mountain size={24} />, color: 'linear-gradient(45deg, #87CEEB, #4682B4)' },
    'assamese-woman': { icon: <Flower size={24} />, color: 'linear-gradient(45deg, #32CD32, #228B22)' },
    'kerala-woman': { icon: <Flower size={24} />, color: 'linear-gradient(45deg, #32CD32, #228B22)' },
    
    // Lifestyle & Career Collection
    'fashion-model': { icon: <Camera size={24} />, color: 'linear-gradient(45deg, #FF69B4, #FF1493)' },
    'business-executive': { icon: <Briefcase size={24} />, color: 'linear-gradient(45deg, #2C3E50, #34495E)' },
    'athlete-champion': { icon: <Target size={24} />, color: 'linear-gradient(45deg, #FFD700, #FFA500)' },
    'chef-master': { icon: <Heart size={24} />, color: 'linear-gradient(45deg, #FF6347, #FF4500)' },
    'artist-painter': { icon: <Palette size={24} />, color: 'linear-gradient(45deg, #9B59B6, #8E44AD)' },
    'doctor-surgeon': { icon: <Heart size={24} />, color: 'linear-gradient(45deg, #E74C3C, #C0392B)' },
    'pilot-aviator': { icon: <Rocket size={24} />, color: 'linear-gradient(45deg, #3498DB, #2980B9)' },
    'teacher-professor': { icon: <User size={24} />, color: 'linear-gradient(45deg, #27AE60, #2ECC71)' },
    
    // Adventure & Travel Collection
    'mountain-climber': { icon: <Mountain size={24} />, color: 'linear-gradient(45deg, #95A5A6, #7F8C8D)' },
    'scuba-diver': { icon: <Zap size={24} />, color: 'linear-gradient(45deg, #3498DB, #2980B9)' },
    'safari-explorer': { icon: <Globe size={24} />, color: 'linear-gradient(45deg, #F39C12, #E67E22)' },
    'motorcycle-rider': { icon: <Car size={24} />, color: 'linear-gradient(45deg, #2C3E50, #34495E)' },
    
    // Legacy options
    farmer: { icon: <Wheat size={24} />, color: 'linear-gradient(45deg, #8B4513, #D2691E)' },
    astronaut: { icon: <Rocket size={24} />, color: 'linear-gradient(45deg, #1e3c72, #2a5298)' },
    supervillain: { icon: <Skull size={24} />, color: 'linear-gradient(45deg, #434343, #000000)' },
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
  const [selectedCategory, setSelectedCategory] = useState<string>('professional');
  
  // Get unique categories from TRANSFORMATION_OPTIONS
  const categories = ['all', ...Array.from(new Set(TRANSFORMATION_OPTIONS.map(option => option.category).filter(Boolean)))];
  
  // Filter options by category
  const filteredOptions = selectedCategory === 'all' 
    ? TRANSFORMATION_OPTIONS 
    : TRANSFORMATION_OPTIONS.filter(option => option.category === selectedCategory);

  const getCategoryDisplayName = (category: string) => {
    if (category === 'all') return 'All Styles';
    return CATEGORY_INFO[category as keyof typeof CATEGORY_INFO]?.name || category;
  };

  const getCategoryIcon = (category: string) => {
    if (category === 'all') return '🎭';
    return CATEGORY_INFO[category as keyof typeof CATEGORY_INFO]?.icon || '🎭';
  };

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
            <span style={{ marginRight: '8px' }}>{getCategoryIcon(category)}</span>
            {getCategoryDisplayName(category)}
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
