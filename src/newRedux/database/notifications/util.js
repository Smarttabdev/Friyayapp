function truncate(str, length) {
  return str?.length > length ? str.substring(0, length - 3) + '...' : str;
}

function extractContent(str) {
  return str.replace(/<.+?>/g, '').replace(/(&.+?;)+/, ' ');
}

export const makeDesktopNotificationBody = ({
  tag = Date.now(),
  title,
  body
}) => ({
  tag,
  title,
  body,
  icon: '/images/logo.png'
});

export const actionToText = (action, notifiable) => {
  switch (action) {
    case 'someone_comments_on_tip':
    case 'someone_mentioned_on_comment': {
      const tip = notifiable.data.tip;
      const topic_title = tip && tip.data.topic && tip.data.topic.data.title;

      return `commented on ${tip.data.title} ${
        topic_title ? `for ${topic_title}` : ''
      }`;
    }
    case 'someone_commented_on_tip_user_commented': {
      const tip = notifiable.data.tip;
      const topic_title = tip && tip.data.topic && tip.data.topic.data.title;

      return `commented on ${tip.data.title} that you have commented on
          ${topic_title ? ` for ${topic_title}` : ''}`;
    }
    case 'someone_followed_you':
      return 'followed you';
    case 'someone_shared_tip_with_me':
      return 'shared a card with you';
    case 'someone_add_tip_to_topic':
      return 'added card to topic';
    case 'someone_assigned_tip':
      return 'assigned you a Card';
    case 'someone_completed_tip':
      return 'completed a Card';
    case 'someone_mentions_in_chat': {
      const tipTitle = notifiable.data.tip.data.title;
      return `mentioned you in chat ${tipTitle}`;
    }
    case 'someone_likes_tip':
      return 'liked your Card';
    case 'someone_shared_topic_with_me':
      return 'shared a Board';
    case 'someone_adds_topic':
      return 'adds a new Board';
    case 'someone_updats_tip':
    case 'someone_updates_tip':
      return 'updated a Card';
    case 'someone_adds_tip':
      return 'added a Card';
    default:
      return 'does something unsupported';
  }
};

export const getNotifierInfo = notifier => {
  // let url = null;
  // let name = null;
  let notifierInfo = null;
  // let notifierId = null;
  if (notifier && notifier.data) {
    notifierInfo = notifier.data.name;
    // name = notifier.data.name;
    // notifierId = notifier.data.id;
    // if (notifier.data.avatar_url && notifier.data.avatar_url.length > 0) {
    //   // url = notifier.data.avatar_url;
    // }
  } else {
    notifierInfo = 'Someone';
  }
  return notifierInfo;
};

export const renderDetailInfo = (action, notifiable) => {
  // console.log(StringHelper.truncate(notifiable.data.body, 180));
  switch (action) {
    case 'someone_comments_on_tip':
    case 'someone_commented_on_tip_user_commented':
    case 'someone_mentioned_on_comment':
    case 'someone_followed_you':
    case 'someone_add_tip_to_topic':
    case 'someone_mentions_in_chat':
      return truncate(extractContent(notifiable.data.body), 180);

    case 'someone_likes_tip':
      return `${notifiable.data.title} in ${notifiable.data.topic.data.title}`;

    case 'someone_shared_topic_with_me':
    case 'someone_adds_tip':
    case 'someone_updats_tip':
    case 'someone_updates_tip':
    case 'someone_updats_card':
    case 'someone_adds_topic':
    case 'someone_assigned_tip':
    case 'someone_completed_tip':
    case 'someone_shared_tip_with_me':
      return truncate(notifiable.data.title, 180);

    default:
      return "Something happens, we didn't track what";
  }
};
