import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable, Keyboard, Alert, ToastAndroid
} from 'react-native';
import { Separator, ToggleButton } from './components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors, Fonts, Images } from './contants';
import { Display } from './utils';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import { GeneralAction } from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'
import { AuthenicationService } from './services';
import OTPInput from './components/OTPInput';
import CountDown from 'react-native-countdown-component';


const LoginScreen = ({ navigation, setToken }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState('');
  const [isMounted, setIsMounted] = useState(true);
  const [userdata, setUserdata] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setotp] = useState(false)

  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 4;

  useEffect(() => {
    if (isMounted) {
      SplashScreen.hide();
      AsyncStorage.getItem('user_info', (err, result) => {
        setUserdata(JSON.parse(result))
        setUsername(userdata?.phone)
        setIsMounted(false)
      });
    }

  })

  const sendOTP = async () => {
    if (username === '' || username.length != 10) {
      setIsLoading(false);
      Alert.alert('Please check your mobile number')
      // setErrorMessage('Please check your mobile number')
      setotp(false)

    } else {
      let user = {
        username,
      };
      AuthenicationService.sendOTP(user).then(response => {
        setIsLoading(false);
        // console.log(user)
        console.log(response)
        // setToken(response?.data);
        if (response?.status== true) {
          setotp(true)

          // AsyncStorage.setItem('user_info', JSON.stringify(response.result));     
          // navigation.navigate('Home')
        }else{
          setotp(false)
          // setErrorMessage(response?.msg);
          setErrorMessage(response?.message);
        }
      })
    }
  }

  const signIn = async () => {
    // setotp(false)
    // navigation.navigate('Home')

    if(username==='' ||username.length < 10){
      setIsLoading(false);
      setErrorMessage('Please check your mobile number')
    }else{

    let user = {
      username,
      otpCode
    };
    AuthenicationService.login(user).then(response => {
      setIsLoading(false);
      // console.log(user)
      console.log(response)
      // setToken(response?.data);
      if (response?.status== true) {
        AsyncStorage.setItem('user_info', JSON.stringify(response.data));     
        navigation.navigate('Home')
      }else{
        ToastAndroid.showWithGravityAndOffset(
          response?.message,
      ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    );
        // setErrorMessage(response?.msg);
        // setErrorMessage(response?.message);
      }
    });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />

      {/* <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          color={"black"}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Sign In</Text>
      </View> */}
      {!otp ? (<View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center', marginTop:120
        }}>

          <Image source={require('../src/assets/images/logo.png')}
            style={{ width: 170, }}
            resizeMode="contain" />
        </View>

        <Text style={styles.title}>Login</Text>
        <Text style={styles.content}>
          Enter your mobile number for login
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Feather
              name="phone"
              size={18}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Mobile Number" keyboardType='numeric'
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              maxLength={10}
              onChangeText={text => setUsername(text)}
              value={username}
            />
          </View>
        </View>
        <Separator height={15} />
        <TouchableOpacity
          style={styles.signinButton}
          onPress={() => sendOTP()}
          activeOpacity={0.8}>
          {isLoading ? (
            <LottieView source={Images.LOADING} autoPlay />
          ) : (
            <Text style={styles.signinButtonText}>Send OTP </Text>
          )}
        </TouchableOpacity>
      </View>

      ) : (

        <View  >
          <Text style={[styles.title,{marginTop:50}]}>Verify OTP</Text>
          <Text style={styles.content}>
            OTP successfullt sent to your mobile number
          </Text>
          <OTPInput
            code={otpCode}
            setCode={setOTPCode}
            maximumLength={maximumCodeLength}
            setIsPinReady={setIsPinReady}
          />

          <TouchableOpacity
            style={styles.signinButton}
            onPress={() => signIn()}
            activeOpacity={0.8}>
            {isLoading ? (
              <LottieView source={Images.LOADING} autoPlay />
            ) : (
              <Text style={styles.signinButtonText}>Verify OTP </Text>
            )}
          </TouchableOpacity>


          <CountDown
            until={180}
            size={17}
            onFinish={() => {
              //Alert.alert('Resend otp')
            }}
            digitStyle={{ backgroundColor: '#FFF' }}
            digitTxtStyle={{ color: '#1CC625' }}
            timeToShow={['M', 'S']}
            // timeToShow={['S']}
            // timeLabels={{m: 'MM', s: 'SS'}}
            timeLabels={{ s: '' }}
          />
          <Text style={styles.content}>
            Resend OTP
          </Text>

        </View>)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  title: {
    color: 'black',
    textAlign: "center",
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontWeight: "bold",
    lineHeight: 20 * 1.4,
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM,
    // marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: 'center',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 15,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },

  signinButton: {
    backgroundColor: Colors.DARK_ONE,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },


  signinButtonLogo: {
    height: 18,
    width: 18,
  },

  errorMessage: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_RED,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginHorizontal: 20,
    marginTop: 3,
    marginBottom: 10,
  },
});



export default LoginScreen;
