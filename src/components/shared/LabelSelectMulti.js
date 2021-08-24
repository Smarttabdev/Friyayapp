import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import ReactSelectCustom from 'Components/shared/ReactSelectCustom';
import SelectableLabelList from 'Components/shared/labels/elements/SelectableLabelList';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';

const LabelSelectMulti = ({
  value,
  onChange,
  labels,
  card,
  setEditCardModalOpen
}) => {
  value = Array.isArray(value) ? value : [];
  const getOption = labelId => {
    const label = labels[labelId];
    return {
      value: label?.id,
      label: (
        <div
          className="flex flex-r-center pointer"
          style={{
            color: '#fff',
            backgroundColor: label?.attributes?.color,
            padding: '7px 0 7px 10px',
            minHeight: 31,
            width: '100%',
            textTransform: 'capitalize'
          }}
        >
          {label?.attributes?.name}
        </div>
      )
    };
  };

  let options = useMemo(() => {
    if (!labels) return [];

    const labelList = Object.values(labels);

    const getGroup = kind => ({
      label: kind,
      options: labelList
        .filter(l => l.attributes.kind === kind)
        .sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
        .map(l => getOption(l.id))
    });

    return ['public', 'private', 'system'].map(getGroup);
  }, [labels]);

  const handleChange = (selected, opts) => {
    if (selected[0].value === 'add') {
      setEditCardModalOpen({ cardId: card.id, tab: 'Label' });
      console.log(selected);
      return;
    }

    if (opts.action === 'select-option') {
      onChange(selected.map(opt => opt.value));
    } else if (opts.action === 'remove-value') {
      onChange(value.filter(id => id != opts.removedValue.value));
    }
  };

  const customOptions = [...options, { label: '+ Add Label', value: 'add' }];

  return (
    <ReactSelectCustom
      isMulti
      value={value.map(getOption)}
      options={customOptions}
      onChange={handleChange}
      styles={{
        container: (provided, state) => ({
          ...provided,
          width: '100%'
        }),
        multiValue: (provided, state) => ({
          ...provided,
          minWidth: '100%',
          margin: '2px 0'
        }),
        multiValueLabel: (provided, state) => ({
          ...provided,
          padding: 0,
          paddingLeft: 0,
          width: '100%',
          whiteSpace: 'normal'
        }),
        indicatorsContainer: (provided, state) => ({
          display: 'none'
        }),
        input: (provided, state) => ({
          ...provided,
          ...(value.length ? { position: 'absolute', opacity: 0 } : {})
        }),
        option: (provided, state) => ({
          ...provided,
          paddingBottom: 0,
          cursor: 'pointer'
        })
      }}
    />
  );
};

const mapState = state => {
  const { labels } = stateMappings(state);
  return {
    labels
  };
};

const mapDispatch = {
  setEditCardModalOpen
};

export default connect(mapState, mapDispatch)(LabelSelectMulti);
