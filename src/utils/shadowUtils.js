import { Platform } from 'react-native';

// Utility function to get platform-specific shadow styles
export const getShadowStyle = (elevation = 4, opacity = 0.25) => {
  if (Platform.OS === 'web') {
    const webShadow = elevation <= 2 ? 
      `0px 1px 3px rgba(0, 0, 0, ${opacity})` :
      elevation <= 4 ?
      `0px 2px 8px rgba(0, 0, 0, ${opacity})` :
      `0px 4px 12px rgba(0, 0, 0, ${opacity})`;
    
    return {
      boxShadow: webShadow,
    };
  }
  
  return {
    elevation,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: elevation / 2,
    },
    shadowOpacity: opacity,
    shadowRadius: elevation,
  };
};

// Common shadow presets
export const shadowPresets = {
  small: getShadowStyle(2, 0.15),
  medium: getShadowStyle(4, 0.25),
  large: getShadowStyle(8, 0.3),
};

// Helper for card shadows
export const getCardShadow = (elevated = false) => {
  return elevated ? shadowPresets.large : shadowPresets.medium;
};
