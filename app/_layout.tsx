import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomSplashScreen from "../components/SplashScreen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [splashFinished, setSplashFinished] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    Fredoka: require("../assets/fonts/Fredoka.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setAppReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  if (!splashFinished || !initialRoute) {
    return (
      <>
        <StatusBar style="auto" />
        <CustomSplashScreen
          onFinished={async () => {
            const value = await AsyncStorage.getItem("@pipo_onboarding_done");
            setInitialRoute(value === "true" ? "(tabs)" : "onboarding");
            setSplashFinished(true);
          }}
        />
      </>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FFF9F2" },
        }}
        initialRouteName={initialRoute}
      />
    </>
  );
}
