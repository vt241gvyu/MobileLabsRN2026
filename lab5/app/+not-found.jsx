import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Екран не знайдено</Text>
      <Link href="/" style={styles.link}>
        Повернутися на головну
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#17212b",
    marginBottom: 16,
  },
  link: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "700",
  },
});
