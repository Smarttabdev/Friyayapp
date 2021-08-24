import React from 'react';

export function getToolIcon(tool) {
  switch (tool) {
    case 'ALL':
      return 'assessment';
    case 'BOARD':
      return <span className="fa fa-hashtag"></span>;
    case 'PROJECT':
      return 'category';
    case 'GOAL':
      return 'outlined_flag';
    case 'CARD':
      return 'featured_play_list';
    case 'CHAT':
      return 'question_answer';
    case 'VIDEO_CHAT':
      return 'videocam';
    case 'FILE':
      return 'insert_drive_file';
    case 'TASK_CARD':
      return 'assignment';
    case 'NOTES_CARD':
      return 'list_alt';
    case 'DATA_CARD':
      return 'dns';
    case 'NOTES_BOARD':
      return 'vertical_split';
    case 'FILE_BOARD':
      return 'ballot';
    case 'KNOWLEDGE_BOARD':
      return 'chrome_reader_mode';
    case 'TASK_BOARD':
      return 'calendar_today';
    case 'DATA_BOARD':
      return 'bubble_chart';
    default:
      return 'unknown';
  }
}

export function getCardTypeIconAttribute(cardType) {
  switch (cardType) {
    case 'TASK':
      return { icon: 'assignment', defaultColor: '#6fcf97' };
    case 'NOTES':
      return { icon: 'list_alt', defaultColor: '#9b51e0' };
    case 'DATA':
      return { icon: 'dns', defaultColor: '#958057' };
    default:
      return { icon: 'featured_play_list', defaultColor: '#56CCF2' };
  }
}

export function getBoardTypeAttributes(boardType) {
  switch (boardType) {
    case 'project':
      return {
        label: 'Project Board',
        type: 'project',
        icon: 'category',
        outlined: true,
        color: '#EB5757',
        key: 'PROJECT_BOARDS'
      };
    case 'goal':
      return {
        label: 'Goal Board',
        type: 'goal',
        icon: 'flag',
        outlined: true,
        color: '#56CCF2',
        key: 'GOAL_BOARDS'
      };
    case 'notes':
      return {
        label: 'Notes Board',
        type: 'notes',
        icon: 'vertical_split',
        outlined: true,
        fontSize: 18,
        color: '#6FCF97',
        key: 'NOTE_BOARDS'
      };
    case 'file':
      return {
        label: 'File Board',
        type: 'file',
        icon: 'ballot',
        outlined: true,
        color: '#5C5DB9',
        key: 'FILE_BOARDS'
      };
    case 'knowledge':
      return {
        label: 'Knowledge Board',
        type: 'knowledge',
        icon: 'chrome_reader_mode',
        outlined: true,
        color: '#EEDB88',
        key: 'KNOWLEDGE_BOARDS'
      };
    case 'task':
      return {
        label: 'Task Board',
        type: 'task',
        icon: 'calendar_today',
        outlined: true,
        color: '#EAA971',
        key: 'TASK_BOARDS'
      };
    case 'data':
      return {
        label: 'Data Board',
        type: 'data',
        icon: 'bubble_chart',
        outlined: true,
        color: '#eb98cf',
        key: 'DATA_BOARDS'
      };
    default:
      return {
        label: 'Board',
        type: null,
        icon: 'hashtag',
        fontAwesome: true,
        color: '#9B51E0',
        key: 'BOARDS'
      };
  }
}
