import { commitMutation } from 'Lib/relay';

export const createActiveField = ({ ownerId, customFieldId, position }) =>
  commitMutation({
    mutation: graphql`
      mutation customFieldsCreateActiveFieldMutation(
        $ownerId: ID!
        $customFieldId: ID!
        $position: Int
      ) {
        createActiveField(
          input: {
            ownerId: $ownerId
            customFieldId: $customFieldId
            position: $position
          }
        ) {
          activeField {
            id
            position
            customField {
              id
            }
          }
        }
      }
    `,
    vars: { ownerId, customFieldId, position }
  });

export const updateActiveField = ({ id, position }) =>
  commitMutation({
    mutation: graphql`
      mutation customFieldsUpdateActiveFieldMutation($id: ID!, $position: Int) {
        updateActiveField(input: { id: $id, position: $position }) {
          activeField {
            id
            position
            customField {
              id
            }
          }
        }
      }
    `,
    vars: { id, position }
  });

export const deleteActiveField = ({ id }) =>
  commitMutation({
    mutation: graphql`
      mutation customFieldsDeleteActiveFieldMutation($id: ID!) {
        deleteActiveField(input: { id: $id }) {
          activeField {
            id
          }
        }
      }
    `,
    vars: { id }
  });

export const createCustomField = ({ name, fieldType }) =>
  commitMutation({
    mutation: graphql`
      mutation customFieldsCreateCustomFieldMutation(
        $name: String!
        $fieldType: String!
      ) {
        createCustomField(input: { name: $name, fieldType: $fieldType }) {
          customField {
            id
          }
        }
      }
    `,
    vars: { name, fieldType }
  });

export const updateCustomField = ({ id, name, fieldType }) =>
  commitMutation({
    mutation: graphql`
      mutation customFieldsUpdateFieldNameMutation(
        $id: ID!
        $name: String
        $fieldType: String
      ) {
        updateCustomField(
          input: { id: $id, name: $name, fieldType: $fieldType }
        ) {
          customField {
            id
            name
            fieldType
          }
        }
      }
    `,
    vars: { id, name, fieldType },
    optimisticUpdater: store => {
      const record = store.get(id);
      if (!record) return;
      typeof name === 'string' && record.setValue(name, 'name');
      typeof fieldType === 'string' && record.setValue(fieldType, 'fieldType');
    }
  });

export const createCustomFieldValue = ({ ownerId, customFieldId, value }) =>
  commitMutation({
    mutation: graphql`
      mutation customFieldsCreateCustomFieldValueMutation(
        $ownerId: ID!
        $customFieldId: ID!
        $value: JSON
      ) {
        createCustomFieldValue(
          input: {
            ownerId: $ownerId
            customFieldId: $customFieldId
            value: $value
          }
        ) {
          customFieldValue {
            id
            value
            customField {
              id
            }
          }
        }
      }
    `,
    vars: { ownerId, customFieldId, value }
  });

export const updateCustomFieldValue = ({ id, value }) =>
  commitMutation({
    mutation: graphql`
      mutation customFieldsUpdateCustomFieldValueMutation(
        $id: ID!
        $value: JSON!
      ) {
        updateCustomFieldValue(input: { id: $id, value: $value }) {
          customFieldValue {
            id
            value
            customField {
              id
            }
          }
        }
      }
    `,
    vars: { id, value },
    optimisticUpdater: store => {
      const record = store.get(id);
      record && record.setValue(value, 'value');
    }
  });
