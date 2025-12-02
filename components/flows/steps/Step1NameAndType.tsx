import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useCreateGroup } from '@/store/createGroupStore';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { RadioButton } from '@/components/RadioButton';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { Text } from 'react-native';

export function Step1NameAndType() {
  const { formData, updateFormData, nextStep } = useCreateGroup();

  const canProceed = formData.groupName?.trim() && formData.itemType;

  return (
    <View style={styles.container}>
      <ProgressIndicator currentStep={1} totalSteps={6} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={typography.h2}>What are you sharing?</Text>
        <Text style={[typography.body, styles.subtitle]}>
          First, give your group a name and choose what you're pooling for.
        </Text>

        <Text style={[typography.bodyBold, styles.label]}>Group Name</Text>
        <TextInput
          placeholder="e.g., Cow Share - Lekki"
          value={formData.groupName || ''}
          onChangeText={(text) => updateFormData('groupName', text)}
        />

        <Text style={[typography.bodyBold, styles.label]}>What are you sharing?</Text>
        <RadioButton
          label="Cow"
          selected={formData.itemType === 'cow'}
          onPress={() => updateFormData('itemType', 'cow')}
        />
        <RadioButton
          label="Item"
          selected={formData.itemType === 'item'}
          onPress={() => updateFormData('itemType', 'item')}
          subtitle="Any other item"
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          text="Next"
          onPress={nextStep}
          disabled={!canProceed}
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
  label: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
