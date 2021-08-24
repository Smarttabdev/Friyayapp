import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RenameInput = ({ initialValue, onChange, onSave, onClose, ...props }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onSave(value);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleBlur = () => {
    onSave(value);
    onClose();
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      autoFocus
      {...props}
    />
  );
};

RenameInput.propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onClose: PropTypes.func
};

export default RenameInput;
