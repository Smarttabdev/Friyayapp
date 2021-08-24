import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Dropdown from 'Components/shared/Dropdown';

const ActiveFilterChip = ({
  label,
  includes,
  enabled,
  onIncludesChange,
  onEnabledChange,
  onRemove,
  onClick
}) => {
  return (
    <div className="active-filter-chip">
      <Dropdown trigger={includes ? 'Is' : 'Is not'}>
        <li>
          <a onClick={() => onIncludesChange(true)}>Includes</a>
        </li>
        <li>
          <a onClick={() => onIncludesChange(false)}>Excludes</a>
        </li>
        <li>
          <a onClick={() => onRemove()}>Remove</a>
        </li>
      </Dropdown>
      <div className="active-filter-chip_name" onClick={onClick}>
        {label}
      </div>
      <i
        className={cn(
          'fa active-filter-chip__toggle-filter-btn',
          enabled ? 'fa-toggle-on green' : 'fa-toggle-off grey-button-color'
        )}
        onClick={() => onEnabledChange(!enabled)}
      />
    </div>
  );
};

ActiveFilterChip.propTypes = {
  label: PropTypes.node,
  includes: PropTypes.bool,
  enabled: PropTypes.bool,
  onIncludesChange: PropTypes.func,
  onEnabledChange: PropTypes.func,
  onRemove: PropTypes.func,
  onClick: PropTypes.func
};

export default ActiveFilterChip;
