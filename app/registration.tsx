// app/registration.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthContext'; // Adjust path if needed

export default function RegistrationPage() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  // Step 1: Local state to show/hide extra fields
  const [showForm, setShowForm] = useState(false);

  // Step 2: Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState(''); // This is your "E-mail" or "Username"
  const [password, setPassword] = useState('');

  // Loading state for the API call
  const [loading, setLoading] = useState(false);

  // For Apple / Google sign-in (placeholder)
  const handleAppleSignIn = () => {
    console.log('Apple sign-in pressed');
    // In real life, you'd handle Apple OAuth flow
  };
  const handleGoogleSignIn = () => {
    console.log('Google sign-in pressed');
    // In real life, you'd handle Google OAuth flow
  };

  // Step 3: Show form fields after tapping "Create an account"
  const handleCreateAccount = () => {
    setShowForm(true);
  };

  // Step 4: Submit to the API
  const handleSubmitRegistration = async () => {
    if (!firstName || !lastName || !login || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      // Make the POST request
      const response = await fetch('http://195.49.213.214:5700/api/v1/Account/Registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          login,
          password,
        }),
      });
      if (!response.ok) {
        // Show error message from API if provided
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      // If successful, parse JSON
      const data = await response.json();
      console.log('Registration success:', data);

      // Mark user as authenticated in context
      setIsAuthenticated(true);

      router.push('/tabs/employee/EmployeeProfile'); 
    } catch (error: any) {
      console.log(error);
      Alert.alert('Registration Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPress = () => {
    console.log('Log in pressed');
    // If you have a login screen, you might do:
    // router.push('/login');
  };

  const openTermsOfService = () => {
    Linking.openURL('https://www.yoursite.com/terms');
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://www.yoursite.com/privacy');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>

        {/* If the user hasn't clicked "Create an account" yet, show social buttons */}
        {!showForm && (
          <>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleAppleSignIn}
            >
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignIn}
            >
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleCreateAccount}
            >
              <Text style={styles.socialButtonText}>Create an account</Text>
            </TouchableOpacity>
          </>
        )}

        {/* If user clicked "Create an account", show the full form */}
        {showForm && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#111"
            />
            <TextInput
              style={styles.input}
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#111"
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              value={login}
              onChangeText={setLogin}
              placeholderTextColor="#111"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#111"
            />

            <TouchableOpacity
              style={[styles.socialButton, styles.submitButton]}
              onPress={handleSubmitRegistration}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.bottomText}>
          Already registered?{' '}
          <Text style={styles.linkText} onPress={handleLoginPress}>
            Log in
          </Text>
        </Text>

        <Text style={styles.agreementText}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText} onPress={openTermsOfService}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text style={styles.linkText} onPress={openPrivacyPolicy}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
    color: '#111',
  },
  socialButton: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
  },
  formContainer: {
    marginTop: 16,
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#111',
  },
  submitButton: {
    backgroundColor: '#417290',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bottomText: {
    marginTop: 24,
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
  },
  linkText: {
    color: '#1a73e8',
    textDecorationLine: 'underline',
  },
  agreementText: {
    marginTop: 12,
    fontSize: 12,
    textAlign: 'center',
    color: '#999',
    paddingHorizontal: 24,
    lineHeight: 16,
  },
});