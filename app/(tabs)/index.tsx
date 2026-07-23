import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5E6" }}>
      <View className="flex-1 items-center justify-between px-6 py-4">
        {/* Settings icon - top right */}
        <View className="w-full flex-row justify-end">
          <Pressable
            onPress={() => router.push("/settings")}
            className="w-12 h-12 rounded-full bg-white items-center justify-center shadow-sm"
          >
            <Text className="text-2xl">⚙️</Text>
          </Pressable>
        </View>

        {/* Center content */}
        <View className="flex-1 items-center justify-center -mt-8">
          {/* Greeting */}
          <Text className="text-4xl font-extrabold text-purple-900 mb-6">
            Oi! 👋
          </Text>

          {/* Pipo mascot */}
          <View className="items-center justify-center mb-8">
            <Text className="text-[180px]">👹</Text>
          </View>
        </View>

        {/* CTA Button */}
        <View className="w-full mb-4">
          <Pressable
            onPress={() => router.push("/learn")}
            className="bg-green-500 py-5 rounded-3xl items-center justify-center shadow-md"
            style={({ pressed }) => [
              { opacity: pressed ? 0.8 : 1 },
              {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 6,
              },
            ]}
          >
            <Text className="text-white text-2xl font-bold">
              Vamos brincar 🚀
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
