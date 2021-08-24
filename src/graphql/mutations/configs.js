import { commitMutation } from 'Lib/relay';

export const setConfig = ({ owner, config, value }) =>
  commitMutation({
    mutation: graphql`
      mutation configsSetConfigMutation(
        $owner: ID!
        $config: String!
        $value: JSON
      ) {
        setConfig(input: { owner: $owner, config: $config, value: $value }) {
          config {
            id
            config
            value
          }
        }
      }
    `,
    vars: { owner, config, value },
    optimisticUpdater: store => {
      const isObject = value != null && value.constructor.name === 'Object';
      if (isObject) return;
      const configRecord = store
        .getRoot()
        .getOrCreateLinkedRecord('config', 'Config', { owner, config });
      configRecord.setValue(config, 'config');
      configRecord.setValue(value, 'value');
    },
    updater: store => {
      const rootField = store.getRootField('setConfig');
      const configRecord = rootField.getLinkedRecord('config');
      store
        .getRoot()
        .setLinkedRecord(configRecord, 'config', { owner, config });
    }
  });
