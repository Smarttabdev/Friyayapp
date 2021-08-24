import React from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import SelectableLabelList from 'Components/shared/labels/elements/SelectableLabelList';
import SubMenuHeader from 'Components/menus/right/right_submenus/elements/SubMenuHeader';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const RightFiltersStatusMenu = ({
  label,
  setUserFilterSettings,
  isDocked,
  onClickBack
}) => {
  const updateLabelFilters = labelIds => {
    const payload = {
      label: labelIds
    };
    setUserFilterSettings(payload);
  };
  return (
    <div className="right-submenu">
      <SubMenuHeader
        rootMenu="Filters"
        title="Label Filters"
        isDocked={isDocked}
        onClickBack={onClickBack}
      />
      <div className="right-submenu_content">
        <SelectableLabelList
          canAddOrEdit
          multiSelect
          onChangeSelection={updateLabelFilters}
          selectedLabelIds={label}
        />
      </div>
    </div>
  );
};

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  const filter_setting = getFilterSettings(state);
  return {
    topicId,
    label: filter_setting.label
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RightFiltersStatusMenu);
