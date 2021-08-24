export default {
  option: provided => ({
    ...provided
  }),
  control: (provided, state) => ({
    ...provided,
    background: state.selectProps?.transparent ? 'transparent' : '',
    borderRadius: '0px',
    borderColor: '#eee',
    border: 'none',
    borderBottom: '1px solid #eee',
    marginTop: '10px',
    marginBottom: '10px',
    boxShadow: 'none'
  }),
  menu: provided => ({
    ...provided
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, marginLeft: '-6px' };
  },
  multiValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return {
      ...provided,
      opacity,
      transition,
      marginLeft: '-6px',
      marginRight: '10px'
    };
  },
  placeholder: provided => ({
    ...provided,
    marginLeft: '-6px',
    color: '#bbb'
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none'
  }),
  multiValueLabel: provided => ({ ...provided, borderRadius: '0px' }),
  multiValueRemove: provided => ({
    ...provided,
    borderRadius: '0px',
    cursor: 'pointer'
  })
};
