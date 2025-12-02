import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { Check } from 'lucide-react-native';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const stepWidth = 100 / totalSteps;

  return (
    <View style={styles.container}>
      <View style={styles.progressLine}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            },
          ]}
        />
      </View>

      <View style={styles.stepsContainer}>
        {steps.map((step) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <View key={step} style={styles.stepWrapper}>
              <View
                style={[
                  styles.stepCircle,
                  isCurrent && styles.stepCircleCurrent,
                  isCompleted && styles.stepCircleCompleted,
                ]}
              >
                {isCompleted ? (
                  <Check size={16} color={colors.white} strokeWidth={3} />
                ) : (
                  <Text
                    style={[
                      typography.captionBold,
                      {
                        color: isCurrent ? colors.white : colors.text.tertiary,
                      },
                    ]}
                  >
                    {step}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  progressLine: {
    height: 2,
    backgroundColor: colors.background.tertiary,
    borderRadius: 1,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleCurrent: {
    backgroundColor: colors.primary,
  },
  stepCircleCompleted: {
    backgroundColor: colors.primary,
  },
});
