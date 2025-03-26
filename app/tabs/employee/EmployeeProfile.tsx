// app/(employee)/EmployeeProfile.tsx
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RegistrationForm from '../../components/RegistrationForm'; 
import EmployeeAdditionalForm from '@/app/components/screens/employee/EmployeeAdditionalForm';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';

export default function EmployeeProfile() {
  const { isAuthenticated, isProfileComplete, firstName, lastName, userAge } = useAuth();

  // If the user is not authenticated, show the RegistrationForm.
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <RegistrationForm role="employee" />
      </SafeAreaView>
    );
  }

  // If authenticated but profile is not complete, show EmployeeAdditionalForm.
  if (isAuthenticated && !isProfileComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <EmployeeAdditionalForm />
      </SafeAreaView>
    );
  }

  const userPosition = '';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Profile</Text>
      <View style={styles.header}>
        <View style={styles.photoContainer}>
          <Text style={styles.photoPlaceholder}>add your logo/photo</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>
            {firstName + " " + lastName}, {userAge}
          </Text>
          <Text style={styles.position}>{userPosition}</Text>
        </View>
      </View>
     {/* Profile Sections */}
      <View style={styles.section}>
        <View style={styles.sectionLeft}>
          <Text style={styles.sectionTitle}>Intro video</Text>
          <Text style={styles.sectionSubtitle}>30 sec video about you</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push('/components/screens/employee/IntroVideo')}
        >
          <Text style={styles.editButtonText}>add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionLeft}>
          <Text style={styles.sectionTitle}>CV</Text>
          <Text style={styles.sectionSubtitle}>attach, if you have one</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionLeft}>
          <Text style={styles.sectionTitle}>Following</Text>
          <Text style={styles.sectionSubtitle}>
            follow job categories to track your interests and receive notifications
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push('/components/screens/employee/Following')}
        >
          <Text style={styles.editButtonText}>show</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionLeft}>
          <Text style={styles.sectionTitle}>Settings</Text>
        </View>
        <TouchableOpacity style={styles.editButton}
          onPress={() => router.push('/components/screens/employee/Settings')}
        >
          <Text style={styles.editButtonText}>edit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 24,
    color: '#01031A',
    marginTop: 40,
    left: '10%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    left: '10%',
  },
  photoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  photoPlaceholder: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#01031A',
    marginBottom: 4,
  },
  position: {
    fontSize: 14,
    color: '#666',
  },
  // Section items
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
    left: '10%',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  sectionLeft: {
    flex: 1,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#01031A',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#777',
  },

  // Edit button
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  editButtonText: {
    fontSize: 14,
    color: '#1a73e8',
    fontWeight: '500',
  },
});