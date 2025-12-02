import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function RadioButton({
  label,
  selected,
  onPress,
  subtitle,
  icon,
}: RadioButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.radioContainer}>
        <View style={styles.radioOuter}>
          {selected && <View style={styles.radioInner} />}
        </View>
      </View>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.textContainer}>
        <Text style={[typography.bodyMedium, styles.label]}>{label}</Text>
        {subtitle && (
          <Text style={[typography.caption, styles.subtitle]}>{subtitle}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  containerSelected: {
    backgroundColor: colors.background.secondary,
    borderColor: colors.primary,
  },
  radioContainer: {
    marginRight: spacing.md,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: colors.text.primary,
  },
  subtitle: {
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});
