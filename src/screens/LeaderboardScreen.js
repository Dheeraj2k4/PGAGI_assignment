import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Card, Chip, ToggleButton, ActivityIndicator, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { storageService } from '../utils/storage';
import { getLeaderboardBadge, getRatingColor } from '../utils/generateFakeRating';

const { width } = Dimensions.get('window');

const LeaderboardScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('votes'); // 'votes' or 'rating'
  const [animatedValues] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      setIsLoading(true);
      const ideasData = await storageService.getIdeas();
      
      // Initialize animated values for each card
      const newAnimatedValues = ideasData.slice(0, 5).map(() => new Animated.Value(0));
      animatedValues.splice(0, animatedValues.length, ...newAnimatedValues);
      
      setIdeas(ideasData);
      
      // Animate cards in sequence
      setTimeout(() => {
        animatedValues.forEach((value, index) => {
          Animated.timing(value, {
            toValue: 1,
            duration: 500,
            delay: index * 100,
            useNativeDriver: true,
          }).start();
        });
      }, 100);
    } catch (error) {
      console.error('Error loading leaderboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  const getTopIdeas = () => {
    const sorted = [...ideas].sort((a, b) => {
      if (sortBy === 'votes') {
        return b.votes - a.votes;
      } else {
        return b.rating - a.rating;
      }
    });
    return sorted.slice(0, 5);
  };

  const getGradientColors = (position) => {
    switch (position) {
      case 0: return ['#FFD700', '#FFA500']; // Gold
      case 1: return ['#C0C0C0', '#A9A9A9']; // Silver
      case 2: return ['#CD7F32', '#A0522D']; // Bronze
      default: return [theme.primary + '40', theme.primary + '20'];
    }
  };

  const renderLeaderboardItem = ({ item, index }) => {
    const animatedValue = animatedValues[index] || new Animated.Value(1);
    const badge = getLeaderboardBadge(index);
    const gradientColors = getGradientColors(index);
    
    const animatedStyle = {
      opacity: animatedValue,
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
        {
          scale: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }),
        },
      ],
    };

    const styles = StyleSheet.create({
      itemContainer: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: index < 3 ? 8 : 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: index < 3 ? 4 : 2,
        },
        shadowOpacity: index < 3 ? 0.3 : 0.25,
        shadowRadius: index < 3 ? 6 : 3.84,
      },
      gradient: {
        padding: 20,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      },
      badge: {
        fontSize: index === 0 ? 32 : index < 3 ? 28 : 24,
        marginRight: 12,
      },
      position: {
        fontSize: index === 0 ? 18 : 16,
        fontWeight: 'bold',
        color: index < 3 ? '#FFFFFF' : theme.text,
        marginRight: 8,
      },
      titleContainer: {
        flex: 1,
      },
      title: {
        fontSize: index === 0 ? 20 : 18,
        fontWeight: 'bold',
        color: index < 3 ? '#FFFFFF' : theme.text,
        marginBottom: 4,
      },
      tagline: {
        fontSize: 14,
        color: index < 3 ? '#F0F0F0' : theme.textSecondary,
        fontStyle: 'italic',
      },
      statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
      },
      statItem: {
        alignItems: 'center',
        flex: 1,
      },
      statValue: {
        fontSize: index === 0 ? 20 : 18,
        fontWeight: 'bold',
        color: index < 3 ? '#FFFFFF' : theme.text,
      },
      statLabel: {
        fontSize: 12,
        color: index < 3 ? '#F0F0F0' : theme.textSecondary,
        marginTop: 2,
      },
      chipContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      chip: {
        backgroundColor: index < 3 ? 'rgba(255,255,255,0.2)' : theme.surface,
      },
    });

    return (
      <Animated.View style={[styles.itemContainer, animatedStyle]}>
        <LinearGradient colors={gradientColors} style={styles.gradient}>
          <View style={styles.header}>
            <Text style={styles.badge}>{badge}</Text>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.tagline}>{item.tagline}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{item.votes}</Text>
              <Text style={styles.statLabel}>Votes</Text>
            </View>
            
            <View style={styles.chipContainer}>
              <Chip 
                style={styles.chip}
                textStyle={{ 
                  color: index < 3 ? '#FFFFFF' : theme.text,
                  fontSize: 12,
                  fontWeight: 'bold'
                }}
                mode="flat"
              >
                AI: {item.rating}/100
              </Chip>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: getRatingColor(item.rating) }]}>
                {item.rating}
              </Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const EmptyComponent = () => (
    <View style={leaderboardStyles.emptyContainer}>
      <Text style={[leaderboardStyles.emptyTitle, { color: theme.text }]}>
        No ideas to rank yet!
      </Text>
      <Text style={[leaderboardStyles.emptySubtitle, { color: theme.textSecondary }]}>
        Submit some ideas to see the leaderboard
      </Text>
      <TouchableOpacity
        style={[leaderboardStyles.addButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('IdeaSubmission')}
      >
        <Text style={[leaderboardStyles.addButtonText, { color: theme.onPrimary }]}>
          Add First Idea
        </Text>
      </TouchableOpacity>
    </View>
  );

  const leaderboardStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 20,
      backgroundColor: theme.surface,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      flex: 1,
      textAlign: 'center',
    },
    themeToggle: {
      backgroundColor: theme.primary + '20',
    },
    headerSubtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginBottom: 16,
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: theme.background,
      borderRadius: 25,
      padding: 4,
    },
    toggleButton: {
      flex: 1,
      borderRadius: 20,
      margin: 2,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: theme.textSecondary,
    },
    listContainer: {
      paddingVertical: 16,
      paddingBottom: 100,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 24,
    },
    addButton: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 25,
    },
    addButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    statsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.surface + '80',
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 12,
    },
    statHeaderItem: {
      alignItems: 'center',
    },
    statHeaderValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.primary,
    },
    statHeaderLabel: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },
  });

  if (isLoading) {
    return (
      <View style={[leaderboardStyles.container, leaderboardStyles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={leaderboardStyles.loadingText}>Loading leaderboard...</Text>
      </View>
    );
  }

  const topIdeas = getTopIdeas();
  const totalVotes = ideas.reduce((sum, idea) => sum + idea.votes, 0);
  const avgRating = ideas.length > 0 ? Math.round(ideas.reduce((sum, idea) => sum + idea.rating, 0) / ideas.length) : 0;

  return (
    <View style={leaderboardStyles.container}>
      <View style={leaderboardStyles.header}>
        <View style={leaderboardStyles.headerTop}>
          <Text style={leaderboardStyles.headerTitle}>🏆 Leaderboard</Text>
          <IconButton
            icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
            size={24}
            iconColor={theme.primary}
            onPress={toggleTheme}
            mode="contained-tonal"
            style={leaderboardStyles.themeToggle}
          />
        </View>
        <Text style={leaderboardStyles.headerSubtitle}>
          Top 5 startup ideas ranked by {sortBy === 'votes' ? 'community votes' : 'AI rating'}
        </Text>
        
        <View style={leaderboardStyles.toggleContainer}>
          <ToggleButton.Row
            onValueChange={setSortBy}
            value={sortBy}
            style={{ backgroundColor: 'transparent' }}
          >
            <ToggleButton 
              icon="thumb-up" 
              value="votes" 
              style={leaderboardStyles.toggleButton}
              labelStyle={{ fontSize: 12 }}
            />
            <ToggleButton 
              icon="star" 
              value="rating" 
              style={leaderboardStyles.toggleButton}
              labelStyle={{ fontSize: 12 }}
            />
          </ToggleButton.Row>
        </View>
      </View>

      {ideas.length > 0 && (
        <View style={leaderboardStyles.statsHeader}>
          <View style={leaderboardStyles.statHeaderItem}>
            <Text style={leaderboardStyles.statHeaderValue}>{ideas.length}</Text>
            <Text style={leaderboardStyles.statHeaderLabel}>Total Ideas</Text>
          </View>
          <View style={leaderboardStyles.statHeaderItem}>
            <Text style={leaderboardStyles.statHeaderValue}>{totalVotes}</Text>
            <Text style={leaderboardStyles.statHeaderLabel}>Total Votes</Text>
          </View>
          <View style={leaderboardStyles.statHeaderItem}>
            <Text style={leaderboardStyles.statHeaderValue}>{avgRating}</Text>
            <Text style={leaderboardStyles.statHeaderLabel}>Avg Rating</Text>
          </View>
        </View>
      )}

      <FlatList
        data={topIdeas}
        renderItem={renderLeaderboardItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={topIdeas.length === 0 ? { flex: 1 } : leaderboardStyles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
        ListEmptyComponent={EmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LeaderboardScreen;
