import { useLocalSearchParams, useRouter } from 'expo-router';
import { MailOpen, Smartphone } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../../store/slices/AuthSlice';

export default function OTPVerification() {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useLocalSearchParams();
  console.log("Params in OTP Verification: ", params);
  const phoneNumber = params.phoneNumber;
  console.log("Phone number from params: ", phoneNumber);
  const user = useSelector((state) => state.auth.user);
  const otpSent = useSelector((state) => state.auth.otpSent);
 useEffect(()=>{
  console.log("User in OTP Verification:", user);
  if(user){
  router.push({
    pathname: '/',
  })
  }
  if (otpSent === false){
    router.push({
      pathname: '/Auth/Auth',
    })
  }
 },[user, otpSent])
  const handleVerifyOtp = () => {
    const otpData = { otpCode: otp, phoneNumber: phoneNumber };
    console.log("OTP Data to be sent for verification: ", otpData);
    dispatch(verifyOtp(otpData));
  };
  const resendOtp = () => {
    // Implement OTP resend logic here
    console.log("Resending OTP");
  }
  return (
    <SafeAreaView>
      <View className="p-8 flex mt-20 gap-4 h-full">
        <View className="flex flex-col items-center gap-4 relative">
          <View className="absolute top-5">
            <MailOpen size={50} color="#868485" strokeWidth={0.5} />
          </View>
          <Smartphone size={100} color="#868485" strokeWidth={0.5} />
        </View>
        <View className="flex flex-col gap-2 items-center justify-center">
          <Text className="text-3xl font-bold">OTP Verification</Text>
          <Text className=" text-gray-400 text-center">You will receive an OTP on your registered mobile number</Text>
        </View>
        <View className="flex flex-col gap-2 items-center">
          <TextInput
            className="border border-gray-300 rounded-md p-2 w-[100%]"
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <Pressable className="bg-blue-500 rounded-md p-2 w-full flex flex-row items-center justify-center gap-2" 
          onPress={() => handleVerifyOtp()}>
            <Text className="text-white text-center text-2xl font-bold">Verify OTP</Text>
          </Pressable>
        </View>
        <View className="flex flex-row items-center gap-2 justify-center">
          <Text className="text-gray-400">Didn't receive the OTP?</Text>
          <Pressable>
            <Text className="text-blue-500 font-semibold">Resend OTP</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}



