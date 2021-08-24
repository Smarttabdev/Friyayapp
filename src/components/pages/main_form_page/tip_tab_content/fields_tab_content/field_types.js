const fieldTypes = {
  text: { icon: 'title', label: 'Text' },
  number: { icon: 'exposure_zero', label: 'Number' },
  checkbox: { icon: 'check_box', label: 'Checkbox' },
  money: { icon: 'attach_money', label: 'Money' },
  date: { icon: 'event', label: 'Date' },
  person: { icon: 'person_outline', label: 'Person' },
  color: { icon: 'color_lens', label: 'Color' },
  label: {
    label: 'Label',
    iconProps: {
      icon: 'label',
      outlined: true
    }
  }
};

export default fieldTypes;
