import ColumnsLayout from './Layouts/Columns/ColumnsLayout';
import DesktopLayout from './Layouts/Desktop/DesktopLayout';
import ListLayout from './Layouts/List/ListLayout';

export const layoutTypes = [
  { name: 'columns', icon: 'view_week', Component: ColumnsLayout },
  { name: 'desktop', icon: 'dashboard', Component: DesktopLayout },
  { name: 'list', icon: 'format_list_bulleted', Component: ListLayout }
];

export const handleType = itemType => {
  switch (itemType) {
    case 'CHAT_CARD':
      return 'CHAT';
    case 'VIDEO_CHAT_CARD':
      return 'VIDEO_CHAT';
    case 'PROJECT_BOARD':
      return 'PROJECT';
    case 'GOAL_BOARD':
      return 'GOAL';
    case 'FILE_CARD':
      return 'FILE';
    default:
      return itemType;
  }
};
