import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCreateGroup } from '@/store/createGroupStore';
import { colors } from '@/constants/colors';
import { Step1NameAndType } from './steps/Step1NameAndType';
import { Step2ItemCost } from './steps/Step2ItemCost';
import { Step3NumberOfPeople } from './steps/Step3NumberOfPeople';
import { Step4ItemDescription } from './steps/Step4ItemDescription';
import { Step5Deadline } from './steps/Step5Deadline';
import { Step6Summary } from './steps/Step6Summary';
import { PaymentModal } from '../modals/PaymentModal';
import { SuccessScreen } from '../screens/SuccessScreen';

export function CreateGroupFlow() {
  const { currentStep } = useCreateGroup();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (showSuccess) {
    return <SuccessScreen onViewGroup={() => {}} onShare={() => {}} />;
  }

  return (
    <View style={styles.container}>
      {currentStep === 1 && <Step1NameAndType />}
      {currentStep === 2 && <Step2ItemCost />}
      {currentStep === 3 && <Step3NumberOfPeople />}
      {currentStep === 4 && <Step4ItemDescription />}
      {currentStep === 5 && <Step5Deadline />}
      {currentStep === 6 && (
        <Step6Summary
          onPayment={() => setShowPaymentModal(true)}
          onSuccess={() => setShowSuccess(true)}
        />
      )}

      <PaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={() => {
          setShowPaymentModal(false);
          setShowSuccess(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
