import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../../store/cart/cartSlice';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === String(id))
  );

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Товар не знайдено</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>{product.price} грн</Text>

      <Pressable style={styles.button} onPress={() => dispatch(addToCart(product))}>
        <Text style={styles.buttonText}>Додати до кошика</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f6fb',
  },
  content: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  name: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 23,
    color: '#4b5563',
  },
  price: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: '800',
    color: '#166534',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1f6feb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f6fb',
  },
  notFound: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
});
