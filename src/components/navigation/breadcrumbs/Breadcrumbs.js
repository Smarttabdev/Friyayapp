import React, { Component, Fragment } from 'react';
import get from 'lodash/get';
import cn from 'classnames';
import { any, object, string } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';

import BreadcrumbDropdown from './breadcrumb_dropdown';
import WorkspaceDropdown from './workspace_dropdown';
import ErrorBoundary from 'Components/shared/errors/ErrorBoundary';
import TopicPathContainer from 'Components/shared/topics/elements/TopicPathContainer';
import MainFormPage from 'Components/pages/MainFormPage';
import { getThisDomain, isSharedWithTeam } from 'Lib/utilities';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { getSortedFilteredTopicsForTopic } from 'Src/newRedux/database/topics/selectors';
import { getGroups } from 'Src/newRedux/database/groups/selectors';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  instanceOfGetSortedTopicsForTopic,
  getRootTopic
} from 'Src/newRedux/database/topics/selectors';
import { VIEWS_REGEX } from 'Src/helpers/url_helper';
import Icon from 'Components/shared/Icon';
import DomainLogo from 'Src/components/shared/DomainLogo';
import Tooltip from 'Components/shared/Tooltip';
import store from 'Src/store/store';

const homeUrl =
  window.APP_ENV === 'development'
    ? `//${window.APP_DOMAIN}:${window.APP_PORT}`
    : `//${window.APP_DOMAIN}`;

class Breadcrumbs extends Component {
  static propTypes = {
    currentTopic: object,
    domains: any,
    rootUrl: string,
    subtopics: any,
    workspaceFontColor: string
  };

  state = {
    isGroupFormOpen: false
  };

  tourPoint = null;

  handleCreateGroupClick = e => {
    e.preventDefault();
    this.setState(state => ({ ...state, isGroupFormOpen: true }));
  };

  closeMainForm = () => {
    this.setState(state => ({ ...state, isGroupFormOpen: false }));
  };

  render() {
    const { isGroupFormOpen } = this.state;
    const {
      rootTopic,
      currentTopic,
      domains,
      rootUrl,
      subtopics,
      topics,
      topicId,
      teams,
      groupId,
      pathname,
      routerHistory,
      workspaceFontColor,
      isBoardsPage
    } = this.props;
    const baseUrl = rootUrl === '/' ? rootUrl : rootUrl + '/';
    const team = teams.find(team => team.id === groupId) || {};
    const {
      attributes: { name: domainName }
    } = getThisDomain(domains);
    const currentDomain = getThisDomain(domains);
    const domainStyle = {
      display: 'flex',
      alignItems: 'center',
      height: 28,
      borderBottom:
        pathname === '/'
          ? `solid 1px ${currentDomain.attributes.color || '#c256a3'}`
          : 'solid 1px transparent'
    };

    if (
      groupId &&
      topicId &&
      topicId != rootTopic.id &&
      currentTopic &&
      !isSharedWithTeam(currentTopic, groupId)
    ) {
      routerHistory.push(pathname.replace(VIEWS_REGEX, 'boards'));
    }

    return (
      <ErrorBoundary>
        <div className="breadcrumbs">
          <div className="breadcrumb-container">
            <ol
              className="breadcrumb mb0 p0"
              style={{ float: 'left', display: 'flex', alignItems: 'center' }}
              id="tour-step-9"
              ref={list => (this.tourPoint = list)}
            >
              <li
                className="dropdown"
                key={'topic-breadcrumb-home'}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div className="mr4 ml6 flex-r-center dropdown-container">
                  {isBoardsPage && (
                    <Fragment>
                      <a href={homeUrl} className="mr7">
                        <div
                          data-tip={'Friyay Home'}
                          data-for={`home-icon`}
                          className="flex"
                        >
                          <Icon
                            icon="home"
                            outlined
                            color={workspaceFontColor || '#E3BC47'}
                            containerClasses="mb5 top-bar-home-icon"
                          />
                          <Tooltip {...{ place: 'bottom' }} id={`home-icon`} />
                        </div>
                      </a>
                      <Icon
                        color={workspaceFontColor}
                        icon="chevron_right"
                        fontSize={16}
                      />
                    </Fragment>
                  )}
                  <Link
                    to={baseUrl}
                    className={cn(isBoardsPage && 'ml14', 'disable-text-hover')}
                    style={domainStyle}
                  >
                    <div
                      data-tip={`Boards in ${domainName}`}
                      data-for={`workspace-${domainName}`}
                      className="flex"
                    >
                      <DomainLogo
                        domain={currentDomain}
                        preferredColor={workspaceFontColor}
                        rounded
                        componentClass="domain-logo"
                      />
                      <Tooltip
                        {...{ place: 'bottom' }}
                        id={`workspace-${domainName}`}
                      />
                    </div>
                  </Link>
                  <div style={{ paddingLeft: '5px' }}>
                    <WorkspaceDropdown domains={domains} />
                  </div>
                  {!isBoardsPage && (
                    <Icon
                      color={workspaceFontColor}
                      icon="chevron_right"
                      fontSize={16}
                    />
                  )}
                </div>
              </li>

              {/* {team && (
                <li className="dropdown">
                  <Link
                    to={
                      `${baseUrl}` +
                      (team.id
                        ? `groups/${get(team, 'attributes.slug')}`
                        : `boards`)
                    }
                    className="mr5"
                  >
                    <span className="ml2">
                      {get(team, 'attributes.title', 'Everyone')}
                    </span>
                  </Link>
                  <BreadcrumbDropdown
                    topics={teams}
                    type={'team'}
                    action={this.handleCreateGroupClick}
                  />
                </li>
              )} */}
              {!isBoardsPage && (
                <Fragment>
                  <li
                    className="dropdown mega-dropdown separator-none dropdown-container"
                    key={'topic-breadcrumb-topics'}
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {/* <Link
                  to={`${baseUrl}boards`}
                  className={cn(
                    'mr5',
                    'pb1',
                    pathname === '/boards' &&
                      'breadcrumbs-board-active board-border-color'
                  )}
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <div
                    data-tip={'Boards'}
                    data-for={`boards-icon`}
                    className="flex"
                  >
                    <Icon
                      fontAwesome
                      style={{ fontSize: 17 }}
                      icon="hashtag"
                      color={workspaceFontColor || '#9b51e0'}
                    />
                    <Tooltip {...{ place: 'bottom' }} id={`boards-icon`} />
                  </div>
                </Link>
                <Icon
                  color={workspaceFontColor}
                  icon="chevron_right"
                  fontSize={16}
                /> */}

                    <Link
                      to={`${baseUrl}boards/${rootTopic?.attributes?.slug}`}
                      className={cn(
                        'mr5',
                        'pb1',
                        pathname === `/boards/${rootTopic?.attributes?.slug}` &&
                          'breadcrumbs-board-active board-border-color'
                      )}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline'
                      }}
                    >
                      {rootTopic?.attributes?.title}
                    </Link>
                    <BreadcrumbDropdown
                      parentTopicId={undefined}
                      topics={subtopics}
                      type={'board'}
                      isRoot
                    />
                  </li>
                  {currentTopic && (
                    <TopicPathContainer
                      topic={currentTopic}
                      renderAncestor={(topic, index) => {
                        return (
                          <li
                            className="dropdown custom-separator"
                            key={get(topic, 'id')}
                          >
                            <Link
                              to={`${baseUrl}boards/${get(
                                topic,
                                'attributes.slug'
                              )}`}
                              className={`mr5 ${
                                index + 1 ===
                                get(currentTopic, 'attributes.path', [])
                                  .length -
                                  1
                                  ? 'breadcrumbs-board-active board-border-color'
                                  : `${index}-${currentTopic.length}`
                              }`}
                            >
                              <span className="ml2">
                                {get(topic, 'attributes.title')}
                              </span>
                            </Link>
                            <BreadcrumbDropdown
                              parentTopicId={get(topic, 'id')}
                              topics={subtopics}
                              type={'board'}
                            />
                          </li>
                        );
                      }}
                    />
                  )}
                </Fragment>
              )}
            </ol>
          </div>
        </div>
        {isGroupFormOpen && (
          <MainFormPage selectedTab="group-pane" onClose={this.closeMainForm} />
        )}
      </ErrorBoundary>
    );
  }
}

const breadCrumbPathMap = createSelector(
  state =>
    stateMappings(state).topics[stateMappings(state).page.topicId]?.attributes
      ?.path,
  topicPath => {
    return (topicPath || []).map((pathElement, index) => {
      const parentTopicId = get(topicPath, `[${index - 1}].id`);
      return {
        id: get(pathElement, 'id'),
        parentTopicId: parentTopicId,
        slug: pathElement.slug,
        title: pathElement.title,
        topics: getSortedFilteredTopicsForTopic(store.getState(), parentTopicId)
      };
    });
  }
);

const mapState = state => {
  const sm = stateMappings(state);
  const {
    page: { groupId, rootUrl, topicId, parentTopicId },
    routing: {
      routerHistory: {
        location: { pathname }
      }
    }
  } = sm;
  const topicSelector = instanceOfGetSortedTopicsForTopic();
  let topics = topicSelector(state);
  topics = groupId
    ? topics.filter(topic => isSharedWithTeam(topic, groupId))
    : topics;

  const rootTopic = getRootTopic(state);
  const currentTopic = sm.topics[parentTopicId || topicId];

  return {
    breadCrumbPathMap: breadCrumbPathMap(state),
    rootTopic,
    currentTopic,
    topicId,
    routerHistory: sm.routing.routerHistory,
    domains: getDomains(state),
    teams: getGroups(state),
    page: sm.page.page,
    groupId,
    rootUrl,
    pathname
  };
};

export default connect(mapState)(Breadcrumbs);
