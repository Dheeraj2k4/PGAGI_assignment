import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { TextInput, Button, Card, HelperText, Menu, Chip } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useTheme } from '../context/ThemeContext';
import { storageService } from '../utils/storage';
import { generateFakeRating, generateFakeFeedback, generateId } from '../utils/generateFakeRating';
import { shadowPresets } from '../utils/shadowUtils';
import SimpleConfetti from '../components/SimpleConfetti';

const IdeaSubmissionScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    startupName: '',
    tagline: '',
    description: '',
    category: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const categories = [
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.startupName.trim()) {
      newErrors.startupName = 'Startup name is required';
    } else if (formData.startupName.trim().length < 2) {
      newErrors.startupName = 'Startup name must be at least 2 characters';
    }

    if (!formData.tagline.trim()) {
      newErrors.tagline = 'Tagline is required';
    } else if (formData.tagline.trim().length < 5) {
      newErrors.tagline = 'Tagline must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log('Submit button pressed');
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed, starting submission');
    setIsSubmitting(true);

    try {
      // Generate fake AI data
      const rating = generateFakeRating();
      const feedback = generateFakeFeedback();
      console.log('Generated AI data');

      // Create new idea object
      const newIdea = {
        id: generateId(),
        name: formData.startupName.trim(),
        tagline: formData.tagline.trim(),
        description: formData.description.trim(),
        category: formData.category,
        rating,
        votes: 0,
        voted: false,
        submittedAt: new Date().toISOString(),
        feedback,
      };

      console.log('Saving idea to storage...');
      // Save to storage
      const success = await storageService.addIdea(newIdea);

      if (success) {
        console.log('Idea saved successfully, showing confetti');
        
        // Show success toast first
        Toast.show({
          type: 'success',
          text1: '🎉 Idea submitted successfully!',
          text2: `AI Rating: ${rating}/100 - ${feedback}`,
          visibilityTime: 4000,
        });

        // Trigger confetti animation
        setShowConfetti(true);

        // Reset form
        setFormData({
          startupName: '',
          tagline: '',
          description: '',
          category: '',
        });
        setErrors({});

        // Navigate to idea listing after a brief delay
        setTimeout(() => {
          navigation.navigate('IdeaListing');
        }, 1500);
      } else {
        throw new Error('Failed to save idea');
      }
    } catch (error) {
      console.error('Error submitting idea:', error);
      Toast.show({
        type: 'error',
        text1: 'Submission failed',
        text2: 'Please try again later',
      });
    } finally {
      setIsSubmitting(false);
      console.log('Submission process finished');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 22,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 20,
      ...shadowPresets.medium,
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      backgroundColor: theme.background,
      fontSize: 16,
    },
    descriptionInput: {
      backgroundColor: theme.background,
      fontSize: 16,
      minHeight: 120,
    },
    submitButton: {
      marginTop: 24,
      borderRadius: 25,
      paddingVertical: 4,
    },
    submitButtonContent: {
      paddingVertical: 8,
    },
    characterCount: {
      textAlign: 'right',
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 4,
    },
    tipContainer: {
      backgroundColor: theme.primary + '20',
      borderRadius: 12,
      padding: 16,
      marginTop: 20,
      borderLeftWidth: 4,
      borderLeftColor: theme.primary,
    },
    tipTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.primary,
      marginBottom: 8,
    },
    tipText: {
      fontSize: 14,
      color: theme.text,
      lineHeight: 20,
    },
    categoryLabel: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
    },
    categoryButton: {
      borderColor: theme.border,
      borderRadius: 8,
      marginBottom: 4,
    },
    categoryButtonContent: {
      paddingVertical: 8,
      justifyContent: 'flex-start',
    },
    categoryButtonLabel: {
      fontSize: 16,
      textAlign: 'left',
    },
    selectedCategoryChip: {
      alignSelf: 'flex-start',
      marginTop: 8,
      backgroundColor: theme.primary + '20',
      borderColor: theme.primary,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>🚀 Submit Your Idea</Text>
        <Text style={styles.subtitle}>
          Share your startup concept and get instant AI feedback plus community votes!
        </Text>

        <Card style={styles.card}>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Startup Name"
              value={formData.startupName}
              onChangeText={(text) => {
                setFormData({ ...formData, startupName: text });
                if (errors.startupName) {
                  setErrors({ ...errors, startupName: '' });
                }
              }}
              style={styles.input}
              error={!!errors.startupName}
              placeholder="e.g., EcoDelivery"
              maxLength={50}
            />
            <HelperText type="error" visible={!!errors.startupName}>
              {errors.startupName}
            </HelperText>
            <Text style={styles.characterCount}>
              {formData.startupName.length}/50
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Tagline"
              value={formData.tagline}
              onChangeText={(text) => {
                setFormData({ ...formData, tagline: text });
                if (errors.tagline) {
                  setErrors({ ...errors, tagline: '' });
                }
              }}
              style={styles.input}
              error={!!errors.tagline}
              placeholder="e.g., Carbon-neutral food delivery"
              maxLength={100}
            />
            <HelperText type="error" visible={!!errors.tagline}>
              {errors.tagline}
            </HelperText>
            <Text style={styles.characterCount}>
              {formData.tagline.length}/100
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Description"
              value={formData.description}
              onChangeText={(text) => {
                setFormData({ ...formData, description: text });
                if (errors.description) {
                  setErrors({ ...errors, description: '' });
                }
              }}
              style={styles.descriptionInput}
              multiline
              numberOfLines={6}
              error={!!errors.description}
              placeholder="Describe your startup idea in detail. What problem does it solve? Who is your target audience? What makes it unique?"
              maxLength={500}
            />
            <HelperText type="error" visible={!!errors.description}>
              {errors.description}
            </HelperText>
            <Text style={styles.characterCount}>
              {formData.description.length}/500
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.categoryLabel, { color: theme.text }]}>Category *</Text>
            <Menu
              visible={showCategoryMenu}
              onDismiss={() => setShowCategoryMenu(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setShowCategoryMenu(true)}
                  style={[styles.categoryButton, errors.category && { borderColor: theme.error }]}
                  contentStyle={styles.categoryButtonContent}
                  labelStyle={[styles.categoryButtonLabel, { color: formData.category ? theme.text : theme.textSecondary }]}
                >
                  {formData.category || 'Select a category'}
                </Button>
              }
            >
              {categories.map((category) => (
                <Menu.Item
                  key={category}
                  title={category}
                  onPress={() => {
                    setFormData({ ...formData, category });
                    setShowCategoryMenu(false);
                    if (errors.category) {
                      setErrors({ ...errors, category: '' });
                    }
                  }}
                />
              ))}
            </Menu>
            <HelperText type="error" visible={!!errors.category}>
              {errors.category}
            </HelperText>
            {formData.category && (
              <Chip 
                mode="outlined" 
                style={styles.selectedCategoryChip}
                textStyle={{ color: theme.primary }}
              >
                {formData.category}
              </Chip>
            )}
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
            labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Idea'}
          </Button>
        </Card>

        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>💡 Pro Tips</Text>
          <Text style={styles.tipText}>
            • Be specific about the problem you're solving{'\n'}
            • Explain your unique value proposition{'\n'}
            • Consider your target market{'\n'}
            • Keep it concise but informative
          </Text>
        </View>
      </ScrollView>

      {/* Simple Confetti Animation */}
      <SimpleConfetti 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </KeyboardAvoidingView>
  );
};

export default IdeaSubmissionScreen;
