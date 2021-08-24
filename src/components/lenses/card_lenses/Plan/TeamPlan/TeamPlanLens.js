import React, { Component } from 'react';
import cn from 'classnames';
import UserBox from './UserBox';
import IconButton from 'Components/shared/buttons/IconButton';
import SelectableUserList from 'Src/components/shared/users/elements/SelectableUserList';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateTeamPlanUsers } from 'Src/newRedux/database/GIDBFLenses/actions';
import AlphaFilter from 'Src/components/shared/AlphaFilter';
import { get } from 'lodash';
import DMLoader from 'Src/dataManager/components/DMLoader';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { updateProjectPlanTopics } from 'src/newRedux/database/GIDBFLenses/actions';
import { setUserUiSettings, getCustomLensId } from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';

class TeamPlanLens extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.dropdownRef2 = React.createRef();
    this.state = {};
  }

  removeSelectedTopic = topic => {
    const { updateProjectPlanTopics, topics } = this.props;
    const newTopics = topics.filter(opt => opt.value != topic.value);
    updateProjectPlanTopics({ topics: newTopics });
    this.saveSelectedTopicIds(newTopics.map(topic => topic.value));
  };

  toggleDropdown = type => {
    type == 'users' &&
      this.setState(prev => ({
        userDropdown: !prev.userDropdown
      }));
    type == 'topics' &&
      this.setState(prev => ({
        topicDropdown: !prev.topicDropdown,
        hideTopicSelector: false
      }));
  };

  updatePeopleOrder = order => {
    const { activePeopleOrderQuery, topicId, lenseId, lenseKey } = this.props;
    mutations.createOrUpdateCustomOrder({
      customOrder: activePeopleOrderQuery?.activePeopleOrder,
      orderTitle: 'People',
      orderType: 'people',
      topicId,
      lenseId,
      lenseKey,
      order
    });
  };

  handleSelectUser = userId => {
    const { selectedUserIds } = this.props;
    // updateTeamPlanUsers({ userId: userId[0] });
    const revisedPeopleOrderPeopleIds = selectedUserIds.filter(
      id => id != userId[0]
    );
    revisedPeopleOrderPeopleIds.push(userId[0]);
    this.updatePeopleOrder(revisedPeopleOrderPeopleIds);
    // this.setState({ userDropdown: false });
  };

  handleApplyFilter = filterLetter => {
    const { users, topics, projectPlan } = this.props;
    if (!projectPlan) {
      const filteredUsers = users.filter(
        user =>
          user.attributes.first_name.charAt(0).toUpperCase() == filterLetter
      );
      this.setState({ filterLetter, filteredUsers });
    }
    // else {
    //   const filteredTopics = this.state.selectedTopics.filter(
    //     topic => topic.attributes.title.charAt(0).toUpperCase() == filterLetter
    //   );
    //   this.setState({ filterLetter, filteredTopics });
    // }
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (event.defaultPrevented) return;
      if (!element || !document.contains(element)) {
        removeClickListener();
        return;
      }
      if (
        event.path.findIndex(path => path.className == 'team_plan-add_user') <
          0 ||
        // !element.contains(event.target) ||
        this.isVisible(element)
      ) {
        this.setState({ userDropdown: false, topicDropdown: false });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  componentDidUpdate() {
    const { userDropdown, topicDropdown } = this.state;
    if (userDropdown || topicDropdown) {
      const dropdown = userDropdown
        ? this.dropdownRef.current
        : this.dropdownRef2.current;
      this.hideDropdownOnClickOut(dropdown);
    }
  }

  onInputBlur = () => {
    setTimeout(() => {
      if (this.props.topics.length === 0) {
        this.setState({ showTopicDropdown: false });
      }
    });
  };

  onInputFocus = () => {
    setTimeout(() => {
      this.setState({
        hideTopicSelector: false
      });
    });
  };

  handleTopicSelected = list => {
    const { topics, updateProjectPlanTopics } = this.props;
    const newTopics = [...topics, list[list.length - 1]];
    updateProjectPlanTopics({ topics: newTopics });
    this.saveSelectedTopicIds(newTopics.map(opt => opt.value));
  };

  saveSelectedTopicIds = ids => {
    const { topicId, lenseId, lenseKey, query } = this.props;
    mutations.createOrUpdateCustomOrder({
      customOrder: query?.activeCustomOrder,
      orderTitle: 'Project Plan',
      orderType: 'topics',
      topicId,
      lenseId,
      lenseKey,
      order: ids
    });
  };

  getCardRequirements = item => {
    const { cardRequirements = {}, projectPlan } = this.props;
    return {
      ...get(cardRequirements, {}),
      ...(projectPlan ? { topicId: item.value } : { assignedId: item.id })
    };
  };

  updateExpanded = (id, isExpanded) => {
    const {
      topic,
      collapsedIdsConfig,
      projectPlan,
      goalPlan,
      teamPlanCollapsedIdsConfig,
      goalPlanCollapsedIdsConfig
    } = this.props;

    let collapsedIds = goalPlan
      ? goalPlanCollapsedIdsConfig?.value || []
      : projectPlan
      ? collapsedIdsConfig?.value || []
      : teamPlanCollapsedIdsConfig?.value || [];

    collapsedIds = collapsedIds.filter(x => x != id);

    !isExpanded && collapsedIds.push(id);

    mutations.setConfig({
      owner: toGid('Topic', topic?.id || 0),
      config: goalPlan
        ? 'GOAL_PLAN.collapsed_ids'
        : projectPlan
        ? 'collapsed_ids'
        : 'TEAM_PLAN.collapsed_ids',
      value: collapsedIds
    });
  };

  getSelectedTopics = () => {
    const { topics, allTopics } = this.props;

    const selectedTopics = topics.map(topic => ({
      id: allTopics[topic.value].id,
      title: allTopics[topic.value].attributes.title,
      slug: allTopics[topic.value].attributes.slug,
      kind: allTopics[topic.value].attributes.kind
    }));

    return selectedTopics;
  };

  render() {
    const {
      userDropdown,
      topicDropdown,
      filterLetter,
      filteredUsers,
      filteredTopics,
      hideTopicSelector
    } = this.state;
    const {
      selectedUserIds,
      alphabet_filter,
      users,
      topics,
      cardRequirements,
      projectPlan,
      goalPlan,
      vertical,
      topicIds,
      collapsedIdsConfig,
      teamPlanCollapsedIdsConfig,
      goalPlanCollapsedIdsConfig,
      active_font_color
    } = this.props;

    const collapsedIds = goalPlan
      ? goalPlanCollapsedIdsConfig?.value || []
      : projectPlan
      ? collapsedIdsConfig?.value || []
      : teamPlanCollapsedIdsConfig?.value || [];
    return (
      <div className="plan_lenses" style={{ flexDirection: 'column' }}>
        <div className="alpha-filter-container">
          {alphabet_filter && (
            <AlphaFilter
              currentFilter={filterLetter}
              onClick={this.handleApplyFilter}
            />
          )}
        </div>
        <div className="team-plan-board">
          {projectPlan && topicIds.length > 0 && (
            <DMLoader
              dataRequirements={{
                topicsWithAttributes: {
                  attributes: { topicIds, all: true }
                }
              }}
              loaderKey="topicsWithAttributes"
            />
          )}
          <div
            className={cn(
              'team_plan-boxes',
              vertical && 'team_plan-boxes--vertical'
            )}
          >
            {(filterLetter
              ? projectPlan
                ? filteredTopics
                : filteredUsers
              : projectPlan
              ? topics
              : users
            ).map((item, i) => (
              <UserBox
                key={i}
                item={item}
                projectPlan={projectPlan}
                goalPlan={goalPlan}
                isExpanded={!collapsedIds?.includes(item.value || item.id)}
                updateExpanded={isExpanded =>
                  this.updateExpanded(item.value || item.id, isExpanded)
                }
                removeSelectedTopic={this.removeSelectedTopic}
                {...this.props}
                updatePeopleOrder={this.updatePeopleOrder}
                cardRequirements={this.getCardRequirements(item)}
                disabled={!projectPlan && item.pending}
                disableMessage={
                  <strong style={{ marginTop: '-10%' }}>
                    After the user accepts the invite you will be able to assign
                    Cards.
                  </strong>
                }
              />
            ))}
            <div>
              <div className="team_plan-add_user">
                <div>
                  <IconButton
                    additionalClasses="large"
                    additionalIconClasses="large"
                    icon="add"
                    tooltip={
                      projectPlan
                        ? 'Add a board for each project'
                        : 'Add a lane for each team member'
                    }
                    onClick={() =>
                      this.toggleDropdown(!projectPlan ? 'users' : 'topics')
                    }
                    center={false}
                  />
                  {userDropdown && (
                    <div
                      className="dropdown-menu label-select-dropdown"
                      aria-labelledby="dLabel"
                      ref={this.dropdownRef}
                    >
                      <SelectableUserList
                        onChangeSelection={this.handleSelectUser}
                        selectedUserIds={selectedUserIds}
                      />
                    </div>
                  )}
                  {topicDropdown && (
                    <div ref={this.dropdownRef2}>
                      <TopicsListDropdown
                        additionalClasses="invite-form-dropdown-menu"
                        actionButtonLabel="Select Board"
                        actionButtonHandler={() => false}
                        actionButtonClass="btn-primary"
                        // path={null}
                        // startAt={null}
                        path={this.props.topic?.attributes?.path?.concat({
                          id: 0
                        })}
                        startAt={this.props.topic?.attributes?.path && 0}
                        hideHeader
                        inputMode="list"
                        hideAddTopicLink
                        hideTopicSelector={hideTopicSelector}
                        skipConfirmation
                        onInputBlur={this.onInputBlur}
                        onInputFocus={this.onInputFocus}
                        onSelectTopic={this.handleTopicSelected}
                        selectedTopics={this.getSelectedTopics()}
                        extraStyle={{ maxHeight: 'unset' }}
                        showAddBoard
                        selectAllSubboards={newTopics => (
                          updateProjectPlanTopics({ topics: newTopics }),
                          this.saveSelectedTopicIds(
                            newTopics.map(opt => opt.value)
                          )
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              {(projectPlan ? topics.length == 0 : users.length == 0) && (
                <div style={{ color: active_font_color || '#292b2d' }}>
                  <div style={{ marginTop: '15px' }}>
                    Add a {projectPlan ? 'Board' : 'lane'} for each{' '}
                    {goalPlan
                      ? 'Goal'
                      : projectPlan
                      ? 'Project'
                      : 'team member'}{' '}
                    to assign tasks and {goalPlan ? 'projects' : 'goals'}.
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    {projectPlan
                      ? `Each Board can be used for a ${
                          goalPlan ? 'goal' : 'project'
                        }.`
                      : 'Each Card is a task, goal, activity or note.'}
                  </div>
                  {projectPlan && (
                    <div>
                      <div style={{ marginTop: '10px' }}>
                        Boards can also be used for organizing notes, files,
                        chats and more.
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        You can visit each Board to access more advanced
                        features.
                      </div>
                    </div>
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

const hoc = Component => props => {
  const { allTopics } = props;

  const userIds = props.activePeopleOrderQuery?.activePeopleOrder?.order || [];
  let users;

  if (!props.projectPlan) {
    users = userIds
      .map(userId => {
        return String(userId).includes('@')
          ? {
              id: userId,
              pending: true,
              attributes: {
                first_name: userId,
                last_name: '(pending)',
                name: `${userId} (pending)`
              }
            }
          : props.people[userId];
      })
      .filter(x => x);
  }

  const topicIds = props.activeTopicsOrderQuery?.activeTopicsOrder?.order || [];

  const topics = topicIds
    .filter(id => allTopics[id])
    .map(id => ({
      value: id,
      label: get(allTopics, [id, 'attributes', 'title'], '')
    }));

  return (
    <Component
      {...props}
      topics={topics}
      topicIds={topicIds}
      users={users}
      selectedUserIds={userIds}
    />
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    page: { topicId },
    utilities: { active_design },
    people,
    GIDBFLenses: {
      team_plan: { alphabet_filter }
    },
    topics: allTopics,
    tools
  } = sm;

  const cardsByTopic = getSortedFilteredCardsByTopic(state);

  let cards = topicId ? props.cards : cardsByTopic['0'] || [];

  // let topics = null;
  //  else {
  //   topics = getSortedFilteredTopicsByParentTopic(state)[topicId || '0'] || [];
  // }

  const vertical = props.goalPlan
    ? tools.goalPlanLens.vertical
    : props.projectPlan
    ? tools.projectPlanLens.vertical
    : tools.teamPlanLens.vertical;

  const lenseId = getCustomLensId(state);
  const lenseKey = getRelevantViewForPage(state);

  return {
    cards,
    topicId: get(props, 'topic.id', topicId),
    lenseId,
    lenseKey,
    alphabet_filter,
    allTopics,
    people,
    vertical,
    active_font_color: active_design.card_font_color
  };
};

const mapDispatch = {
  updateTeamPlanUsers,
  updateProjectPlanTopics,
  setUserUiSettings
};

const FragmentContainer = createFragmentContainer(hoc(TeamPlanLens), {
  activeTopicsOrderQuery: graphql`
    fragment TeamPlanLens_activeTopicsOrderQuery on Query
      @argumentDefinitions(
        topicId: { type: ID }
        lenseId: { type: ID }
        lenseKey: { type: String }
      ) {
      activeTopicsOrder: activeCustomOrder(
        orderType: topics
        topicId: $topicId
        lenseId: $lenseId
        lenseKey: $lenseKey
      ) {
        id
        name
        order
      }
    }
  `,
  activePeopleOrderQuery: graphql`
    fragment TeamPlanLens_activePeopleOrderQuery on Query
      @argumentDefinitions(
        topicId: { type: ID }
        lenseId: { type: ID }
        lenseKey: { type: String }
      ) {
      activePeopleOrder: activeCustomOrder(
        orderType: people
        topicId: $topicId
        lenseId: $lenseId
        lenseKey: $lenseKey
      ) {
        id
        name
        order
      }
    }
  `
});

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(
    props => (
      <FragmentContainer
        {...props}
        activeTopicsOrderQuery={props}
        activePeopleOrderQuery={props}
      />
    ),
    {
      query: graphql`
        query TeamPlanLensQuery(
          $topicId: ID!
          $lenseId: ID
          $lenseKey: String
        ) {
          collapsedIdsConfig: config(owner: $topicId, config: "collapsed_ids") {
            id
            value
          }
          teamPlanCollapsedIdsConfig: config(
            owner: $topicId
            config: "TEAM_PLAN.collapsed_ids"
          ) {
            id
            value
          }
          goalPlanCollapsedIdsConfig: config(
            owner: $topicId
            config: "GOAL_PLAN.collapsed_ids"
          ) {
            id
            value
          }
          ...TeamPlanLens_activeTopicsOrderQuery
            @arguments(
              topicId: $topicId
              lenseId: $lenseId
              lenseKey: $lenseKey
            )
          ...TeamPlanLens_activePeopleOrderQuery
            @arguments(
              topicId: $topicId
              lenseId: $lenseId
              lenseKey: $lenseKey
            )
        }
      `,
      vars: ({ topicId, lenseId, lenseKey }) => ({
        topicId: toGid('Topic', topicId || 0),
        lenseId: toGid('Lens', lenseId),
        lenseKey
      })
    }
  )
);
