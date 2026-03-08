import { useRouter } from 'expo-router';
import { ArrowBigRight } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AuthenticateUser, resetotpState } from '../../store/slices/AuthSlice';

export default function Auth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isvalid, setIsValid] = useState(false);
  const otpSent = useSelector((state) => state.auth.otpSent);
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state) => state.auth.error);
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

  };
  const handleContinue = () => {
    dispatch(AuthenticateUser(phoneNumber));
  }
  useEffect(() => {
    console.log("state of otpSent in Auth component: ", otpSent);
    if (otpSent === true) {
      router.push({
        pathname: '/OTPVerfication',
        params: { phoneNumber } 
      })
    }
  }, [otpSent])
  useEffect(() => {
    dispatch(resetotpState());
    return () => {
      dispatch(resetotpState());
    }
  }, [])
  return (
    <SafeAreaView>
      <View className="p-4 flex pt-20 gap-4 ">
        <View>
          <Text className="text-2xl font-bold">Enter Your Number </Text>
          {error ? <Text className="text-red-500">{error}</Text> :
            <Text className="text-gray-500">We will send you a one time password to verify your account</Text>
          }
        </View>
        <TextInput
          minlength={13}
          maxLength={13}
          value={phoneNumber}
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