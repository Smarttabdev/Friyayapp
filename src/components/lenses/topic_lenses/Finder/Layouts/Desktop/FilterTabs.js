import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'Components/shared/buttons/IconButton';
import SideLabelDropdown from 'Src/components/shared/SideLabelDropdown';
import { stateMappings } from 'Src/newRedux/stateMappings';
import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { success } from 'Utils/toast';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { updateFinderLens } from 'Src/newRedux/interface/lenses/actions';

const defaultLabelFilterIds = ['3', '5', '6'];

class FilterTabs extends Component {
  constructor(props) {
    super(props);

    let activeTypeFilters = [];
    props.sort == 'recentCreated' && activeTypeFilters.push('Recent');
    props.assignedFilters.includes(props.currentUserId) &&
      activeTypeFilters.push('Me');
    props.starredFilter == 'STARRED' && activeTypeFilters.push('Starred');
    this.state = {
      typeFilters: ['Recent', 'Me', 'Starred'],

      activeTypeFilters,

      selectedLabelFilters: Object.values(props.labels).filter(label =>
        defaultLabelFilterIds.includes(label.id)
      )
    };
  }

  setTypeFilter = filter => {
    const { activeTypeFilters } = this.state;

    let updatedFilters = [...activeTypeFilters];
    let isAdding = !activeTypeFilters.includes(filter);

    if (!isAdding) {
      // Remove filter
      updatedFilters = activeTypeFilters.filter(val => val != filter);
    } else {
      updatedFilters.push(filter);
      // Add filter
    }

    console.log({ filter, activeTypeFilters, updatedFilters });

    this.setState({ activeTypeFilters: updatedFilters }, () => {
      this.updateFilters(filter, isAdding);
    });
  };

  updateFilters = (filter, isAdding) => {
    const {
      currentUserId,
      setUserFilterSettings,
      updateFinderLens
    } = this.props;
    console.log({ filter, isAdding });
    if (filter == 'Me')
      setUserFilterSettings({
        assigned: isAdding ? [Number(currentUserId)] : []
      });

    if (filter == 'Starred')
      setUserFilterSettings({ card: isAdding ? 'STARRED' : 'ALL' });

    if (filter == 'Recent')
      updateFinderLens({
        sort: isAdding ? 'recentCreated' : 'recentCreatedAsc'
      });
  };

  setLabelFilter = label => {
    const activeLabelFilterId =
      label.id == this.state.activeLabelFilterId ? null : label.id;
    this.setState({ activeLabelFilterId }, () => {
      //Filter cards here
      this.props.setUserFilterSettings({ label: [activeLabelFilterId] });
    });
  };

  removeSelectedLabelFilter = id => {
    const { selectedLabelFilters } = this.state;
    this.setState({
      selectedLabelFilters: selectedLabelFilters.filter(label => label.id != id)
    });
  };

  toggleLabelOptions = () =>
    this.setState(prev => ({ showLabelOptions: !prev.showLabelOptions }));

  handleSelectLabel = label => {
    let { selectedLabelFilters } = this.state;

    const indexOfLabelInState = selectedLabelFilters.findIndex(
      lab => lab.id == label.id
    );
    if (indexOfLabelInState != -1)
      selectedLabelFilters.splice(indexOfLabelInState, 1);
    else selectedLabelFilters.push(label);

    this.setState({ selectedLabelFilters });
  };

  handleDropOnLabel = async ({ dropZoneProps, draggedItemProps }) => {
    console.log({ dropZoneProps, draggedItemProps });

    const updatedCard = !!(await this.props.updateCard({
      id: draggedItemProps.item.id,
      relationships: { labels: { data: [dropZoneProps.item.id] } }
    }));

    if (updatedCard) {
      success('Label added to card successfully');
    }
  };

  render() {
    const {
      typeFilters,
      selectedLabelFilters,
      activeTypeFilters,
      activeLabelFilterId,
      showLabelOptions
    } = this.state;

    const { card_font_color } = this.props;

    return (
      <div className="desktop_filters" style={{ color: card_font_color }}>
        <div className="type_filters">
          {typeFilters.map((filter, i) => (
            <div
              key={i}
              className={`filter type_filter ${activeTypeFilters.includes(
                filter
              ) && 'isActive'}`}
              onClick={() => this.setTypeFilter(filter)}
            >
              {filter}
            </div>
          ))}
        </div>

        <div className="label_filters">
          {selectedLabelFilters.map((label, i) => (
            <GenericDropZone
              key={i}
              itemType={dragItemTypes.CARD}
              item={{ id: label.id }}
              onDrop={this.handleDropOnLabel}
              // dropClassName="item"
            >
              <div
                onClick={() => this.setLabelFilter(label)}
                style={{ position: 'relative' }}
              >
                <div
                  className="color_highlight"
                  style={{ backgroundColor: label.attributes.color }}
                ></div>
                <div
                  className={`filter label_filters_item ${label.id ==
                    activeLabelFilterId && 'isActive'}`}
                >
                  <div style={{ color: card_font_color }}>
                    {label.attributes.name[0].toUpperCase() +
                      label.attributes.name.slice(1)}
                  </div>

                  <div>
                    <IconButton
                      icon="close"
                      onClick={() => this.removeSelectedLabelFilter(label.id)}
                      fontSize={14}
                      containerStyle={{ height: 'initial' }}
                    />
                  </div>
                </div>
              </div>
            </GenericDropZone>
          ))}

          <div className="add_label_section">
            <IconButton
              additionalClasses="add_label_button"
              icon="add_circle"
              onClick={this.toggleLabelOptions}
            />
            {showLabelOptions && (
              <SideLabelDropdown
                selectedLabels={selectedLabelFilters}
                onSelectLabel={this.handleSelectLabel}
                onClose={() => this.setState({ showLabelOptions: false })}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const {
    labels,
    user,
    tools: { finderLens }
  } = stateMappings(state);
  const filter_setting = getFilterSettings(state);

  return {
    labels,
    currentUserId: user?.id,
    assignedFilters: filter_setting.assigned,
    starredFilter: filter_setting.card,
    sort: finderLens.sort
  };
};

const mapDispatch = {
  updateCard,
  setUserFilterSettings,
  updateFinderLens,
  getFilterSettings
};

export default connect(mapState, mapDispatch)(FilterTabs);
