import React from "react";
import { Tabs } from "expo-router";
import { CustomTabBar } from "../../components/CustomTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={() => <CustomTabBar />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFF9F2",
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: "transparent",
          borderTopWidth: 0,
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="learn" />
      <Tabs.Screen name="pipo" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
