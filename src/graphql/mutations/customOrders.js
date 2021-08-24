import { commitMutation } from 'Lib/relay';
import { toGid } from 'Lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { addConfirmedTopicKeyForCustomOrderChange } from 'Src/newRedux/session/actions';
import store from 'Src/store/store';
import cardLenses from 'Lib/config/lenses/cards';

export const createCustomOrder = async ({
  orderType,
  name,
  order,
  topicId,
  lenseId,
  lenseKey,
  key,
  defaultFilters,
  copyFrom
}) => {
  await commitMutation({
    mutation: graphql`
      mutation customOrdersCreateCustomOrderMutation(
        $orderType: CustomOrderEnum!
        $name: String!
        $order: [String!]
        $topicId: ID
        $lenseId: ID
        $lenseKey: String
        $key: String
        $defaultFilters: JSON
        $copyFrom: ID
      ) {
        createCustomOrder(
          input: {
            orderType: $orderType
            name: $name
            order: $order
            topicId: $topicId
            lenseId: $lenseId
            lenseKey: $lenseKey
            key: $key
            defaultFilters: $defaultFilters
            copyFrom: $copyFrom
          }
        ) {
          customOrder {
            id
            name
            order
          }
        }
      }
    `,
    vars: {
      orderType,
      name,
      order,
      topicId: toGid('Topic', topicId || 0),
      lenseId: toGid('Lens', lenseId),
      lenseKey,
      key,
      defaultFilters,
      copyFrom
    }
  });
  topicId = toGid('Topic', topicId || 0);
  lenseId = toGid('Lens', lenseId);
  const topicKey = JSON.stringify({ orderType, topicId, lenseId, lenseKey });
  store.dispatch(addConfirmedTopicKeyForCustomOrderChange(topicKey));
};

export const updateCustomOrder = ({ id, name, order }) =>
  commitMutation({
    mutation: graphql`
      mutation customOrdersUpdateCustomOrderMutation(
        $id: ID!
        $name: String
        $order: [String!]
      ) {
        updateCustomOrder(input: { id: $id, name: $name, order: $order }) {
          customOrder {
            id
            name
            order
          }
        }
      }
    `,
    vars: { id, name, order },
    optimisticUpdater: store => {
      const record = store.get(id);
      name && record.setValue(name, 'name');
      order && record.setValue(order, 'order');
    }
  });

export const deleteCustomOrder = ({ id }) =>
  commitMutation({
    mutation: graphql`
      mutation customOrdersDeleteCustomOrderMutation($id: ID!) {
        deleteCustomOrder(input: { id: $id }) {
          customOrder {
            id
          }
        }
      }
    `,
    vars: { id }
  });

export const selectCustomOrder = ({
  id,
  topicId,
  lenseId,
  lenseKey,
  orderType
}) =>
  commitMutation({
    mutation: graphql`
      mutation customOrdersSelectCustomOrderMutation(
        $id: ID!
        $topicId: ID!
        $lenseId: ID
        $lenseKey: String!
      ) {
        selectCustomOrder(
          input: {
            id: $id
            topicId: $topicId
            lenseId: $lenseId
            lenseKey: $lenseKey
          }
        ) {
          customOrder {
            id
            name
            order
          }
        }
      }
    `,
    vars: {
      id,
      topicId: toGid('Topic', topicId || 0),
      lenseId: toGid('Lens', lenseId),
      lenseKey
    },
    optimisticUpdater: store => {
      const record = store.get(id);
      if (!record) return;
      store.getRoot().setLinkedRecord(record, 'activeCustomOrder', {
        orderType,
        topicId,
        lenseId,
        lenseKey
      });
    }
  });

export const setDefaultCustomOrder = ({ id, topicId, lenseId, lenseKey }) =>
  commitMutation({
    mutation: graphql`
      mutation customOrdersSetDefaultCustomOrderMutation(
        $id: ID!
        $topicId: ID!
        $lenseId: ID
        $lenseKey: String!
      ) {
        setDefaultCustomOrder(
          input: {
            id: $id
            topicId: $topicId
            lenseId: $lenseId
            lenseKey: $lenseKey
          }
        ) {
          customOrder {
            id
            name
            order
          }
        }
      }
    `,
    vars: {
      id,
      topicId: toGid('Topic', topicId || 0),
      lenseId: toGid('Lens', lenseId),
      lenseKey
    }
  });

export const confirmUpdateCustomOrder = async ({
  orderTitle,
  orderType,
  topicId,
  lenseId,
  lenseKey,
  customOrder,
  order
}) => {
  const { user, session } = stateMappings(store.getState());

  topicId = toGid('Topic', topicId || 0);
  lenseId = toGid('Lens', lenseId);
  const vars = { orderType, topicId, lenseId, lenseKey };
  const topicKey = JSON.stringify(vars);

  const hasAsked = !!session.confirmedTopicKeysForCustomOrderChange.includes(
    topicKey
  );

  const doUpdate = async () => {
    await updateCustomOrder({
      id: customOrder.id,
      order
    });
  };

  if (hasAsked) {
    await doUpdate();
    return;
  }

  const confirmAction = async isChange => {
    if (isChange) {
      await doUpdate();
    } else {
      await createCustomOrder({
        name: `${user.attributes.first_name}'s ${orderTitle} Order`,
        order,
        orderType,
        topicId,
        lenseId,
        lenseKey
      });
    }
    await store.dispatch(addConfirmedTopicKeyForCustomOrderChange(topicKey));
  };

  vex.dialog.open({
    message: `You are currently viewing ${customOrder.name}.  Would you like to change this order or create a new one?`,
    buttons: [
      $.extend({}, vex.dialog.buttons.YES, {
        text: 'Change This Order',
        click: { call: async () => await confirmAction(true) }
      }),
      $.extend({}, vex.dialog.buttons.YES, {
        text: 'Create New Order',
        click: { call: async () => await confirmAction() }
      })
    ]
  });
};

export const createOrUpdateCustomOrder = async ({
  customOrder,
  orderTitle,
  orderType,
  topicId,
  lenseId,
  lenseKey,
  order
}) => {
  topicId = toGid('Topic', topicId);
  lenseId = toGid('Lens', lenseId);
  if (customOrder) {
    await confirmUpdateCustomOrder({
      orderTitle,
      orderType,
      topicId,
      lenseId,
      lenseKey,
      customOrder,
      order
    });
  } else {
    const toolName = cardLenses[lenseKey || 'GRID'].name;
    await createCustomOrder({
      name: `Team Default - ${toolName}`,
      orderType,
      order,
      topicId,
      lenseId,
      lenseKey,
      key: 'team_default'
    });
  }
};
