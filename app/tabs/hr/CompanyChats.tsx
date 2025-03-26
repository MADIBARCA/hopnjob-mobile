import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function CompanyChats() {

  const chatMessage = "No messages yet.\nOnce you start chatting with candidates, your conversations will appear here.";

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
    paddingBottom: 30,
  },
  header: {
    fontSize: 36,
    fontWeight: '600',
    color: '#01031A',
    left: '10%',
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
    width: '80%',
    lineHeight: 22,
  },
});