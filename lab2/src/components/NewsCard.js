import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function NewsCard({ newsItem, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: newsItem.image }} style={styles.image} />

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {newsItem.title}
        </Text>
        <Text style={styles.date}>{newsItem.date}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {newsItem.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    backgroundColor: '#d8e4ef',
    height: 86,
    width: 86,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#11181c',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  date: {
    color: '#70757a',
    fontSize: 13,
    marginTop: 4,
  },
  description: {
    color: '#353a40',
    fontSize: 14,
    lineHeight: 19,
    marginTop: 4,
  },
});
