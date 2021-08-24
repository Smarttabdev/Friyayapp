import React from 'react';
import PropTypes from 'prop-types';
import OptionsDropdownButton from 'Src/components/shared/buttons/OptionsDropdownButton';
import Icon from 'Src/components/shared/Icon';

const OPTIONS = [
  {
    value: 'TILE',
    icon: 'hashtag',
    label: 'Boards',
    color: '#F2994A'
  },
  {
    value: 'ROW',
    icon: 'label',
    label: 'Tabs',
    color: '#A2EBD9'
  },
  {
    value: 'LIST',
    icon: 'view_list',
    label: 'List',
    color: '#B865A8'
  },
  {
    value: 'SMALL_HEX',
    icon: 'topic',
    label: 'Board Hexes',
    color: '#F2C94C'
  }
];

class SubtopicViewOptionsDropdown extends React.PureComponent {
  static propTypes = {
    onSelect: PropTypes.func
  };

  render() {
    const options = OPTIONS.map(({ value, icon, label, color }) => (
      <li key={label}>
        <a
          className="dropdown-option-item"
          onClick={() => this.props.onSelect(value)}
          style={{ padding: '0' }}
        >
          <Icon
            icon={icon}
            color={color}
            backgroundColor={color}
            addClasses="re-revolving-toggle-button"
          />
          <span className="dropdown-option-item-span">{label}</span>
        </a>
      </li>
    ));
    return (
      <div style={{ marginBottom: '20px' }}>
        <ul className="list">{options}</ul>
      </div>
    );
  }
}

export default SubtopicViewOptionsDropdown;
