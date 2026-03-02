import { Stack } from "expo-router";
import { Bell, User } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { Provider } from 'react-redux';
import '../global.css';
import { store } from '../store/store';
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index"
          options={{
          title: "DhoobiGo",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: '#165baa',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <View className="flex flex-row items-center gap-4">
              <TouchableOpacity onPress={() => { }}>

                <Bell size={20} color="#000000" />

              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}
                className="p-2 rounded-full bg-gray-200"
              >
                <User size={20} color="#165baa" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen name="CreateOrderPage/index"
        options={{
          title: "Create Order",
          animation: "slide_from_bottom",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: '#165baa',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <View className="flex flex-row items-center gap-4">
              <TouchableOpacity onPress={() => { }}>

                <Bell size={20} color="#000000" />

              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}
                className="p-2 rounded-full bg-gray-200"
              >
                <User size={20} color="#165baa" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen name="Auth/index"
        options={{
          title: "Authentication",
          animation: "none",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: '#165baa',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <View className="flex flex-row items-center gap-4">
              <TouchableOpacity onPress={() => { }}>

                <Bell size={20} color="#000000" />

              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }}
                className="p-2 rounded-full bg-gray-200"
              >
                <User size={20} color="#165baa" />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Stack>
  </Provider>
  );
}
