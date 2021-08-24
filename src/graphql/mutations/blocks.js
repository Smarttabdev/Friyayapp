import { commitMutation } from 'Lib/relay';

export const createBlock = ({ ownerId, type, position, config, key }) =>
  commitMutation({
    mutation: graphql`
      mutation blocksCreateBlockMutation(
        $ownerId: ID!
        $type: String!
        $position: Int!
        $config: JSON!
        $key: String
      ) {
        createBlock(
          input: {
            ownerId: $ownerId
            type: $type
            position: $position
            config: $config
            key: $key
          }
        ) {
          block {
            id
            type
            position
            config
          }
        }
      }
    `,
    vars: { ownerId, type, position, config, key }
  });

export const updateBlock = ({ id, position, config }) =>
  commitMutation({
    mutation: graphql`
      mutation blocksUpdateBlockMutation(
        $id: ID!
        $position: Int
        $config: JSON
      ) {
        updateBlock(input: { id: $id, position: $position, config: $config }) {
          block {
            id
            position
            config
          }
        }
      }
    `,
    vars: { id, position, config }
  });

export const deleteBlock = ({ id }) =>
  commitMutation({
    mutation: graphql`
      mutation blocksDeleteBlockMutation($id: ID!) {
        deleteBlock(input: { id: $id }) {
          id
        }
      }
    `,
    vars: { id }
  });
