import React from 'react';
import IconButton from 'Components/shared/buttons/IconButton';

export const cardTypes = [
  {
    label: 'Card',
    type: 'CARD',
    itemType: 'CARD',
    iconType: 'featured_play_list',
    outlined: true,
    color: '#56CCF2'
  },
  {
    label: 'Task Card',
    type: 'TASK',
    itemType: 'TASK_CARD',
    iconType: 'assignment',
    outlined: true,
    color: '#6FCF97'
  },
  {
    label: 'Note Card',
    type: 'NOTES',
    itemType: 'NOTES_CARD',
    iconType: 'list_alt',
    outlined: true,
    color: '#9B51E0'
  },
  {
    label: 'Data Card',
    type: 'DATA',
    itemType: 'DATA_CARD',
    iconType: 'dns',
    outlined: true,
    color: '#958057'
  }
];

export const cardDetails = [
  {
    title: 'Card',
    description: 'For general purpose of writing and sharing'
  },
  {
    title: 'Task Card',
    description: 'For tasks'
  },
  { title: 'Note Card', description: 'For notes' },
  { title: 'Data Card', description: 'For data' },
  { title: 'Video chat', description: 'For video chats' },
  { title: 'Chat', description: 'For chats' },
  {
    title: 'File',
    description: 'Upload a file'
  },
  {
    title: 'Text Card',
    description: 'Card as a Text Block with editor (title is hidden)'
  }
];

export const boardTypes = [
  {
    label: 'Board',
    type: null,
    type_def: 'board',
    iconType: 'hashtag',
    fontAwesome: true,
    color: '#9B51E0',
    key: 'BOARDS',
    itemType: 'BOARD',
    title: 'Board',
    description: 'For organizing cards'
  },
  {
    label: 'Task Board',
    type: 'task',
    iconType: 'calendar_today',
    outlined: true,
    color: '#EAA971',
    key: 'TASK_BOARDS',
    itemType: 'TASK_BOARD',
    title: 'Task board',
    description: 'Uses the Tasks Tool as the default tool.',
    defaultTool: 'TODO'
  },
  {
    label: 'Note Board',
    type: 'notes',
    iconType: 'vertical_split',
    outlined: true,
    fontSize: 18,
    color: '#6FCF97',
    key: 'NOTE_BOARDS',
    itemType: 'NOTES_BOARD',
    title: 'Note board',
    description: 'Uses the Notes Tool as the default tool.',
    defaultTool: 'GRID'
  },
  {
    label: 'Project Board',
    type: 'project',
    iconType: 'category',
    outlined: true,
    color: '#EB5757',
    key: 'PROJECT_BOARDS',
    itemType: 'PROJECT_BOARD',
    title: 'Project board',
    description:
      'Uses the Project Overview and Action Plan as the default tools.',
    defaultTool: 'PROJECT_OVERVIEW'
  },
  {
    label: 'Knowledge Board',
    type: 'knowledge',
    iconType: 'chrome_reader_mode',
    outlined: true,
    color: '#EEDB88',
    key: 'KNOWLEDGE_BOARDS',
    itemType: 'KNOWLEDGE_BOARD',
    title: 'Knowledge board',
    description: 'Uses the Knowledge base tool as the default tool.',
    defaultTool: 'KNOWLEDGE_BASE'
  },
  {
    label: 'File Board',
    type: 'file',
    iconType: 'ballot',
    outlined: true,
    color: '#5C5DB9',
    key: 'FILE_BOARDS',
    itemType: 'FILE_BOARD',
    title: 'File board',
    description: 'Uses the Files tool as the default tool.',
    defaultTool: 'FILES'
  },
  {
    label: 'Data Board',
    type: 'data',
    iconType: 'bubble_chart',
    outlined: true,
    color: '#eb98cf',
    key: 'DATA_BOARDS',
    itemType: 'DATA_BOARD',
    title: 'Data board',
    description: 'Uses the Sheet tool as the default tool.',
    defaultTool: 'SHEET'
  },
  {
    label: 'Goal Board',
    type: 'goal',
    iconType: 'flag',
    outlined: true,
    color: '#56CCF2',
    key: 'GOAL_BOARDS',
    itemType: 'GOAL_BOARD',
    title: 'Goal board',
    description:
      'Uses the Project Overview and Action Plan as the default tools',
    defaultTool: 'GOAL_CANVAS'
  }
];

export const landingBoard = {
  label: 'Landing Board',
  type: null,
  type_def: 'board',
  iconType: 'hashtag',
  fontAwesome: true,
  color: '#9B51E0',
  key: 'BOARDS',
  itemType: 'BOARD',
  title: 'Board',
  description:
    'Uses the Boards Tool with a list of subboards of your Board. Each subboard can be used to organize something. You can create as many levels of subboards as you need.',
  defaultTool: 'TOPIC_TILES'
};

export const boardIconsColors = {
  board: {
    iconType: 'hashtag',
    color: '#9B51E0'
  },
  project: {
    iconType: 'category',
    color: '#EB5757'
  },
  goal: {
    iconType: 'flag',
    color: '#56CCF2',
    fontSize: '1.28em'
  },
  notes: {
    iconType: 'vertical_split',
    color: '#6FCF97'
  },
  file: {
    iconType: 'ballot',
    color: '#5C5DB9'
  },
  knowledge: {
    iconType: 'chrome_reader_mode',
    color: '#EEDB88'
  },
  task: {
    iconType: 'calendar_today',
    color: '#EAA971'
  },
  data: {
    iconType: 'bubble_chart',
    color: '#eb98cf'
  }
};

export const viewOptions = [
  {
    yays: [
      {
        id: 1,
        title: 'Board Title',
        defaultViewId: null,
        children: []
      }
    ]
  },
  {
    yays: [
      {
        id: 1,
        title: 'Task Board Title',
        defaultViewId: 'TODO',
        children: []
      }
    ]
  },
  {
    yays: [
      {
        id: 1,
        title: 'Note Board Title',
        defaultViewId: 'GRID',
        children: []
      }
    ]
  },
  {
    yays: [
      {
        id: 1,
        title: 'Project Board Title',
        defaultViewId: 'PROJECT_OVERVIEW',
        children: []
      }
    ]
  },
  {
    yays: [
      {
        id: 1,
        title: 'Knowledge Board Title',
        defaultViewId: 'KNOWLEDGE_BASE',
        children: []
      }
    ]
  },
  {
    yays: [
      {
        id: 1,
        title: 'File Board Title',
        defaultViewId: 'FILES',
        children: []
      }
    ]
  },
  {
    yays: [
      {
        id: 1,
        title: 'Data Board Title',
        defaultViewId: 'SHEET',
        children: []
      }
    ]
  },
  {
    yays: [
      {
        id: 1,
        title: 'Goal Board Title',
        defaultViewId: 'GOAL_OVERVIEW',
        children: []
      }
    ]
  }
];

export const projectHubFilterTypes = [
  {
    title: 'Cards',
    key: 'CARD'
  },
  {
    title: 'Task Cards',
    key: 'TASK_CARD'
  },
  {
    title: 'Note Cards',
    key: 'NOTE_CARD'
  },
  {
    title: 'Data Cards',
    key: 'DATA_CARD'
  },
  {
    title: 'File Cards',
    key: 'FILE_CARD'
  },
  {
    title: 'Chats',
    key: 'CHAT_CARD'
  },
  {
    title: 'Video Chats',
    key: 'VIDEO_CHAT_CARD'
  },
  {
    title: 'Boards',
    key: 'BOARD'
  },
  {
    title: 'Goal Boards',
    key: 'GOAL_BOARD'
  },
  {
    title: 'Project Boards',
    key: 'PROJECT_BOARD'
  },
  {
    title: 'Task Boards',
    key: 'TASK_BOARD'
  },
  {
    title: 'Knowledge Boards',
    key: 'KNOWLEDGE_BOARD'
  },
  {
    title: 'Note Boards',
    key: 'NOTE_BOARD'
  },
  {
    title: 'File Boards',
    key: 'FILE_BOARD'
  },
  {
    title: 'Data Boards',
    key: 'DATA_BOARD'
  }
];

export const getBoardType = tag =>
  boardTypes.find(
    t => t.type === tag || (!t.type && (!tag || tag === 'board'))
  );

export const getBoardTypeAttributesByTag = tag =>
  boardTypes.find(bt => (!tag ? bt.key == 'BOARDS' : bt.type == tag));

export const boardTypeTags = boardTypes.map(t => t.type).filter(x => x);

export const getCardTypeAndIndex = type => {
  const index = type && cardTypes.findIndex(item => item.type == type);
  return cardTypes[index]
    ? { type: cardTypes[index].type, index }
    : { type: 'CARD', index: 0 };
};

export const getBoardTypeIndex = itemType => {
  const index = boardTypes.findIndex(item => item.type === itemType) || 0;
  return index;
};

export const boardTypeOptions = boardTypes.map(x => ({
  value: x.type,
  label: (
    <div className="flex flex-r-center">
      <IconButton
        additionalClasses="font-size-16 mr5"
        icon={x.iconType}
        fontAwesome={x.fontAwesome}
        outlined={x.outlined}
        color={x.color}
        tooltip={x.label}
        tooltipOptions={{ place: 'top' }}
      />
      <span className="no-wrap">{x.label}</span>
    </div>
  )
}));

export const cardTypeOptions = cardTypes.map(x => ({
  value: x.type,
  label: (
    <div className="flex flex-r-center">
      <IconButton
        additionalClasses="font-size-16 mr5"
        icon={x.iconType}
        outlined={x.outlined}
        color={x.color}
        tooltip={x.label}
        tooltipOptions={{ place: 'top' }}
      />
      <span className="no-wrap">{x.label}</span>
    </div>
  )
}));
