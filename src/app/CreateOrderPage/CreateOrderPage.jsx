import { useState } from 'react';
import { Pressable, Text, View, } from 'react-native';
export default function CreateOrderPage() {
  const [selectedServices, setSelectedServices] = useState([]);
  const services = ["Normal Washing", "Wash & Iron", "Iron Only", "Dry Cleaning",];
  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };
  const [fullSuitCount, setFullSuitCount] = useState(1);

  return (
    <View className="flex h-full items-center p-4 gap-4">
      <View className="text-xl font-bold">
        <Text>
          Location
        </Text>
      </View>
      <View className="bg-white p-4 w-full flex gap-2">
        <View>
          <Text className="text-lg font-semibold ">
            Services
          </Text>
          <Text className="text-gray-500">
            Select the services you want to avail
          </Text>
        </View>
        <View className="flex flex-row items-center gap-4 flex-wrap">
          {services.map((service, index) => (
            <Pressable
              key={index}
              onPress={() => toggleService(service)}
              className="flex flex-row items-center gap-2 flex-1 min-w-[107px] ">
              <View className={`w-4 h-4 rounded-full border border-gray-500 ${selectedServices.includes(service) ? "bg-blue-500 border-blue-500" : ""}`} />
              <Text>{service}</Text>
            </Pressable>
          ))}


        </View>
      </View>
      <View className="bg-white p-4 w-full flex gap-2">
        <Text className="text-lg font-semibold">Number of Items</Text>
        <View className="flex flex-row items-center gap-4">
          <View>
            <Text className="text-sm font-medium">Full Suit</Text>
            <View className="flex flex-row items-center gap-2 border border-gray-200 rounded-lg overflow-hidden">
              <Pressable className="bg-blue-500 py-1 px-2 rounded-l">
                <Text className="text-white font-bold text-xl">-</Text>
              </Pressable>
              <Text className="px-2  ">{fullSuitCount}</Text>
              <Pressable className="bg-blue-500 py-1 px-2 rounded-r">
                <Text className="text-white font-bold text-xl">+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View><Text>Schedule</Text></View>
      <View><Text>Image Upload</Text></View>
      <View><Text>Options</Text></View>
      <View><Text>Addtional Notes</Text></View>
      <View><Text>PAYMENTS</Text></View>
      <View><Text>AGREED</Text></View>
      <View><Text>Button</Text></View>
    </View>
  )
}