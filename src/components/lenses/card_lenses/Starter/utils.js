export const getSort = type => {
  switch (type) {
    case 'recentCreated':
      return { created_at: 'desc' };
    case 'recentCreatedAsc':
      return { created_at: 'asc' };
    case 'recentUpdated':
      return { updated_at: 'desc' };
    case 'grouped':
      return { item_type: 'asc' };
    default:
      return null;
  }
};
