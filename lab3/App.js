import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import { GameProvider, useGame } from './src/context/GameContext';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { colors } from './src/theme/colors';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const { isDark } = useGame();
  const appColors = isDark ? colors.dark : colors.light;
  const navTheme = isDark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer
      theme={{
        ...navTheme,
        colors: {
          ...navTheme.colors,
          background: appColors.background,
          card: appColors.card,
          text: appColors.text,
          border: appColors.border,
          primary: appColors.primary,
        },
      }}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: appColors.card },
          headerTintColor: appColors.text,
          tabBarStyle: {
            backgroundColor: appColors.card,
            borderTopColor: appColors.border,
          },
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.muted,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Клікер',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>●</Text>,
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={TasksScreen}
          options={{
            title: 'Завдання',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>✓</Text>,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Налаштування',
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⚙</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <AppNavigator />
      </GameProvider>
    </GestureHandlerRootView>
  );
}
