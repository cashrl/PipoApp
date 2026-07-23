import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LearnScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF5E6" }}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-3xl font-bold text-purple-900">Aulas</Text>
        <Text className="text-gray-500 mt-2">Em breve!</Text>
      </View>
    </SafeAreaView>
  );
}
