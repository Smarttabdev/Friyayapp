import React from 'react';
import { connect } from 'react-redux';

import Ability from 'Lib/ability';
import { stateMappings } from 'Src/newRedux/stateMappings';

import MoreIcon from 'Components/shared/more_icon';

const OrdersMenuDropDown = ({
  canUpdate,
  onConfirmDelete,
  onEditNameClick,
  onCopyClick,
  onSetAsDefaultForTopic
}) => {
  const handleDeleteOrder = () => {
    vex.dialog.confirm({
      message: 'Are you sure you want to delete this order?',
      callback: value => {
        value && onConfirmDelete();
      }
    });
  };

  return (
    <div className="dropdown card-actions-dropdown">
      <a
        className="dropdown"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span>
          <MoreIcon />
        </span>
      </a>

      <ul
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="dLabel"
      >
        <li>
          <a onClick={onEditNameClick}>Rename</a>
          <a onClick={onCopyClick}>Copy Order</a>
          <a onClick={handleDeleteOrder}>Delete Order</a>
          {onSetAsDefaultForTopic && canUpdate && (
            <a onClick={onSetAsDefaultForTopic}>Set as Board Default</a>
          )}
        </li>
      </ul>
    </div>
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const { topics, domains } = sm;

  const currentTopic = sm.page.topicId && topics[sm.page.topicId];
  const currentDomain = domains[sm.page.domainId];
  const canUpdate = Ability.can(
    'update',
    'self',
    currentTopic || currentDomain
  );

  return {
    canUpdate
  };
};

export default connect(mapState)(OrdersMenuDropDown);
