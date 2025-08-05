import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import IdeaSubmissionScreen from './src/screens/IdeaSubmissionScreen';
import IdeaListingScreen from './src/screens/IdeaListingScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import ErrorBoundary from './src/components/ErrorBoundary';
import ThemeToggle from './src/components/ThemeToggle';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { theme, isDarkMode } = useTheme();

  const paperTheme = {
    ...(isDarkMode ? MD3DarkTheme : MD3LightTheme),
    colors: {
      ...(isDarkMode ? MD3DarkTheme.colors : MD3LightTheme.colors),
      primary: theme.primary,
      background: theme.background,
      surface: theme.surface,
      onSurface: theme.text,
      onBackground: theme.text,
      error: theme.error,
    },
  };

  // Navigation theme
  const navigationTheme = {
    dark: isDarkMode,
    colors: {
      primary: theme.primary,
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.border,
      notification: theme.primary,
    },
    fonts: {
      regular: {
        fontFamily: Platform.select({
          ios: 'System',
          android: 'Roboto',
          web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }),
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: Platform.select({
          ios: 'System',
          android: 'Roboto-Medium',
          web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }),
        fontWeight: '500',
      },
      bold: {
        fontFamily: Platform.select({
          ios: 'System',
          android: 'Roboto-Bold',
          web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }),
        fontWeight: 'bold',
      },
      heavy: {
        fontFamily: Platform.select({
          ios: 'System',
          android: 'Roboto-Black',
          web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }),
        fontWeight: '900',
      },
    },
  };

  // Platform-specific shadow styles
  const getShadowStyle = () => {
    if (Platform.OS === 'web') {
      return {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      };
    }
    return {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    };
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style={isDarkMode ? 'light' : 'dark'} />
          
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'IdeaSubmission') {
                iconName = focused ? 'lightbulb' : 'lightbulb-outline';
              } else if (route.name === 'IdeaListing') {
                iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted';
              } else if (route.name === 'Leaderboard') {
                iconName = focused ? 'trophy' : 'trophy-outline';
              }

              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.primary,
            tabBarInactiveTintColor: theme.textSecondary,
            tabBarStyle: {
              backgroundColor: theme.surface,
              borderTopColor: theme.border,
              paddingBottom: Platform.OS === 'web' ? 5 : 5,
              paddingTop: 5,
              height: 60,
              ...(Platform.OS === 'web' ? {
                boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
              } : {}),
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
            headerStyle: {
              backgroundColor: theme.surface,
              ...getShadowStyle(),
              borderBottomWidth: Platform.OS === 'web' ? 0 : undefined,
            },
            headerTintColor: theme.text,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
              color: theme.text,
              ...(Platform.OS === 'web' && {
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }),
            },
          })}
        >
          <Tab.Screen
            name="IdeaSubmission"
            component={IdeaSubmissionScreen}
            options={{
              tabBarLabel: 'Submit',
              headerTitle: 'Submit Idea',
              headerRight: () => <ThemeToggle style={{ marginRight: 8 }} />,
            }}
          />
          <Tab.Screen
            name="IdeaListing"
            component={IdeaListingScreen}
            options={{
              tabBarLabel: 'Ideas',
              headerTitle: 'All Ideas',
              headerRight: () => <ThemeToggle style={{ marginRight: 8 }} />,
            }}
          />
          <Tab.Screen
            name="Leaderboard"
            component={LeaderboardScreen}
            options={{
              tabBarLabel: 'Leaderboard',
              headerTitle: 'Leaderboard',
              headerShown: false, // We'll handle the header in the component
            }}
          />
        </Tab.Navigator>
        
        <Toast />
      </NavigationContainer>
    </PaperProvider>
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
