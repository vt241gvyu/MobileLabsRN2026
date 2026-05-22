import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomDrawerContent from '../components/CustomDrawerContent';
import ContactsScreen from '../screens/ContactsScreen';
import DetailsScreen from '../screens/DetailsScreen';
import MainScreen from '../screens/MainScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={MainScreen}
        name="Main"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={DetailsScreen}
        name="Details"
        options={({ route }) => ({
          title: route.params?.title ?? 'Деталі новини',
        })}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: '#0a7ea4',
          drawerInactiveTintColor: '#333333',
          headerTintColor: '#11181c',
        }}
      >
        <Drawer.Screen
          component={NewsStack}
          name="NewsStack"
          options={{
            drawerLabel: 'Новини',
            headerShown: false,
            title: 'Новини',
          }}
        />
        <Drawer.Screen
          component={ContactsScreen}
          name="Contacts"
          options={{
            drawerLabel: 'Контакти',
            title: 'Контакти',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
