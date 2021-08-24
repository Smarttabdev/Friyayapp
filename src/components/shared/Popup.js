import React from 'react';
import PropTypes from 'prop-types';
import ReactJsPopup from 'reactjs-popup';

const Popup = ({
  children,
  overlayStyle = {},
  contentStyle = {},
  ...props
}) => (
  <ReactJsPopup
    overlayStyle={{ zIndex: 9999, ...overlayStyle }}
    contentStyle={{
      zIndex: 10000,
      padding: 5,
      border: 'none',
      borderRadius: 8,
      boxShadow: '0 6px 12px rgba(0, 0, 0, .175)',
      backgroundColor: '#fff',
      color: '#555',
      width: 'auto',
      ...contentStyle
    }}
    {...props}
  >
    {children}
  </ReactJsPopup>
);

Popup.propTypes = {
  overlayStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  children: PropTypes.node
};

export default Popup;
