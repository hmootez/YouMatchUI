import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {getAllLikedVideos} from './../redux/repository/RestRepository';
import {GoogleSignin} from '@react-native-community/google-signin';
import {extract_activities, extractLikedVideos} from '../utils';
import firebase from '../../firebase';
import {getAllActivities} from '../redux/repository/RestRepository';

const saveUser = async (userId, user) => {
  const db = firebase.firestore();
  return await db
    .collection('users')
    .doc(userId)
    .set(user)
    .then(() => userId)
    .catch(e => console.log(e));
};

const getUser = async userId => {
  const db = firebase.firestore();
  return await db
    .collection('users/')
    .doc(userId)
    .get()
    .then(docRef => docRef.exists);
};

export default ({navigation}) => {
  const [currentUser] = useState(navigation.state.params.userInfo);
  const [subscriptions, setSubscriptions] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  if (accessToken === '') {
    GoogleSignin.getTokens().then(r => setAccessToken(r.accessToken));
  }

  getUser(currentUser.user?.id).then(exists => {
    if (exists) {
      console.log('already here');
    } else {
      if (accessToken && subscriptions.length === 0) {
        let subs = [];
        let likes = [];
        getAllActivities(accessToken).then(res => {
          extract_activities(res).map(e =>
            e.type === 'like' ? likes.push(e) : subs.push(e),
          );
          setSubscriptions(subs);
        });
        getAllLikedVideos(accessToken).then(res => {
          setLikedVideos(extractLikedVideos(res));
        });
      }
      if (likedVideos.length !== 0 && subscriptions.length !== 0) {
        saveUser(currentUser.user?.id, {
          ...currentUser.user,
          likedVideos,
          subscriptions,
        }).then(r => console.log(r));
      }
    }
  });
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
