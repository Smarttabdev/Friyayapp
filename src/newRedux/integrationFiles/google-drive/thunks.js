import OAuthClient from 'Src/lib/oauth/oauth_client';
import Cookies from 'js-cookie';
import { failure, success } from 'Utils/toast';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { createAttachment } from 'Src/newRedux/database/attachments/thunks';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import { createTopic } from 'Src/newRedux/database/topics/thunks';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import { setShowAddCardBottomOverlay } from 'Src/newRedux/interface/modals/actions';
import { changeUser } from 'Src/newRedux/database/user/actions';
import { deleteUserIntegrationToken } from 'Src/newRedux/database/user/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  googleListFiles,
  googleListFilesDone,
  googleError,
  googleDisconnectDone
} from './actions';

export const refreshAccessToken = (
  accessToken,
  refreshToken
) => async dispatch => {
  const authClient = OAuthClient.create({ provider: 'google' });

  const token = authClient.createToken(accessToken, refreshToken, 'Bearer', {
    data: {
      grant_type: 'refresh_token'
    }
  });
  Cookies.remove('googleAccessToken');
  Cookies.remove('googleRefreshToken');

  token
    .refresh()
    .then(authorizedData => {
      Cookies.set('googleRefreshToken', authorizedData.refreshToken, {
        domain: `.${window.APP_DOMAIN}`,
        expires: 365
      });

      Cookies.set('googleAccessToken', authorizedData.accessToken, {
        domain: `.${window.APP_DOMAIN}`,
        expires: authorizedData.expires
      });

      const userAttributes = {
        attributes: {
          google_drive_access_token: authorizedData.accessToken,
          google_drive_refresh_token: authorizedData.refreshToken
        }
      };

      dispatch(changeUser(userAttributes));
    })
    .catch(error => {
      dispatch(googleError(error));
    });
};

export const listFiles = (accessToken, newFolderID, searchQuery = '') => async (
  dispatch,
  getState
) => {
  const state = stateMappings(getState()).integrationFiles.google;
  let { nextPageToken, hasMore, search, sendingRequest, folderID } = state;
  const sameSearch = searchQuery == search;
  const sameFolder = folderID == newFolderID;
  if (sendingRequest) return;
  if (sameFolder && sameSearch && !hasMore) return;
  if (!sameFolder || !sameSearch) {
    nextPageToken = null;
    hasMore = true;
  }

  dispatch(googleListFiles(newFolderID, nextPageToken, hasMore, searchQuery));
  let fileListingURL = 'https://www.googleapis.com/drive/v3/files';

  let queryData = {
    corpora: 'user',
    orderBy: 'folder,name',
    fields:
      'files(id, name, mimeType, kind, iconLink, thumbnailLink, webViewLink), nextPageToken, kind, incompleteSearch'
  };
  if (newFolderID && newFolderID !== '') {
    queryData['q'] = `('${newFolderID}' in parents`;
    queryData['q'] += newFolderID === 'root' ? ' or sharedWithMe)' : ')';
    queryData['q'] += searchQuery ? ` and name contains '${searchQuery}'` : '';
  }

  if (nextPageToken) queryData['pageToken'] = nextPageToken;

  OAuthClient.get({
    accessToken,
    url: fileListingURL,
    data: queryData,
    done: response => {
      dispatch(
        googleListFilesDone(response.files, response.nextPageToken, newFolderID)
      );
    },
    fail: async (xhr, status, error) => {
      const {
        error: { code, message }
      } = xhr.responseJSON;
      if (code == 401 && message == 'Invalid Credentials') {
        dispatch(deleteUserIntegrationToken('google'));
        dispatch(setRightMenuOpenForMenu('Integrations'));
        const refreshToken = Cookies.get('googleRefreshToken');
        await refreshAccessToken(accessToken, refreshToken)(dispatch);
        accessToken = Cookies.get('googleAccessToken');
        listFiles(accessToken, newFolderID, searchQuery)(dispatch, getState);
      }
      failure('Failed to get drive files! Try again');
      dispatch(googleError(error));
    }
  });
};

export const disconnect = accessToken => async dispatch => {
  OAuthClient.get({
    accessToken,
    url: 'https://accounts.google.com/o/oauth2/revoke',
    data: { token: accessToken },
    done: response => {
      Cookies.remove('googleAccessToken', { domain: `.${window.APP_DOMAIN}` });
      dispatch(deleteUserIntegrationToken('google'));
      dispatch(googleDisconnectDone(response));
      success('Google drive disconnected!');
    },
    fail: (xhr, status, error) => {
      failure('Failed to disconnect drive! Try again');
      dispatch(googleError(error));
    }
  });
};

export const addGoogleFileToCard = ({
  dropZoneProps,
  draggedItemProps
}) => async dispatch => {
  const { card, method } = dropZoneProps;
  const { fileItem } = draggedItemProps.item;
  const accessToken = Cookies.get('googleAccessToken');
  dispatch(setShowAddCardBottomOverlay(false));
  await dispatch(getGoogleFileURL(accessToken, card, fileItem, method));
};

export const getGoogleFileURL = (
  accessToken,
  card,
  fileItem,
  method
) => async dispatch => {
  OAuthClient.post({
    accessToken,
    url: `https://www.googleapis.com/drive/v3/files/${fileItem.id}/permissions`,
    data: {
      role: 'reader',
      type: 'anyone'
    },
    done: () => {},
    fail: () => {
      failure('Failed to grant permission for google file');
    }
  });

  OAuthClient.get({
    accessToken,
    url: `https://www.googleapis.com/drive/v3/files/${fileItem.id}`,
    data: { fields: 'webContentLink,webViewLink' },
    done: response => {
      let fileResponse = {
        id: fileItem.id,
        kind: fileItem.kind,
        name: fileItem.name,
        mimeType: fileItem.mimeType,
        url: response.webViewLink,
        link: response.webContentLink
      };

      const source = fileItem;
      const target = fileResponse;

      if (method && method == 'upload' && !target.link) {
        vex.dialog.confirm({
          message:
            'The files is not available to download, would like to link it instead ?',
          callback: value => {
            method = 'link';
            if (value)
              dispatch(uploadFile(accessToken, source, target, method, card));
          }
        });
      } else if (method) {
        dispatch(uploadFile(accessToken, source, target, method, card));
      } else {
        window.open(fileResponse.url, '_blank');
      }
    },
    fail: () => {
      failure('Unable to attach google file');
    }
  });
};

export const uploadFile = (
  accessToken,
  fileItem,
  fileResponse,
  method,
  card
) => async dispatch => {
  let link = fileResponse.link; // upload
  let file_url = fileResponse.url; // link
  let mimeType = fileResponse.mimeType;

  // is link method...
  if (method === 'link') {
    let itemBody = card.attributes.body || '';

    if (itemBody.includes(file_url) === false) {
      const fileAttachment = `<a href="${file_url}">${fileResponse.name}</a>`;
      itemBody += ` \n ${fileAttachment} `;
    }

    const attributes = { body: itemBody };

    dispatch(updateCard({ attributes, id: card.id, relationships: {} }));
  } else {
    let uploadData = {
      data: {
        attributes: {
          file: fileResponse.file,
          remote_file_url: link,
          mime_type: mimeType
        }
      }
    };
    dispatch(uploadFileAndAttachToCard(uploadData, card));
  }
};

const uploadFileAndAttachToCard = (uploadData, card) => async dispatch => {
  uploadData['tip_id'] = card.id;
  uploadData['response_with_tip'] = true;
  dispatch(createAttachment(uploadData));
};

export const createTopicAndCardsForGoogleFolder = itemProps => async dispatch => {
  const { draggedItemProps, dropZoneProps, providerData } = itemProps;
  const parentTopic = dropZoneProps.item || {};
  const accessToken = Cookies.get('googleAccessToken');
  const folderID = draggedItemProps.item.fileItem.id;

  let fileListingURL = 'https://www.googleapis.com/drive/v3/files';

  let queryData = { corpora: 'user', orderBy: 'folder,name' };

  if (folderID && folderID !== '') {
    queryData['q'] = `'${folderID}' in parents`;

    if (folderID === 'root') queryData['q'] += ' or sharedWithMe';
  }

  if (providerData.nextPageToken)
    queryData['pageToken'] = providerData.nextPageToken;

  const newTopic = {
    attributes: {
      title: draggedItemProps.item.fileItem.name,
      parent_id: parentTopic.id || null
    },
    relationships: parentTopic.relationships || {}
  };

  const {
    data: { data: createdTopic }
  } = await dispatch(await createTopic(newTopic));

  OAuthClient.get({
    accessToken,
    url: fileListingURL,
    data: queryData,
    done: response => {
      const files = response.files || [];
      for (const inx in files) {
        if (files[inx].mimeType.includes('folder')) {
          const newSubTopic = {
            attributes: { title: files[inx].name, parent_id: createdTopic.id },
            relationships: { abilities: createdTopic.relationships.abilities }
          };
          dispatch(createTopic(newSubTopic));
        } else {
          const attributes = { title: files[inx].name };
          const relationships = { topics: { data: [createdTopic.id] } };
          dispatch(createCard({ attributes, relationships }));
        }
      }
    },
    fail: (xhr, status, error) => {
      failure('Failed to get drive files! Try again');
      dispatch(googleError(error));
    }
  });
};
