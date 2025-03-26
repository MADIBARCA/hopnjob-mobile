// app/(employee)/Following.tsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Following() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        {/* Back Button on the Left */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          {/* Right arrow rotated 180° to appear as a left arrow */}
          <Ionicons
            name="chevron-back"
            size={36}
            color="#000"
          />
        </TouchableOpacity>

        {/* Title in the Center */}
        <Text style={styles.headerTitle}>Following</Text>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.starIcon}>⭐</Text>
        <Text style={styles.infoText}>
          Job categories you follow{"\n"}will be shown here
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // Header row to contain the back arrow (left) and title (center)
  headerRow: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centers the title horizontally
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  // Position the back button on the left
  backButton: {
    position: 'absolute',
    left: '10%',
  },
  // Centered title
  headerTitle: {
    fontSize: 36,
    fontWeight: '600',
    color: '#01031A',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starIcon: {
    fontSize: 60,
    color: '#A0A0A0',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});