import React from 'react';
import {Text, TextInput, View, Button} from 'react-native';
import styles from '../components/Style';

export default class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null};

  handleLogin = () => {
    // TODO: For Firebase athu
    console.log('handleSignUp');
  };

  render() {
    return (
      <View style={styles.container}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text style={{color: '#e93766', fontSize: 40}}>Login</Text>
        {this.state.errorMessage && (
          // eslint-disable-next-line react-native/no-inline-styles
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          value={this.state.password}
        />
        <Button
          title={'Login'}
          color={'#e93766'}
          onPress={this.handleLogin()}
        />
        <Text>
          Don't have an account ?{' '}
          <Text
            onPress={() => this.props.navigation.navigate('SignUp')}
            style={{fontSize: 18}}>
            {' '}
            Sign Up
          </Text>{' '}
        </Text>
      </View>
    );
  }
}
