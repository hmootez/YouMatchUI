import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { getActivities} from './../redux/repository/RestRepository';
import {GoogleSignin} from '@react-native-community/google-signin';
import {extract_activities} from '../utils';

export default ({navigation}) => {
  const [currentUser] = useState(
    navigation.state.params.userInfo,
  );

  const [accessToken, setAccessToken] = useState('');

  GoogleSignin.getTokens().then(r => setAccessToken(r.accessToken));

  // eslint-disable-next-line no-unused-vars
  let activities = {};
  if (accessToken) {
    console.log(accessToken)
    //getLikedVideos(this.state.access_token).then(res => console.log(res));
    getActivities(accessToken).then(res => {
      console.log(res);
      activities = res;
      console.log(extract_activities(res.data));
    });
  }

  return (
    <View style={styles.container}>
      <Image
        /* eslint-disable-next-line react-native/no-inline-styles */
        style={{width: 70, height: 70, borderRadius: 50}}
        source={{uri: currentUser.user.photo}}
      />
      <Text style={{fontSize: 48, textAlign: 'center'}}>
        Hi {currentUser.user.givenName} !
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 48,
  },
});
