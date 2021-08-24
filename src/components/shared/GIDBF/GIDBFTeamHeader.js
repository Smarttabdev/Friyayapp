import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import IconButton from 'Components/shared/buttons/IconButton';
import TimeframeSelectors from 'Src/components/shared/TimeframeSelectors';
import TimeframeSelector from 'Src/components/shared/GIDBF/TimeframeSelector';
import { getUiSettings } from 'Src/helpers/user_config';
import { toggleAlphabetFilter } from 'Src/newRedux/database/GIDBFLenses/actions';
import {
  updateTimeframe,
  updateTeamPlanLens,
  updateProjectPlanLens,
  updateGoalPlanLens
} from 'Src/newRedux/interface/lenses/actions';
import { getThisDomain } from 'Lib/utilities';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import WorkspaceActionsDropdown from 'Src/components/shared/WorkspaceActionsDropdown';
import TopicActionsDropdown from 'Src/components/shared/topics/elements/TopicActionsDropdown';
import DomainLogo from 'Src/components/shared/DomainLogo';

class GIDBFTeamHeader extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
  }

  state = {
    showWorkspaceOptions: false
  };

  handleTimelineModeChange = columnMode => {
    this.props.updateTimeframe({ columnMode });
  };

  handleDateRangeChange = ({ startDate, endDate }) => {
    this.props.updateTimeframe({ startDate, endDate });
  };

  handleOffsetChange = (id, offset) => {
    this.props.updateTimeframe({
      offsets: {
        ...this.props.offsets,
        [id]: offset
      }
    });
  };

  handleViewToggle = () => {
    const {
      lensType,
      vertical,
      updateTeamPlanLens,
      updateProjectPlanLens,
      updateGoalPlanLens
    } = this.props;
    (lensType === 'TEAM_PLAN'
      ? updateTeamPlanLens
      : lensType === 'GOAL_PLAN'
      ? updateGoalPlanLens
      : updateProjectPlanLens)({
      vertical: !vertical
    });
  };

  isCardsHidden = () => {
    const { cardsHidden, topic } = this.props;
    return cardsHidden || (topic && topic.attributes.card_hidden);
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideWorkspaceDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element.contains(event.target) || this.isVisible(element)) {
        this.setState({ showWorkspaceOptions: false });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  componentDidUpdate() {
    if (this.state.showWorkspaceOptions === true) {
      const dropdown = this.dropdownRef.current;
      this.hideWorkspaceDropdownOnClickOut(dropdown);
    }
  }

  render() {
    const {
      toggleAlphabetFilter,
      lensType,
      vertical,
      topicId,
      topic,
      offsets,
      startDate,
      endDate,
      active_design,
      domain,
      columnMode,
      isHome,
      topicTitle,
      currentDomain,
      showWorkspaceLogo
    } = this.props;
    const { card_font_color } = this.props.active_design || {};
    const { showWorkspaceOptions } = this.state;
    return (
      <div className="team_plan-header">
        {showWorkspaceLogo && (
          <div
            data-tip={domain.attributes.name}
            data-for={`workspace-${domain.attributes.name}`}
            className="flex"
          >
            <DomainLogo
              domain={domain}
              preferredColor={active_design.workspace_font_color}
              rounded
              componentClass="domain-logo domain-logo-workspace-header"
            />
          </div>
        )}
        <div
          className="title"
          onClick={() => this.setState({ showWorkspaceOptions: true })}
          role="button"
        >
          {!isHome ? topicTitle : 'Main board'}
        </div>
        <div className="domain">
          <span className="mr5">/</span>
          {lensType == 'TEAM_DAY'
            ? 'Team Day'
            : lensType == 'PROJECT_PLAN'
            ? 'Project Plan'
            : 'Team Plan'}
        </div>
        <div className="right-section">
          {showWorkspaceOptions && isHome && (
            <span
              className="workspaceOptions"
              ref={this.dropdownRef}
              style={
                lensType === 'TEAM_PLAN' ? { top: '80px' } : { top: '40px' }
              }
            >
              <WorkspaceActionsDropdown />
            </span>
          )}

          {showWorkspaceOptions && !isHome && (
            <span
              className="topicOptions"
              ref={this.dropdownRef}
              style={{ top: '40px' }}
            >
              <TopicActionsDropdown
                color={card_font_color}
                topic={topic}
                cardsHidden={this.isCardsHidden}
                withoutAddImage
                noButton={true}
              />
            </span>
          )}
          {lensType == 'TEAM_PLAN' || lensType == 'PROJECT_PLAN' ? (
            <TimeframeSelectors
              mode={columnMode}
              startDate={startDate}
              endDate={endDate}
              offsets={offsets}
              onModeChange={this.handleTimelineModeChange}
              onDateRangeChange={this.handleDateRangeChange}
              onOffsetChange={this.handleOffsetChange}
              bold
              color={card_font_color}
              dropZoneEnabled
            />
          ) : (
            <TimeframeSelector
              lensType={lensType == 'TEAM_DAY' ? 'dayLens' : 'planLens'}
            />
          )}

          {lensType == 'TEAM_PLAN' && (
            <div className="jump_to" onClick={() => toggleAlphabetFilter()}>
              Jump to
            </div>
          )}

          {['TEAM_PLAN', 'PROJECT_PLAN'].includes(lensType) && (
            <IconButton
              icon={vertical ? 'view_column' : 'view_stream'}
              outlined
              containerClasses="ml20 mr10"
              onClick={this.handleViewToggle}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const {
    tools,
    topics,
    utilities: { active_design },
    page: { topicId, isHome },
    tools: { teamPlanLens, projectPlanLens, goalPlanLens, timeframe }
  } = stateMappings(state);
  const vertical =
    props.lensType === 'GOAL_PLAN'
      ? goalPlanLens.vertical
      : props.lensType === 'PROJECT_PLAN'
      ? projectPlanLens.vertical
      : teamPlanLens.vertical;
  const currentDomain = getThisDomain(getDomains(state));
  const ui_settings = getUiSettings(state);
  const cardsHidden = ui_settings.card_hidden;
  return {
    ...timeframe,
    vertical,
    topicId,
    cardsHidden,
    active_design,
    topic: topics[topicId],
    isHome,
    currentDomain
  };
};

const mapDispatch = {
  toggleAlphabetFilter,
  updateTimeframe,
  updateTeamPlanLens,
  updateProjectPlanLens,
  updateGoalPlanLens
};

export default connect(mapState, mapDispatch)(GIDBFTeamHeader);

GIDBFTeamHeader.propTypes = {
  updateTeamPlanLens: PropTypes.func,
  updateProjectPlanLens: PropTypes.func,
  updateGoalPlanLens: PropTypes.func,
  columnMode: PropTypes.string,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  lensType: PropTypes.string,
  isHome: PropTypes.bool,
  topicTitle: PropTypes.string,
  currentDomain: PropTypes.object,
  showWorkspaceLogo: PropTypes.bool
};
