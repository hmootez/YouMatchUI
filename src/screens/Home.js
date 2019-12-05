import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  getActivities,
  getLikedVideos,
} from './../redux/repository/RestRepository';
import {GoogleSignin} from '@react-native-community/google-signin';

export default class Home extends React.Component {
  state = {currentUser: this.props.navigation.state.params.userInfo};
  tokens = GoogleSignin.getTokens().then(r =>
    this.setState({access_token: r.accessToken}),
  );

  render() {
    let activities = {};
    console.log(this.state);
    if (this.state.access_token) {
      getLikedVideos(this.state.access_token).then(res => console.log(res));
      getActivities(this.state.access_token).then(res => {
        activities = res;
      });
    }
    const {currentUser} = this.state;

    return (
      <View style={styles.container}>
        <Image
          style={{width: 70, height: 70, borderRadius: 50}}
          source={{uri: currentUser.user.photo}}
        />
        {/* eslint-disable-next-line react/jsx-no-undef */}
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text style={{fontSize: 48, textAlign: 'center'}}>
          Hi {currentUser.user.givenName} !
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 48,
  },
});
