import { Stack } from "expo-router";
import { Bell, User } from "lucide-react-native";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import '../global.css';
import { fetchTokenFromStorage, userProfile } from "../store/slices/AuthSlice";
import { store } from '../store/store';


export default function RootLayout() {
  return (
    <SafeAreaProvider>

      <Provider store={store}>
        <RootNavigator />
      </Provider>

    </SafeAreaProvider>
  );
}


function RootNavigator() {
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTokenFromStorage());
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(userProfile(token))
    }
  }, [token])
 
  return (
    <Stack>
      <Stack.Protected guard={loading}>
        <Stack.Screen name="Loading/Loading"
          options={{
            title: "Loading",
            animation: "none",
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!loading}>
        <Stack.Protected guard={user}>
            <Stack.Protected guard={user && !user.name}>
              <Stack.Screen name="SetName/SetName"
                options={{
                  title: "Set Name",
                  animation: "none",
                  headerShown: false,
                }}
              />
            </Stack.Protected>
                <Stack.Protected guard={user && user.name}>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="index"
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
          /> */}
          <Stack.Screen name="CreateOrderPage/CreateOrderPage"
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
          </Stack.Protected>
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="Auth/Auth"
            options={{
              title: "Authentication",
              animation: "none",
              headerShown: false,

            }}
          />
          <Stack.Screen name="OTPVerfication"
            options={{
              title: "Authentication",
              animation: "none",
              headerShown: false,

            }}
          />
        </Stack.Protected>
      </Stack.Protected>
    </Stack>
  )

}

