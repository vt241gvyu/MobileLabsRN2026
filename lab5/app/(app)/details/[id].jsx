import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../../../data/products";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.notFound}>Товар не знайдено</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price} грн</Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  content: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 8,
    backgroundColor: "#d7dde3",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#17212b",
    marginTop: 18,
  },
  price: {
    fontSize: 22,
    color: "#2563eb",
    fontWeight: "700",
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#3f4b57",
    marginTop: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f4f6f8",
  },
  notFound: {
    fontSize: 20,
    fontWeight: "700",
    color: "#17212b",
  },
});
