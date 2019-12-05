import React from 'react';
import {Text, View} from 'react-native';
import styles from '../components/Style';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

export default class SignUp extends React.Component {
  state = {errorMessage: null};

  async componentDidMount() {
    //initial configuration
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
    // try {
    //   const userInfo = await GoogleSignin.signInSilently().then(userInfo => {
    //     this.setState({userInfo});
    //     this.props.navigation.navigate('Home', {userInfo});
    //   });
    //   // eslint-disable-next-line react/no-did-mount-set-state
    //   this.setState({userInfo});
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_REQUIRED) {
    //     // user has not signed in yet
    //     this.props.navigation.navigate('SignUp');
    //   } else {
    //     // some other error
    //     this.props.navigation.navigate('SignUp');
    //   }
    // }
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn()
        .then(userInfo => {
          console.log(userInfo);
          this.setState({userInfo});
          this.props.navigation.navigate('Home', {userInfo});
        })
        .catch(e => console.log(e.code, e));
      console.log(this.state);
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

  render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
        />
        <Text>
          Already have an account ?{' '}
          <Text
            onPress={() => this.props.navigation.navigate('Login')}
            color={'#e93766'}
            style={{fontSize: 18}}>
            {' '}
            Login
          </Text>{' '}
        </Text>
      </View>
    );
  }
}
