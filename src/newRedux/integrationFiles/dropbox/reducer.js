import unionBy from 'lodash/unionBy';
import {
  DROPBOX_LIST_FILES,
  DROPBOX_LIST_FILES_DONE,
  DROPBOX_ERROR,
  DROPBOX_DISCONNECT_DONE
} from './actions';

const defaultState = {
  folderID: '',
  files: [],
  nextPageToken: null,
  error: null,
  sendingRequest: false,
  hasMore: true,
  search: ''
};

const mergeFiles = (oldFiles, newFiles) => {
  return unionBy(newFiles, oldFiles, 'id');
};

const dropboxReducer = (state = defaultState, action) => {
  switch (action.type) {
    case DROPBOX_LIST_FILES: {
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

    case DROPBOX_LIST_FILES_DONE: {
      const { files: newFiles = [], nextPageToken, folderID, hasMore } = action;
      newFiles.forEach(fileItem => (fileItem.folderID = folderID));
      const files = mergeFiles(state.files, newFiles);
      const sendingRequest = false;
      return { ...state, files, sendingRequest, nextPageToken, hasMore };
    }

    case DROPBOX_ERROR:
      return { ...state, error: action.error, sendingRequest: false };

    case DROPBOX_DISCONNECT_DONE:
      return { ...state, files: [], sendingRequest: false };

    default:
      return state;
  }
};

export default dropboxReducer;
