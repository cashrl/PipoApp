import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type IconButtonSize = "sm" | "md" | "lg";
type IconButtonVariant = "primary" | "success" | "warning" | "muted";

interface IconButtonProps {
  icon: string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  onPress?: () => void;
}

const variantColors: Record<IconButtonVariant, string> = {
  primary: "#4FBEF7",
  success: "#63D471",
  warning: "#FFD93D",
  muted: "#636E72",
};

export function IconButton({
  icon,
  size = "md",
  variant = "primary",
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        styles[`button_${size}`],
        { backgroundColor: variantColors[variant] },
      ]}
      onPress={onPress}
    >
      <Text style={styles[`icon_${size}`]}>{icon}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  button_sm: { width: 32, height: 32 },
  button_md: { width: 48, height: 48 },
  button_lg: { width: 64, height: 64 },
  icon_sm: { fontSize: 14 },
  icon_md: { fontSize: 20 },
  icon_lg: { fontSize: 24 },
});
