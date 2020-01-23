export function extract_activities(data) {
  const activities = data.items
    .filter(e => ['subscription', 'like'].includes(e.snippet.type))
    .map(e => {
      if (e.snippet.type === 'subscription') {
        return {
          type: 'subscription',
          channel_id: e.contentDetails.subscription.resourceId.channelId,
          channel_title: e.snippet.channelTitle,
          user_channel_id: e.snippet.channelId,
        };
      } else {
        return {
          type: 'like',
          video_title: e.snippet.title,
          video_description: e.snippet.description,
          video_id: e.contentDetails.like.resourceId.videoId,
          user_channel_id: e.snippet.channelId,
        };
      }
    });
  console.log(activities);
  console.log(activities.length);
  return activities;
}