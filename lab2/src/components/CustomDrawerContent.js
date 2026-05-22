import { Ionicons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomDrawerContent(props) {
  const activeRouteName = props.state.routeNames[props.state.index];
  const insets = useSafeAreaInsets();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.container,
        { paddingBottom: insets.bottom, paddingTop: insets.top },
      ]}
    >
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>ГВ</Text>
        </View>
        <Text style={styles.name}>Герасимчук Владислав Юрійович</Text>
        <Text style={styles.group}>ВТ-24-1</Text>
      </View>

      <View style={styles.menu}>
        <DrawerItem
          focused={activeRouteName === 'NewsStack'}
          icon={({ color, size }) => (
            <Ionicons color={color} name="newspaper-outline" size={size} />
          )}
          label="Новини"
          onPress={() => props.navigation.navigate('NewsStack')}
        />
        <DrawerItem
          focused={activeRouteName === 'Contacts'}
          icon={({ color, size }) => (
            <Ionicons color={color} name="people-outline" size={size} />
          )}
          label="Контакти"
          onPress={() => props.navigation.navigate('Contacts')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    alignItems: 'center',
    borderBottomColor: '#e4e7eb',
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
    borderRadius: 36,
    height: 72,
    justifyContent: 'center',
    marginBottom: 12,
    width: 72,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },
  name: {
    color: '#11181c',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  group: {
    color: '#70757a',
    fontSize: 14,
    marginTop: 4,
  },
  menu: {
    paddingTop: 10,
  },
});
