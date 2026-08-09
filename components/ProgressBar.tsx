import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProgressBarProps {
  progress: number;
  showStar?: boolean;
}

export function ProgressBar({ progress, showStar = true }: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clampedProgress * 100}%` }]} />
      </View>
      {showStar && clampedProgress >= 1 && <Text style={styles.star}>⭐</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 8 },
  track: {
    flex: 1,
    height: 16,
    backgroundColor: "#FFF9F2",
    borderRadius: 8,
    overflow: "hidden",
  },
  fill: { height: "100%", backgroundColor: "#63D471", borderRadius: 8 },
  star: { fontSize: 18, color: "#FFD93D" },
});
