import { getBoardType } from 'Lib/utilities';

export function getIconColor(tool) {
  switch (tool) {
    case 'BOARD':
      return '#9B51E0';
    case 'PROJECT':
    case 'VIDEO_CHAT':
      return '#EB5757';
    case 'CARD':
    case 'GOAL':
      return '#56CCF2';
    case 'CHAT':
    case 'FILE':
      return '#F2C94C';
    case 'NOTES_CARD':
      return '#9b51E0';
    case 'NOTES_BOARD':
    case 'TASK_CARD':
      return '#6fcf97';
    case 'DATA_CARD':
      return '#958057';
    case 'FILE_BOARD':
      return '#5C5DB9';
    case 'KNOWLEDGE_BOARD':
      return '#eedb88';
    case 'TASK_BOARD':
      return '#eaa971';
    case 'DATA_BOARD':
      return '#eb98cf';
    default:
      return '#C256A3';
  }
}

export const getColorIndicator = ({ speed, completion }) => {
  if (completion == 100) {
    return '#6FCF97';
  } else if (speed <= 1.1 && speed >= 0.9) {
    return '#56CCF2';
  } else if (speed < 0.9 && speed >= 0.4) {
    return '#F2994A';
  } else if (speed < 0.4) {
    return '#EB5757';
  } else if (speed > 1.1 && speed <= 1.5) {
    return '#eb98cf';
  } else {
    return '#9B51E0';
  }
};

export const getRandomColor = () => {
  const colorPallete = [
    '#f3c94b',
    '#55ccf2',
    '#2297bf',
    '#9f86fa',
    '#f19848',
    '#525ec5',
    '#976d45',
    '#834a79',
    '#eb5758',
    '#9c52e0',
    '#90f1bb',
    '#70cf97',
    '#ab30be',
    '#f476c9'
  ];

  return colorPallete[Math.floor(Math.random() * colorPallete.length)];
};

export const getBoardColor = board => {
  const boardType = getBoardType(board);
  switch (boardType) {
    case 'project':
      return '#EB5757';
    case 'goal':
      return '#56CCF2';
    case 'notes':
      return '#6fcf97';
    case 'file':
      return '#5C5DB9';
    case 'knowledge':
      return '#eedb88';
    case 'task':
      return '#eaa971';
    case 'data':
      return '#eb98cf';
    default:
      return '#9B51E0';
  }
};
