import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../../components/Card";
import { ProgressBar } from "../../components/ProgressBar";

export default function LearnTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aulas</Text>

      <Card>
        <View style={styles.lessonRow}>
          <Text style={styles.lessonIcon}>🐾</Text>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Animais</Text>
            <Text style={styles.lessonSubtitle}>dog, cat, bird, fish</Text>
            <ProgressBar progress={0} showStar={false} />
          </View>
        </View>
      </Card>

      <Card style={styles.lockedCard}>
        <View style={styles.lessonRow}>
          <Text style={styles.lessonIcon}>🎨</Text>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Cores</Text>
            <Text style={styles.lessonSubtitle}>Em breve...</Text>
          </View>
          <Text style={styles.lock}>🔒</Text>
        </View>
      </Card>

      <Card style={styles.lockedCard}>
        <View style={styles.lessonRow}>
          <Text style={styles.lessonIcon}>🔢</Text>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Números</Text>
            <Text style={styles.lessonSubtitle}>Em breve...</Text>
          </View>
          <Text style={styles.lock}>🔒</Text>
        </View>
      </Card>

      <Card style={styles.lockedCard}>
        <View style={styles.lessonRow}>
          <Text style={styles.lessonIcon}>📐</Text>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Formas</Text>
            <Text style={styles.lessonSubtitle}>Em breve...</Text>
          </View>
          <Text style={styles.lock}>🔒</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF9F2", padding: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "#2D3436" },
  lessonRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  lessonIcon: { fontSize: 40 },
  lessonInfo: { flex: 1 },
  lessonTitle: { fontSize: 18, fontWeight: "500", color: "#2D3436" },
  lessonSubtitle: { fontSize: 14, color: "#636E72" },
  lockedCard: { opacity: 0.5 },
  lock: { fontSize: 24 },
});
