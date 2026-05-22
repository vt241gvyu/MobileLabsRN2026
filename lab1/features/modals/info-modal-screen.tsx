import { router } from "expo-router";
import { StyleSheet } from "react-native";

import { PrimaryButton } from "@/components/primary-button";
import { Screen } from "@/components/screen";
import { ThemedText } from "@/components/themed-text";

export function InfoModalScreen() {
  return (
    <Screen centered edges={["top", "right", "bottom", "left"]}>
      <ThemedText type="title">Modal</ThemedText>
      <ThemedText style={styles.description}>
        This is a focused dialog for short actions or important details.
      </ThemedText>
      <PrimaryButton title="Close" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  description: {
    textAlign: "center",
  },
});
