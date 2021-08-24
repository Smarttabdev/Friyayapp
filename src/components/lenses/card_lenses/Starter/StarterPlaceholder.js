import React, { Fragment } from 'react';

const StarterPlaceholder = ({ fontColor, showOne }) => {
  return (
    <div className="starter-placeholder">
      {!showOne ? (
        <Fragment>
          <div style={{ borderColor: fontColor || 'rgba(0, 0, 0, 0.2' }}></div>
          <div style={{ borderColor: fontColor || 'rgba(0, 0, 0, 0.2' }}></div>
          <div style={{ borderColor: fontColor || 'rgba(0, 0, 0, 0.2' }}></div>
        </Fragment>
      ) : (
        <div style={{ borderColor: fontColor || 'rgba(0, 0, 0, 0.2' }}></div>
      )}
    </div>
  );
};

export default StarterPlaceholder;
