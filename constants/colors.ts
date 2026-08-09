export const Colors = {
  primary: "#4FBEF7",
  success: "#63D471",
  warning: "#FFD93D",
  danger: "#FF6B6B",
  pink: "#FFB7D5",
  cream: "#FFF9F2",
  white: "#FFFFFF",
  dark: "#2D3436",
  muted: "#636E72",
} as const;

export type ColorToken = keyof typeof Colors;
