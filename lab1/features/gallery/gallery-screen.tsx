import { Image, type ImageSource } from "expo-image";
import { Dimensions, StyleSheet, View } from "react-native";

import { Screen } from "@/components/screen";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const galleryImages: ImageSource[] = [
  require("@/assets/images/icon.png"),
  require("@/assets/images/splash-icon.png"),
  require("@/assets/images/react-logo.png"),
  require("@/assets/images/partial-react-logo.png"),
  require("@/assets/images/android-icon-foreground.png"),
  require("@/assets/images/android-icon-background.png"),
];
const contentPadding = 24;
const gridGap = 12;
const tileSize =
  (Dimensions.get("window").width - contentPadding * 2 - gridGap) / 2;

export function GalleryScreen() {
  return (
    <Screen scroll>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Gallery</ThemedText>
        <ThemedText>Browse saved items and collections.</ThemedText>
      </ThemedView>

      <View style={styles.grid}>
        {galleryImages.map((image, item) => (
          <ThemedView key={item} style={styles.tile}>
            <Image contentFit="cover" source={image} style={styles.image} />
          </ThemedView>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gridGap,
  },
  header: {
    gap: 8,
  },
  tile: {
    alignItems: "center",
    borderColor: "#d0d7de",
    borderRadius: 8,
    borderWidth: 1,
    height: tileSize,
    justifyContent: "center",
    overflow: "hidden",
    width: tileSize,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
