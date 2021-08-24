export const toolConfigOptions = [
  { title: 'Tool name' },
  { title: 'Base Tool' },
  { title: 'Filters' },
  { title: 'Group by' }
];

export const toolsForGroupBy = ['SHEET', 'ACTION_PLAN'];

export const groupByOptions = [
  { value: 'assignee', label: 'Assignee', color: '#56CCF2' },
  { value: 'due_date', label: 'Due Date', color: '#EB5757' },
  { value: 'start_date', label: 'Start Date', color: '#2F80ED' },
  { value: 'priority_level', label: 'Priority level', color: '#F256D9' },
  { value: 'label', label: 'Label', color: '#E5F24C' },
  { value: 'update_date', label: 'Update Date', color: '#F2994A' },
  { value: 'status', label: 'Status', color: '#B52727' },
  { value: 'speed', label: 'Speed', color: '#5694F2' },
  { value: 'completion', label: 'Completion Date', color: '#6FCF97' },
  { value: 'created_date', label: 'Created Date', color: '#C98909' },
  { value: 'created_by', label: 'Created By', color: '#C2C2C2' }
];

export const filterOptions = [
  { value: 'card_and_board', label: 'Card & Board types' },
  { value: 'board', label: 'Board' },
  { value: 'status', label: 'Status' },
  { value: 'labels', label: 'Labels' },
  { value: 'created_by', label: 'Created by' },
  { value: 'assigned_to', label: 'Assigned to' },
  { value: 'created_date', label: 'Created Date' },
  { value: 'start_date', label: 'Start Date' },
  { value: 'due_date', label: 'Due Date' },
  { value: 'completed_date', label: 'Completed Date' },
  { value: 'priority_level', label: 'Priority Level' }
];

export const checkFilterOptions = [
  { value: 'pick_your_boards', label: 'Pick your Boards' },
  { value: 'include_live_views', label: 'Include Live Boards' },
  { value: 'include_new_views', label: 'Include New Boards' },
  {
    value: 'include_recently_updated_views',
    label: 'Include Recently Updated Boards'
  },
  { value: 'include_now_cards', label: 'Now?' },
  { value: 'include_archived_cards', label: 'Include Archived cards?' },
  { value: 'include_subtopic_cards', label: 'Include Cards from Boards?' },
  { value: 'include_nested_cards', label: 'Include Nested Cards?' },
  { value: 'include_completed_cards', label: 'Include completed Cards?' },
  { value: 'include_uncompleted_cards', label: 'Include uncompleted Cards?' }
];

export const orderTypes = [
  { title: 'Cards & Boards', orderType: 'cards_and_boards' },
  { title: 'Columns', orderType: 'column_order' },
  { title: 'Labels', orderType: 'labels' },
  { title: 'People', orderType: 'people', scope: 'global' },
  { title: 'Pinned Tools', orderType: 'pinned_tools' },
  { title: 'Tool Boards', orderType: 'tool_boards' },
  { title: 'Filters', orderType: 'filters' }
];
