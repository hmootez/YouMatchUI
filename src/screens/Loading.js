import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import * as firebase from 'firebase';

export default ({navigation}) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user);
      navigation.navigate(user ? 'Home' : 'SignUp');
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{color: '#e93766', fontSize: 40}}>Loading</Text>
      <ActivityIndicator color="#e93766" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
