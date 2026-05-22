import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailsScreen({ route }) {
  const { title, description, image, date } = route.params;

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  image: {
    backgroundColor: '#d8e4ef',
    height: 230,
    width: '100%',
  },
  textBlock: {
    padding: 18,
  },
  title: {
    color: '#11181c',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
  },
  date: {
    color: '#70757a',
    fontSize: 14,
    marginTop: 8,
  },
  description: {
    color: '#353a40',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
});
