import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, string, object } from 'prop-types';
import get from 'lodash/get';

import { stateMappings } from 'Src/newRedux/stateMappings';
import LeftMenuPanel from '../elements/LeftMenuPanel';
import LeftMenuTopicSection from '../elements/LeftMenuTopicSection';
import LeftMenuTemplateSegment from './LeftMenuTemplateSegment';
import {
  createTopic,
  updateTopic,
  toggleStarTopic
} from 'Src/newRedux/database/topics/thunks';
import {
  starredViewsSelector,
  templateViewsSelector,
  followingViewsSelector,
  privateViewsSelector,
  workspaceViewsSelector,
  personalTemplatesSelector,
  workspaceTemplatesSelector
} from 'Src/newRedux/database/topics/selectors';
import { isPrivateView } from 'Lib/utilities';

class LeftMenuTopicSegment extends Component {
  static propTypes = {
    currentPath: string.isRequired,
    rootUrl: string.isRequired,
    staredViews: array.isRequired,
    followingViews: array.isRequired,
    workspaceViews: array.isRequired,
    privateViews: array.isRequired,
    user: object.isRequired,
    personalTemplates: array,
    workspaceTemplates: array
  };

  constructor(props) {
    super(props);
    this.state = {
      collapseStarred: false,
      collapseFollowing: false,
      collapseWorkspace: false,
      collapsePrivate: false
    };
  }

  toggleCollapse = type => {
    this.setState({ [type]: !this.state[type] });
  };

  createHandleCreateView = ({
    isStarred,
    isPrivate,
    isFollowing
  } = {}) => async ({ title, setLoading, closeDropdown }) => {
    const {
      createTopic,
      updateTopic,
      toggleStarTopic,
      user,
      currentGroup
    } = this.props;
    const newTopic = {
      attributes: {
        title,
        parent_id: null
      }
    };
    setLoading(true);
    const {
      data: { data: serverTopic }
    } = await createTopic(newTopic);
    const shareWith = [];
    isPrivate = !!(isPrivate && !isPrivateView(serverTopic, user));
    isFollowing = !!(isFollowing && currentGroup);

    if (isStarred && !get(serverTopic, 'attributes.starred_by_current_user')) {
      await toggleStarTopic(serverTopic.id);
    }
    if (isPrivate) {
      shareWith.push({
        sharing_object_id: user.id,
        sharing_object_type: 'users'
      });
    }
    if (isFollowing) {
      shareWith.push({ id: currentGroup.id, type: 'groups' });
    }
    (isPrivate || isFollowing) &&
      (await updateTopic({
        id: serverTopic.id,
        relationships: {
          share_settings: {
            data: shareWith
          }
        }
      }));

    setLoading(false);
    closeDropdown();
  };

  render() {
    const {
      rootUrl,
      personalTemplates,
      workspaceTemplates,
      templateViews
    } = this.props;
    const {
      collapseStarred,
      collapseFollowing,
      collapseWorkspace,
      collapsePrivate
    } = this.state;
    const baseUrl = rootUrl == '/' ? '' : rootUrl;

    return (
      <div className="left-menu_content-row flexi">
        {this.props.staredViews && this.props.staredViews.length > 0 && (
          <LeftMenuPanel
            title="Starred Boards"
            createTitle="Create Starred Board"
            expand={!collapseStarred}
            onClick={() => this.toggleCollapse('collapseStarred')}
            onCreate={this.createHandleCreateView({ isStarred: true })}
          >
            <LeftMenuTopicSection
              baseUrl={baseUrl}
              level={0}
              groupTopics={this.props.staredViews}
              topicId="0"
              onDismiss={this.handleToggleNewTopicInput}
            />
          </LeftMenuPanel>
        )}
        {this.props.workspaceViews && this.props.workspaceViews.length > 0 && (
          <LeftMenuPanel
            title="All Boards"
            createTitle="Create Board"
            expand={!collapseWorkspace}
            onClick={() => this.toggleCollapse('collapseWorkspace')}
            onCreate={this.createHandleCreateView()}
          >
            <LeftMenuTopicSection
              baseUrl={baseUrl}
              level={0}
              groupTopics={this.props.workspaceViews}
              topicId="0"
              onDismiss={this.handleToggleNewTopicInput}
            />
          </LeftMenuPanel>
        )}
        {this.props.privateViews && this.props.privateViews.length > 0 && (
          <LeftMenuPanel
            title="Private Boards"
            createTitle="Create Private Board"
            expand={!collapsePrivate}
            onClick={() => this.toggleCollapse('collapsePrivate')}
            onCreate={this.createHandleCreateView({ isPrivate: true })}
          >
            <LeftMenuTopicSection
              baseUrl={baseUrl}
              level={0}
              groupTopics={this.props.privateViews}
              topicId="0"
              onDismiss={this.handleToggleNewTopicInput}
            />
          </LeftMenuPanel>
        )}
        <LeftMenuTemplateSegment
          createHandleCreateView={this.createHandleCreateView}
          personalTemplates={personalTemplates}
          workspaceTemplates={workspaceTemplates}
          baseUrl={baseUrl}
          templateViews={templateViews}
          handleToggleNewTopicInput={this.handleToggleNewTopicInput}
        />
        {}
        {/* {this.props.followingViews && this.props.followingViews.length > 0 && (
          <LeftMenuPanel
            title="Following Boards"
            createTitle="Create Followed Board"
            expand={!collapseFollowing}
            onClick={() => this.toggleCollapse('collapseFollowing')}
            onCreate={this.createHandleCreateView({ isFollowing: true })}
          >
            <LeftMenuTopicSection
              baseUrl={baseUrl}
              level={0}
              groupTopics={this.props.followingViews}
              topicId="0"
              onDismiss={this.handleToggleNewTopicInput}
            />
          </LeftMenuPanel>
        )} */}
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    routing,
    page,
    user,
    utilities: { active_design }
  } = sm;
  const staredViews = starredViewsSelector(state);
  const templateViews = templateViewsSelector(state);
  const followingViews = followingViewsSelector(state, page.groupId);
  const privateViews = privateViewsSelector(state, page.groupId);
  const workspaceViews = workspaceViewsSelector(state, page.groupId);
  const personalTemplates = personalTemplatesSelector(state, page.groupId);
  const workspaceTemplates = workspaceTemplatesSelector(state, page.groupId);
  const currentGroup = sm.groups[page.groupId];
  return {
    active_design,
    currentPath: routing.routerHistory.location.pathname,
    rootUrl: page.rootUrl,
    staredViews,
    followingViews,
    workspaceViews,
    privateViews,
    user,
    currentGroup,
    personalTemplates,
    workspaceTemplates,
    templateViews
  };
};

const mapDispatch = {
  createTopic,
  updateTopic,
  toggleStarTopic
};

export default connect(mapState, mapDispatch)(LeftMenuTopicSegment);
