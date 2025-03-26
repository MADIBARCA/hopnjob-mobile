// app/(tabs)/PostedJobs.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function PostedJobs() {
  const router = useRouter();

  const handlePostJob = () => {
    // Navigate to your "create new job" screen or do other logic here
    // For example:
    router.push('/NewJob');
    console.log('Post a Job button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Posted Jobs</Text>

      {/* Main content */}
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          You haven’t posted any job openings yet. 
          Create your first listing to attract the right candidates.
        </Text>
      </View>

      {/* Bottom button */}
      <TouchableOpacity style={styles.postButton} onPress={handlePostJob}>
        <Text style={styles.postButtonText}>Post a Job</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  header: {
    fontSize: 36,
    fontWeight: '600',
    color: '#01031A',
    marginBottom: 32,
    left: '10%', 
    marginTop: 50
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#0E101F',
    lineHeight: 22,
  },
  postButton: {
    backgroundColor: '#417290',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 120, 
    left: '10%',
    width: '80%'
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});