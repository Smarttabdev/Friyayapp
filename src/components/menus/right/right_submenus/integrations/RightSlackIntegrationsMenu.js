import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { success } from 'Utils/toast';
import { stateMappings } from 'Src/newRedux/stateMappings';
import IntegrationHeaderDropdown from 'Src/components/menus/right/right_submenus/elements/integrationHeaderDropDown';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import {
  setSelectedWorkspace,
  setSlackPanelView
} from 'Src/newRedux/integrationFiles/slack/actions';
import { getRedirectUriForSlack } from 'Lib/utilities';
import {
  slackCheck,
  disconnectSlack,
  getSlackDomainData,
  createNewSlackConnection,
  updateSlackConnection,
  deleteSlackConnection
} from 'Src/newRedux/integrationFiles/slack/thunks';
import Dropdown from 'Components/shared/Dropdown';

class RightSlackIntegrationsMenu extends Component {
  static propTypes = {
    slack: PropTypes.object,
    setRightMenuOpenForMenu: PropTypes.func,
    slackCheck: PropTypes.func,
    disconnectSlack: PropTypes.func,
    createNewSlackConnection: PropTypes.func,
    getSlackDomainData: PropTypes.func,
    updateSlackConnection: PropTypes.func,
    deleteSlackConnection: PropTypes.func,
    setSelectedWorkspace: PropTypes.func.isRequired,
    setSlackPanelView: PropTypes.func.isRequired
  };

  state = {
    addingNewConnection: false,
    newConnection: {},
    slackConnections: [],
    topics: [],
    triggerClose: false
  };

  componentDidMount() {
    const { selectedWorkspace } = this.props.slack;
    if (Cookies.get(`${window.currentDomainName}-slackAccessToken`)) {
      selectedWorkspace !== 'select' &&
        this.getWorkspaceData(selectedWorkspace);
    }
    this.props.getSlackDomainData(selectedWorkspace);
  }

  handleCloseClick = (type, e) => {
    const newState = { ...this.state };
    if (type === 'reset-workspace') {
      this.props.setSelectedWorkspace('select');
    } else {
      const id = e.target.id.split('-')[2];
      if (type === 'connection' && id === 'new') {
        newState.addingNewConnection = false;
        newState.newConnection = {};
      } else {
        const deleteConnection = newState.slackConnections.find(
          c => `${c.id}` === id
        );
        this.props.deleteSlackConnection(deleteConnection);
        newState.slackConnections = newState.slackConnections.filter(
          c => `${c.id}` !== id
        );
      }
    }
    this.setState(() => newState);
  };

  handleCreateNewConnection = async (type, typeValue) => {
    const newState = { ...this.state };
    newState.newConnection[type] = typeValue;
    if (
      newState.newConnection.topic_id &&
      newState.newConnection.slack_channel_id
    ) {
      const { topic_connection } = await this.props.createNewSlackConnection({
        teamId: this.props.slack.selectedWorkspace,
        ...newState.newConnection
      });
      newState.slackConnections.push(topic_connection);
      newState.addingNewConnection = false;
      newState.newConnection = {};
    }
    this.setState(() => newState);
  };

  handleDropDownChange = (type, e) => {
    const id = e.target.id.split('-');

    if (this.state.addingNewConnection && id[1] === 'new') {
      return this.handleCreateNewConnection(type, id[3]);
    } else {
      const newState = { ...this.state };
      let connection = newState.slackConnections.find(c => c.id == id[1]);
      connection[type] = id[3];
      const isConnectionPresent = newState.slackConnections.find(
        sc =>
          (sc.slack_channel_id == connection.slack_channel_id &&
            sc.topic_id == connection.topic_id) ||
          (sc.topic_id == 'All Topics' &&
            sc.slack_channel_id == connection.slack_channel_id)
      );
      if (isConnectionPresent && isConnectionPresent.id != id[1]) {
        e.target.selectedIndex = 0;
        return success('Already connected!');
      }
      this.props.updateSlackConnection(connection);
      this.setState(() => newState);
    }
  };

  handleInviteAllUserClick = e => {
    e.persist();
    this.setState({ inviteAllUsers: e.target.checked });
  };

  connectToSlack = () => {
    const scope =
      'incoming-webhook,commands,channels:history,channels:read,users:read,users:read.email';
    const { inviteAllUsers } = this.state;
    const { SLACK_APP_AUTHORIZATION_URI, SLACK_APP_KEY } = window;
    const state = btoa(
      JSON.stringify({
        type: 'integration',
        tenant: window.currentDomainName,
        inviteAllUsers
      })
    );
    const slackUrl = `${SLACK_APP_AUTHORIZATION_URI}?client_id=${SLACK_APP_KEY}&scope=${scope}&state=${state}&redirect_uri=${getRedirectUriForSlack()}`;

    return (
      <div className="connect-to-slack">
        <a href={slackUrl}>
          <img
            alt="Add to Slack"
            height="40"
            width="139"
            src="https://platform.slack-edge.com/img/add_to_slack.png"
            srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
          />
        </a>
        <h4>
          <input
            value={inviteAllUsers}
            onChange={this.handleInviteAllUserClick}
            type="checkbox"
          />
          Invite All Users
        </h4>
      </div>
    );
  };

  handleWorkspaceSelection = e => {
    e.persist();
    this.getWorkspaceData(e.target.id.split('-')[1]);
  };

  getWorkspaceData = async selectedWorkspace => {
    const {
      slack_connections: slackConnections
    } = await this.props.getSlackDomainData(selectedWorkspace);
    this.setState({ slackConnections: [...slackConnections] });
    selectedWorkspace != this.props.slack.selectedWorkspace &&
      this.props.setSelectedWorkspace(selectedWorkspace);
  };

  getFilteredOptionsForNewConnection = (id, topic_id, slack_channel_id) => {
    let {
      workspace: { channels, topics }
    } = this.props.slack;
    const { slackConnections = [] } = this.state;
    const previousConnections =
      slackConnections.filter(
        cn => cn.topic_id == topic_id || cn.slack_channel_id == slack_channel_id
      ) || {};
    if (topic_id !== 'select') {
      const allTopicChannels = slackConnections
        .filter(i => i.topic_id == 'All Topics')
        .map(i => `${i.slack_channel_id}`);
      channels = channels.filter(
        ch =>
          !previousConnections.find(pc => ch.id == pc.slack_channel_id) &&
          !allTopicChannels.includes(`${ch.id}`) &&
          !(
            topic_id == 'All Topics' &&
            slackConnections.find(sc => ch.id == sc.slack_channel_id)
          )
      );
    }
    if (slack_channel_id !== 'select') {
      topics = topics.filter(
        tp =>
          !previousConnections.find(
            pc => tp.id == pc.topic_id || pc.topic_id == 'All Topics'
          )
      );
    }

    return [channels, topics];
  };

  UNSAFE_componentWillReceiveProps = props => {
    const {
      workspace: { topics = [] }
    } = props.slack;
    topics.forEach(item => (item.expanded = false));
    this.setState({ topics });
  };

  toggleTopicDropdown = () =>
    this.setState(state => ({ triggerClose: !state.triggerClose }));

  getConnectionsItem = ({
    item: { id = 'new', topic_id = 'select', slack_channel_id = 'select' }
  }) => {
    let {
      workspace: { channels, topics }
    } = this.props.slack;
    if (
      id === 'new' &&
      (topic_id !== 'select' || slack_channel_id !== 'select') &&
      this.state.slackConnections.length !== 0
    ) {
      [channels, topics] = this.getFilteredOptionsForNewConnection(
        id,
        topic_id,
        slack_channel_id
      );
    }

    const connectionTopic =
      topic_id === 'All Topics'
        ? { title: topic_id }
        : topics.find(t => t.id == topic_id);
    const connectionChannel = channels.find(c => c.id == slack_channel_id);

    if (
      (topic_id != 'select' && !connectionTopic) ||
      (slack_channel_id != 'select' && !connectionChannel)
    )
      return null;

    const { triggerClose } = this.state;

    return (
      <div className="connections-item">
        <i
          id={`connections-close-${id}`}
          onClick={e => this.handleCloseClick('connection', e)}
          className="fa fa-times workspace-delete-connection"
        />
        <div className="connections-item-topic">
          <span className="text-muted">From Board:</span>
          <div className="slack conection-topic-dropdown">
            <Dropdown
              triggerClose={triggerClose}
              closeOnClick={false}
              trigger={
                <a
                  className="dropdown-toggle grey-link yellow-hover"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span>
                    {topic_id !== 'select'
                      ? connectionTopic.title
                      : 'Select Board'}
                  </span>
                  <span className="caret" />
                </a>
              }
              menuStyle={{ width: '250px', left: '-75px' }}
            >
              {topics.length > 0 &&
                !this.state.slackConnections.find(
                  sc => sc.slack_channel_id == slack_channel_id
                ) && (
                  <li>
                    <a
                      id={`connection-${id}-topic-All Topics`}
                      onClick={e => this.handleDropDownChange('topic_id', e)}
                    >
                      All Boards
                    </a>
                  </li>
                )}
              <ul>{this.renderNestedView(null, id)}</ul>
            </Dropdown>
          </div>
        </div>

        <div className="connections-item-channel">
          <span className="text-muted">To Channel:</span>
          <ul className="slack conection-channel-dropdown">
            <li className="dropdown dropdown-list-header">
              <a
                className="dropdown-toggle grey-link yellow-hover"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>
                  {slack_channel_id !== 'select'
                    ? connectionChannel.name
                    : 'Select Channel'}
                </span>
                <span className="caret" />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-list"
                id="domain-dropdown"
              >
                {channels.map(c => (
                  <li key={`ws-${c.id}`}>
                    <a
                      id={`connection-${id}-channel-${c.id}`}
                      onClick={e =>
                        this.handleDropDownChange('slack_channel_id', e)
                      }
                    >
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  renderNestedView = (id, connectionId) => {
    const { topics } = this.state;
    const filteredTopics = topics
      .filter(item => {
        if (!id) return !item.ancestry;
        if (!item.ancestry) return false;
        const ancestry = item.ancestry.split('/');
        const ancestryId = parseInt(ancestry[ancestry.length - 1]);
        return ancestryId == id;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
    const toggleExpand = t => {
      const newTopics = topics.map(item =>
        t.id == item.id ? { ...item, expanded: !item.expanded } : item
      );
      this.setState({ topics: newTopics });
    };
    const isLast = t =>
      topics.some(
        item => item.ancestry && item.ancestry.includes(t.id.toString())
      );
    return filteredTopics.map(t => (
      <li key={`ws-${t.id}`}>
        {isLast(t) && (
          <a onClick={() => toggleExpand(t)} style={{ padding: '5px' }}>
            <span
              className={`fa fa-${t.expanded ? 'caret-down' : 'caret-right'}`}
              style={{ marginLeft: '0px' }}
            ></span>
          </a>
        )}
        <a
          id={`connection-${connectionId}-topic-${t.id}`}
          onClick={e => {
            this.handleDropDownChange('topic_id', e);
            this.toggleTopicDropdown();
          }}
        >
          {t.title}
        </a>
        {t.expanded && (
          <ul style={{ listStyle: 'none', padding: '5px 0px 0px 15px' }}>
            {this.renderNestedView(t.id, connectionId)}
          </ul>
        )}
      </li>
    ));
  };

  getWorkspaceDropdown = dropdownList => {
    const { selectedWorkspace } = this.props.slack;
    return (
      <ul className="slack workspace-list-dropdown">
        <li className="dropdown dropdown-list-header">
          <a
            className="dropdown-toggle grey-link yellow-hover selected-workspace-header"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span>
              {selectedWorkspace === 'select' ||
              selectedWorkspace === 'loading' ||
              dropdownList.length === 0
                ? 'Select Workspace'
                : dropdownList.find(ws => ws.id == selectedWorkspace).team_name}
            </span>
            <i
              id="reset-workspace"
              onClick={() => this.handleCloseClick('reset-workspace')}
              className="fa fa-times"
            />
            <span className="caret" />
          </a>
          <ul
            className="dropdown-menu workspace-list dropdown-menu-list"
            id="workspace-list-dropdown"
          >
            {dropdownList.length === 0 && <li id="loading">Loading</li>}
            {dropdownList.map(ws => (
              <li key={`ws-${ws.id}`}>
                <a onClick={this.handleWorkspaceSelection} id={`ws-${ws.id}`}>
                  {ws.team_name}
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    );
  };

  render() {
    const { addingNewConnection, newConnection, slackConnections } = this.state;
    const {
      workspace: { slack_workspace = [] },
      selectedWorkspace,
      currentView
    } = this.props.slack;
    const slackAccessToken = Cookies.get(
      `${window.currentDomainName}-slackAccessToken`
    );
    const providerIcon = !slackAccessToken ? (
      <i className="mr10 fa fa-slack" style={{ cursor: 'pointer' }} />
    ) : (
      <img
        src="/images/Slack_Mark_Web.png"
        alt="slack-mark"
        width="40px"
        height="40px"
      />
    );

    const ConnectionsItem = this.getConnectionsItem;

    return (
      <div className="right-submenu">
        <h3 className="right-submenu_header mr-1">
          {providerIcon}
          <span style={{ cursor: 'pointer' }} onClick={this.handleFolderChange}>
            Slack
          </span>
          <small className="full-width">
            <IntegrationHeaderDropdown
              className="text-muted pull-right"
              workspaceId={this.props.slack.selectedWorkspace}
              handleClickDisconnect={this.props.disconnectSlack}
              setSlackPanelView={this.props.setSlackPanelView}
              currentView={currentView}
              slack_workspace={slack_workspace}
              isSlack
            />
          </small>
        </h3>

        <div className="rab-content-body">
          <div className="rab-items-listing" onScroll={this.handleFilesScroll}>
            <div className="rab-items-container text-muted">
              {currentView === 'loading' && 'Loading . . .'}
              {currentView === 'connect' && this.connectToSlack()}
              {currentView === 'workspaces' && (
                <div className="workspaces-body">
                  <div className="workspaces-list-dropdown">
                    <span className="workspaces-label text-muted">
                      Workspace connection:
                    </span>
                    {this.getWorkspaceDropdown([...slack_workspace])}
                  </div>
                  {selectedWorkspace !== 'select' && (
                    <Fragment>
                      <div className="channel-connections">
                        <div className="workspace-connections-header">
                          <span className="connections-header text-muted">
                            Board connections:
                          </span>
                          <small className="full-width">
                            Post Activity from Boards to Slack Channels
                          </small>
                        </div>
                        {slackConnections.map((item, index) => (
                          <ConnectionsItem key={`${index}-item`} item={item} />
                        ))}
                        {addingNewConnection && (
                          <ConnectionsItem
                            key="add-new-connections"
                            item={newConnection}
                            addingNew
                          />
                        )}
                      </div>
                      <span
                        onClick={() =>
                          this.setState({ addingNewConnection: true })
                        }
                        className="workspace-add-connection text-muted"
                      >
                        + Add Board connection
                      </span>
                    </Fragment>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  return {
    slack: sm.integrationFiles.slack
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu,
  setSelectedWorkspace,
  slackCheck,
  disconnectSlack,
  getSlackDomainData,
  createNewSlackConnection,
  updateSlackConnection,
  deleteSlackConnection,
  setSlackPanelView
};

export default connect(mapState, mapDispatch)(RightSlackIntegrationsMenu);
