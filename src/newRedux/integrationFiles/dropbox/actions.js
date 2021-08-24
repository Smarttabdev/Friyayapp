export const DROPBOX_LIST_FILES = 'DROPBOX_LIST_FILES';
export const DROPBOX_LIST_FILES_DONE = 'DROPBOX_LIST_FILES_DONE';
export const DROPBOX_DISCONNECT = 'DROPBOX_DISCONNECT';
export const DROPBOX_DISCONNECT_DONE = 'DROPBOX_DISCONNECT_DONE';
export const DROPBOX_ERROR = 'DROPBOX_ERROR';

export const dropboxListFiles = (folderID, nextPageToken, hasMore, search) => ({
  type: DROPBOX_LIST_FILES,
  folderID,
  nextPageToken,
  hasMore,
  search
});
export const dropboxListFilesDone = (
  files,
  nextPageToken,
  folderID,
  hasMore
) => ({
  type: DROPBOX_LIST_FILES_DONE,
  files,
  nextPageToken,
  folderID,
  hasMore: hasMore ? hasMore : false
});
export const dropboxError = error => ({ type: DROPBOX_ERROR, error });
export const dropboxDisconnectDone = () => ({ type: DROPBOX_DISCONNECT_DONE });
