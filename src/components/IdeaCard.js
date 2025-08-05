import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import { Card, Button, Chip, Divider, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getRatingColor, getDaysSinceSubmission } from '../utils/generateFakeRating';
import { shadowPresets } from '../utils/shadowUtils';

const IdeaCard = ({ idea, onUpvote, hasVoted, expanded, onToggleExpanded }) => {
  const { theme } = useTheme();
  const [scaleValue] = useState(new Animated.Value(1));

  const handleUpvote = () => {
    // Animate button press
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();

    onUpvote(idea.id);
  };

  const styles = StyleSheet.create({
    card: {
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 12,
      backgroundColor: theme.surface,
      ...shadowPresets.medium,
    },
    cardContent: {
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    titleContainer: {
      flex: 1,
      marginRight: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 4,
    },
    tagline: {
      fontSize: 14,
      color: theme.textSecondary,
      fontStyle: 'italic',
    },
    ratingContainer: {
      alignItems: 'center',
    },
    rating: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    ratingLabel: {
      fontSize: 10,
      color: theme.textSecondary,
      textAlign: 'center',
    },
    description: {
      fontSize: 14,
      color: theme.text,
      lineHeight: 20,
      marginVertical: 12,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
    },
    leftFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    voteContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
    },
    voteButton: {
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      minWidth: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    voteContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    voteText: {
      fontSize: 12,
      fontWeight: 'bold',
      marginLeft: 4,
    },
    dateText: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    readMoreButton: {
      paddingVertical: 4,
    },
    readMoreText: {
      color: theme.primary,
      fontSize: 12,
      fontWeight: '600',
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
    },
    chip: {
      marginRight: 8,
      marginBottom: 4,
    },
  });

  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{idea.name}</Text>
            <Text style={styles.tagline}>{idea.tagline}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={[styles.rating, { color: getRatingColor(idea.rating) }]}>
              {idea.rating}
            </Text>
            <Text style={styles.ratingLabel}>AI Score</Text>
          </View>
        </View>

        {expanded && (
          <>
            <Divider style={{ marginVertical: 8 }} />
            <Text style={styles.description}>{idea.description}</Text>
          </>
        )}

        <View style={styles.footer}>
          <View style={styles.leftFooter}>
            <Animated.View style={[styles.voteContainer, { transform: [{ scale: scaleValue }] }]}>
              <TouchableOpacity
                style={[
                  styles.voteButton,
                  { backgroundColor: hasVoted ? theme.primary : theme.surface },
                  { borderColor: hasVoted ? theme.primary : theme.border },
                  { borderWidth: hasVoted ? 0 : 1 },
                ]}
                onPress={handleUpvote}
              >
                <View style={styles.voteContent}>
                  <MaterialCommunityIcons 
                    name={hasVoted ? "thumb-up" : "thumb-up-outline"} 
                    size={16} 
                    color={hasVoted ? theme.onPrimary : theme.primary}
                  />
                  <Text style={[styles.voteText, { color: hasVoted ? theme.onPrimary : theme.text }]}>
                    {idea.votes}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
            <Text style={styles.dateText}>{getDaysSinceSubmission(idea.submittedAt)}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.readMoreButton}
            onPress={() => onToggleExpanded(idea.id)}
          >
            <Text style={styles.readMoreText}>
              {expanded ? 'Show Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        </View>

        {expanded && (
          <View style={styles.chipContainer}>
            <Chip 
              style={styles.chip} 
              textStyle={{ fontSize: 10 }}
              mode="outlined"
            >
              Rating: {idea.rating}/100
            </Chip>
            <Chip 
              style={styles.chip} 
              textStyle={{ fontSize: 10 }}
              mode="outlined"
            >
              {idea.votes} votes
            </Chip>
          </View>
        )}
      </View>
    </Card>
  );
};

export default IdeaCard;
