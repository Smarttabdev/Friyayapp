import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const ToggleSwitch = ({ on, className, style, ...props }) => (
  <i
    className={cn(
      className,
      'toggle-switch',
      'fa',
      on
        ? 'fa-toggle-on toggle-switch--green'
        : 'fa-toggle-off grey-button-color'
    )}
    style={{
      cursor: 'pointer',
      ...style
    }}
    {...props}
  />
);

ToggleSwitch.propTypes = {
  on: false
};

ToggleSwitch.propTypes = {
  on: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default ToggleSwitch;
