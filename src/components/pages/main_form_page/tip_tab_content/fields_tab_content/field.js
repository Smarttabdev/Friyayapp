import React, { Fragment, useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { isEqual } from 'lodash';

import Popup from 'Src/components/shared/Popup';

import fieldTypes from './field_types';
import FieldTypesDropdown from './field_types_dropdown';
import CustomFieldInput from 'Components/shared/custom_fields/CustomFieldInput';
import Icon from 'Components/shared/Icon';

import styles from './styles.module.scss';

const Field = ({
  field,
  readOnly,
  canDeactivate,
  onChangeFieldType,
  onDeactivateField,
  onChangeName,
  onChangeValue,
  forHeader
}) => {
  const [fieldTypesPopupOpen, setFieldTypesPopupOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(field.name);
  const [value, setValue] = useState(field.value || '');
  const nameInputRef = useRef();

  const type = field.fieldType;

  if (!fieldTypes[type]) {
    return null;
  }

  useEffect(() => {
    newName != field.name && setNewName(field.name);
    value != field.value && setValue(field.value);
  }, [field.name, field.value]);

  const handleChangeFieldType = type => {
    setFieldTypesPopupOpen(false);
    onChangeFieldType(field, type);
  };

  const handleClickName = e => {
    e.stopPropagation();
    setEditingName(true);
    setTimeout(() => nameInputRef.current.focus());
  };

  const handleNameKeyUp = e => {
    e.key === 'Escape' && setEditingName(false);
  };

  const handleSubmitName = e => {
    e.preventDefault();
    e.stopPropagation();
    setEditingName(false);
    onChangeName(field, newName);
  };

  const handleSubmitValue = e => {
    e.preventDefault();
    e.stopPropagation();
    onChangeValue(field, value);
  };

  const handleBlurValue = () => {
    !isEqual(value, field.value) && onChangeValue(field, value);
  };

  const handleDeactivateField = () => {
    setFieldTypesPopupOpen(false);
    onDeactivateField(field);
  };

  const fieldProps = {};

  if (['text', 'number', 'money'].includes(type)) {
    fieldProps.onChange = setValue;
    fieldProps.onBlur = handleBlurValue;
  } else {
    fieldProps.onChange = onChangeValue.bind(null, field);
  }

  return (
    <div styleName="fields-tab-content__field" className="field-row">
      <div styleName="fields-tab-content__field-inner-left">
        {!forHeader && (
          <span
            className="material-icons"
            styleName="fields-tab-content__drag-icon"
          >
            reorder
          </span>
        )}
        <Popup
          open={fieldTypesPopupOpen}
          onOpen={() => setFieldTypesPopupOpen(true)}
          onClose={() => setFieldTypesPopupOpen(false)}
          on="click"
          position="bottom left"
          arrow={false}
          trigger={
            <div>
              <Icon
                {...(fieldTypes[type].iconProps || {
                  icon: fieldTypes[type].icon
                })}
                containerClasses={cn(
                  'field-row__icon',
                  styles['fields-tab-content__type-icon']
                )}
              />
            </div>
          }
        >
          <FieldTypesDropdown onClick={handleChangeFieldType} />
        </Popup>
        <span
          styleName="fields-tab-content__field-name"
          className="field-row__name"
          onClick={e => editingName && e.stopPropagation()}
        >
          {editingName ? (
            <form onSubmit={handleSubmitName}>
              <input
                className="form-control form-control-minimal"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onBlur={() => setEditingName(false)}
                onKeyUp={handleNameKeyUp}
                ref={nameInputRef}
              />
            </form>
          ) : (
            <span onDoubleClick={handleClickName}>{field.name}</span>
          )}
        </span>
      </div>
      {!forHeader && (
        <Fragment>
          <div styleName="fields-tab-content__field-inner-right">
            {readOnly ? (
              <div
                styleName={`field-value type-${type}`}
                style={{ opacity: 0.3 }}
              >
                {value}
              </div>
            ) : (
              <form styleName="value-form" onSubmit={handleSubmitValue}>
                <CustomFieldInput
                  styleName={cn({
                    'fields-tab-content__field-input': type !== 'date'
                  })}
                  name={field.name}
                  type={field.fieldType}
                  value={value || ''}
                  {...fieldProps}
                />
              </form>
            )}
          </div>
          {canDeactivate && (
            <a onClick={handleDeactivateField} className="ml5">
              <i className="fa active-filter-chip__toggle-filter-btn fa-toggle-on green" />
            </a>
          )}
        </Fragment>
      )}
    </div>
  );
};

Field.defaultProps = {
  onDeactivateField: () => {},
  onChangeValue: () => {}
};

export default Field;
