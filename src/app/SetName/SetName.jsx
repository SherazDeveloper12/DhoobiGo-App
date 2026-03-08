import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../store/slices/AuthSlice';

export default function SetName() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const handleContinue = () => {
        dispatch(updateUserProfile({ name: name }));
    }
  return (
      <SafeAreaView>
        <View className="flex p-24  h-full w-full gap-2">
          <Text className="text-2xl font-bold">Please Type Your Name</Text>
          <TextInput 
            className="border border-gray-300 p-2 rounded-md " 
            placeholder="Your Name" 
            maxLength={18}
            value={name}
            onChangeText={setName}
          />
       <Pressable 
       onPress={()=>handleContinue()}
       className="bg-blue-500 rounded-md p-2 w-full flex flex-row items-center justify-center gap-2 ">
            <Text className="text-white text-center text-2xl font-bold">Continue</Text>
          </Pressable>
        </View>
      </SafeAreaView>
  )
}