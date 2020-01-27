import axios from 'axios';
import {returnData, returnError} from './repositoryUtils';

const youTubeApi = 'https://www.googleapis.com/youtube/v3';

const youMatchFirebaseApi = 'http://192.168.1.89:8000';

export const getLikedVideos = access_token => {
  return axios({
    method: 'get',
    url: `${youTubeApi}/videos?part=snippet&myRating=like`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  })
    .then(returnData)
    .catch(returnError);
};

export const getDislikedVideos = access_token => {
  return axios({
    method: 'get',
    url: `${youTubeApi}/videos?part=snippet&myRating=dislike`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  })
    .then(returnData)
    .catch(returnError);
};

export const getActivities = access_token => {
  return axios({
    method: 'get',
    url: `${youTubeApi}/activities?part=snippet,contentDetails&maxResults=50&mine=true`,
    headers: {
      Authorization: `Bearer ${access_token}`,
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
