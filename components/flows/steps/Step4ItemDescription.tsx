import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useCreateGroup } from '@/store/createGroupStore';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export function Step4ItemDescription() {
  const { formData, updateFormData, nextStep, prevStep } = useCreateGroup();

  const itemLabel = formData.itemType === 'cow' ? 'Cow' : 'Item';

  return (
    <View style={styles.container}>
      <ProgressIndicator currentStep={4} totalSteps={6} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={typography.h2}>Describe the {itemLabel}</Text>
        <Text style={[typography.body, styles.subtitle]}>
          Add details about what everyone is pooling for. This helps others understand exactly
          what they're contributing to.
        </Text>

        <Text style={[typography.bodyBold, styles.label]}>{itemLabel} Name (Optional)</Text>
        <TextInput
          placeholder={`e.g., ${formData.itemType === 'cow' ? 'Heifers from Fulani' : 'Catering for party'}`}
          value={formData.itemName || ''}
          onChangeText={(text) => updateFormData('itemName', text)}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button text="Next" onPress={nextStep} />
        <Button text="Back" variant="secondary" onPress={prevStep} />
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
  label: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
