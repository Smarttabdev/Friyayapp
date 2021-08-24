import actionTypes from './actionEnum';

const defaultState = {
  displayEditDomainModal: { isOpen: false, tab: null },
  displayEditCardModal: null,
  displayEditUserModal: null,
  displaySelectTopicDestinationModal: {
    isOpen: false,
    mode: null,
    topicId: null
  },
  displayUpdateTopicModal: { isOpen: false, tab: null, topicId: null },
  displayUserInvitationModal: null,
  displayOfficeHoursModal: false,
  displayCopyTopicModal: { isOpen: false, topic: null },
  displayChatModal: {
    isOpen: false,
    chatId: null
  },
  expandChatModal: null,
  displayVideoRoomModal: {
    isOpen: false,
    videoRoomId: null
  },
  expandVideoRoomModal: null,
  bulkChangesModal: {
    topicId: null,
    isOpen: false
  },
  organizerQuizModal: {
    isOpen: false
  }
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.setEditDomainModalOpen:
      return { ...state, displayEditDomainModal: action.payload };

    case actionTypes.setEditCardModalOpen:
      return { ...state, displayEditCardModal: action.payload };

    case actionTypes.setEditUserModalOpen:
      return { ...state, displayEditUserModal: action.payload };

    case actionTypes.setSelectTopicDestinationModalOpen:
      return { ...state, displaySelectTopicDestinationModal: action.payload };

    case actionTypes.setUpdateTopicModalOpen:
      return { ...state, displayUpdateTopicModal: action.payload };

    case actionTypes.setUserInvitationModalOpen:
      return { ...state, displayUserInvitationModal: action.payload };

    case actionTypes.setOfficeHoursModalOpen:
      return { ...state, displayOfficeHoursModal: action.payload };

    case actionTypes.setCopyTopicModalOpen:
      return { ...state, displayCopyTopicModal: action.payload };

    case actionTypes.setShowAddCardBottomOverlay:
      return { ...state, showAddCardBottomOverlay: action.status };

    case actionTypes.setShowChatModal:
      return { ...state, displayChatModal: action.payload };

    case actionTypes.setExpandChatModal:
      return { ...state, expandChatModal: action.payload };

    case actionTypes.setShowVideoRoomModal:
      return { ...state, displayVideoRoomModal: action.payload };

    case actionTypes.setExpandVideoRoomModal:
      return { ...state, expandVideoRoomModal: action.payload };

    case actionTypes.setBulkChangesModal:
      return { ...state, bulkChangesModal: action.payload };

    case actionTypes.setOrganizerQuizModal:
      return { ...state, organizerQuizModal: action.payload };
    default:
      return state;
  }
};

export default reducer;
