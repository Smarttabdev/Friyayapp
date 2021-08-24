import unionBy from 'lodash/unionBy';
import {
  GOOGLE_LIST_FILES,
  GOOGLE_LIST_FILES_DONE,
  GOOGLE_DISCONNECT_DONE,
  GOOGLE_ERROR
} from './actions';

const defaultState = {
  folderID: 'root',
  files: [],
  nextPageToken: null,
  newAccessToken: null,
  error: null,
  sendingRequest: false,
  hasMore: true,
  search: ''
};

const mergeFiles = (oldFiles, newFiles) => {
  return unionBy(newFiles, oldFiles, 'id');
};

const driveReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GOOGLE_LIST_FILES: {
      const { folderID, nextPageToken, hasMore, search = '' } = action;
      const sendingRequest = true;
      return {
        ...state,
        folderID,
        sendingRequest,
        nextPageToken,
        hasMore,
        search
      };
    }

    case GOOGLE_LIST_FILES_DONE: {
      const { files: newFiles = [], nextPageToken, folderID } = action;
      newFiles.forEach(fileItem => (fileItem.folderID = folderID));
      const files = mergeFiles(state.files, newFiles);
      const hasMore = !!nextPageToken;
      const sendingRequest = false;
      return { ...state, files, sendingRequest, nextPageToken, hasMore };
    }

    case GOOGLE_DISCONNECT_DONE:
      return { ...state, files: [], sendingRequest: false };

    case GOOGLE_ERROR:
      return { ...state, error: action.error, sendingRequest: false };

    default:
      return state;
  }
};

export default driveReducer;
