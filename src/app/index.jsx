import { useRouter } from "expo-router";
import { PackagePlus } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
export default function Index() {
  const router = useRouter();
  return (
    <View
      className="flex h-full items-center p-8 gap-8  "
    >
      <Pressable 
      onPress={() => router.push("CreateOrderPage")}
      className="flex bg-blue-500 p-8 px-16   w-full items-center justify-center rounded-lg flex-row gap-4">
      <View className="bg-blue-400 p-4 rounded-full">
        <PackagePlus color="#F2F2F2" size={48} />
      </View>
      <View>
        <Text className="text-3xl font-bold text-white">Book Your Order</Text>
        <Text className="text-lg text-white">Ready to Place a new Order? Tap Here!</Text>
      </View>
      </Pressable>
      <View className="flex  w-full justify-center gap-4 ">
      <View className="flex flex-row justify-between w-full ">
        <Text className="text-xl font-bold">Your Orders</Text>
        <Text className="text-xl font-bold text-blue-500">See All</Text>
      </View>
        <Text className="text-lg text-center">You Currently Have No Orders</Text>
      </View>
    </View>
  );
}
