import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const ICON_DEFAULT_BG = '#111';
const ICON_ACTIVE_BG = '#82e597';
const TAB_ICON_SIZE = 24;
const CIRCLE_SIZE = 48;

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBarWrapper}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.7}
              style={styles.tabBarItem}
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: isFocused ? ICON_ACTIVE_BG : ICON_DEFAULT_BG,
                  },
                ]}
              >
                {options.tabBarIcon
                  ? options.tabBarIcon({ focused: isFocused, color: '#fff', size: TAB_ICON_SIZE })
                  : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function EmployeeLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      {/* 1) SearchMap Tab */}
      <Tabs.Screen
        name="SearchMap"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="search" size={TAB_ICON_SIZE} color="#fff" />
          ),
        }}
      />

      {/* 2) EmployeeChats Tab */}
      <Tabs.Screen
        name="EmployeeChats"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={TAB_ICON_SIZE} color="#fff" />
          ),
        }}
      />

      {/* 3) EmployeeProfile Tab */}
      <Tabs.Screen
        name="EmployeeProfile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person-outline" size={TAB_ICON_SIZE} color="#fff" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  tabBarWrapper: {
    width: '80%', // fixed 80% width
    height: 60,
    backgroundColor: '#000',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // Optional shadow for a lifted effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
