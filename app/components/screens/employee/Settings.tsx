import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/app/context/AuthContext';

export default function Settings() {
  const router = useRouter();
  const { token, resetAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleBackPress = () => {
    router.back();
  };

  const handleLogout = async () => {
    console.log('Log out pressed');
    setLoading(true);
    try {
      const response = await fetch('http://195.49.213.214:5700/api/v1/Account/Logout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }
      console.log('Logout success');
      
      // Reset auth context values
      resetAuth();

      // Navigate to starting route (e.g. Start page)
      router.push('/'); 
    } catch (error: any) {
      console.log(error);
      Alert.alert('Logout Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHelpCenter = () => {
    console.log('Help center pressed');
    // Optionally navigate to help center screen
  };

  const handleSwitchToHiring = () => {
    console.log('Switch to hiring pressed');
    // Optionally navigate to HR flow
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Account Deletion',
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            console.log('Delete account confirmed');
            setLoading(true);
            try {
              const response = await fetch('http://195.49.213.214:5700/api/v1/Account', {
                method: 'DELETE',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${token}` 
                },
              });
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Account deletion failed');
              }
              console.log('Account deletion success');
              
              // Reset auth context values
              resetAuth();
    
              // Navigate to starting route
              router.push('/');
            } catch (error: any) {
              console.log(error);
              Alert.alert('Account Deletion Error', error.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <View style={styles.itemsContainer}>
        <TouchableOpacity style={styles.itemButton} onPress={handleLogout}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.itemButtonText}>Log out</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemButton} onPress={handleHelpCenter}>
          <Text style={styles.itemButtonText}>Help center</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemButton} onPress={handleSwitchToHiring}>
          <Text style={styles.itemButtonText}>Switch to hiring</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.itemButton, styles.deleteButton]} onPress={handleDeleteAccount}>
          <Text style={[styles.itemButtonText, styles.deleteButtonText]}>Delete account</Text>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#01031A',
  },
  itemsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  itemButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  itemButtonText: {
    fontSize: 16,
    color: '#01031A',
  },
  deleteButton: {
    backgroundColor: '#FFE6E6',
    borderColor: '#FFCCCC',
  },
  deleteButtonText: {
    color: '#D93025',
    fontWeight: '600',
  },
});