import React from 'react';
import PropTypes from 'prop-types';

import './ExpandButton.module.scss';

const ExpandButton = ({ expand, className, ...props }) => {
  return (
    <div className={className} styleName="root" {...props}>
      <i className="material-icons">{expand ? 'unfold_less' : 'unfold_more'}</i>
    </div>
  );
};

ExpandButton.defaultProps = {
  expand: false
};

ExpandButton.propTypes = {
  expand: PropTypes.bool,
  className: PropTypes.string
};

export default ExpandButton;
