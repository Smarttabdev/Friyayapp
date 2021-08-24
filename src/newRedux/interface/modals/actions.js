import actionTypes from './actionEnum';

export const setEditDomainModalOpen = (isOpen, tab = 0) => ({
  type: actionTypes.setEditDomainModalOpen,
  payload: { isOpen, tab }
});

//pass an object of card ID and tab to open on
export const setEditCardModalOpen = objectOrNull => ({
  type: actionTypes.setEditCardModalOpen,
  payload: objectOrNull
});

export const setEditUserModalOpen = bool => ({
  type: actionTypes.setEditUserModalOpen,
  payload: bool
});

export const setSelectTopicDestinationModalOpen = (topicId, isOpen, mode) => ({
  type: actionTypes.setSelectTopicDestinationModalOpen,
  payload: { isOpen, mode, topicId }
});

export const setUpdateTopicModalOpen = (topicId, isOpen, tab = 0) => ({
  type: actionTypes.setUpdateTopicModalOpen,
  payload: { isOpen, tab, topicId }
});

export const setUserInvitationModalOpen = userIdOrNull => ({
  type: actionTypes.setUserInvitationModalOpen,
  payload: userIdOrNull
});

export const setOfficeHoursModalOpen = a => ({
  type: actionTypes.setOfficeHoursModalOpen,
  payload: a
});

export const setCopyTopicModalOpen = (isOpen, topic) => ({
  type: actionTypes.setCopyTopicModalOpen,
  payload: { isOpen, topic }
});

export const setShowAddCardBottomOverlay = status => ({
  type: actionTypes.setShowAddCardBottomOverlay,
  status
});

export const setShowChatModal = ({ isOpen, chatId }) => ({
  type: actionTypes.setShowChatModal,
  payload: { isOpen, chatId }
});

export const setExpandChatModal = payload => ({
  type: actionTypes.setExpandChatModal,
  payload
});

export const setShowVideoRoomModal = ({ isOpen, videoRoomId }) => ({
  type: actionTypes.setShowVideoRoomModal,
  payload: { isOpen, videoRoomId }
});

export const setExpandVideoRoomModal = payload => ({
  type: actionTypes.setExpandVideoRoomModal,
  payload
});

export const setBulkChangesModal = payload => ({
  type: actionTypes.setBulkChangesModal,
  payload
});

export const setOrganizerQuizModal = payload => ({
  type: actionTypes.setOrganizerQuizModal,
  payload
});
