import React from 'react';

const Avatar = ({ url, initial, borderColor, border }) =>
  url ? (
    <img src={url} className="avatar" style={{ border, borderColor }} />
  ) : (
    <span className="avatar-letter">{initial}</span>
  );

Avatar.defaultProps = {
  initial: '?'
};

export default Avatar;
