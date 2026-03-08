import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/slices/AuthSlice";

export default function Setting() {
    const dispatch = useDispatch();
    const router = useRouter();
    const logout = () => {
        dispatch(logoutUser());
       
        router.push('Auth/Auth');
    }
    return (
        <SafeAreaView className="py-2 flex h-full ">
            <View className="border border-gray-200 flex-1 bg-indigo-300">

            </View>
            <View className="border border-gray-200">
                <Text className="text-xl font-bold p-4">Privacy Policy</Text>
            </View>
            <View className="border border-gray-200">
                <Text className="text-xl font-bold p-4">Help</Text>
            </View>
            <View className="border border-gray-200">
                <Text className="text-xl font-bold p-4">Settings</Text>
            </View>
            <Pressable 
            onPress={logout}
            className="border border-gray-200">
                <Text className="text-xl font-bold p-4">Logout</Text>
            </Pressable>
        </SafeAreaView>
    )
}