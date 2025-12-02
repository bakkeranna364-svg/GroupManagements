import React, { useState } from 'react';
import { View, TextInput as RNTextInput, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'decimal-pad';
  maxLength?: number;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  label?: string;
  error?: string;
  prefix?: string;
}

export function TextInput({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  label,
  error,
  prefix,
}: TextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          focused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          !editable && styles.inputContainerDisabled,
        ]}
      >
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <RNTextInput
          style={[styles.input, multiline && styles.multilineInput]}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  inputContainerFocused: {
    borderColor: colors.inputFocus,
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  inputContainerDisabled: {
    backgroundColor: colors.background.tertiary,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text.primary,
    padding: 0,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  prefix: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  error: {
    ...typography.small,
    color: colors.error,
    marginTop: spacing.sm,
  },
});
