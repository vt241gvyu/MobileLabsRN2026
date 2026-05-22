import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function HistoryScreen() {
  const orders = useSelector((state) => state.orders.items);

  return (
    <View style={styles.screen}>
      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Історія порожня</Text>
          <Text style={styles.emptyText}>Тут будуть оформлені замовлення.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.date}>{item.date}</Text>
              {item.items.map((product) => (
                <Text key={product.id} style={styles.product}>
                  {product.name} - {product.quantity} шт. - {product.price * product.quantity} грн
                </Text>
              ))}
              <Text style={styles.total}>Разом: {item.total} грн</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f6fb',
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  date: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  product: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  total: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '800',
    color: '#166534',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  emptyText: {
    marginTop: 8,
    color: '#6b7280',
  },
});
