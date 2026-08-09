import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../../components/Card";

export default function PipoTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sala do Pipo</Text>

      <Card style={styles.mascotCard}>
        <Text style={styles.mascot}>🦊</Text>
        <Text style={styles.mascotName}>Pipo está feliz!</Text>
        <Text style={styles.mascotSubtitle}>Complete aulas para desbloquear acessórios</Text>
      </Card>

      <View style={styles.itemsRow}>
        <View style={styles.item}>
          <Text style={styles.itemIcon}>👕</Text>
          <Text style={styles.itemLabel}>Roupas</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemIcon}>🧸</Text>
          <Text style={styles.itemLabel}>Brinquedos</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemIcon}>🪴</Text>
          <Text style={styles.itemLabel}>Plantas</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF9F2", padding: 24, gap: 24 },
  title: { fontSize: 24, fontWeight: "bold", color: "#2D3436", textAlign: "center" },
  mascotCard: { alignItems: "center", paddingVertical: 32 },
  mascot: { fontSize: 80, marginBottom: 16 },
  mascotName: { fontSize: 20, fontWeight: "500", color: "#2D3436" },
  mascotSubtitle: { color: "#636E72", textAlign: "center", marginTop: 8 },
  itemsRow: { flexDirection: "row", justifyContent: "space-around" },
  item: { alignItems: "center" },
  itemIcon: { fontSize: 32 },
  itemLabel: { fontSize: 12, color: "#636E72", marginTop: 4 },
});
