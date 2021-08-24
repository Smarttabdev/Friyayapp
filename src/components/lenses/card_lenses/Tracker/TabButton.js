import React from 'react';

const TabButton = ({
  icon,
  label,
  count,
  footer,
  active,
  darkColor,
  lightColor,
  ...restProps
}) => {
  const bgColor = '#EFEFEF';
  return (
    <div
      className="tracker__tab-button"
      style={{
        backgroundColor: active ? lightColor : bgColor
      }}
      {...restProps}
    >
      <div className="flex flex-r-center">
        {icon}
        <div className="tracker__tab-button__title">{label}</div>
        <div
          className="tracker__tab-button__badge"
          style={{ backgroundColor: darkColor }}
        >
          {count}
        </div>
      </div>
      {footer}
    </div>
  );
};

export default TabButton;
