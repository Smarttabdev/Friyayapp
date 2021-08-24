import { commitMutation } from 'Lib/relay';

export const createSharing = ({ id, ...rest }) =>
  commitMutation({
    mutation: graphql`
      mutation sharingCreateSharingMutation($id: ID!) {
        createSharing(input: { id: $id }) {
          sharing {
            id
            token
            active
          }
        }
      }
    `,
    vars: { id },
    ...rest
  });

export const updateSharing = ({ id, active, ...rest }) =>
  commitMutation({
    mutation: graphql`
      mutation sharingUpdateSharingMutation($id: ID!, $active: Boolean) {
        updateSharing(input: { id: $id, active: $active }) {
          sharing {
            id
            token
            active
          }
        }
      }
    `,
    vars: { id, active },
    optimisticUpdater: store => {
      const record = store.get(id);
      active !== undefined && record.setValue(active, 'active');
    },
    ...rest
  });
