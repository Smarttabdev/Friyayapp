import React, { Component, Fragment } from 'react';
import IconButton from 'Components/shared/buttons/IconButton';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { pageViewMappings } from 'Lib/config/lenses/lenses';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import Select from 'react-select';
import {
  getUiSettings,
  getFilterSettings,
  setUserFilterSettings,
  getCustomLensId,
  getUserConfig
} from 'Src/helpers/user_config';
import {
  toolConfigOptions,
  toolsForGroupBy,
  groupByOptions,
  filterOptions,
  checkFilterOptions
} from './data';
import ToggleSwitch from 'Components/shared/ToggleSwitch';
import {
  updateLens,
  selectCustomLens
} from 'Src/newRedux/database/lenses/thunks';
import OrdersSection from './OrdersSection';
import SubOptionsForFilterOption from './subOptionsForFilter/SubOptionsForFilterOption';

class ToolConfigMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolName: props.customTool.attributes.title,
      selectedGroupByOptions: props.selectedGroupByOptions,
      selectedFilterOptions: props.selectedFilterOptions,
      activeFilterOptionSelection: null
    };
  }

  updateToolName = e => this.setState({ toolName: e.target.value });

  componentDidMount() {
    let allTools = [];
    const viewSegments = groupBy(
      Object.values(this.props.boards || {}),
      'category'
    );
    Object.values(viewSegments).forEach(arrayOfTools => {
      allTools.push(...arrayOfTools);
    });
    allTools = allTools.map(tool => ({ value: tool.key, label: tool.name }));
    this.setState({
      allTools,
      selectedBaseTool: allTools.find(
        tool =>
          tool.value == this.props.customTool.attributes.current_active_template
      )
    });
  }

  componentDidUpdate(PP, PS) {
    const initialToolTitle = this.props.customTool.attributes.title;
    if (this.state.toolName != initialToolTitle && !this.state.isEditingTitle) {
      this.setState({ isEditingTitle: true });
    }
    if (PS.isEditingTitle && this.state.toolName == initialToolTitle) {
      this.setState({ isEditingTitle: false });
    }
  }

  handleChangeBaseTool = selectedBaseTool => {
    this.setState({ selectedBaseTool }, () => {
      const { toolId, customTool } = this.props;
      this.props.updateLens(customTool.id, {
        current_active_template: selectedBaseTool.value
      });
      if (!toolId || toolId == customTool.id) {
        this.props.selectCustomLens({
          id: this.props.configurationId,
          current_active_template: selectedBaseTool.value
        });
      }
    });
  };

  handleAddOrRemoveGroupByOption = selectedOption => {
    let { selectedGroupByOptions } = this.state;
    if (
      selectedGroupByOptions.findIndex(
        option => option.value == selectedOption.value
      ) > -1
    ) {
      //Remove option
      selectedGroupByOptions = selectedGroupByOptions.filter(
        option => option.value != selectedOption.value
      );
    } else {
      //Add option
      selectedGroupByOptions.push({ ...selectedOption, isActive: true });
    }
    this.setState({ selectedGroupByOptions }, this.setGroupByFilterSettings);
  };

  toggleGroupByOptionActive = i => {
    let { selectedGroupByOptions } = this.state;
    selectedGroupByOptions[i].isActive = !selectedGroupByOptions[i].isActive;
    this.setState({ selectedGroupByOptions }, this.setGroupByFilterSettings);
  };

  handleAddOrRemoveFilterOption = selectedOption => {
    let { selectedFilterOptions } = this.state;
    const isCheckOption = checkFilterOptions.find(
      f => f.value == selectedOption.value
    );
    if (
      selectedFilterOptions.findIndex(
        option => option.value == selectedOption.value
      ) > -1
    ) {
      //Remove option
      selectedFilterOptions = selectedFilterOptions.filter(
        option => option.value != selectedOption.value
      );
      isCheckOption && this.toggleCheckFilter(selectedOption);
    } else {
      //Add option
      selectedFilterOptions.push({ ...selectedOption, isActive: true });
      this.toggleCheckFilter(selectedOption, true);
    }
    this.setState({ selectedFilterOptions });
  };

  toggleCheckFilter = (filter, isAdding, isToggle) => {
    const { filterSettings } = this.props;
    let payload = {};
    payload[filter.value] = isAdding
      ? true
      : isToggle
      ? !filterSettings[filter.value]
      : false;
    this.props.setUserFilterSettings(payload);
  };

  toggleFilterOptionActive = i => {
    let { selectedFilterOptions } = this.state;
    selectedFilterOptions[i].isActive = !selectedFilterOptions[i].isActive;
    let payload = {};
    payload[selectedFilterOptions[i].value] = !this.props.filterSettings[
      selectedFilterOptions[i].value
    ];
    this.props.setUserFilterSettings(payload);
    this.setState({ selectedFilterOptions });
  };

  handleClickFilterOption = option => {
    this.setState({ activeFilterOptionSelection: option.value });
  };

  setGroupByFilterSettings = () => {
    const { selectedGroupByOptions } = this.state;
    const { filterSettings, setUserFilterSettings } = this.props;

    let groupByOptions = selectedGroupByOptions.filter(
      option => option.isActive
    );

    const group_by = {
      ...filterSettings.group_by,
      groupBy: groupByOptions
    };
    setUserFilterSettings({ group_by });
  };

  handleChangeTitle = () => {
    this.props.updateLens(this.props.customTool.id, {
      title: this.state.toolName
    });
    this.setState({ isEditingTitle: false });
  };

  renderValuePicker = i => {
    if (i == 0)
      return (
        <input
          type="text"
          className="form-control"
          value={this.state.toolName}
          onChange={this.updateToolName}
        />
      );

    if (i == 1) {
      const { allTools, selectedBaseTool } = this.state;
      return (
        <Select
          value={selectedBaseTool}
          defaultValue={allTools?.find(
            tool =>
              tool.value ==
              this.props.customTool.attributes.current_active_template
          )}
          options={allTools ?? []}
          onChange={this.handleChangeBaseTool}
        />
      );
    }

    if (i == 2) {
      const allFilterOptions = filterOptions.concat(checkFilterOptions);
      const { selectedFilterOptions, activeFilterOptionSelection } = this.state;
      return (
        <Fragment>
          <div className="select_value">
            <Select
              value={{ label: 'Select a Filter' }}
              options={allFilterOptions}
              onChange={this.handleAddOrRemoveFilterOption}
            />
          </div>
          {selectedFilterOptions.length > 0 && (
            <div className="active_options">
              {selectedFilterOptions.map((option, i) => {
                const hasMoreOptions = filterOptions.find(
                  op => op.value == option.value
                );
                return (
                  <div key={i} className="active_option">
                    <div
                      className={`option_label ${hasMoreOptions && 'hasHover'}`}
                      onClick={
                        hasMoreOptions
                          ? () => this.handleClickFilterOption(option)
                          : null
                      }
                    >
                      {option.label}
                    </div>
                    {!hasMoreOptions && (
                      <ToggleSwitch
                        onClick={() => this.toggleFilterOptionActive(i)}
                        on={option.isActive}
                      />
                    )}
                    {activeFilterOptionSelection == option.value && (
                      <SubOptionsForFilterOption
                        optionValue={option.value}
                        closeDropdown={() =>
                          this.setState({ activeFilterOptionSelection: null })
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Fragment>
      );
    }

    if (i == 3)
      return (
        <Fragment>
          <div className="select_value">
            <Select
              value={{ label: 'Add Field' }}
              options={groupByOptions}
              onChange={this.handleAddOrRemoveGroupByOption}
            />
          </div>
          {this.state.selectedGroupByOptions.length > 0 && (
            <div className="active_options">
              {this.state.selectedGroupByOptions.map((option, i) => (
                <div key={i} className="active_option">
                  {option.label}
                  <ToggleSwitch
                    onClick={() => this.toggleGroupByOptionActive(i)}
                    on={option.isActive}
                  />
                </div>
              ))}
            </div>
          )}
        </Fragment>
      );
  };

  render() {
    const { isEditingTitle } = this.state;
    const { setRightMenuOpenForMenu, currentView } = this.props;
    const indexOf_groupBy = toolConfigOptions.findIndex(
      opt => opt.title == 'Group by'
    );

    return (
      <div className="right-submenu">
        <div className="right-submenu_header">
          <IconButton
            fontAwesome
            icon="caret-left"
            onClick={() => setRightMenuOpenForMenu(true)}
          />
          <span className="ml5">Tool Configuration</span>
        </div>

        <div className="options_section right-submenu_content">
          {isEditingTitle && (
            <div className="right-submenu_item option header">
              <div className="btn" onClick={this.handleChangeTitle}>
                Update
              </div>
            </div>
          )}
          {toolConfigOptions
            .filter((option, i) =>
              i == indexOf_groupBy
                ? toolsForGroupBy.includes(currentView)
                : true
            )
            .map((option, i) => (
              <div
                key={i}
                className={`right-submenu_item option ${[
                  'Filters',
                  'Group by'
                ].includes(option.title) && 'alignBase'}`}
              >
                <div className="title">{option.title}</div>
                <div className="value">{this.renderValuePicker(i)}</div>
              </div>
            ))}

          <OrdersSection />
        </div>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const {
    page: { page },
    lensList: customLenses
  } = stateMappings(state);

  const customLensId = getCustomLensId(state);
  const customTool = customLenses[props.toolId ?? customLensId];
  const ui_settings = getUiSettings(state);
  const filterSettings = getFilterSettings(state);
  const userConfiguration = getUserConfig(state);

  let selectedGroupByOptions = filterSettings.group_by?.groupBy || [];
  selectedGroupByOptions.forEach((option, i) => {
    if (!option.isActive) {
      selectedGroupByOptions[i].isActive = true;
    }
  });

  let selectedFilterOptions = [];
  // check each filter option, to see if there is any active filter, and then add to this list
  checkFilterOptions.forEach(f => {
    filterSettings[f.value] &&
      selectedFilterOptions.push({ ...f, isActive: true });
  });

  return {
    customTool,
    boards: pageViewMappings[page],
    currentView: ui_settings.current_active_template,
    filterSettings,
    selectedGroupByOptions,
    selectedFilterOptions,
    configurationId: get(userConfiguration, 'id')
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu,
  setUserFilterSettings,
  updateLens,
  selectCustomLens
};

export default connect(mapState, mapDispatch)(ToolConfigMenu);
