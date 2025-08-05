import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  Animated,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FAB, Searchbar, ActivityIndicator, Chip, Menu, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { storageService } from '../utils/storage';
import IdeaCard from '../components/IdeaCard';
import SwipeableIdeaCard from '../components/SwipeableIdeaCard';
import SortToggle from '../components/SortToggle';

const IdeaListingScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  
  // Detect if device has hardware navigation buttons
  const { height: screenHeight } = Dimensions.get('screen');
  const { height: windowHeight } = Dimensions.get('window');
  const hasHardwareButtons = screenHeight - windowHeight > 0;
  
  // Calculate dynamic bottom positioning for FAB
  const getFABBottom = () => {
    if (Platform.OS === 'ios') {
      return Math.max(insets.bottom + 16, 36);
    } else {
      if (hasHardwareButtons) {
        return Math.max(insets.bottom + 80, 100);
      } else {
        return Math.max(insets.bottom + 16, 36);
      }
    }
  };
  
  const dynamicFABBottom = getFABBottom();
  const dynamicListPadding = dynamicFABBottom + 80; // FAB height + extra space
  
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [userVotes, setUserVotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const categories = [
    'All',
    'HealthTech',
    'EdTech', 
    'FinTech',
    'AI/ML',
    'E-commerce',
    'SaaS',
    'GreenTech',
    'FoodTech',
    'PropTech',
    'Gaming',
    'Other'
  ];

  // Load data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [ideasData, votesData] = await Promise.all([
        storageService.getIdeas(),
        storageService.getUserVotes(),
      ]);

      // If no ideas exist, seed sample data
      if (ideasData.length === 0) {
        await storageService.seedSampleData();
        const seededIdeas = await storageService.getIdeas();
        setIdeas(seededIdeas);
        filterAndSortIdeas(seededIdeas, searchQuery, sortBy, selectedCategory);
      } else {
        setIdeas(ideasData);
        filterAndSortIdeas(ideasData, searchQuery, sortBy, selectedCategory);
      }

      setUserVotes(votesData);
    } catch (error) {
      console.error('Error loading data:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to load ideas',
        text2: 'Please try again',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  const handleUpvote = async (ideaId) => {
    try {
      const hasVoted = userVotes.includes(ideaId);
      
      if (hasVoted) {
        // Remove vote
        const success = await storageService.removeVote(ideaId);
        
        if (success) {
          // Update local state
          const updatedIdeas = ideas.map(idea =>
            idea.id === ideaId
              ? { ...idea, votes: Math.max(0, idea.votes - 1), voted: false }
              : idea
          );
          setIdeas(updatedIdeas);
          filterAndSortIdeas(updatedIdeas, searchQuery, sortBy, selectedCategory);
          setUserVotes(userVotes.filter(id => id !== ideaId));

          const idea = ideas.find(i => i.id === ideaId);
          Toast.show({
            type: 'info',
            text1: '� Vote removed!',
            text2: `Removed vote from "${idea?.name}" - Total votes: ${Math.max(0, (idea?.votes || 1) - 1)}`,
            visibilityTime: 2500,
          });
        }
      } else {
        // Add vote
        const success = await storageService.addVote(ideaId);
        
        if (success) {
          // Update local state
          const updatedIdeas = ideas.map(idea =>
            idea.id === ideaId
              ? { ...idea, votes: idea.votes + 1, voted: true }
              : idea
          );
          setIdeas(updatedIdeas);
          filterAndSortIdeas(updatedIdeas, searchQuery, sortBy, selectedCategory);
          setUserVotes([...userVotes, ideaId]);

          const idea = ideas.find(i => i.id === ideaId);
          Toast.show({
            type: 'success',
            text1: '👍 Voted!',
            text2: `You voted for "${idea?.name}" - Total votes: ${(idea?.votes || 0) + 1}`,
            visibilityTime: 2500,
          });
        }
      }
    } catch (error) {
      console.error('Error toggling vote:', error);
      Toast.show({
        type: 'error',
        text1: 'Vote failed',
        text2: 'Please try again',
      });
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    filterAndSortIdeas(ideas, searchQuery, newSortBy, selectedCategory);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterAndSortIdeas(ideas, query, sortBy, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowCategoryMenu(false);
    filterAndSortIdeas(ideas, searchQuery, sortBy, category);
  };

  const filterAndSortIdeas = (ideasList, query, sortType, category) => {
    let filtered = [...ideasList];

    // Filter by category first
    if (category && category !== 'All') {
      filtered = filtered.filter(idea => idea.category === category);
    }

    // Then filter by search query
    if (query.trim()) {
      filtered = filtered.filter(idea =>
        idea.name.toLowerCase().includes(query.toLowerCase()) ||
        idea.tagline.toLowerCase().includes(query.toLowerCase()) ||
        idea.description.toLowerCase().includes(query.toLowerCase()) ||
        (idea.category && idea.category.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Sort ideas
    const sorted = [...filtered].sort((a, b) => {
      if (sortType === 'rating') {
        return b.rating - a.rating;
      } else {
        return b.votes - a.votes;
      }
    });

    setFilteredIdeas(sorted);
  };

  const toggleCardExpansion = (ideaId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(ideaId)) {
      newExpanded.delete(ideaId);
    } else {
      newExpanded.add(ideaId);
    }
    setExpandedCards(newExpanded);
  };

  const handleReadMore = (idea) => {
    toggleCardExpansion(idea.id);
    Toast.show({
      type: 'info',
      text1: '📖 Expanding details',
      text2: `Reading more about ${idea.name}`,
      visibilityTime: 1500,
    });
  };

  const renderIdea = ({ item }) => (
    <SwipeableIdeaCard
      idea={item}
      userVotes={userVotes}
      onUpvote={handleUpvote}
      onToggleExpansion={toggleCardExpansion}
      isExpanded={expandedCards.has(item.id)}
      onReadMore={handleReadMore}
    />
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        No ideas yet!
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        Be the first to submit a startup idea
      </Text>
    </View>
  );

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    searchContainer: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    searchbar: {
      backgroundColor: theme.surface,
      borderRadius: 25,
      elevation: 2,
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
      paddingBottom: dynamicListPadding, // Dynamic padding based on device
    },
    fab: {
      position: 'absolute',
      right: 16,
      bottom: dynamicFABBottom, // Dynamic positioning based on device
      backgroundColor: theme.primary,
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingBottom: 8,
      gap: 12,
    },
    categoryFilterButton: {
      borderColor: theme.border,
      borderRadius: 20,
    },
    categoryFilterContent: {
      paddingHorizontal: 12,
      paddingVertical: 4,
    },
    selectedFilterChip: {
      backgroundColor: theme.primary + '20',
      borderColor: theme.primary,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      textAlign: 'center',
    },
    headerContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    headerText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    statsText: {
      fontSize: 14,
      color: theme.textSecondary,
    },
  });

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={styles.loadingText}>Loading ideas...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search ideas..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchbar}
          iconColor={theme.primary}
        />
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <Menu
          visible={showCategoryMenu}
          onDismiss={() => setShowCategoryMenu(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setShowCategoryMenu(true)}
              style={styles.categoryFilterButton}
              contentStyle={styles.categoryFilterContent}
              icon="filter-variant"
            >
              {selectedCategory}
            </Button>
          }
        >
          {categories.map((category) => (
            <Menu.Item
              key={category}
              title={category}
              onPress={() => handleCategoryChange(category)}
              titleStyle={selectedCategory === category ? { color: theme.primary, fontWeight: 'bold' } : {}}
            />
          ))}
        </Menu>
        
        {selectedCategory !== 'All' && (
          <Chip 
            mode="outlined" 
            style={styles.selectedFilterChip}
            textStyle={{ color: theme.primary }}
            onClose={() => handleCategoryChange('All')}
          >
            {selectedCategory}
          </Chip>
        )}
      </View>

      <SortToggle sortBy={sortBy} onSortChange={handleSortChange} />

      {filteredIdeas.length > 0 && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {searchQuery ? 'Search Results' : 'All Ideas'}
          </Text>
          <Text style={styles.statsText}>
            Showing {filteredIdeas.length} of {ideas.length} ideas
          </Text>
        </View>
      )}

      <FlatList
        data={filteredIdeas}
        renderItem={renderIdea}
        keyExtractor={(item) => item.id}
        contentContainerStyle={filteredIdeas.length === 0 ? { flex: 1 } : styles.listContainer}
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

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('IdeaSubmission')}
        label="Add Idea"
      />
    </View>
    </SafeAreaView>
  );
};

export default IdeaListingScreen;
