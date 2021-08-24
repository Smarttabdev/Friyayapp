import React, { Component } from 'react';
import Dotdotdot from 'react-dotdotdot';
import { bool, string, func, array, object, number } from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'Components/shared/Icon';
import SelectableLabelList from 'Components/shared/labels/elements/SelectableLabelList';

class LabelSelect extends Component {
  state = {
    showDropdown: false,
    isEditingSelectedState: false
  };

  static defaultProps = {
    containerClassName: ''
  };

  static propTypes = {
    canAddOrEdit: bool,
    containerClassName: string,
    selectedLabel: object,
    onSelectLabel: func.isRequired,
    isEditingSelected: number,
    hideSelectText: bool
  };

  handleClickEvent = e => {
    this.dropdownRef &&
      !this.dropdownRef.contains(e.target) &&
      this.handleToggleDropdown();
  };

  handleSelectLabel = ([labelId]) => {
    this.props.onSelectLabel(labelId);
    this.handleToggleDropdown();
  };

  handleToggleDropdown = () => {
    const { showDropdown } = this.state;
    this.setState({ showDropdown: !showDropdown });
    showDropdown
      ? document.removeEventListener('click', this.handleClickEvent, true)
      : document.addEventListener('click', this.handleClickEvent, true);
  };

  closeDropdown = () => {
    this.setState({
      showDropdown: false,
      isEditingSelectedState: false
    });
  };

  saveDropdownRef = ref => {
    this.dropdownRef = ref;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isEditingSelected != this.props.isEditingSelected) {
      this.setState({ isEditingSelectedState: true });
    }
  }

  render() {
    const {
      canAddOrEdit,
      selectedLabel,
      isEditingSelected,
      hideSelectText
    } = this.props;
    const { showDropdown, isEditingSelectedState } = this.state;

    return (
      <div
        className={`dropdown label-select ${(showDropdown ||
          isEditingSelectedState) &&
          'open'}`}
        ref={this.saveDropdownRef}
      >
        <a
          onClick={this.handleToggleDropdown}
          className="dropdown label-select"
          style={{ paddingRight: 0, paddingLeft: '5px' }}
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {!hideSelectText && (
            <span className="label-select_name">
              <Dotdotdot clamp={1}>
                {selectedLabel ? selectedLabel.attributes.name : 'Select label'}
              </Dotdotdot>
            </span>
          )}
          <Icon fontAwesome icon="caret-down" />
        </a>
        <div
          className={`dropdown-menu label-select-dropdown ${(showDropdown ||
            isEditingSelectedState) &&
            'open'}`}
          aria-labelledby="dLabel"
        >
          <SelectableLabelList
            canAddOrEdit={canAddOrEdit}
            onCreateLabel={this.handleSelectLabel}
            onChangeSelection={this.handleSelectLabel}
            selectedLabelIds={selectedLabel ? [selectedLabel.id] : []}
            isEditingSelected={isEditingSelected}
            closeDropdown={this.closeDropdown}
          />
        </div>
      </div>
    );
  }
}

export default LabelSelect;
