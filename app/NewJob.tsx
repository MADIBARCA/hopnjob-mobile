import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function NewJob() {
  const router = useRouter();

  // Example local state for form inputs (optional)
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [workingConditions, setWorkingConditions] = useState('');
  const [schedule, setSchedule] = useState('');
  const [location, setLocation] = useState('');

  const handlePostJob = () => {
    console.log('Post a Job pressed');
    // TODO: Submit your job data to an API or handle it as needed
    // Example: router.push('/(tabs)/PostedJobs');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ScrollView to allow fields to scroll if they exceed screen height */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={styles.header}>Post a Job</Text>

        {/* Job Title */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Job title</Text>
          <TextInput
            style={styles.input}
            placeholder="Specify the title of the position."
            value={jobTitle}
            onChangeText={setJobTitle}
          />
        </View>

        {/* Job Description */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Job description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Outline the main responsibilities and tasks"
            value={jobDescription}
            onChangeText={setJobDescription}
            multiline
          />
        </View>

        {/* Requirements */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Requirements</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="List the necessary skills and experience"
            value={requirements}
            onChangeText={setRequirements}
            multiline
          />
        </View>

        {/* Working Conditions */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Working conditions</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Describe the salary and benefits"
            value={workingConditions}
            onChangeText={setWorkingConditions}
            multiline
          />
        </View>

        {/* Schedule */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Schedule</Text>
          <TextInput
            style={styles.input}
            placeholder="Indicate the work hours and days required"
            value={schedule}
            onChangeText={setSchedule}
          />
        </View>

        {/* Location */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter location or address"
            value={location}
            onChangeText={setLocation}
          />

          {/* Map Placeholder */}
          {/* Replace with <MapView> or a custom map if desired */}
          <Image
            source={{
              uri: 'https://via.placeholder.com/400x100.png?text=Map+Placeholder',
            }}
            style={styles.mapImage}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.postButton} onPress={handlePostJob}>
        <Text style={styles.postButtonText}>Post a Job</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100, // extra space so the button isn't covered
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#01031A',
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    color: '#01031A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#FFF',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  mapImage: {
    marginTop: 8,
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  postButton: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: '#417290',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});