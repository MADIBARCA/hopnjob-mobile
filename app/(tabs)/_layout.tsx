// app/_layout.tsx
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      {/* Add a new tab for your Start screen */}
      <Tabs.Screen name="start" />
    </Tabs>
  );
}