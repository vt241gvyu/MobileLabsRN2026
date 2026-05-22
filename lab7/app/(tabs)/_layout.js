import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1f6feb',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Каталог',
          tabBarIcon: ({ color }) => <TabIcon color={color} text="К" />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Кошик',
          tabBarIcon: ({ color }) => <TabIcon color={color} text="Кш" />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Історія',
          tabBarIcon: ({ color }) => <TabIcon color={color} text="І" />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({ color, text }) {
  return (
    <Text
      style={{
        color,
        fontSize: 13,
        fontWeight: '700',
      }}
    >
      {text}
    </Text>
  );
}
