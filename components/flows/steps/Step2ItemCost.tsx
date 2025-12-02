import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useCreateGroup } from '@/store/createGroupStore';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { ErrorAlert } from '@/components/ErrorAlert';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export function Step2ItemCost() {
  const { formData, updateFormData, nextStep, prevStep } = useCreateGroup();
  const [error, setError] = useState('');

  const itemLabel = formData.itemType === 'cow' ? '1 Cow' : 'Item';
  const costStr = formData.itemCost?.toString() || '';
  const isHighCost = formData.itemCost && formData.itemCost > 5000000;

  const handleNext = () => {
    if (!formData.itemCost || formData.itemCost <= 0) {
      setError('Please enter a valid cost');
      return;
    }
    setError('');
    updateFormData('itemCost', parseFloat(costStr));
    nextStep();
  };

  return (
    <View style={styles.container}>
      <ProgressIndicator currentStep={2} totalSteps={6} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={typography.h2}>Set the Total Cost</Text>
        <Text style={[typography.body, styles.subtitle]}>
          Enter how much {itemLabel.toLowerCase()} and everything will cost, we'll divide it
          equally across all slots automatically.
        </Text>

        <TextInput
          prefix="₦"
          keyboardType="decimal-pad"
          value={costStr}
          onChangeText={(text) => updateFormData('itemCost', parseFloat(text) || 0)}
          placeholder="0"
        />

        {error && <ErrorAlert message={error} />}

        {isHighCost && (
          <ErrorAlert message={`Ah ah now, is this not too high for a ${formData.itemType}?`} />
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button text="Next" onPress={handleNext} style={styles.nextButton} />
        <Button
          text="Back"
          variant="secondary"
          onPress={prevStep}
          style={styles.backButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  subtitle: {
    color: colors.text.secondary,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  nextButton: {
    marginBottom: spacing.md,
  },
  backButton: {
    marginBottom: 0,
  },
});
