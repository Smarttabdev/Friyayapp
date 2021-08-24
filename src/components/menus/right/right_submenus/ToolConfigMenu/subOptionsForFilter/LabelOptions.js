import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import SelectableLabelList from 'Components/shared/labels/elements/SelectableLabelList';

class LabelOptions extends Component {
  updateLabelFilters = labelIds =>
    this.props.setUserFilterSettings({ label: labelIds });

  render() {
    return (
      <>
        <SelectableLabelList
          // canAddOrEdit
          multiSelect
          onChangeSelection={this.updateLabelFilters}
          selectedLabelIds={this.props.label}
        />
      </>
    );
  }
}

const mapState = state => {
  const filter_setting = getFilterSettings(state);
  return { label: filter_setting.label };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(LabelOptions);
