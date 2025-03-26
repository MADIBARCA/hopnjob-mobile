// app/index.tsx
import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthContext'; // Adjust path if needed

export default function StartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // If the user is authenticated, redirect them to an "employee" or "hr" route
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/tabs/employee/SearchMap');
    }
  }, [isAuthenticated]);

  // If we’re authenticated, we render nothing because we replaced the route
  if (isAuthenticated) {
    return null;
  }

  // If not authenticated, show the StartPage UI
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <Image
          source={require('../assets/hero-bg.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.buttonsContainer}>
        {/* Employee Flow */}
        <TouchableOpacity 
          style={styles.findJobButton} 
          onPress={() => {
            // Navigate to employee route group
            router.push('/tabs/employee/SearchMap');
          }}
        >
          <Text style={styles.buttonText}>Find a Job</Text>
        </TouchableOpacity>

        {/* HR Flow */}
        <TouchableOpacity 
          style={styles.findEmployeeButton} 
          onPress={() => {
            // Navigate to HR route group
            router.push('/tabs/hr/Browse');
          }}
        >
          <Text style={styles.button2Text}>Find Employees</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContent: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  buttonsContainer: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 34,
    backgroundColor: '#FFF',
    width: '92%',
    alignSelf: 'center',
  },
  findJobButton: {
    borderRadius: 20,
    backgroundColor: '#417290',    
    paddingVertical: 17,
    marginBottom: 16,
    alignItems: 'center',
    minHeight: 62,
  },
  findEmployeeButton: {
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  button2Text: {
    color: '#01031A',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.5,
  },
});