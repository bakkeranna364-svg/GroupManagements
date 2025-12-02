import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { RadioButton } from '@/components/RadioButton';
import { useCreateGroup } from '@/store/createGroupStore';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export function PaymentModal({ visible, onClose, onPaymentSuccess }: PaymentModalProps) {
  const { formData } = useCreateGroup();
  const [selectedPayment, setSelectedPayment] = useState<'apple_pay' | 'paystack'>('apple_pay');

  const costPerPerson = formData.numberOfPeople && formData.itemCost
    ? Math.round(formData.itemCost / formData.numberOfPeople)
    : 0;

  const handlePaymentSuccess = () => {
    setTimeout(() => {
      onPaymentSuccess();
    }, 1000);
  };

  return (
    <Modal visible={visible} onClose={onClose} showCloseButton={true}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={[typography.h2, styles.title]}>Choose payment method</Text>

        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={[typography.body, styles.userMessage]}>
            You're paying for one slot
          </Text>
        </View>

        <RadioButton
          label="Apple Pay"
          selected={selectedPayment === 'apple_pay'}
          onPress={() => setSelectedPayment('apple_pay')}
        />

        <RadioButton
          label="Paystack"
          selected={selectedPayment === 'paystack'}
          onPress={() => setSelectedPayment('paystack')}
        />

        <Button
          text={`Pay with ${selectedPayment === 'apple_pay' ? '󰀵 Pay' : 'Paystack'}`}
          onPress={handlePaymentSuccess}
          style={styles.payButton}
        />

        <Text style={[typography.small, styles.disclaimer]}>
          Your payment is securely held by Gatherly.
        </Text>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: '90%',
  },
  content: {
    paddingBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 24,
  },
  userMessage: {
    flex: 1,
    color: colors.text.secondary,
  },
  payButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  disclaimer: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: spacing.lg,
  },
});
