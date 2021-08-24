import React, { useMemo } from 'react';
import { sortBy } from 'lodash';

import Icon from 'Components/shared/Icon';
import fieldTypes from './field_types';

import styles from './styles.module.scss';

const FieldTypesDropdown = ({ onClick }) => {
  const types = useMemo(() => {
    return Object.keys(fieldTypes).map(type => ({
      ...fieldTypes[type],
      type
    }));
  }, []);

  return (
    <div styleName="fields-tab-content__field-types-dropdown">
      {types.map(type => (
        <div
          key={type.type}
          styleName="fields-tab-content__field-types-option"
          onClick={() => onClick(type.type)}
        >
          <Icon
            {...(type.iconProps || { icon: type.icon })}
            containerClasses={styles['fields-tab-content__field-type-icon']}
          />
          {type.type}
        </div>
      ))}
    </div>
  );
};

export default FieldTypesDropdown;
