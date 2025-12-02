import React, { createContext, useState, useCallback } from 'react';
import { CreateGroupFormData } from '@/types';

interface CreateGroupContextType {
  formData: Partial<CreateGroupFormData>;
  currentStep: number;
  setFormData: (data: Partial<CreateGroupFormData>) => void;
  updateFormData: (field: keyof CreateGroupFormData, value: any) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const initialFormData: Partial<CreateGroupFormData> = {
  groupName: '',
  itemType: 'cow',
  itemName: '',
  itemCost: 0,
  numberOfPeople: 0,
  deadline: new Date(),
  isFlexible: false,
  slots: 0,
};

export const CreateGroupContext = createContext<CreateGroupContextType | undefined>(undefined);

interface CreateGroupProviderProps {
  children: React.ReactNode;
}

export function CreateGroupProvider({ children }: CreateGroupProviderProps) {
  const [formData, setFormDataState] = useState<Partial<CreateGroupFormData>>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const setFormData = useCallback((data: Partial<CreateGroupFormData>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
  }, []);

  const updateFormData = useCallback(
    (field: keyof CreateGroupFormData, value: any) => {
      setFormDataState((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const reset = useCallback(() => {
    setFormDataState(initialFormData);
    setCurrentStep(1);
  }, []);

  const value: CreateGroupContextType = {
    formData,
    currentStep,
    setFormData,
    updateFormData,
    setCurrentStep,
    nextStep,
    prevStep,
    reset,
  };

  return (
    <CreateGroupContext.Provider value={value}>
      {children}
    </CreateGroupContext.Provider>
  );
}

export function useCreateGroup() {
  const context = React.useContext(CreateGroupContext);
  if (!context) {
    throw new Error('useCreateGroup must be used within CreateGroupProvider');
  }
  return context;
}
