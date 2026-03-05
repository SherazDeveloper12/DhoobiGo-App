import { useRouter } from 'expo-router';
import { ArrowBigRight } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { AuthenticateUser, } from '../../store/slices/AuthSlice';

export default function Auth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isvalid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("valid ", isvalid)
 const handlePhoneChange = (text) => {
  // Always keep +923
  if (!text.startsWith('+923')) {
    text = '+923';
  }
  
  // Get everything after +923
  let digits = text.substring(4).replace(/\D/g, '');
  
  // Max 10 digits
  if (digits.length > 10) {
    digits = digits.substring(0, 10);
  }
  
  // Combine locked +923 with digits
  setPhoneNumber('+923' + digits);
  if (digits.length === 10) {
    setIsValid(true);
  }
  
  console.log("Digits: ", digits, "IsValid: ", digits.length === 9);
};
  const handleContinue = () => {
    console.log("Phone number to check:", phoneNumber);
    dispatch(AuthenticateUser(phoneNumber));
    // router.push({
    //   pathname: '/Auth/OTPVerfication',
    //   params: { phoneNumber: phoneNumber }
    // })
  }
  return (
    <SafeAreaView>
      <View className="p-4 flex justify-center gap-4 ">
      
        <Text className="text-2xl font-bold">Enter Your Number </Text>
        <TextInput
        minlength={13}
        maxLength={13}
          value={phoneNumber}
          // onTouchStart={() => phoneNumber[2] !==2 && phoneNumber.length < 3 &&  setPhoneNumber('+92')}
          onChangeText={handlePhoneChange}
          className="border border-gray-300 rounded-md p-2  "
          placeholder="+923286606721"
          keyboardType="phone-pad"
        />
        <Pressable 
        disabled={phoneNumber.length !== 13}
        onPress={handleContinue}
        className={`bg-blue-500 rounded-md p-2 flex flex-row items-center justify-center gap-2 w-full ${phoneNumber.length !== 13 ? 'opacity-60' : ''}`}
      >
        <Text className="text-white text-center text-2xl font-bold ">Press here to Continue</Text>
        <ArrowBigRight size={20} color="#ffffff" fill="#ffffff" className="absolute left-2 top-1/2 -translate-y-1/2" />
      </Pressable>
      </View>
    </SafeAreaView>
  )
}