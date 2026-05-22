import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../../data/products";
import { useAuth } from "../../context/AuthContext";

export default function CatalogScreen() {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Каталог товарів</Text>
        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Вийти</Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link href={`/details/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardText}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price} грн</Text>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#17212b",
  },
  logoutButton: {
    backgroundColor: "#e11d48",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  logoutText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  list: {
    padding: 16,
    gap: 14,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e1e6eb",
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#d7dde3",
  },
  cardText: {
    padding: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#17212b",
  },
  price: {
    fontSize: 16,
    marginTop: 6,
    color: "#2563eb",
    fontWeight: "700",
  },
});
