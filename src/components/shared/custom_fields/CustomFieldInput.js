/* eslint-disable react/display-name */
import React from 'react';
import cn from 'classnames';

import DateInput from 'Components/shared/forms/DateInput';
import PersonInput from './inputs/PersonInput';
import RightDesignColorPicker from 'Components/menus/right/right_submenus/design/RightDesignColorPicker';
import LabelSelectMulti from 'Components/shared/LabelSelectMulti';
import './CustomFieldInput.scss';

const CustomFieldInput = ({
  name,
  type,
  basic,
  onChange,
  onKeyDown,
  onBlur,
  className,
  card,
  ...props
}) => {
  const handleChange = e => {
    let value = e.target.value;
    if (['number', 'money'].includes(type)) {
      value = isNaN(value) ? 0 : Number(value);
    }
    onChange(value);
  };

  const typeClass = `type-${type.toLowerCase()}`;

  const classes = cn(
    'custom-field-input',
    typeClass,
    basic && 'basic',
    className
  );

  const renderers = {
    number: () => (
      <input
        className={classes}
        type="number"
        onChange={handleChange}
        onBlur={onBlur}
        {...props}
        onKeyDown={onKeyDown}
      />
    ),
    checkbox: () => (
      <input
        className={classes}
        type="checkbox"
        checked={
          props.value == true || props.value == 'true' || props.value == 1
        }
        onChange={e => onChange(e.target.checked)}
      />
    ),
    date: () => (
      <DateInput
        className={classes}
        date={props.value}
        placeholder="No date"
        reactDatesProps={{ noBorder: basic, showDefaultInputIcon: false }}
        onChange={date => onChange(moment(date).toISOString())}
        isOutsideRange={() => false}
      />
    ),
    person: () => (
      <PersonInput value={props.value} onChange={onChange} onBlur={onBlur} />
    ),
    label: () => (
      <LabelSelectMulti value={props.value} onChange={onChange} card={card} />
    ),
    color: () => (
      <RightDesignColorPicker
        value={props.value}
        onChange={onChange}
        onClose={onBlur}
      />
    ),
    default: () => (
      <input
        className={classes}
        onChange={handleChange}
        {...props}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    )
  };

  renderers.money = renderers.number;

  return (renderers[type] || renderers.default)();
};

export default CustomFieldInput;
