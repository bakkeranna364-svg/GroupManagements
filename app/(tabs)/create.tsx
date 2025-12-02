import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CreateGroupProvider } from '@/store/createGroupStore';
import { CreateGroupFlow } from '@/components/flows/CreateGroupFlow';
import { colors } from '@/constants/colors';

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <CreateGroupProvider>
        <CreateGroupFlow />
      </CreateGroupProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
