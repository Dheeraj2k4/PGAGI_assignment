import React, { useEffect, useState } from 'react';
import { View, Animated, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SimpleConfetti = ({ trigger, onComplete }) => {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (trigger) {
      generateConfetti();
    }
  }, [trigger]);

  const generateConfetti = () => {
    const pieces = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD700', '#96CEB4', '#F7DC6F'];
    
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: new Animated.Value(Math.random() * screenWidth),
        top: new Animated.Value(-20),
        rotation: new Animated.Value(0),
        opacity: new Animated.Value(1),
      });
    }
    
    setConfettiPieces(pieces);
    
    pieces.forEach((piece, index) => {
      Animated.parallel([
        Animated.timing(piece.top, {
          toValue: screenHeight + 100,
          duration: 3000 + Math.random() * 1000,
          useNativeDriver: false,
        }),
        Animated.timing(piece.rotation, {
          toValue: 360,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: false,
        }),
        Animated.timing(piece.opacity, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ]).start(() => {
        if (index === pieces.length - 1) {
          setConfettiPieces([]);
          onComplete && onComplete();
        }
      });
    });
  };

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      pointerEvents: 'none',
    }}>
      {confettiPieces.map((piece) => (
        <Animated.View
          key={piece.id}
          style={{
            position: 'absolute',
            left: piece.left,
            top: piece.top,
            width: 8,
            height: 8,
            backgroundColor: piece.color,
            borderRadius: 4,
            opacity: piece.opacity,
            transform: [
              {
                rotate: piece.rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        />
      ))}
    </View>
  );
};

export default SimpleConfetti;
