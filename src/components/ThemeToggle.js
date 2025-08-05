import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ style, size = 24, showLabel = false }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  if (showLabel) {
    return (
      <TouchableOpacity 
        style={[styles.container, style]}
        onPress={toggleTheme}
      >
        <IconButton
          icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
          size={size}
          iconColor={theme.primary}
          mode="contained-tonal"
        />
        {showLabel && (
          <Text style={[styles.label, { color: theme.text }]}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <IconButton
      icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
      size={size}
      iconColor={theme.primary}
      onPress={toggleTheme}
      mode="contained-tonal"
      style={style}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default ThemeToggle;
