import { useRouter } from "expo-router";
import { PackagePlus } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { resetotpState } from "../../store/slices/AuthSlice";
export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    
    dispatch(resetotpState());
  }, [])
  return (
    <SafeAreaView>
    <View
      className="flex h-full items-center py-2 px-8 gap-3  "
    >
      <View className="flex flex-row  flex-wrap  items-center justify-start gap-2  w-full">
        <Text className="text-2xl font-bold text-center ">Welcome to DhoobiGo, </Text>
        <Text className="text-2xl font-bold text-blue-500">{user.name}</Text>
      </View>
      <Pressable 
      onPress={() => router.push("CreateOrderPage/CreateOrderPage")}
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
    </SafeAreaView>
  );
}
