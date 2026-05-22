import type { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function TopTabButtonBar({
  descriptors,
  navigation,
  state,
}: MaterialTopTabBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const activeColor = colors.tint;
  const inactiveColor = "#80868b";

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>ЖП</Text>
        </View>
        <Text style={styles.appTitle}>FirstMobileApp</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const options = descriptors[route.key].options;
          const focused = state.index === index;
          const label =
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : (options.title ?? route.name);
          const foregroundColor = focused ? activeColor : inactiveColor;
          const icon = options.tabBarIcon?.({
            color: foregroundColor,
            focused,
          });

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : undefined}
              key={route.key}
              onLongPress={() => {
                navigation.emit({
                  target: route.key,
                  type: "tabLongPress",
                });
              }}
              onPress={() => {
                const event = navigation.emit({
                  canPreventDefault: true,
                  target: route.key,
                  type: "tabPress",
                });

                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              }}
              style={({ pressed }) => [
                styles.tabButton,
                pressed ? { opacity: 0.82 } : undefined,
              ]}
            >
              <View style={styles.tabButtonContent}>
                {icon}
                <Text
                  numberOfLines={1}
                  style={[styles.tabLabel, { color: foregroundColor }]}
                >
                  {label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    minHeight: 70,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  logo: {
    alignItems: "center",
    backgroundColor: "#0a7ea4",
    borderRadius: 26,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  logoText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
  },
  appTitle: {
    color: "#11181c",
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  headerSpacer: {
    width: 52,
  },
  tabBar: {
    backgroundColor: "#eeeeee",
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#d9d9d9",
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: 4,
  },
  tabButtonContent: {
    alignItems: "center",
    gap: 3,
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});
