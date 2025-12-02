import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface ButtonProps {
  onPress: () => void;
  text: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  onPress,
  text,
  variant = 'primary',
  size = 'large',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const containerStyle = [
    styles.container,
    styles[`${variant}Container`],
    size === 'large' && styles.largePadding,
    size === 'medium' && styles.mediumPadding,
    size === 'small' && styles.smallPadding,
    disabled && styles.disabled,
    style,
  ];

  const finalTextStyle = [
    typography.bodyBold,
    styles[`${variant}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
      style={containerStyle}
    >
      <Text style={finalTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largePadding: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  mediumPadding: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  smallPadding: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  primaryContainer: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryContainer: {
    backgroundColor: colors.background.secondary,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  outlineContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outlineText: {
    color: colors.text.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.text.disabled,
  },
});
