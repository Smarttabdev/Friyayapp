import React, { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { get } from 'lodash';

import Icon from 'Components/shared/Icon';
import fieldTypes from './field_types';

import styles from './styles.module.scss';

const FieldsDropdown = ({ inactiveFields, onClick }) => {
  const [statesMap, setStatesMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const tree = useMemo(() => {
    // put fields in the tree grouped by type
    const typesMap = {};

    Object.keys(fieldTypes).forEach(type => {
      typesMap[type] = {
        ...fieldTypes[type],
        type,
        id: type,
        nodes: []
      };
    });

    inactiveFields.forEach(field => {
      if (typesMap[field.fieldType]) {
        typesMap[field.fieldType].nodes.push({
          id: field.id,
          label: field.name,
          selectable: true,
          field
        });
      } else {
        console.error('Unknown field type', field.fieldType);
      }
    });

    return Object.values(typesMap);
  }, [inactiveFields]);

  useEffect(() => {
    const checkItemHit = item => {
      const state = (statesMap[item.id] = statesMap[item.id] || {});
      if (item.nodes) {
        item.nodes.forEach(checkItemHit);
        state.hit =
          !!item.nodes.find(node => statesMap[node.id].hit) || isItemHit(item);
        state.expanded = state.hit;
      } else {
        state.hit = isItemHit(item);
      }
    };
    tree.forEach(checkItemHit);
    setStatesMap({ ...statesMap });
  }, [searchQuery]);

  const isItemHit = item =>
    searchQuery && item.label.toLowerCase().includes(searchQuery.toLowerCase());

  const handleExpandClick = item =>
    setStatesMap({
      ...statesMap,
      [item.id]: {
        ...(statesMap[item.id] || {}),
        expanded: !get(statesMap, [item.id, 'expanded'])
      }
    });

  const renderItem = (item, depth) => {
    const state = statesMap[item.id] || {};
    const isGroup = !!item.nodes;
    return searchQuery && !state.hit ? null : (
      <div key={item.id} styleName="fields-tab-content__field-option">
        <div
          styleName={cn(
            'fields-tab-content__field-option-label',
            item.selectable && 'fields-tab-content__field-option-selectable'
          )}
        >
          {isGroup && (
            <i
              className={cn(
                'fa',
                state.expanded ? 'fa-caret-down' : 'fa-caret-right'
              )}
              styleName="fields-tab-content__field-option-expand-btn"
              onClick={() => handleExpandClick(item)}
            />
          )}
          <Icon
            {...(item.iconProps || { icon: item.icon })}
            containerClasses={styles['fields-tab-content__field-type-icon']}
          />
          <span onClick={() => item.selectable && onClick(item)}>
            {item.label}{' '}
            {!!item.nodes && item.nodes.length > 0 && `(${item.nodes.length})`}
          </span>
        </div>
        {state.expanded && item.nodes && !!item.nodes.length && (
          <div style={{ marginLeft: 50 * (depth + 1) }}>
            {item.nodes.map(item => renderItem(item, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div styleName="fields-tab-content__inactive-fields-dropdown">
      <input
        styleName="fields-tab-content__inactive-fields-search"
        placeholder="Search fields"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <div styleName="fields-tab-content__inactive-fields-options">
        {tree.map(item => renderItem(item, 0))}
      </div>
    </div>
  );
};

export default FieldsDropdown;
