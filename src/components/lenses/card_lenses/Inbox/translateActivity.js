export default activity => {
  let type;
  switch (activity) {
    case 'someone_completed_tip':
      return 'Completed';
    case 'someone_adds_tip':
      return 'New Card';
    case 'someone_assigned_tip':
      return 'Assigned to ';
    case 'someone_adds_label_to_tip':
      return 'New label';
    case 'someone_comments_on_tip':
      return '';
    default:
      return null;
  }
};
