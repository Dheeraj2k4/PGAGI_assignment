import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { shadowPresets } from '../utils/shadowUtils';

const SortToggle = ({ sortBy, onSortChange }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 25,
      backgroundColor: theme.surface,
      padding: 4,
      ...shadowPresets.small,
    },
    button: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      alignItems: 'center',
    },
    activeButton: {
      backgroundColor: theme.primary,
    },
    inactiveButton: {
      backgroundColor: 'transparent',
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    activeText: {
      color: theme.onPrimary,
    },
    inactiveText: {
      color: theme.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          sortBy === 'rating' ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => onSortChange('rating')}
      >
        <Text
          style={[
            styles.buttonText,
            sortBy === 'rating' ? styles.activeText : styles.inactiveText,
          ]}
        >
          Sort by Rating
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.button,
          sortBy === 'votes' ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => onSortChange('votes')}
      >
        <Text
          style={[
            styles.buttonText,
            sortBy === 'votes' ? styles.activeText : styles.inactiveText,
          ]}
        >
          Sort by Votes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SortToggle;
