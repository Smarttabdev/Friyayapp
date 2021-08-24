import { stateMappings } from 'Src/newRedux/stateMappings';
import { videoModalStates, chatModalStates } from './constants';

export const getExpandVideoRoomModal = state =>
  stateMappings(state).modals.expandVideoRoomModal ===
  videoModalStates.EXPANDED;

export const getMinimizedVideoRoomModal = state =>
  stateMappings(state).modals.expandVideoRoomModal ===
  videoModalStates.MINIMIZED;

export const getNormalVideoRoomModal = state =>
  stateMappings(state).modals.expandVideoRoomModal === videoModalStates.NORMAL;

export const getExpandedChatModal = state =>
  stateMappings(state).modals.expandChatModal === chatModalStates.EXPANDED;

export const getMinimizedChatModal = state =>
  stateMappings(state).modals.expandChatModal === chatModalStates.MINIMIZED;

export const getNormalChatModal = state =>
  stateMappings(state).modals.expandChatModal === chatModalStates.NORMAL;
