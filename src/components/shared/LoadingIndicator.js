import React from 'react';
import classNames from 'classnames';

const LoadingIndicator = ({ defaultClassName, className, style }) => (
  <div
    className={classNames(
      defaultClassName && 'loading-indicator-container',
      className
    )}
    style={style}
  >
    <img className="loader" src="/images/ajax-loader.gif" />
  </div>
);

LoadingIndicator.defaultProps = {
  defaultClassName: true
};

export default LoadingIndicator;
