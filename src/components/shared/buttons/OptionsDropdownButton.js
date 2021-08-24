import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'Components/shared/Icon';
import Dropdown from 'Components/shared/Dropdown';

const OptionsDropdownButton = React.memo(
  ({
    children,
    className = 'more_vert',
    dropdownLeft,
    icon = 'more_vert',
    additionalClasses = 'dark-grey-icon-button',
    color,
    isSmall,
    style,
    parentStyle,
    extraMenuStyle = {}
  }) => (
    <Dropdown
      trigger={
        <a
          className="grey-link dropdown"
          style={style}
          data-toggle="dropdown"
          role="button"
        >
          <Icon
            color={color}
            additionalClasses={cx(
              `${isSmall ? 'small' : 'medium'}`,
              additionalClasses
            )}
            icon={icon}
          />
        </a>
      }
      className={className}
      MenuComponent="div"
      menuStyle={
        !dropdownLeft && { left: 'unset', right: 0, ...extraMenuStyle }
      }
      ignorePreventDefault
      style={parentStyle}
    >
      {children}
    </Dropdown>
  )
);

OptionsDropdownButton.propTypes = {
  style: PropTypes.object,
  additionalClasses: PropTypes.string
};

export default OptionsDropdownButton;
