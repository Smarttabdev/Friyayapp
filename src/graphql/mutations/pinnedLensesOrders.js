import { commitMutation } from 'Lib/relay';
import { toGid } from 'Lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { addConfirmedTopicIdForPinnedLensesOrderChange } from 'Src/newRedux/session/actions';
import store from 'Src/store/store';

export const createPinnedLensesOrder = ({
  name,
  order,
  topicId,
  isTeamDefault
}) =>
  commitMutation({
    mutation: graphql`
      mutation pinnedLensesOrdersCreatePinnedLensesOrderMutation(
        $name: String!
        $order: [String!]
        $topicId: ID
        $isTeamDefault: Boolean
      ) {
        createPinnedLensesOrder(
          input: {
            name: $name
            order: $order
            topicId: $topicId
            isTeamDefault: $isTeamDefault
          }
        ) {
          pinnedLensesOrder {
            id
            name
            order
          }
        }
      }
    `,
    vars: { name, order, topicId, isTeamDefault },
    updater: store => {
      const record = store
        .getRootField('createPinnedLensesOrder')
        .getLinkedRecord('pinnedLensesOrder');
      const root = store.getRoot();
      const list = root.getLinkedRecords('pinnedLensesOrders') || [];
      root.setLinkedRecords(list.concat(record), 'pinnedLensesOrders');
    }
  });

export const updatePinnedLensesOrder = ({ id, name, order }) =>
  commitMutation({
    mutation: graphql`
      mutation pinnedLensesOrdersUpdatePinnedLensesOrderMutation(
        $id: ID!
        $name: String
        $order: [String!]
      ) {
        updatePinnedLensesOrder(
          input: { id: $id, name: $name, order: $order }
        ) {
          pinnedLensesOrder {
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

export const deletePinnedLensesOrder = ({ id }) =>
  commitMutation({
    mutation: graphql`
      mutation pinnedLensesOrdersDeletePinnedLensesOrderMutation($id: ID!) {
        deletePinnedLensesOrder(input: { id: $id }) {
          id
        }
      }
    `,
    vars: { id },
    updater: store => {
      store.delete(id);
      const root = store.getRoot();
      const list = root.getLinkedRecords('pinnedLensesOrders');
      if (list) {
        root.setLinkedRecords(
          list.filter(r => r),
          'pinnedLensesOrders'
        );
      }
    }
  });

export const selectPinnedLensesOrder = ({ id, topicId }) =>
  commitMutation({
    mutation: graphql`
      mutation pinnedLensesOrdersSelectPinnedLensesOrderMutation(
        $id: ID!
        $topicId: ID!
      ) {
        selectPinnedLensesOrder(input: { id: $id, topicId: $topicId }) {
          pinnedLensesOrder {
            id
            name
            order
          }
        }
      }
    `,
    vars: {
      id,
      topicId: toGid('Topic', topicId || 0)
    },
    updater: store => {
      const newDefault = store
        .getRootField('selectPinnedLensesOrder')
        .getLinkedRecord('pinnedLensesOrder');
      store.getRoot().setLinkedRecord(newDefault, 'activePinnedLensesOrder', {
        topicId: toGid('Topic', topicId || 0)
      });
    }
  });

export const setDefaultPinnedLensesOrder = ({ id, topicId }) =>
  commitMutation({
    mutation: graphql`
      mutation pinnedLensesOrdersSetDefaultPinnedLensesOrderMutation(
        $id: ID!
        $topicId: ID!
      ) {
        setDefaultPinnedLensesOrder(input: { id: $id, topicId: $topicId }) {
          pinnedLensesOrder {
            id
            name
            order
          }
        }
      }
    `,
    vars: {
      id,
      topicId: toGid('Topic', topicId || 0)
    },
    updater: store => {
      const newDefault = store
        .getRootField('setDefaultPinnedLensesOrder')
        .getLinkedRecord('pinnedLensesOrder');
      store.getRoot().setLinkedRecord(newDefault, 'defaultPinnedLensesOrder', {
        topicId: toGid('Topic', topicId || 0)
      });
    }
  });

export const confirmUpdatePinnedLensesOrder = ({
  topicId,
  pinnedLensesOrder,
  order
}) => {
  const { user, session } = stateMappings(store.getState());

  const hasAsked = session.confirmedTopicIdsForPinnedLensesOrderChange.includes(
    topicId
  );

  const doUpdate = () => {
    updatePinnedLensesOrder({
      id: pinnedLensesOrder.id,
      order
    });
  };

  if (hasAsked) {
    doUpdate();
    return;
  }

  const confirmAction = isChange => {
    if (isChange) {
      doUpdate();
    } else {
      createPinnedLensesOrder({
        name: `${user.attributes.first_name}'s Pinned Tools Order`,
        order
      });
    }
    store.dispatch(addConfirmedTopicIdForPinnedLensesOrderChange(topicId));
  };

  vex.dialog.open({
    message: `You are currently viewing ${pinnedLensesOrder.name}.  Would you like to change this order or create a new one?`,
    buttons: [
      $.extend({}, vex.dialog.buttons.YES, {
        text: 'Change This Order',
        click: { call: () => confirmAction(true) }
      }),
      $.extend({}, vex.dialog.buttons.YES, {
        text: 'Create New Order',
        click: { call: () => confirmAction() }
      })
    ]
  });
};
