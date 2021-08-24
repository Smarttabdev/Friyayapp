import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import { stateMappings } from 'Src/newRedux/stateMappings';
import withPlanTabLink from './withPlanTabLink';

function CardAssigneeLabel({
  assignee,
  className,
  showTooltip,
  onClick,
  tooltipStyle
}) {
  const containerClassNames = classNames(
    className,
    'card-assignee-label',
    'link-tooltip-container'
  );
  const renderControl = !!assignee;

  return (
    renderControl && (
      <div className={containerClassNames} onClick={onClick}>
        <UserAvatar
          margin={0}
          readonly
          user={assignee}
          tooltipText={
            showTooltip && `Assigned to - ${assignee.attributes.name}`
          }
          tooltipStyle={tooltipStyle}
        />
      </div>
    )
  );
}

CardAssigneeLabel.propTypes = {
  card: PropTypes.object,
  className: PropTypes.string,
  showTooltip: PropTypes.bool,
  onClick: PropTypes.func
};

const mapState = (state, { card }) => {
  const { people } = stateMappings(state);
  const cardAssigneeId = card
    ? card.relationships.tip_assignments.data[0]
    : null;

  return { assignee: people[cardAssigneeId] };
};

// export default connect(mapState)(CardAssigneeLabel);
export default connect(mapState)(withPlanTabLink(CardAssigneeLabel));
