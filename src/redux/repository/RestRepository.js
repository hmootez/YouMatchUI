import axios from 'axios';
import {returnData, returnError} from './repositoryUtils';

const youTubeApi = 'https://www.googleapis.com/youtube/v3';

export const getAllLikedVideos = async accessToken => {
  let pageToken = '';
  let next = true;
  let likedVideos = [];
  while (next) {
    await getLikedVideos(accessToken, pageToken).then(res => {
      likedVideos = likedVideos.concat(res.data.items);
      if (res.data.nextPageToken) {
        next = true;
        pageToken = res.data.nextPageToken;
      } else {
        next = false;
      }
    });
  }
  return likedVideos;
};

export const getAllDislikedVideos = async accessToken => {
  let pageToken = '';
  let next = true;
  let dislikedVideos = [];
  while (next) {
    await getDislikedVideos(accessToken, pageToken).then(res => {
      dislikedVideos = dislikedVideos.concat(res.data.items);
      if (res.data.nextPageToken) {
        next = true;
        pageToken = res.data.nextPageToken;
      } else {
        next = false;
      }
    });
  }
  return dislikedVideos;
};

export const getLikedVideos = (access_token, pageToken) => {
  return axios({
    method: 'get',
    url: `${youTubeApi}/videos?part=snippet&myRating=like${
      pageToken ? '&pageToken=' + pageToken : ''
    }&maxResults=50`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  })
    .then(returnData)
    .catch(returnError);
};

export const getDislikedVideos = (access_token, pageToken) => {
  return axios({
    method: 'get',
    url: `${youTubeApi}/videos?part=snippet&myRating=dislike${
      pageToken ? '&pageToken=' + pageToken : ''
    }&maxResults=50`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  })
    .then(returnData)
    .catch(returnError);
};

export const getAllActivities = async accessToken => {
  let pageToken = '';
  let next = true;
  let activities = [];
  while (next) {
    await getActivities(accessToken, pageToken).then(res => {
      activities = activities.concat(res.data.items);
      if (res.data.nextPageToken) {
        next = true;
        pageToken = res.data.nextPageToken;
      } else {
        next = false;
      }
    });
  }
  return activities;
};

export const getActivities = (accessToken, pageToken) => {
  return axios({
    method: 'get',
    url: `${youTubeApi}/activities?part=snippet,contentDetails${
      pageToken ? '&pageToken=' + pageToken : ''
    }&maxResults=50&mine=true`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  })
    .then(returnData)
    .catch(returnError);
};

// export const sendActivities = data => {
//   return axios({
//     method: 'get',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     url: `${youMatchApi}/activities/`,
//     data: JSON.stringify(data),
//   })
//     .then(returnData)
//     .catch(returnError);
// };
