import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useCreateGroup } from '@/store/createGroupStore';
import { Button } from '@/components/Button';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { Toggle } from '@/components/Toggle';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export function Step5Deadline() {
  const { formData, updateFormData, nextStep, prevStep } = useCreateGroup();
  const [viewMode, setViewMode] = useState<'dates' | 'months'>('dates');
  const [displayMonth, setDisplayMonth] = useState(new Date());

  const selectedDate = formData.deadline || new Date();
  const isFlexible = formData.isFlexible || false;

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = displayMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(displayMonth);
  const firstDay = getFirstDayOfMonth(displayMonth);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, () => null);

  const handleDateSelect = (day: number) => {
    const newDate = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day);
    updateFormData('deadline', newDate);
  };

  const handlePrevMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1));
  };

  const daysFromNow = () => {
    const today = new Date();
    const diff = Math.floor((selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <View style={styles.container}>
      <ProgressIndicator currentStep={5} totalSteps={6} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={typography.h2}>Contribution deadline</Text>

        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              viewMode === 'dates' && styles.viewToggleButtonActive,
            ]}
            onPress={() => setViewMode('dates')}
          >
            <Text
              style={[
                typography.captionBold,
                {
                  color: viewMode === 'dates' ? colors.white : colors.text.secondary,
                },
              ]}
            >
              Dates
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewToggleButton,
              viewMode === 'months' && styles.viewToggleButtonActive,
            ]}
            onPress={() => setViewMode('months')}
          >
            <Text
              style={[
                typography.captionBold,
                {
                  color: viewMode === 'months' ? colors.white : colors.text.secondary,
                },
              ]}
            >
              Months
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendarCard}>
          {viewMode === 'dates' ? (
            <>
              <View style={styles.calendarHeader}>
                <Text style={typography.body}>{viewMode === 'dates' ? 'Pick a date' : 'Pick a date'}</Text>
                <View style={styles.monthNavigation}>
                  <TouchableOpacity onPress={handlePrevMonth}>
                    <ChevronLeft size={20} color={colors.text.primary} />
                  </TouchableOpacity>
                  <Text style={[typography.body, styles.monthName]}>{monthName}</Text>
                  <TouchableOpacity onPress={handleNextMonth}>
                    <ChevronRight size={20} color={colors.text.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.weekDays}>
                {['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'].map((day) => (
                  <Text key={day} style={[typography.captionBold, styles.weekDay]}>
                    {day}
                  </Text>
                ))}
              </View>

              <View style={styles.daysGrid}>
                {[...emptyDays, ...days].map((day, idx) => {
                  const isSelected = day && selectedDate.getDate() === day &&
                    selectedDate.getMonth() === displayMonth.getMonth();

                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.dayCell,
                        !day ? styles.dayCellEmpty : undefined,
                        isSelected ? styles.dayCellSelected : undefined,
                      ]}
                      onPress={() => day && handleDateSelect(day)}
                      disabled={!day}
                    >
                      {day && (
                        <Text
                          style={[
                            typography.body,
                            isSelected ? styles.dayCellSelectedText : undefined,
                          ]}
                        >
                          {day}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          ) : (
            <View style={styles.monthsContainer}>
              <Text style={[typography.h2, styles.monthsValue]}>
                {Math.floor(daysFromNow() / 30)}
              </Text>
              <Text style={typography.body}>Months</Text>
            </View>
          )}

          <View style={styles.dateInfo}>
            <Text style={[typography.caption, { color: colors.text.secondary }]}>
              {daysFromNow()} days from today
            </Text>
          </View>
        </View>

        <View style={styles.flexibleContainer}>
          <View style={styles.flexibleInfo}>
            <Text style={typography.bodyBold}>I'm Flexible</Text>
            <Text style={[typography.caption, styles.flexibleDescription]}>
              The Group stays open until all slots are filled, no fixed deadline.
            </Text>
          </View>
          <Toggle value={isFlexible} onToggle={(val) => updateFormData('isFlexible', val)} />
        </View>
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
  viewToggle: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    justifyContent: 'flex-end',
  },
  viewToggleButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.background.secondary,
  },
  viewToggleButtonActive: {
    backgroundColor: colors.primary,
  },
  calendarCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  calendarHeader: {
    marginBottom: spacing.lg,
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  monthName: {
    flex: 1,
    textAlign: 'center',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    color: colors.text.secondary,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  dayCellEmpty: {
    backgroundColor: 'transparent',
  },
  dayCellSelected: {
    backgroundColor: colors.primary,
  },
  dayCellSelectedText: {
    color: colors.white,
    fontWeight: '700' as const,
  },
  dayCellDisabled: {
    opacity: 0.5,
  },
  dateInfo: {
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.lg,
  },
  monthsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  monthsValue: {
    color: colors.text.primary,
  },
  flexibleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  flexibleInfo: {
    flex: 1,
  },
  flexibleDescription: {
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
