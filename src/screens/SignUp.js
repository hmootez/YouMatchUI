import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styles from '../components/Style';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

export default ({navigation}) => {
  const [errorMessage] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/youtube.readonly',
      ],
      // Replace with your webClientId generated from Firebase console
      webClientId:
        '849999105643-hbc6351r1u2j56maddjqkv70munen2b7.apps.googleusercontent.com',
      hostedDomain: '',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn()
        .then(userInfo => {
          setUserInfo({userInfo});
          navigation.navigate('Home', {userInfo});
        })
        .catch(e => console.log(e.code, e));
      //this.props.navigation.navigate('Home', {userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.container}>
      {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};
