import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NewsCard from '../components/NewsCard';
import { news } from '../data/news';

function createMoreNews(startId, count) {
  return Array.from({ length: count }, (_, index) => {
    const number = startId + index;

    return {
      id: String(number),
      title: `Додаткова новина ${number}`,
      date: '22.05.2026',
      image: `https://picsum.photos/seed/more-news-${number}/600/400`,
      description:
        `Короткий текст додаткової новини ${number}. Дані додані під час ` +
        'імітації infinite scroll.',
    };
  });
}

export default function MainScreen({ navigation }) {
  const [items, setItems] = useState(news.slice(0, 12));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setItems(news.slice(0, 12));
      setRefreshing(false);
    }, 1000);
  }, []);

  const loadMore = () => {
    if (loadingMore) {
      return;
    }

    setLoadingMore(true);

    setTimeout(() => {
      setItems((currentItems) => [
        ...currentItems,
        ...createMoreNews(currentItems.length + 1, 4),
      ]);
      setLoadingMore(false);
    }, 900);
  };

  const openDetails = (item) => {
    navigation.navigate('Details', {
      title: item.title,
      description: item.description,
      image: item.image,
      date: item.date,
    });
  };

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.newsTitle}>Новини</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.listFooter}>
      {loadingMore ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color="#0a7ea4" />
          <Text style={styles.loadingText}>Завантаження...</Text>
        </View>
      ) : (
        <Text style={styles.endText}>Потягніть список вниз для оновлення</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.getParent()?.openDrawer()}
          style={styles.menuButton}
        >
          <Ionicons color="#11181c" name="menu" size={26} />
        </TouchableOpacity>

        <View style={styles.logo}>
          <Text style={styles.logoText}>ЖП</Text>
        </View>

        <Text style={styles.appTitle}>FirstMobileApp</Text>
        <View style={styles.rightSpacer} />
      </View>

      <FlatList
        data={items}
        initialNumToRender={8}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderHeader}
        maxToRenderPerBatch={6}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <NewsCard newsItem={item} onPress={() => openDetails(item)} />
        )}
        windowSize={5}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Герасимчук Владислав Юрійович, ВТ-24-1
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomColor: '#e4e7eb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 74,
    paddingHorizontal: 12,
  },
  menuButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  logo: {
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginLeft: 4,
    width: 48,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },
  appTitle: {
    color: '#11181c',
    flex: 1,
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
  },
  rightSpacer: {
    width: 44,
  },
  listHeader: {
    paddingBottom: 12,
    paddingTop: 18,
  },
  newsTitle: {
    color: '#11181c',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  separator: {
    backgroundColor: '#eef0f2',
    height: 1,
    marginLeft: 112,
  },
  listFooter: {
    alignItems: 'center',
    minHeight: 58,
    justifyContent: 'center',
    paddingVertical: 14,
  },
  loadingRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadingText: {
    color: '#353a40',
    fontSize: 14,
    marginLeft: 8,
  },
  endText: {
    color: '#70757a',
    fontSize: 13,
  },
  footer: {
    alignItems: 'center',
    borderTopColor: '#e4e7eb',
    borderTopWidth: 1,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  footerText: {
    color: '#11181c',
    fontSize: 14,
    textAlign: 'center',
  },
});
