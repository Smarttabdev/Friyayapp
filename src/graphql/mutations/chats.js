import { commitMutation } from 'Lib/relay';

export const markReadChat = ({ id }) =>
  commitMutation({
    mutation: graphql`
      mutation chatsMarkReadChatMutation($id: ID!) {
        markReadChat(input: { id: $id }) {
          tip {
            id
            chatUnreads
          }
        }
      }
    `,
    vars: { id },
    optimisticUpdater: store => {
      const tipRecord = store.get(id);
      const chatMessageConnection = tipRecord.getLinkedRecord('chatMessages');
      if (!chatMessageConnection) return;
      const chatMessageEdgeRecords = chatMessageConnection.getLinkedRecords(
        'edges'
      );
      chatMessageEdgeRecords.forEach(chatMessageEdgeRecord => {
        const chatMessageRecord = chatMessageEdgeRecord.getLinkedRecord('node');
        chatMessageRecord.setValue(false, 'unread');
      });
    }
  });

export const markReadChatMessage = ({ id }) =>
  commitMutation({
    mutation: graphql`
      mutation chatsMarkReadChatMessageMutation($id: ID!) {
        markReadChatMessage(input: { id: $id }) {
          chatMessage {
            id
            unread
          }
        }
      }
    `,
    vars: { id },
    optimisticUpdater: store => {
      const chatMessageRecord = store.get(id);
      chatMessageRecord.setValue(false, 'unread');
    }
  });

export const createChatMessage = ({ body, tipId }) =>
  commitMutation({
    mutation: graphql`
      mutation chatsCreateChatMessageMutation($body: String!, $tipId: ID!) {
        createChatMessage(input: { body: $body, tipId: $tipId }) {
          chatMessage {
            id
            body
            user {
              id
            }
            tip {
              id
            }
            createdAt
          }
        }
      }
    `,
    vars: { body, tipId }
  });

export const updateChatMessage = ({ id, body }) =>
  commitMutation({
    mutation: graphql`
      mutation chatsUpdateChatMessageMutation($id: ID!, $body: String!) {
        updateChatMessage(input: { id: $id, body: $body }) {
          chatMessage {
            id
            body
            user {
              id
            }
            tip {
              id
            }
            createdAt
          }
        }
      }
    `,
    vars: { id, body }
  });

export const deleteChatMessage = ({ id }) =>
  commitMutation({
    mutation: graphql`
      mutation chatsDeleteChatMessageMutation($id: ID!) {
        deleteChatMessage(input: { id: $id }) {
          chatMessage {
            id
          }
        }
      }
    `,
    vars: { id }
  });
