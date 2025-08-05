import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { TextInput, Button, Card, HelperText } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useTheme } from '../context/ThemeContext';
import { storageService } from '../utils/storage';
import { generateFakeRating, generateFakeFeedback, generateId } from '../utils/generateFakeRating';
import { shadowPresets } from '../utils/shadowUtils';

const IdeaSubmissionScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    startupName: '',
    tagline: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate fake AI data
      const rating = generateFakeRating();
      const feedback = generateFakeFeedback();

      // Create new idea object
      const newIdea = {
        id: generateId(),
        name: formData.startupName.trim(),
        tagline: formData.tagline.trim(),
        description: formData.description.trim(),
        rating,
        votes: 0,
        voted: false,
        submittedAt: new Date().toISOString(),
        feedback,
      };

      // Save to storage
      const success = await storageService.addIdea(newIdea);

      if (success) {
        // Show success toast
        Toast.show({
          type: 'success',
          text1: 'Idea submitted!',
          text2: `AI Rating: ${rating}/100 - ${feedback}`,
          visibilityTime: 4000,
        });

        // Reset form
        setFormData({
          startupName: '',
          tagline: '',
          description: '',
        });
        setErrors({});

        // Navigate to idea listing
        navigation.navigate('IdeaListing');
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
    </KeyboardAvoidingView>
  );
};

export default IdeaSubmissionScreen;
