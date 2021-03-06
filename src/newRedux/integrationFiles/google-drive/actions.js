export const GOOGLE_LIST_FILES = 'GOOGLE_LIST_FILES';
export const GOOGLE_LIST_FILES_DONE = 'GOOGLE_LIST_FILES_DONE';
export const GOOGLE_DISCONNECT = 'GOOGLE_DISCONNECT';
export const GOOGLE_DISCONNECT_DONE = 'GOOGLE_DISCONNECT_DONE';
export const GOOGLE_ERROR = 'GOOGLE_ERROR';

export const googleListFiles = (folderID, nextPageToken, hasMore, search) => ({
  type: GOOGLE_LIST_FILES,
  folderID,
  nextPageToken,
  hasMore,
  search
});
export const googleListFilesDone = (files, nextPageToken, folderID) => ({
  type: GOOGLE_LIST_FILES_DONE,
  files,
  nextPageToken,
  folderID
});
export const googleError = error => ({ type: GOOGLE_ERROR, error });
export const googleDisconnectDone = () => ({ type: GOOGLE_DISCONNECT_DONE });
