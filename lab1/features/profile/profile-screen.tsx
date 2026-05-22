import { StyleSheet } from "react-native";

import { PrimaryButton } from "@/components/primary-button";
import { Screen } from "@/components/screen";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import TextInputBlock from "../../components/text-input-block";

export function ProfileScreen() {
  return (
    <Screen>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Рєстрація
        </ThemedText>
      </ThemedView>
      <TextInputBlock label="Username" placeholder="Username" />
      <TextInputBlock
        label="Password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInputBlock
        label="Confirm Password"
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <TextInputBlock label="Name" placeholder="Name" />
      <TextInputBlock label="Surname" placeholder="Surname" />
      <PrimaryButton title="Зареєструватись" onPress={() => {}} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    textAlign: "left",
    alignSelf: "flex-start",
    gap: 16,
  },
});
