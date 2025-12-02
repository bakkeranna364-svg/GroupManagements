import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useCreateGroup } from '@/store/createGroupStore';
import { Button } from '@/components/Button';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { CircularProgress } from '@/components/CircularProgress';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export function Step3NumberOfPeople() {
  const { formData, updateFormData, nextStep, prevStep } = useCreateGroup();

  const numberOfPeople = formData.numberOfPeople || 0;
  const costPerPerson = formData.itemCost && numberOfPeople > 0
    ? Math.round(formData.itemCost / numberOfPeople)
    : 0;
  const goal = formData.itemCost || 0;

  const handleIncrement = () => {
    updateFormData('numberOfPeople', numberOfPeople + 1);
    updateFormData('slots', numberOfPeople + 1);
  };

  const handleDecrement = () => {
    if (numberOfPeople > 0) {
      updateFormData('numberOfPeople', numberOfPeople - 1);
      updateFormData('slots', numberOfPeople - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressIndicator currentStep={3} totalSteps={6} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={typography.h2}>How Many People Can Join?</Text>
        <Text style={[typography.body, styles.subtitle]}>
          Enter how much the entire cow or item costs, we'll divide it equally across all slots
          automatically.
        </Text>

        <View style={styles.costCard}>
          <Text style={[typography.bodyBold, styles.costAmount]}>
            ₦{costPerPerson.toLocaleString()}
          </Text>
          <Text style={typography.body}>/person</Text>
          <Text style={[typography.body, styles.goalText]}>
            Goal: ₦{Math.round(goal / 1000)}K
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <CircularProgress
            progress={numberOfPeople}
            total={Math.max(numberOfPeople + 5, 10)}
            size={180}
            label="People"
          />
        </View>

        <View style={styles.counterContainer}>
          <Button
            text="-"
            variant="secondary"
            size="small"
            onPress={handleDecrement}
            style={styles.counterButton}
          />
          <Text style={[typography.h3, styles.counterValue]}>{numberOfPeople}</Text>
          <Button
            text="+"
            variant="secondary"
            size="small"
            onPress={handleIncrement}
            style={styles.counterButton}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button text="Next" onPress={nextStep} disabled={numberOfPeople === 0} />
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
    alignItems: 'center',
  },
  subtitle: {
    color: colors.text.secondary,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  costCard: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.xl,
    alignSelf: 'flex-start',
  },
  costAmount: {
    fontSize: 24,
    color: colors.text.primary,
  },
  goalText: {
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  progressContainer: {
    marginVertical: spacing.xl,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.lg,
  },
  counterButton: {
    paddingHorizontal: spacing.md,
  },
  counterValue: {
    minWidth: 60,
    textAlign: 'center',
    color: colors.text.primary,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
