import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'Components/shared/buttons/IconButton';
import { stateMappings } from 'Src/newRedux/stateMappings';
import SideLabelDropdown from 'Src/components/shared/SideLabelDropdown';
import { updateInboxLens } from 'Src/newRedux/interface/lenses/actions';

const defaultLabelFilterIds = ['3', '5', '6'];

class InboxLensFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTypeFilters: [
        { title: 'Team', isSelected: true },
        { title: 'Me', isSelected: false }
      ],
      statusFilters: [
        { title: 'Unread', isSelected: true },
        { title: 'Read', isSelected: false }
      ]

      // Object.values(props.labels).filter(label =>
      //   defaultLabelFilterIds.includes(label.id)
      // )
    };
  }

  componentDidMount() {
    this.props.setActiveFilter(
      'USER_FILTER',
      this.state.userTypeFilters.find(option => option.isSelected)
    );
    this.props.setActiveFilter('LABEL_FILTER', this.state.activeLabelFilterId);
  }

  handleUserTypeFilter = index => {
    let { userTypeFilters } = this.state;

    userTypeFilters[index].isSelected = true;
    const otherIndex = userTypeFilters.findIndex((type, i) => i != index);
    userTypeFilters[otherIndex].isSelected = false;

    this.setState({ userTypeFilters }, () => {
      //Filter cards here
      this.props.setActiveFilter(
        'USER_FILTER',
        this.state.userTypeFilters.find(option => option.isSelected)
      );
    });
  };

  handleStatusFilter = index => {
    let { statusFilters } = this.state;

    statusFilters[index].isSelected = true;
    const otherIndex = statusFilters.findIndex((type, i) => i != index);
    statusFilters[otherIndex].isSelected = false;

    this.setState({ statusFilters }, () => {
      //Filter cards here
    });
  };

  persistPinnedLabels = selectedLabelFilters => {
    const labelFilterIds = selectedLabelFilters.map(label => label.id);

    this.props.updateInboxLens({ pinnedLabels: labelFilterIds });
    window.localStorage.setItem(
      'inboxLensPinnedLabels',
      JSON.stringify(labelFilterIds)
    );
  };

  handleRemoveLabelFilter = id => {
    let { selectedLabelFilters } = this.props;
    selectedLabelFilters = selectedLabelFilters.filter(label => label.id != id);
    this.persistPinnedLabels(selectedLabelFilters);
  };

  toggleLabelOptions = () =>
    this.setState(prev => ({ showLabelOptions: !prev.showLabelOptions }));

  handleSelectLabel = label => {
    let { selectedLabelFilters } = this.props;

    const indexOfLabelInState = selectedLabelFilters.findIndex(
      lab => lab.id == label.id
    );
    if (indexOfLabelInState != -1)
      selectedLabelFilters.splice(indexOfLabelInState, 1);
    else selectedLabelFilters.push(label);

    this.persistPinnedLabels(selectedLabelFilters);
  };

  handleLabelFilter = label => {
    const activeLabelFilterId =
      label.id == this.state.activeLabelFilterId ? null : label.id;
    this.setState({ activeLabelFilterId }, () => {
      //Filter cards here
      this.props.setActiveFilter(
        'LABEL_FILTER',
        this.state.activeLabelFilterId
      );
    });
  };

  render() {
    const {
      userTypeFilters,
      statusFilters,
      showLabelOptions,
      activeLabelFilterId
    } = this.state;
    const { selectedLabelFilters } = this.props;
    return (
      <div className="filters_section">
        <div className="user_type_filters">
          {userTypeFilters.map((filter, i) => (
            <div
              key={i}
              onClick={() => this.handleUserTypeFilter(i)}
              className={filter.isSelected ? 'is_selected' : ''}
            >
              {filter.title}
            </div>
          ))}
        </div>

        <div className="status_filters">
          {statusFilters.map((filter, i) => (
            <div
              key={i}
              onClick={() => this.handleStatusFilter(i)}
              className={filter.isSelected ? 'is_selected' : ''}
            >
              {filter.title}
            </div>
          ))}
        </div>

        <div className="label_filters">
          {selectedLabelFilters.map((label, i) => (
            <div
              key={i}
              className={`label_filters_item ${
                activeLabelFilterId == label.id ? 'is_selected' : ''
              }`}
              onClick={() => this.handleLabelFilter(label)}
            >
              <div>
                {label.attributes.name[0].toUpperCase() +
                  label.attributes.name.slice(1)}
              </div>

              <div>
                <IconButton
                  icon="close"
                  onClick={() => this.handleRemoveLabelFilter(label.id)}
                  fontSize={14}
                  containerStyle={{ height: 'initial' }}
                />
              </div>
            </div>
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
    tools: {
      inboxLens: { pinnedLabels }
    }
  } = stateMappings(state);

  return {
    labels,
    selectedLabelFilters: Object.values(labels).filter(label =>
      (pinnedLabels ? pinnedLabels : defaultLabelFilterIds).includes(label.id)
    )
  };
};

export default connect(mapState, { updateInboxLens })(InboxLensFilters);
