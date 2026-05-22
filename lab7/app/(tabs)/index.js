import { Link } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../../store/cart/cartSlice';

export default function CatalogScreen() {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>{item.price} грн</Text>

              <View style={styles.actions}>
                <Link href={`/product/${item.id}`} asChild>
                  <Pressable style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Деталі</Text>
                  </Pressable>
                </Link>

                <Pressable style={styles.button} onPress={() => dispatch(addToCart(item))}>
                  <Text style={styles.buttonText}>Додати</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
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
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 18,
    color: '#4b5563',
  },
  price: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#166534',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1f6feb',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 7,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#1f6feb',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 7,
  },
  secondaryButtonText: {
    color: '#1f6feb',
    fontWeight: '700',
  },
});
