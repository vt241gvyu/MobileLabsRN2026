import type { PropsWithChildren } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView, type Edges } from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/use-theme-color";

type ScreenProps = PropsWithChildren<{
  centered?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: Edges;
  scroll?: boolean;
}>;

export function Screen({
  centered = false,
  children,
  contentContainerStyle,
  edges = ["right", "left"],
  scroll = false,
}: ScreenProps) {
  const backgroundColor = useThemeColor({}, "background");
  const contentStyle = [
    styles.content,
    scroll ? styles.scrollContent : styles.staticContent,
    centered ? styles.centered : undefined,
    contentContainerStyle,
  ];

  return (
    <SafeAreaView edges={edges} style={[styles.safeArea, { backgroundColor }]}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={contentStyle}
          keyboardShouldPersistTaps="handled"
          style={styles.safeArea}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={contentStyle}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    gap: 16,
    padding: 24,
  },
  staticContent: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
});
