import React from 'react';

import './BackButton.module.scss';

const BackButton = props => {
  return (
    <div styleName="back-btn" {...props}>
      <i className="fa fa-caret-left"></i>
    </div>
  );
};

export default BackButton;
