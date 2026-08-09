import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";

export default function SettingsTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <Card>
        <Text style={styles.cardTitle}>Som</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Efeitos sonoros</Text>
          <Text style={styles.settingValue}>✓ Ativado</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Área dos Pais</Text>
        <Button variant="outline" label="Acessar com PIN" />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF9F2", padding: 24, gap: 24 },
  title: { fontSize: 24, fontWeight: "bold", color: "#2D3436" },
  cardTitle: { fontSize: 18, fontWeight: "500", color: "#2D3436", marginBottom: 16 },
  settingRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  settingLabel: { color: "#636E72" },
  settingValue: { color: "#4FBEF7", fontWeight: "500" },
});
