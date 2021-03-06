import actualWork from './actualWork';
import completion from './completion';
import completionDate from './completionDate';
import confidenceRange from './confidenceRange';
import creationDate from './creationDate';
import dueDate from './dueDate';
import estimatedWork from './estimatedWork';
import expectedCompletionDate from './expectedCompletionDate';
import priority from './priority';
import startDate from './startDate';
import variance from './variance';
import boards from './views';
import labels from './labels';
import assignee from './assignee';
import cardBody from './cardBody';
import files from './files';
import links from './links';
import images from './images';
import cactii from './cactii';
import points from './points';
import speed from './speed';
import status from './status';
import updates from './updates';
import workLeft from './workLeft';
import pulse from './pulse';
import daysLeft from './daysLeft';
import duration from './duration';
import timeLog from './timeLog';
import customField from './customField';

export const columns = {
  actual_work: 'actual_work',
  completion: 'completion',
  completion_date: 'completion_date',
  confidence_range: 'confidence_range',
  creation_date: 'creation_date',
  due_date: 'due_date',
  estimated_work: 'estimated_work',
  expected_completion_date: 'expected_completion_date',
  priority: 'priority',
  start_date: 'start_date',
  variance: 'variance',
  boards: 'boards',
  labels: 'labels',
  assignee: 'assignee',
  card_body: 'card_body',
  files: 'files',
  links: 'links',
  images: 'images',
  cactii: 'cactii',
  points: 'points',
  speed: 'speed',
  status: 'status',
  updates: 'updates',
  workLeft: 'workLeft',
  pulse: 'pulse',
  days_left: 'days_left',
  time_log: 'time_log',
  duration: 'duration',
  custom_field: 'custom_field'
  // linkedCards: 'linked_cards'
};

export const sheetConfig = {
  default: {
    cssModifier: null,
    display: null,
    render: () => null,
    renderSummary: () => null
  },
  [columns.actual_work]: actualWork,
  [columns.completion]: completion,
  [columns.completion_date]: completionDate,
  [columns.confidence_range]: confidenceRange,
  [columns.creation_date]: creationDate,
  [columns.due_date]: dueDate,
  [columns.estimated_work]: estimatedWork,
  [columns.expected_completion_date]: expectedCompletionDate,
  [columns.priority]: priority,
  [columns.start_date]: startDate,
  [columns.variance]: variance,
  [columns.boards]: boards,
  [columns.labels]: labels,
  [columns.assignee]: assignee,
  [columns.card_body]: cardBody,
  [columns.files]: files,
  [columns.links]: links,
  [columns.images]: images,
  [columns.cactii]: cactii,
  [columns.points]: points,
  [columns.speed]: speed,
  [columns.status]: status,
  [columns.updates]: updates,
  [columns.workLeft]: workLeft,
  [columns.pulse]: pulse,
  [columns.days_left]: daysLeft,
  [columns.time_log]: timeLog,
  [columns.duration]: duration,
  [columns.custom_field]: customField
  // [columns.linkedCards]: pulse
};
