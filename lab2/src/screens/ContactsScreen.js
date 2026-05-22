import {
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { contacts } from '../data/contacts';

function ContactItem({ item }) {
  return (
    <View style={styles.contactCard}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactText}>{item.phone}</Text>
      <Text style={styles.contactText}>{item.email}</Text>
    </View>
  );
}

export default function ContactsScreen() {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <SectionList
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactItem item={item} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        sections={contacts}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  sectionTitle: {
    backgroundColor: '#ffffff',
    color: '#0a7ea4',
    fontSize: 18,
    fontWeight: '700',
    paddingBottom: 8,
    paddingTop: 16,
  },
  contactCard: {
    backgroundColor: '#f7f9fb',
    borderColor: '#e4e7eb',
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
  },
  contactName: {
    color: '#11181c',
    fontSize: 16,
    fontWeight: '700',
  },
  contactText: {
    color: '#353a40',
    fontSize: 14,
    marginTop: 5,
  },
  separator: {
    height: 10,
  },
});
