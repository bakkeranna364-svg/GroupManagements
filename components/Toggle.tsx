import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface ToggleProps {
  value: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ value, onToggle, disabled = false }: ToggleProps) {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 20],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.background.tertiary, colors.success],
  });

  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={() => {
        if (!disabled) {
          onToggle(!value);
        }
      }}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Animated.View
        style={[
          styles.background,
          {
            backgroundColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.toggle,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  background: {
    width: 52,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  toggle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  disabled: {
    opacity: 0.5,
  },
});
