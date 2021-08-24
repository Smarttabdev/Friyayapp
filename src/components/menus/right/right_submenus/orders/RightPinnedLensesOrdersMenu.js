import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import IconButton from 'Components/shared/buttons/IconButton';
import OrdersMenuRow from '../elements/OrdersMenuRow';

const RightPinnedLensesOrdersMenu = ({
  user,
  topicId,
  setRightMenuOpenForMenu,
  query,
  relay
}) => {
  useEffect(() => {
    const disposer = subscriptions.pinnedLensesOrdersUpdated({
      onNext: () => relay.refetch(vars => vars)
    });
    return () => disposer.dispose();
  }, []);

  const handleCreateOrder = async () => {
    await mutations.createPinnedLensesOrder({
      name: `${user.attributes.first_name}'s Pinned Tools Order`,
      topicId
    });
    relay.refetch(vars => vars);
  };

  return (
    <div className="right-submenu">
      <div className="right-submenu_header">
        <IconButton
          fontAwesome
          icon="caret-left"
          onClick={() => setRightMenuOpenForMenu('Orders')}
        />
        <span className="ml5">Pinned Tools Orders</span>
      </div>
      {query.pinnedLensesOrders.map(order => (
        <OrdersMenuRow
          key={order.id}
          order={order}
          orderType="pinnedLens"
          topicId={topicId}
          isSelected={order.id == query?.activePinnedLensesOrder?.id}
          isDefault={order.id == query?.defaultPinnedLensesOrder?.id}
        />
      ))}
      <div className="right-submenu_item option" key={'NEW'}>
        <a className="right-submenu_item" onClick={handleCreateOrder}>
          <span className="ml5">Create New Order</span>
        </a>
      </div>
    </div>
  );
};

RightPinnedLensesOrdersMenu.propTypes = {
  setRightMenuOpenForMenu: PropTypes.func.isRequired
};

const RightPinnedLensesOrdersMenuContainer = createRefetchContainer(
  RightPinnedLensesOrdersMenu,
  {
    query: graphql`
      fragment RightPinnedLensesOrdersMenu_query on Query
        @argumentDefinitions(topicId: { type: ID }) {
        pinnedLensesOrders(topicId: $topicId) {
          id
          name
        }
        activePinnedLensesOrder(topicId: $topicId) {
          id
        }
        defaultPinnedLensesOrder(topicId: $topicId) {
          id
        }
      }
    `
  },
  graphql`
    query RightPinnedLensesOrdersMenuOrdersQuery($topicId: ID) {
      ...RightPinnedLensesOrdersMenu_query @arguments(topicId: $topicId)
    }
  `
);

const mapState = state => {
  const {
    user,
    page: { topicId }
  } = stateMappings(state);
  return {
    user,
    topicId
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(
    props => <RightPinnedLensesOrdersMenuContainer {...props} query={props} />,
    {
      query: graphql`
        query RightPinnedLensesOrdersMenuQuery($topicId: ID) {
          ...RightPinnedLensesOrdersMenu_query @arguments(topicId: $topicId)
        }
      `,
      vars: ({ topicId }) => ({
        topicId: toGid('Topic', topicId)
      })
    }
  )
);
