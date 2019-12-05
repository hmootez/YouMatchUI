import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import * as firebase from 'firebase';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const props = this.props;
    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user);
      props.navigation.navigate(user ? 'Home' : 'SignUp');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text style={{color: '#e93766', fontSize: 40}}>Loading</Text>
        <ActivityIndicator color="#e93766" size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
