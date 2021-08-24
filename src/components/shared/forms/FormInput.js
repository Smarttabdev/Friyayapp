import React from 'react';
const FormInput = ({
  additionalClasses,
  autoFocus,
  centreText,
  defaultValue,
  name,
  onBlur,
  onChange,
  onFocus,
  onSubmit,
  onKeyPress,
  onKeyDown,
  placeholder,
  setFormWidth,
  styles,
  color,
  max,
  transparent = false,
  lessDesign
}) => {
  const handleChange = e => {
    e.preventDefault();
    const value = e.target.value;
    onChange && onChange(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit && onSubmit();
  };

  const classes = additionalClasses
    ? additionalClasses
    : 'form-inline full-width';

  const customStyles = styles ? styles : {};

  return (
    <form
      style={customStyles}
      className={`${classes}`}
      method="post"
      onSubmit={handleSubmit}
    >
      {transparent && (
        <style
          dangerouslySetInnerHTML={{
            __html: `.isTransparentInput::placeholder { color: ${color} !important; }`
          }}
        />
      )}
      <input
        autoFocus={autoFocus}
        className={
          centreText
            ? `form-control form-control-minimal ${transparent &&
                'isTransparentInput'} form-input-box-center`
            : `form-control form-control-minimal ${transparent &&
                'isTransparentInput'} form-input-box-left full-width`
        }
        style={
          setFormWidth != null && setFormWidth != undefined
            ? {
                width: `${setFormWidth}px`,
                color: transparent && color,
                borderBottom:
                  transparent && !lessDesign && color && `solid 1px ${color}`
              }
            : {
                color: transparent && color,
                borderBottom:
                  transparent && !lessDesign && color && `solid 1px ${color}`
              }
        }
        defaultValue={defaultValue}
        type="text"
        max={max || ''}
        name={name || 'formInput'}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        onChange={handleChange}
      />
    </form>
  );
};

export default FormInput;
