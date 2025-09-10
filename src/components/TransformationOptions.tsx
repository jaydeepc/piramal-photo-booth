import React, { useState } from 'react';
import styled from 'styled-components';
import { TRANSFORMATION_OPTIONS, CATEGORY_INFO } from '../config/gemini';
import { 
  Sparkles, User, Rocket, Zap, Star, Palette, Clock, 
  Shield, Wand2, Cpu, Crown, Anchor, Eye, Guitar, 
  Sword, Globe, Cog, Briefcase, Camera, Swords, 
  Skull, Target, Gamepad2, Wheat,
  Axe, Pyramid, Car, Heart, Flower, Mountain, 
  Feather, Shirt, Mic, ChevronRight
} from 'lucide-react';

const TransformationSection = styled.div`
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

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  padding: 0 16px;
  
  @media (max-width: 768px) {
    overflow-x: auto;
    justify-content: flex-start;
    flex-wrap: nowrap;
    scrollbar-width: none;
    padding: 0 8px;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const CategoryTab = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border: none;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: capitalize;
  white-space: nowrap;
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
    padding: 12px 20px;
    font-size: 0.8rem;
    border-radius: 14px;
  }
  
  ${props => props.$active ? `
    background: var(--gradient-primary);
    color: var(--white);
    box-shadow: var(--shadow-primary);
    transform: translateY(-2px);
  ` : `
    background: var(--surface-elevated);
    color: var(--text-secondary);
    border: 1px solid var(--border-light);
    box-shadow: var(--shadow-sm);
    
    &:hover {
      background: var(--white);
      color: var(--text-primary);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
  `}
`;

const CategoryIcon = styled.span`
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 0 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    padding: 0 8px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const OptionCard = styled.div<{ $selected: boolean }>`
  position: relative;
  background: var(--surface);
  border: 2px solid ${props => props.$selected ? 'var(--primary)' : 'var(--border-light)'};
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 18px;
    border-radius: 14px;
  }
  
  &:hover {
    transform: translateY(-6px);
    border-color: var(--primary);
    box-shadow: var(--shadow-lg);
    background: var(--white);
    
    &::before {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-3px);
    }
  }

  ${props => props.$selected && `
    background: rgba(242, 104, 65, 0.05);
    box-shadow: var(--shadow-primary);
    transform: translateY(-4px);
    
    &::before {
      transform: scaleX(1);
    }
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const IconContainer = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  color: var(--white);
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    border-radius: 14px;
  }
`;

const SelectionIndicator = styled.div<{ show: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: 700;
  font-size: 0.875rem;
  box-shadow: var(--shadow-primary);
  
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    font-size: 0.75rem;
  }
`;

const CardContent = styled.div`
  flex: 1;
`;

const OptionTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const OptionDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-light);
`;

const TryButton = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  &:hover {
    gap: 8px;
  }
`;

const PopularBadge = styled.div`
  background: var(--gradient-accent);
  color: var(--white);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-accent);
`;

const LoadingOverlay = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  z-index: 10;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-light);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface TransformationOptionsProps {
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
}

const getIconAndColor = (id: string) => {
  const iconMap = {
    // Professional Collection
    'linkedin-photo': { icon: <Briefcase size={24} />, color: 'var(--gradient-secondary)' },
    'studio-photo-black': { icon: <Camera size={24} />, color: 'linear-gradient(135deg, #000000, #333333)' },
    'studio-photo-white': { icon: <Camera size={24} />, color: 'linear-gradient(135deg, #FFFFFF, #F0F0F0)' },
    
    // Superhero Collection
    'superhero-classic': { icon: <Shield size={24} />, color: 'var(--gradient-primary)' },
    'superhero-dark': { icon: <Zap size={24} />, color: 'var(--gradient-secondary)' },
    'superhero-cosmic': { icon: <Globe size={24} />, color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    'super-villain': { icon: <Skull size={24} />, color: 'linear-gradient(135deg, #8B0000, #DC143C)' },
    
    // Action & Adventure Collection
    'alien-fighter': { icon: <Rocket size={24} />, color: 'var(--gradient-accent)' },
    'monster-hunter': { icon: <Target size={24} />, color: 'linear-gradient(135deg, #8B4513, #A0522D)' },
    'zombie-survivor': { icon: <Skull size={24} />, color: 'linear-gradient(135deg, #556B2F, #6B8E23)' },
    'ninja-warrior': { icon: <Swords size={24} />, color: 'var(--gradient-secondary)' },
    
    // Cultural & Traditional Collection
    'indian-farmer': { icon: <Wheat size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    'samurai-warrior': { icon: <Sword size={24} />, color: 'linear-gradient(135deg, #DC143C, #B22222)' },
    'viking-berserker': { icon: <Axe size={24} />, color: 'var(--gradient-secondary)' },
    'egyptian-pharaoh': { icon: <Pyramid size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    
    // Fantasy Collection
    'wizard': { icon: <Wand2 size={24} />, color: 'linear-gradient(135deg, #8E44AD, #9B59B6)' },
    'warrior-princess': { icon: <Sword size={24} />, color: 'var(--gradient-primary)' },
    'dragon-rider': { icon: <Sparkles size={24} />, color: 'var(--gradient-accent)' },
    'elven-archer': { icon: <Target size={24} />, color: 'var(--gradient-accent)' },
    
    // Sci-Fi Collection
    'cyberpunk-hacker': { icon: <Cpu size={24} />, color: 'linear-gradient(135deg, #00D4FF, #0099CC)' },
    'space-marine': { icon: <Rocket size={24} />, color: 'var(--gradient-secondary)' },
    'time-traveler': { icon: <Clock size={24} />, color: 'var(--gradient-primary)' },
    'robot-pilot': { icon: <Gamepad2 size={24} />, color: 'linear-gradient(135deg, #FF4500, #FF6347)' },
    
    // Classic Collection
    'pirate-captain': { icon: <Anchor size={24} />, color: 'linear-gradient(135deg, #8B4513, #D2691E)' },
    'royal-monarch': { icon: <Crown size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    'steampunk-inventor': { icon: <Cog size={24} />, color: 'linear-gradient(135deg, #795548, #8D6E63)' },
    'wild-west-gunslinger': { icon: <Target size={24} />, color: 'linear-gradient(135deg, #D2691E, #CD853F)' },
    
    // Modern Collection
    'secret-agent': { icon: <Eye size={24} />, color: 'var(--gradient-secondary)' },
    'rockstar': { icon: <Guitar size={24} />, color: 'var(--gradient-primary)' },
    'film-noir-detective': { icon: <User size={24} />, color: 'var(--gradient-secondary)' },
    'race-car-driver': { icon: <Car size={24} />, color: 'var(--gradient-primary)' },
    
    // Indian Mythology Collection
    'lord-krishna': { icon: <Feather size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    'lord-rama': { icon: <Target size={24} />, color: 'var(--gradient-primary)' },
    'lord-hanuman': { icon: <Mountain size={24} />, color: 'var(--gradient-primary)' },
    'goddess-durga': { icon: <Sword size={24} />, color: 'linear-gradient(135deg, #DC143C, #B22222)' },
    'lord-shiva': { icon: <Zap size={24} />, color: 'var(--gradient-secondary)' },
    'goddess-lakshmi': { icon: <Flower size={24} />, color: 'linear-gradient(135deg, #FFB6C1, #FF69B4)' },
    'lord-ganesha': { icon: <Heart size={24} />, color: 'var(--gradient-primary)' },
    'goddess-saraswati': { icon: <Feather size={24} />, color: 'linear-gradient(135deg, #FFFFFF, #F0F8FF)' },
    
    // Indian Men Attire Collection
    'punjabi-groom': { icon: <Crown size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    'south-indian-groom': { icon: <Flower size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    'rajasthani-man': { icon: <Crown size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    'bengali-man': { icon: <User size={24} />, color: 'var(--gradient-secondary)' },
    'gujarati-man': { icon: <Star size={24} />, color: 'var(--gradient-accent)' },
    'kashmiri-man': { icon: <Mountain size={24} />, color: 'var(--gradient-secondary)' },
    
    // Indian Women Attire Collection
    'punjabi-bride': { icon: <Heart size={24} />, color: 'linear-gradient(135deg, #DC143C, #B22222)' },
    'south-indian-bride': { icon: <Flower size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    'rajasthani-woman': { icon: <Crown size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    'bengali-woman': { icon: <Flower size={24} />, color: 'linear-gradient(135deg, #DC143C, #B22222)' },
    'gujarati-woman': { icon: <Star size={24} />, color: 'linear-gradient(135deg, #FF69B4, #FF1493)' },
    'kashmiri-woman': { icon: <Mountain size={24} />, color: 'var(--gradient-secondary)' },
    'assamese-woman': { icon: <Flower size={24} />, color: 'var(--gradient-accent)' },
    'kerala-woman': { icon: <Flower size={24} />, color: 'var(--gradient-accent)' },
    
    // Lifestyle & Career Collection
    'fashion-model': { icon: <Camera size={24} />, color: 'linear-gradient(135deg, #FF69B4, #FF1493)' },
    'business-executive': { icon: <Briefcase size={24} />, color: 'var(--gradient-secondary)' },
    'athlete-champion': { icon: <Target size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    'chef-master': { icon: <Heart size={24} />, color: 'var(--gradient-primary)' },
    'artist-painter': { icon: <Palette size={24} />, color: 'linear-gradient(135deg, #9B59B6, #8E44AD)' },
    'doctor-surgeon': { icon: <Heart size={24} />, color: 'linear-gradient(135deg, #E74C3C, #C0392B)' },
    'pilot-aviator': { icon: <Rocket size={24} />, color: 'var(--gradient-secondary)' },
    'teacher-professor': { icon: <User size={24} />, color: 'var(--gradient-accent)' },
    
    // Adventure & Travel Collection
    'mountain-climber': { icon: <Mountain size={24} />, color: 'var(--gradient-secondary)' },
    'scuba-diver': { icon: <Zap size={24} />, color: 'var(--gradient-secondary)' },
    'safari-explorer': { icon: <Globe size={24} />, color: 'linear-gradient(135deg, #F39C12, #E67E22)' },
    'motorcycle-rider': { icon: <Car size={24} />, color: 'var(--gradient-secondary)' },
    
    // Legacy options
    farmer: { icon: <Wheat size={24} />, color: 'linear-gradient(135deg, #8B4513, #D2691E)' },
    astronaut: { icon: <Rocket size={24} />, color: 'var(--gradient-secondary)' },
    supervillain: { icon: <Skull size={24} />, color: 'var(--gradient-secondary)' },
    filmstar: { icon: <Star size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    cartoon: { icon: <Palette size={24} />, color: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)' },
    elderly: { icon: <Clock size={24} />, color: 'linear-gradient(135deg, #8e44ad, #9b59b6)' },
    
    // Arya Collection
    'photo-with-arya-formal': { icon: <Briefcase size={24} />, color: 'var(--gradient-secondary)' },
    'photo-with-arya-casual': { icon: <User size={24} />, color: 'var(--gradient-accent)' },
    'photo-with-arya-traditional': { icon: <Crown size={24} />, color: 'linear-gradient(135deg, var(--warning), var(--warning-light))' },
    'photo-with-arya-podcast': { icon: <Mic size={24} />, color: 'linear-gradient(135deg, #9B59B6, #8E44AD)' },
    'arya-tshirt': { icon: <Shirt size={24} />, color: 'var(--gradient-primary)' }
  };
  return iconMap[id as keyof typeof iconMap] || { icon: <User size={24} />, color: 'var(--gradient-secondary)' };
};

const TransformationOptions: React.FC<TransformationOptionsProps> = ({ 
  selectedOption, 
  onSelect 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('arya');
  const [processingOption, setProcessingOption] = useState<string | null>(null);
  
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

  const handleOptionSelect = async (optionId: string) => {
    setProcessingOption(optionId);
    try {
      await onSelect(optionId);
    } finally {
      setProcessingOption(null);
    }
  };

  const isPopular = (optionId: string) => {
    const popularOptions = ['photo-with-arya-formal', 'superhero-classic', 'linkedin-photo', 'business-executive'];
    return popularOptions.includes(optionId);
  };

  return (
    <TransformationSection>
      <SectionHeader>
        <SectionTitle>Choose Your Style</SectionTitle>
        <SectionSubtitle>
          Select from our premium collection of AI transformation styles
        </SectionSubtitle>
      </SectionHeader>
      
      <CategoryTabs>
        {categories.map((category) => (
          <CategoryTab
            key={category}
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            <CategoryIcon>{getCategoryIcon(category)}</CategoryIcon>
            {getCategoryDisplayName(category)}
          </CategoryTab>
        ))}
      </CategoryTabs>
      
      <OptionsGrid>
        {filteredOptions.map((option) => {
          const { icon, color } = getIconAndColor(option.id);
          const isSelected = selectedOption === option.id;
          const isProcessing = processingOption === option.id;
          
          return (
            <OptionCard
              key={option.id}
              $selected={isSelected}
              onClick={() => !isProcessing && handleOptionSelect(option.id)}
            >
              <LoadingOverlay show={isProcessing}>
                <LoadingSpinner />
              </LoadingOverlay>
              
              <CardHeader>
                <IconContainer color={color}>
                  {icon}
                </IconContainer>
                <SelectionIndicator show={isSelected}>
                  ✓
                </SelectionIndicator>
              </CardHeader>
              
              <CardContent>
                <OptionTitle>{option.name}</OptionTitle>
                <OptionDescription>{option.description}</OptionDescription>
              </CardContent>
              
              <CardFooter>
                <TryButton>
                  Try Style
                  <ChevronRight size={16} />
                </TryButton>
                {isPopular(option.id) && <PopularBadge>Popular</PopularBadge>}
              </CardFooter>
            </OptionCard>
          );
        })}
      </OptionsGrid>
    </TransformationSection>
  );
};

export default TransformationOptions;
