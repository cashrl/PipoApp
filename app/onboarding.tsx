import { useEffect } from "react";
import { Image, Dimensions, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePress = async () => {
    await AsyncStorage.setItem("@pipo_onboarding_done", "true");
    router.replace("/(tabs)");
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Animated.View style={[styles.container, containerStyle]}>
        <Image
          source={require("../Telas/tela 2.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2",
  },
  image: {
    width,
    height,
  },
});
