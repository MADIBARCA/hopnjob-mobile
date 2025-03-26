import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function CompanyProfile() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Heading */}
      <Text style={styles.headerTitle}>Profile</Text>

      {/* Company Info Section */}
      <View style={styles.companyInfoContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>add your logo/photo</Text>
        </View>
        <View style={styles.companyTextContainer}>
          <Text style={styles.companyName}>Company name</Text>
          <Text style={styles.userName}>Name Surname</Text>
          <Text style={styles.userPosition}>position</Text>
        </View>
      </View>

      {/* Info Blocks */}
      <View style={styles.infoBlock}>
        <Text style={styles.infoBlockTitle}>About company</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => {}}>
          <Text style={styles.editText}>edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.infoBlockTitle}>Manage my team</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => {}}>
          <Text style={styles.editText}>edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.infoBlockTitle}>Settings</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => {}}>
          <Text style={styles.editText}>edit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container covers the whole screen, white background
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  // "Profile" heading
  headerTitle: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 24,
    color: '#01031A',
    marginTop: 60,
    left: '10%'
  },
  // Section containing the logo placeholder + text
  companyInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    left: '10%'

  },
  // Placeholder box for logo/photo
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#999',
  },
  // Container for company name, user name, position
  companyTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#01031A',
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#01031A',
    marginBottom: 2,
  },
  userPosition: {
    fontSize: 14,
    color: '#999',
  },
  // Reusable row block for "About company", "Manage my team", "Settings"
  infoBlock: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: '80%',
    left: '10%'
  },
  infoBlockTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#01031A',
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  editText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1a73e8',
  },
});
