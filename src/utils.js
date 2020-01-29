export function extract_activities(data) {
  return data
    .filter(e => ['subscription', 'like'].includes(e.snippet.type))
    .map(e => {
      if (e.snippet.type === 'subscription') {
        return {
          // type: 'subscription',
          channelId: e.contentDetails.subscription.resourceId.channelId,
          channelTitle: e.snippet.channelTitle,
          picture: e.snippet.thumbnails?.default.url,
          // user_channel_id: e.snippet.channelId,
        };
      } else {
        return {
          type: 'like',
          videoTitle: e.snippet.title,
          videoDescription: e.snippet.description,
          id: e.contentDetails.like.resourceId.videoId,
          // user_channel_id: e.snippet.channelId,
        };
      }
    });
}

export function extractLikedVideos(data) {
  return data.map(e => {
    return {
      videoTitle: e.snippet.title,
      videoDescription: e.snippet.description,
      videoId: e.id,
      channelId: e.snippet.channelId,
      channelTitle: e.snippet.channelTitle,
      picture: e.snippet.thumbnails?.default.url,
      // tags: e.snippet.tags,
      categoryId: e.snippet.categoryId,
    };
  });
}
