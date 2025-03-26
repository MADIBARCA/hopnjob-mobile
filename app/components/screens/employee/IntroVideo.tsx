import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
// Import the hook and Camera component using named imports.
import { Camera, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Instead of using the Camera directly (which TS complains about),
// we can obtain it dynamically via require.
const CameraComponent = require('expo-camera').Camera as React.ComponentType<any>;

export default function IntroVideo() {
  const router = useRouter();

  // Use the hook to manage permissions.
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<'front' | 'back'>('front');
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Requesting camera permissions...</Text>
      </View>
    );
  }
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  const handleFlipCamera = () => {
    setCameraType((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  const handleRecord = async () => {
    if (isRecording) {
      // Stop recording placeholder.
      setIsRecording(false);
    } else {
      // Start recording placeholder.
      setIsRecording(true);
    }
  };

  const handlePauseStop = () => {
    if (isRecording) {
      setIsRecording(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Render the Camera using our dynamic import */}
      <CameraComponent
        style={StyleSheet.absoluteFillObject}
        type={cameraType}
        ref={cameraRef}
      />

      {/* Top-right Timer Circle */}
      <View style={styles.timerCircle}>
        <Text style={styles.timerText}>30</Text>
      </View>

      {/* Instruction Overlay (only when NOT recording) */}
      {!isRecording && (
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            State your name and the type of job you're looking for.
            {"\n\n"}Share any previous work experience (e.g., bartending, cleaning).
            {"\n\n"}Highlight practical skills (e.g., teamwork, customer service).
            {"\n\n"}Mention your enthusiasm for the role and willingness to learn.
            {"\n\n"}Finish with a confident statement about being a great fit.
          </Text>
        </View>
      )}

      {/* Bottom Buttons Row */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={28} color="#fff" />
          <Text style={styles.buttonLabel}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleFlipCamera}>
          <Ionicons name="refresh" size={28} color="#fff" />
          <Text style={styles.buttonLabel}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handlePauseStop}>
          <Ionicons name="pause-circle-outline" size={28} color="#fff" />
          <Text style={styles.buttonLabel}>Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, isRecording && styles.recordingActive]}
          onPress={handleRecord}
        >
          <Ionicons name="recording-outline" size={28} color="#fff" />
          <Text style={styles.buttonLabel}>{isRecording ? 'Stop' : 'Rec'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  timerCircle: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#417290',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructionContainer: {
    position: 'absolute',
    bottom: 160,
    left: 16,
    right: 16,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
  },
  instructionText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
  },
  recordingActive: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    borderRadius: 24,
    padding: 4,
  },
});