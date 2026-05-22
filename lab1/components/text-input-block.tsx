import { StyleSheet, TextInput, type TextInputProps } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type TextInputBlockProps = TextInputProps & {
  label: string;
};

export default function TextInputBlock({
  label,
  placeholderTextColor,
  style,
  ...inputProps
}: TextInputBlockProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <ThemedView style={styles.block}>
      <ThemedText style={[styles.label, { color: colors.text }]}>
        {label}
      </ThemedText>
      <TextInput
        placeholderTextColor={placeholderTextColor ?? colors.icon}
        style={[
          styles.input,
          {
            borderColor: colors.icon,
            color: colors.text,
          },
          style,
        ]}
        {...inputProps}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  block: {
    alignSelf: "stretch",
    gap: 6,
    width: "100%",
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: "100%",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    marginBottom: 2,
  },
});
