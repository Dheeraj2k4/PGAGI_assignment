import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import IdeaCard from './IdeaCard';

const SwipeableIdeaCard = ({ 
  idea, 
  userVotes, 
  onUpvote, 
  onToggleExpansion, 
  isExpanded,
  onReadMore
}) => {
  const { theme } = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const gestureRef = useRef(null);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      
      if (translationX > 80) {
        // Swipe right - Read More action
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        onReadMore(idea);
      } else {
        // Snap back
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const rightAction = () => (
    <View style={[styles.actionContainer, styles.rightAction, { backgroundColor: theme.primary + '20' }]}>
      <IconButton 
        icon="book-open-variant"
        iconColor={theme.primary}
        size={24}
      />
      <Text style={[styles.actionText, { color: theme.primary }]}>Read More</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Background Action */}
      <View style={styles.actionsContainer}>
        {rightAction()}
      </View>

      {/* Swipeable Card */}
      <PanGestureHandler
        ref={gestureRef}
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-10, 10]}
      >
        <Animated.View
          style={[
            styles.cardContainer,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <IdeaCard
            idea={idea}
            onUpvote={onUpvote}
            hasVoted={userVotes.includes(idea.id)}
            expanded={isExpanded}
            onToggleExpanded={onToggleExpansion}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 16,
  },
  actionsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 1,
  },
  actionContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 12,
    margin: 2,
  },
  rightAction: {
    // Position on the left side for right swipe
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  cardContainer: {
    zIndex: 2,
  },
});

export default SwipeableIdeaCard;
