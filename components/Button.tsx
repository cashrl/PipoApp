import React from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from "react-native";

type ButtonVariant = "primary" | "success" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const colors = {
  primary: "#4FBEF7",
  success: "#63D471",
  white: "#FFFFFF",
};

export function Button({
  variant = "primary",
  size = "md",
  label,
  icon,
  loading,
  disabled,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        styles[`button_${size}`],
        variant === "outline" && styles.button_outline,
        variant === "primary" && { backgroundColor: colors.primary },
        variant === "success" && { backgroundColor: colors.success },
        disabled && styles.button_disabled,
      ]}
      disabled={disabled || loading}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? colors.primary : colors.white} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              styles[`text_${size}`],
              variant === "outline" && styles.text_outline,
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 16,
  },
  button_sm: { paddingHorizontal: 16, paddingVertical: 8 },
  button_md: { paddingHorizontal: 24, paddingVertical: 12 },
  button_lg: { paddingHorizontal: 32, paddingVertical: 16 },
  button_outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  button_disabled: { opacity: 0.5 },
  text: { fontWeight: "600", color: colors.white },
  text_sm: { fontSize: 14 },
  text_md: { fontSize: 16 },
  text_lg: { fontSize: 18 },
  text_outline: { color: colors.primary },
});
