import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useCreateGroup } from '@/store/createGroupStore';
import { Button } from '@/components/Button';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface Step6SummaryProps {
  onPayment: () => void;
  onSuccess: () => void;
}

export function Step6Summary({ onPayment }: Step6SummaryProps) {
  const { formData, prevStep } = useCreateGroup();

  const costPerPerson = formData.numberOfPeople && formData.itemCost
    ? Math.round(formData.itemCost / formData.numberOfPeople)
    : 0;

  const deadlineStr = formData.deadline
    ? formData.deadline.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Not set';

  return (
    <View style={styles.container}>
      <ProgressIndicator currentStep={6} totalSteps={6} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={typography.h2}>Review & Publish</Text>

        <View style={styles.summaryCard}>
          <Text style={[typography.h3, styles.groupName]}>
            {formData.groupName}
          </Text>

          <View style={styles.summaryRow}>
            <Text style={typography.body}>You'll pay first</Text>
            <Text style={[typography.bodyBold, { color: colors.text.primary }]}>
              ₦{formData.itemCost?.toLocaleString()}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={typography.body}>Cost per person</Text>
            <Text style={[typography.h3, { color: colors.text.primary }]}>
              ₦{costPerPerson.toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={typography.body}>{formData.numberOfPeople} Slots</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={typography.body}>Deadline</Text>
            <Text style={[typography.bodyBold, { color: colors.text.primary }]}>
              {formData.isFlexible ? 'Flexible' : deadlineStr}
            </Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={[typography.caption, { color: colors.text.secondary }]}>
            Buyers trust hosts who also take a slot. Your contribution will be the first one
            shown when others view this group.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          text="Create Group"
          onPress={onPayment}
        />
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
  summaryCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  groupName: {
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  infoBox: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 8,
    marginTop: spacing.lg,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
