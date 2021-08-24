import React, { useEffect } from 'react';
import { orderBy, isEqual } from 'lodash';
import cn from 'classnames';

import { mutations } from 'Src/graphql';
import CustomFieldInput from 'Components/shared/custom_fields/CustomFieldInput';
import { isNumberField, getFieldSum, toGid } from 'Lib/utilities';
import Field from 'Components/pages/main_form_page/tip_tab_content/fields_tab_content/field';

const isNull = val => val === null || typeof val == 'undefined';

const CustomField = ({ card, value, handleValueChange, parsedColumn }) => {
  const { customField, tips } = parsedColumn;

  if (!customField || !tips) return null;

  const tip = tips.find(tip => tip.id == toGid('Tip', card.id));

  if (!tip) return null;

  const autoSave = ['text', 'number', 'money'].includes(customField.fieldType);

  const customFieldValue = tip.customFieldValues.find(
    fv => fv.customField.id == customField.id
  );

  const fieldValue = customFieldValue?.value;

  useEffect(() => {
    fieldValue != value && handleValueChange(fieldValue);
  }, [fieldValue]);

  const update = value => {
    if (customFieldValue) {
      mutations.updateCustomFieldValue({
        id: customFieldValue.id,
        value
      });
    } else {
      mutations.createCustomFieldValue({
        ownerId: tip.id,
        customFieldId: customField.id,
        value
      });
    }
  };

  const handleChange = value => {
    handleValueChange(value);
    !autoSave && update(value);
  };

  const handleKeyDown = e => {
    autoSave && e.key === 'Enter' && update(value);
  };

  const handleBlur = () => {
    autoSave && update(value);
  };

  const centered = ['checkbox'].includes(customField.fieldType);

  return (
    <div
      className={cn(
        'w100 flex flex-1 relative',
        centered && 'flex-r-center-center'
      )}
    >
      <CustomFieldInput
        basic
        className={cn({
          'sheet-view__date': customField.fieldType === 'date'
        })}
        name={customField.name}
        type={customField.fieldType}
        value={value}
        style={{ width: '100%' }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        card={card}
      />
    </div>
  );
};

const FieldColumnHeader = ({ customField }) => {
  const handleChangeFieldType = (field, fieldType) => {
    mutations.updateCustomField({
      id: field.id,
      fieldType
    });
  };

  const handleChangeFieldName = (field, name) => {
    mutations.updateCustomField({
      id: field.id,
      name
    });
  };

  return (
    <Field
      field={customField}
      onChangeFieldType={handleChangeFieldType}
      onChangeName={handleChangeFieldName}
      forHeader
    />
  );
};

export default {
  cssModifier: ({ customField }) =>
    customField ? `custom-field-${customField.fieldType}` : 'custom-field',
  // eslint-disable-next-line react/display-name
  display: ({ customField, ...props } = {}) =>
    customField ? (
      <FieldColumnHeader customField={customField} {...props} />
    ) : (
      'Custom Field'
    ),
  resizableProps: ({ customField }) => {
    const width = customField?.fieldType === 'label' ? 160 : 138;
    return {
      width,
      minWidth: width
    };
  },
  Component: CustomField,
  renderSummary(cards, { customField, tips }) {
    if (!customField || !tips) return null;
    return (
      <div className="w100 ml25">{getFieldSum(customField, cards, tips)}</div>
    );
  },
  sort(cards, order, { customField, tips }) {
    return orderBy(
      cards,
      card => {
        if (!customField || !tips) return 0;
        const tip = tips.find(tip => tip.id == toGid('Tip', card.id));
        if (!tip) return 0;
        const customFieldValue = tip.customFieldValues.find(
          fv => fv.customField.id == customField.id
        );
        if (customFieldValue) {
          if (isNumberField(customField.fieldType)) {
            return !isNaN(customFieldValue.value)
              ? Number(customFieldValue.value)
              : order === 'asc'
              ? Infinity
              : -Infinity;
          } else if (customField.fieldType === 'date') {
            const m = moment(customFieldValue.value);
            return m.isValid()
              ? m.valueOf()
              : order === 'asc'
              ? Infinity
              : -Infinity;
          }
          return customFieldValue.value;
        }
        if (
          isNumberField(customField.fieldType) ||
          customField.fieldType === 'date'
        ) {
          return order === 'asc' ? Infinity : -Infinity;
        }
      },
      order
    );
  }
};
