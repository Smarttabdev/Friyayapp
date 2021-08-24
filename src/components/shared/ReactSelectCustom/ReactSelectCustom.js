import React from 'react';
import Select from 'react-select';
import reactSelectCustomTheme from './reactSelectCustomTheme';
import reactSelectCustomStyles from './reactSelectCustomStyles';

const ReactSelectCustom = ({
  components,
  portal,
  styles,
  activeColor,
  ...props
}) => (
  <Select
    components={{
      IndicatorSeparator: () => null,
      ClearIndicator: () => null,
      ...components
    }}
    {...(portal ? { menuPortalTarget: document.body } : undefined)}
    styles={{
      ...reactSelectCustomStyles,
      placeholder: provided => ({
        ...provided,
        ...{ color: activeColor }
      }),
      dropdownIndicator: provided => ({
        ...provided,
        ...{ color: activeColor }
      }),
      ...(portal
        ? {
            menuPortal: provided => ({
              ...provided,
              zIndex: 1000
            })
          }
        : undefined),
      ...styles
    }}
    {...props}
  />
);

ReactSelectCustom.defaultProps = {
  theme: reactSelectCustomTheme,
  styles: reactSelectCustomStyles
};

export default ReactSelectCustom;
