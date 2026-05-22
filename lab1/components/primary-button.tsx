import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { ThemedText } from "@/components/themed-text";

type PrimaryButtonProps = Omit<PressableProps, "children" | "style"> & {
  style?: StyleProp<ViewStyle>;
  title: string;
};

export function PrimaryButton({
  disabled,
  style,
  title,
  ...pressableProps
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressed : undefined,
        disabled ? styles.disabled : undefined,
        style,
      ]}
      {...pressableProps}
    >
      <ThemedText lightColor="#fff" darkColor="#fff" style={styles.text}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#0a7ea4",
    borderRadius: 8,
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.82,
  },
  text: {
    fontWeight: "600",
  },
});
