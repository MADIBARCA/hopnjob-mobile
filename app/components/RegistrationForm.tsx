import React, { useState } from 'react';
import {
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
import { useAuth } from '../context/AuthContext';

type RegistrationFormProps = {
  role: 'employee' | 'hr';
};

export default function RegistrationForm({ role }: RegistrationFormProps) {
  const router = useRouter();
  const { setIsAuthenticated, setToken, firstName, lastName, 
    setFirstName, setLastName, setIsProfileComplete, 
    setUserAge, setUserLocation, setEmployeeCategories, setUserAvatar } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [isLoginForm, setIsLoginForm] = useState(false);

  const handleCreateAccount = () => {
    setShowForm(true);
  };

  const handleAppleSignIn = () => {
    console.log('Apple sign-in pressed');
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign-in pressed');
  };

  const handleSubmitRegistration = async () => {
    if (!login) {
      Alert.alert('Error', 'Login field required');
      return;
    } else if (!password) {
      Alert.alert('Error', 'Password field required');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://195.49.213.214:5700/api/v1/Account/Registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      const data = await response.json();
      console.log('Registration success:', data);

      // Assume API returns a token as a string in data.token
      setToken(data);
      setIsAuthenticated(true);

      // For employee, navigate to additional form to complete profile.
      if (role === 'employee') {
        router.push('/tabs/employee/EmployeeProfile');
      } else {
        router.push('/tabs/hr/CompanyProfile');
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert('Registration Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLogin = async () => {
    if (!login || !password) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }
      setLoading(true);
      try {
        const response = await fetch('http://195.49.213.214:5700/api/v1/Account/Login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({login, password }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }
        const data = await response.json();
        console.log('Login success:', data);
  
        // Assume API returns a token as a string in data.token
        setToken(data);

        const response2 = await fetch('http://195.49.213.214:5700/api/v1/Account/Profile', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data}` },
        });
        if (!response2.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Obtaining profile data failed');
        }

        const data2 = await response2.json();
        
        if (data2.profileKind !== "None") {
            setIsProfileComplete(true);
            setFirstName(data2.firstName);
            setLastName(data2.lastName);
            setUserAge(data2.age);
            setUserLocation(data2.location);
            setEmployeeCategories(data2.categories);
            setUserAvatar(data2.setAvatar);
        }

        setIsAuthenticated(true);
  
        // For employee, navigate to additional form to complete profile.
        if (role === 'employee') {
          router.push('/tabs/employee/EmployeeProfile');
        } else {
          router.push('/tabs/hr/CompanyProfile');
        }
      } catch (error: any) {
        console.log(error);
        Alert.alert('Registration Error', error.message);
      } finally {
        setLoading(false);
      }
   }

  const handleLoginPress = () => {
    console.log('Log in pressed');
    setIsLoginForm(!isLoginForm);
    setShowForm(false);
  };


  const openTermsOfService = () => {
    Linking.openURL('https://www.yoursite.com/terms');
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://www.yoursite.com/privacy');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLoginForm? 'Log in' : 'Create an account'}</Text>

        <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
            <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        {!isLoginForm && !showForm &&
        <TouchableOpacity style={styles.socialButton} onPress={handleCreateAccount}>
            <Text style={styles.socialButtonText}>Create an account</Text>
        </TouchableOpacity>
        }

      {(isLoginForm || showForm) && (
        <View style={styles.formContainer}>          
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
            onPress={isLoginForm? handleSubmitLogin : handleSubmitRegistration}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>{isLoginForm? 'Log in with your email' : 'Create an account'}</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.bottomText}>
        {
            isLoginForm? "Don't have an account " : "Already registered? "
        }
        
        <Text style={styles.linkText} onPress={handleLoginPress}>
            {isLoginForm? 'Register' : 'Log in'}
        </Text>
      </Text>
      <Text style={styles.agreementText}>
        By continuing, you agree to our{'\n'}
        <Text style={styles.linkText} onPress={openTermsOfService}>
          Terms of Service
        </Text>{' '}
        and{' '}
        <Text style={styles.linkText} onPress={openPrivacyPolicy}>
          Privacy Policy
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    justifyContent: 'center',
    top: '7%'
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
    color: '#111',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2%'
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