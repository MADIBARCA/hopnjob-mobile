import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function EmployeeChats() {

  const chatMessage = "There will be a chat with employers interested in you."

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Area */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Chats</Text>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        <Text style={styles.emptyMessage}>
          {chatMessage}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
    left: '10%',
    paddingBottom: 30,
  },
  header: {
    fontSize: 36,
    fontWeight: '600',
    color: '#01031A',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
    width: '80%'
  },
});