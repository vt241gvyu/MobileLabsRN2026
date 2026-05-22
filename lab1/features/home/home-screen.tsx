import { FlatList, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/components/screen";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  description: string;
};

const news: NewsItem[] = Array.from({ length: 10 }, (_, index) => ({
  id: String(index + 1),
  title: "Заголовок новини",
  date: "Дата новини",
  description: "Короткий текст новини",
}));

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <View style={styles.newsCard}>
      <View style={styles.preview} />

      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDate}>{item.date}</Text>
        <Text numberOfLines={2} style={styles.newsDescription}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

export function HomeScreen() {
  return (
    <Screen contentContainerStyle={styles.screen}>
      <FlatList
        ListHeaderComponent={<Text style={styles.title}>Новини</Text>}
        contentContainerStyle={styles.listContent}
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsCard item={item} />}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Герасимчук Владислав Юрійович, ВТ-24-1
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffffff",
    gap: 0,
    padding: 0,
  },
  listContent: {
    paddingBottom: 16,
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  title: {
    color: "#11181c",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  newsCard: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    paddingVertical: 7,
  },
  preview: {
    backgroundColor: "#d8e4ef",
    height: 86,
    width: 86,
  },
  newsContent: {
    flex: 1,
    justifyContent: "center",
    minHeight: 86,
  },
  newsTitle: {
    color: "#11181c",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
  newsDate: {
    color: "#70757a",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  newsDescription: {
    color: "#353a40",
    fontSize: 14,
    lineHeight: 19,
    marginTop: 2,
  },
  footer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderTopColor: "#e0e0e0",
    borderTopWidth: StyleSheet.hairlineWidth,
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  footerText: {
    color: "#11181c",
    fontSize: 14,
    textAlign: "center",
  },
});
