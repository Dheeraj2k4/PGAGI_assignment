import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import { FAB, Searchbar, ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { storageService } from '../utils/storage';
import IdeaCard from '../components/IdeaCard';
import SortToggle from '../components/SortToggle';

const IdeaListingScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [userVotes, setUserVotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState(new Set());

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
        setFilteredIdeas(seededIdeas);
      } else {
        setIdeas(ideasData);
        setFilteredIdeas(ideasData);
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
        Toast.show({
          type: 'info',
          text1: 'Already voted',
          text2: 'You can only vote once per idea',
        });
        return;
      }

      const success = await storageService.addVote(ideaId);
      
      if (success) {
        // Update local state
        const updatedIdeas = ideas.map(idea =>
          idea.id === ideaId
            ? { ...idea, votes: idea.votes + 1, voted: true }
            : idea
        );
        setIdeas(updatedIdeas);
        filterAndSortIdeas(updatedIdeas, searchQuery, sortBy);
        setUserVotes([...userVotes, ideaId]);

        Toast.show({
          type: 'success',
          text1: 'Vote added!',
          text2: 'Thanks for supporting this idea',
        });
      }
    } catch (error) {
      console.error('Error voting:', error);
      Toast.show({
        type: 'error',
        text1: 'Vote failed',
        text2: 'Please try again',
      });
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    filterAndSortIdeas(ideas, searchQuery, newSortBy);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterAndSortIdeas(ideas, query, sortBy);
  };

  const filterAndSortIdeas = (ideasList, query, sortType) => {
    let filtered = ideasList;

    // Filter by search query
    if (query.trim()) {
      filtered = ideasList.filter(idea =>
        idea.name.toLowerCase().includes(query.toLowerCase()) ||
        idea.tagline.toLowerCase().includes(query.toLowerCase()) ||
        idea.description.toLowerCase().includes(query.toLowerCase())
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

  const renderIdea = ({ item }) => (
    <IdeaCard
      idea={item}
      onUpvote={handleUpvote}
      hasVoted={userVotes.includes(item.id)}
      expanded={expandedCards.has(item.id)}
      onToggleExpanded={toggleCardExpansion}
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
      paddingBottom: 100,
    },
    fab: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      backgroundColor: theme.primary,
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
  );
};

export default IdeaListingScreen;
