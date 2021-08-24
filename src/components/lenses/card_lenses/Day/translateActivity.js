import moment from 'moment';

export default activity => {
  let type;
  switch (activity.attributes.action) {
    case 'someone_likes_tip':
      type = 'Liked a card';
      break;
    case 'someone_adds_tip':
      type = 'Card created';
      break;
    case 'someone_comments_on_tip':
      type = 'Commented on Card';
      break;
    case 'someone_adds_topic':
      type = 'Board created';
      break;
    case 'someone_shared_tip_with_me':
      type = 'Card shared';
      break;
    case 'someone_joins_domain':
      type = 'User joined';
      break;
    case 'someone_added_to_domain':
      type = 'User added';
      break;
    case 'someone_updates_tip':
      type = 'Card updated';
      break;
    case 'someone_deletes_tip':
      type = 'Card deleted';
      break;
    case 'someone_assigned_tip':
      type = 'Card assigned';
      break;
    case 'someone_moves_tip':
      type = 'Card moved';
      break;
    case 'someone_adds_label_to_tip':
      type = 'Card labeled';
      break;
    case 'someone_archives_tip':
      type = 'Card archived';
      break;
    case 'someone_shared_topic_with_me':
      type = 'Topic shared';
      break;
    default:
      type = 'Something happend';
      break;
  }

  return {
    type,
    time: moment(activity.attributes.created_at).format('LT')
  };
};
