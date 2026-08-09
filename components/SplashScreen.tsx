import { useEffect } from "react";
import { View, Image, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
  runOnJS,
  interpolate,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

interface PropsSplashScreen {
  onFinished: () => void;
}

export default function SplashScreen({ onFinished }: PropsSplashScreen) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1.05);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });

    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 400 }, () => {
        runOnJS(onFinished)();
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="flex-1 bg-cream">
      <Animated.View style={[{ flex: 1 }, containerStyle]}>
        <Image
          source={require("../assets/splash.png")}
          style={{ width, height, resizeMode: "cover" }}
        />
      </Animated.View>

      <AnimatedSparkle x={width * 0.75} y={height * 0.22} delay={0} size={8} />
      <AnimatedSparkle x={width * 0.82} y={height * 0.35} delay={300} size={6} />
      <AnimatedSparkle x={width * 0.15} y={height * 0.45} delay={600} size={7} />
      <AnimatedSparkle x={width * 0.88} y={height * 0.55} delay={200} size={5} />
      <AnimatedSparkle x={width * 0.1} y={height * 0.65} delay={500} size={6} />
    </View>
  );
}

function AnimatedSparkle({
  x,
  y,
  delay,
  size,
}: {
  x: number;
  y: number;
  delay: number;
  size: number;
}) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 800 }),
          withTiming(0, { duration: 800 })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#FFFFFF",
          shadowColor: "#FFFFFF",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
          elevation: 4,
        },
        animatedStyle,
      ]}
    />
  );
}
