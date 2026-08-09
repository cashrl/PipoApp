import React from "react";
import { View, Pressable, Image, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AbaConfig {
  rota: string;
  nome: string;
  iconeAtivo: any;
  iconeInativo: any;
}

const abas: AbaConfig[] = [
  { rota: "/(tabs)", nome: "Home", iconeAtivo: require("../assets/navbar/nav-home-active.png"), iconeInativo: require("../assets/navbar/nav-home-inactive.png") },
  { rota: "/(tabs)/learn", nome: "Aulas", iconeAtivo: require("../assets/navbar/nav-licoes-active.png"), iconeInativo: require("../assets/navbar/nav-licoes-inactive.png") },
  { rota: "/(tabs)/pipo", nome: "Pipo", iconeAtivo: require("../assets/navbar/nav-pipo-active.png"), iconeInativo: require("../assets/navbar/nav-pipo-inactive.png") },
  { rota: "/(tabs)/settings", nome: "Perfil", iconeAtivo: require("../assets/navbar/nav-perfil-active.png"), iconeInativo: require("../assets/navbar/nav-perfil-inactive.png") },
];

export function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const rotaAtual = pathname === "/(tabs)" || pathname === "" ? "/(tabs)" : pathname;

  return (
    <View
      style={{
        paddingBottom: Math.max(insets.bottom, 8),
        backgroundColor: "#FFF9F2",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginHorizontal: 16,
          backgroundColor: "#FFFFFF",
          borderRadius: 32,
          paddingTop: 24,
          paddingBottom: 16,
        }}
      >
        {abas.map((aba) => {
          const ativo = rotaAtual === aba.rota;
          const cor = ativo ? "#4FBEF7" : "#B0B0B0";

          return (
            <Pressable
              key={aba.rota}
              style={{ alignItems: "center", flex: 1, paddingVertical: 4 }}
              android_ripple={{ borderless: false, radius: 0, color: "transparent" }}
              onPress={() => router.push(aba.rota as any)}
            >
              <Image
                source={ativo ? aba.iconeAtivo : aba.iconeInativo}
                style={{ width: 64, height: 64 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 13, fontWeight: "600", color: cor, marginTop: 4 }}>
                {aba.nome}
              </Text>
              {ativo && (
                <View
                  style={{
                    width: 28,
                    height: 3,
                    backgroundColor: "#4FBEF7",
                    borderRadius: 2,
                    marginTop: 4,
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
