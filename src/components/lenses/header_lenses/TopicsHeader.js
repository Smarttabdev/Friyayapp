import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { setDomainFilterSettings } from 'Src/newRedux/database/domains/thunks';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { getThisDomain } from 'Lib/utilities';
import DomainLogo from 'Src/components/shared/DomainLogo';
import { setUserInvitationModalOpen } from 'Src/newRedux/interface/modals/actions';
import IconButton from 'src/components/shared/buttons/IconButton';
import WorkspaceActionsDropdown from 'Src/components/shared/WorkspaceActionsDropdown';
import Ability from 'Src/lib/ability';
// import { topicFilters } from 'Lib/config/filters/topics';
// const topicFilterOptions = Object.values(topicFilters);

class TopicsHeader extends Component {
  constructor(props) {
    super(props);
  }

  setTopicFilter = key => {
    const { setUserFilterSettings } = this.props;
    const payload = { topic_filter: [key] };
    setUserFilterSettings(payload);
  };

  renderShareIcon = () => {
    const { userId, setUserInvitationModalOpen } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
        className="mlauto"
      >
        <IconButton
          button
          fontSize={20}
          additionalClasses="mr10"
          outlined
          color={'#9B51E0'}
          icon="person_add"
          tooltip="Invite Members"
          onClick={() => setUserInvitationModalOpen(userId)}
          tooltipOptions={{ place: 'bottom' }}
        />
        <Link
          to="/users"
          style={{
            display: 'flex',
            marginLeft: '3px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: '#9B51E0',
            borderRadius: '20px',
            width: '120px',
            padding: '7px  10px'
          }}
          onClick={() => {}}
        >
          <i
            style={{
              color: '#fff',
              fontSize: '20px',
              fontWeight: 600
            }}
            className="tiphive-icon material-icons-outlined"
          >
            group
          </i>
          <span
            style={{
              color: '#fff',
              fontWeight: 400,
              fontSize: '12px',
              marginLeft: '5px'
            }}
          >
            Members
          </span>
        </Link>
      </div>
    );
  };

  render() {
    const { active_design, currentDomain } = this.props;
    return (
      <div className="topics-header">
        <div
          style={{
            pointerEvents:
              Ability.can('update', 'self', currentDomain) &&
              currentDomain.id !== '0'
                ? 'unset'
                : 'none'
          }}
          className="dropdown"
        >
          <a
            className="flex-r-center dropdown"
            id="topicDropdopwCaret"
            data-toggle="dropdown"
          >
            <DomainLogo
              domain={currentDomain}
              preferredColor={active_design?.workspace_font_color}
              rounded
              componentClass="domain-logo domain-logo-workspace-header ml10 mr10"
            />
            <h3 className="topics-header_title">
              {currentDomain.attributes.name}
            </h3>
            <Icon
              style={{
                display: 'none'
              }}
              additionalClasses="large topics-header_title mt5"
              fontAwesome
              icon="caret-down"
            />
          </a>
          <ul className="dropdown-menu" aria-labelledby="dLabel">
            <WorkspaceActionsDropdown />
          </ul>
        </div>
        {this.renderShareIcon()}
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const filter_setting = getFilterSettings(state);
  const active_design = sm.utilities?.active_design || {};
  const topicPanelView = sm.user.attributes.ui_settings.all_topics_view;

  return {
    selectedTopicFilters: filter_setting.topic_filter,
    topicPanelView: topicPanelView,
    active_design,
    currentDomain: getThisDomain(getDomains(state)),
    userId: sm?.user?.id
  };
};

const mapDispatch = {
  setDomainFilterSettings,
  setUserFilterSettings,
  setUserInvitationModalOpen
};

export default connect(mapState, mapDispatch)(TopicsHeader);
