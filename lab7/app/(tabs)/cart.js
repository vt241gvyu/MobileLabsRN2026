import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../store/cart/cartSlice';

export default function CartScreen() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.screen}>
      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Кошик порожній</Text>
          <Text style={styles.emptyText}>Додайте товари з каталогу.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cartInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>
                    {item.quantity} x {item.price} грн = {item.quantity * item.price} грн
                  </Text>
                </View>

                <View style={styles.row}>
                  <Pressable
                    style={styles.smallButton}
                    onPress={() => dispatch(decreaseQuantity(item.id))}
                  >
                    <Text style={styles.smallButtonText}>-</Text>
                  </Pressable>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <Pressable
                    style={styles.smallButton}
                    onPress={() => dispatch(increaseQuantity(item.id))}
                  >
                    <Text style={styles.smallButtonText}>+</Text>
                  </Pressable>
                  <Pressable
                    style={styles.removeButton}
                    onPress={() => dispatch(removeFromCart(item.id))}
                  >
                    <Text style={styles.removeButtonText}>Видалити</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Разом: {total} грн</Text>
            <Link href="/checkout" asChild>
              <Pressable style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Оформити замовлення</Text>
              </Pressable>
            </Link>
          </View>
        </>
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
    paddingBottom: 130,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cartInfo: {
    gap: 6,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  price: {
    fontSize: 14,
    color: '#4b5563',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
  },
  smallButton: {
    width: 34,
    height: 34,
    borderRadius: 7,
    backgroundColor: '#1f6feb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  quantity: {
    minWidth: 24,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  removeButton: {
    marginLeft: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 7,
    backgroundColor: '#fee2e2',
  },
  removeButtonText: {
    color: '#b91c1c',
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  total: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  checkoutButton: {
    backgroundColor: '#1f6feb',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
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
