import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';

export default function StartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        <Image
          source={require('../assets/images/hero-bg.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {/* Button area */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.findJobButton} onPress={() => { /* handle find job */ }}>
          <Text style={styles.buttonText}>Find a Job</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.findEmployeeButton} onPress={() => { /* handle find employee */ }}>
          <Text style={styles.buttonText}>Find a Employees</Text>
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
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: '#FFF',
  },
  findJobButton: {
    flex: 1,
    backgroundColor: '#3A5A98',
    paddingVertical: 14,
    marginRight: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  findEmployeeButton: {
    flex: 1,
    backgroundColor: '#2D2E32',
    paddingVertical: 14,
    marginLeft: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});