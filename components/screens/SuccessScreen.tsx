import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '@/components/Button';
import { useCreateGroup } from '@/store/createGroupStore';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { Check } from 'lucide-react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';

interface SuccessScreenProps {
  onViewGroup: () => void;
  onShare: () => void;
}

function ConfettiAnimation() {
  return (
    <View style={styles.confettiContainer}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Text
          key={i}
          style={[
            styles.confetti,
            {
              left: `${Math.random() * 100}%`,
              top: `${-10 - Math.random() * 20}%`,
              opacity: 0.8,
            },
          ]}
        >
          ✦
        </Text>
      ))}
    </View>
  );
}

export function SuccessScreen({ onViewGroup, onShare }: SuccessScreenProps) {
  const { formData, reset } = useCreateGroup();

  const costPerPerson = formData.numberOfPeople && formData.itemCost
    ? Math.round(formData.itemCost / formData.numberOfPeople)
    : 0;

  const handleViewGroup = () => {
    reset();
    onViewGroup();
  };

  return (
    <View style={styles.container}>
      <ConfettiAnimation />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.successIconContainer}>
          <View style={styles.successCircle}>
            <Check size={48} color={colors.white} strokeWidth={3} />
          </View>
        </View>

        <Text style={[typography.h1, styles.successTitle]}>
          Congratulations! Your Group is live.
        </Text>

        <Text style={[typography.body, styles.successMessage]}>
          You've just created a new sharing Group. Invite others to join and fill your slots
          faster.
        </Text>

        <View style={styles.groupSummary}>
          <View style={styles.groupHeader}>
            <Text style={[typography.h3, styles.groupName]}>
              {formData.groupName}
            </Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={[typography.small, styles.liveText]}>Live</Text>
            </View>
          </View>

          <View style={styles.summaryContent}>
            <View>
              <Text style={[typography.caption, styles.summaryLabel]}>
                Total contribution
              </Text>
              <Text style={[typography.h1, styles.summaryAmount]}>
                ₦{formData.itemCost?.toLocaleString()}
              </Text>
            </View>

            <View style={styles.progressRow}>
              <View>
                <Text style={typography.small}>₦0.00 Raised</Text>
              </View>
              <View>
                <Text style={typography.small}>
                  Remaining: -₦{formData.itemCost?.toLocaleString()}
                </Text>
              </View>
            </View>

            <View style={styles.membersRow}>
              <View style={styles.avatarGroup}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <View
                    key={i}
                    style={[styles.avatar, { marginLeft: i > 0 ? -spacing.md : 0 }]}
                  />
                ))}
              </View>
              <Text style={[typography.body, styles.membersText]}>
                You joined remaining {formData.numberOfPeople && formData.numberOfPeople - 1} slots
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button text="Share your Group" onPress={onShare} />
        <Button text="View Group" variant="secondary" onPress={handleViewGroup} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  confettiContainer: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  confetti: {
    position: 'absolute',
    fontSize: 24,
    color: colors.success,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  successIconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.xl,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  successMessage: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  groupSummary: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  groupName: {
    flex: 1,
    color: colors.text.primary,
  },
  liveB: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  liveText: {
    color: colors.success,
    fontWeight: '600' as const,
  },
  summaryContent: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
  },
  summaryLabel: {
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  summaryAmount: {
    color: colors.text.primary,
    fontSize: 28,
    marginBottom: spacing.lg,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  membersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGroup: {
    flexDirection: 'row',
    marginRight: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.tertiary,
    borderWidth: 2,
    borderColor: colors.white,
  },
  membersText: {
    flex: 1,
    color: colors.text.secondary,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
