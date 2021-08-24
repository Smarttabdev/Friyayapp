import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clone } from 'underscore';
import cx from 'classnames';
import inflection from 'inflection';
import className from 'classnames';
import AppStore from '../../stores/app_store';
import MainFormStore from '../../stores/main_form_store';
import Ability from '../../lib/ability';
import APIRequest from '../../lib/ApiRequest';
import tiphive from '../../lib/tiphive';
import TopicsSelectMenuInput from './topics_select_menu/topics_select_menu_input';
import TopicSelector from './topics_select_menu/TopicSelector';
import { addTopics } from 'Src/newRedux/database/topics/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { normalizeTopic } from 'Src/newRedux/database/topics/schema';
import { getSortedTopicArray } from 'Src/newRedux/database/topics/selectors';
import LeftMenuNewTopicInput from 'Src/components/menus/left/elements/LeftMenuNewTopicInput';
import { scrollToEl } from 'Lib/utilities';
import { useTopicCreatedUpdatedSubscription } from 'Lib/hooks';
import Switch from '../shared/ToggleSwitch';
import {
  getCustomLensId,
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { fetchQuery } from 'Lib/relay';

class TopicsSelectMenu extends Component {
  constructor(props) {
    super();

    this.state = {
      parentID: null,
      parentTitle: null,
      parentPath: [],
      isLoadingTopics: false,
      selectedTopics: props.selectedTopics,
      query: null,
      hideTopicSelector:
        props.hideTopicSelector ||
        (props.pickYourBoard && !props.pickYourBoardsFilter),
      showLoader: false,
      allSubboardsSelected: false
    };

    this.rootRef = React.createRef();

    this.handleTopicsScroll = this.handleTopicsScroll.bind(this);
    this.handleTopicSelect = this.handleTopicSelect.bind(this);
    this.handleTopicBack = this.handleTopicBack.bind(this);
    this.handleTopicClick = this.handleTopicClick.bind(this);
    this.handleTopicRemove = this.handleTopicRemove.bind(this);
    this.handleTopicAdd = this.handleTopicAdd.bind(this);
    this.handleTopicsFilter = this.handleTopicsFilter.bind(this);
    this.clearSearchQuery = this.clearSearchQuery.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  componentDidMount() {
    const {
      props: {
        topicsOf,
        path,
        startAt,
        domain,
        selectedTopics,
        topics,
        setSelectedTopics
      }
    } = this;

    this.fetchOrderTopics();

    if (setSelectedTopics) {
      setSelectedTopics(this.state.selectedTopics);
    }

    const ELEM_SCROLL_EVENT = topicsOf + '-topics-select-menu-scroll';
    let {
      state: { parentID, parentTitle, parentPath }
    } = this;

    if (startAt !== null) {
      const isRoot = path.length === 1;

      if (isRoot) {
        parentID = null;
        parentTitle = path[0].title;
        parentPath = [];
      } else {
        const index = path.findIndex(
          item => Number.parseInt(item.id) === Number.parseInt(startAt)
        );

        const parent = path[index - 1];
        if (parent) {
          parentID = parent.id;
          parentTitle = parent.title;
          parentPath = path.slice(0, index);
        } else {
          parentID = null;
          parentTitle = path[0].title;
          parentPath = [];
        }
      }

      this.setState({
        parentID,
        parentTitle,
        parentPath,
        isLoadingTopics: false
      });
    }

    AppStore.addEventListener(ELEM_SCROLL_EVENT, this.onTopicsScrollEnd);
  }

  componentWillUnmount() {
    const {
      props: { topicsOf }
    } = this;
    const ELEM_SCROLL_EVENT = topicsOf + '-topics-select-menu-scroll';

    AppStore.removeEventListener(ELEM_SCROLL_EVENT, this.onTopicsScrollEnd);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextStateString = JSON.stringify(nextState);
    const currentStateString = JSON.stringify(this.state);
    return (
      nextStateString !== currentStateString ||
      this.state.hideTopicSelector !== nextProps.hideTopicSelector ||
      this.state.pickYourBoardsFilter !== nextProps.pickYourBoardsFilter ||
      JSON.stringify(this.props.topics) != JSON.stringify(nextProps.topics) ||
      JSON.stringify(this.props.selectedTopicIds) !=
        JSON.stringify(nextProps.selectedTopicIds)
    ); // <-- wat
  }

  componentDidUpdate(prevProps, prevState) {
    const hideTopicSelector = this.props.hideTopicSelector;
    if (this.state.hideTopicSelector !== hideTopicSelector) {
      this.setState({ hideTopicSelector });
    }
    if (
      JSON.stringify(this.props.selectedTopicIds) !==
      JSON.stringify(prevProps.selectedTopicIds)
    ) {
      this.fetchOrderTopics();
    }

    if (
      this.props.setSelectedTopics &&
      prevState.selectedTopics.length != this.state.selectedTopics.length
    ) {
      this.props.setSelectedTopics(this.state.selectedTopics);
    }

    if (
      prevProps?.footerSelectedTopic?.id != this.props.footerSelectedTopic?.id
    ) {
      this.handleTopicSelect({
        fromFooter: true,
        ...(this.props.footerSelectedTopic ?? {})
      });
    }

    const isAllBoardsSelected = this.props.topics.every(({ id: id1 }) =>
      this.props.selectedTopics.some(({ id: id2 }) => id2 === id1)
    );
    if (this.props.topics != prevProps.topics) {
      this.setState({ allSubboardsSelected: isAllBoardsSelected });
    }
  }

  fetchOrderTopics = () => {
    const { selectedTopicIds } = this.props;
    fetchQuery(
      graphql`
        query topicsSelectMenuOrderTopicsQuery($ids: [ID!]) {
          topics(ids: $ids, all: true) {
            edges {
              node {
                id
                title
                slug
                kind
              }
            }
          }
        }
      `,
      {
        ids: selectedTopicIds
      }
    ).then(results => {
      if (!results?.topics) return;
      const selectedTopics = selectedTopicIds
        .map(id => results.topics.edges.find(edge => toId(edge.node.id) == id))
        .filter(x => x)
        .map(({ node }) => ({
          ...node,
          id: toId(node.id)
        }));
      this.setState({ selectedTopics });
    });
  };

  saveCustomOrder = ids => {
    if (
      !this.props.useBoardOrder &&
      !(this.props.pickYourBoard && this.props.pickYourBoardsFilter)
    ) {
      return;
    }

    const { lenseKey } = this.props;
    const topicId = toGid('Topic', this.props.topicId || 0);
    const lenseId = toGid('Lens', this.props.lenseId);

    let activeCustomOrder;

    updateStore(store => {
      const record = store.getRoot().getLinkedRecord('activeCustomOrder', {
        orderType: 'topics',
        topicId,
        lenseId,
        lenseKey
      });
      if (record) {
        activeCustomOrder = {
          id: record.getDataID(),
          name: record.getValue('name'),
          order: record.getValue('order')
        };
      }
    });

    mutations.createOrUpdateCustomOrder({
      customOrder: activeCustomOrder,
      orderTitle: 'Tool Board',
      orderType: 'topics',
      topicId,
      lenseId,
      lenseKey,
      order: ids
    });
  };

  handleTopicBack(e) {
    e.preventDefault();

    const {
      state: { parentPath }
    } = this;
    if (parentPath.length > 0) {
      parentPath.pop();
    }

    const parentID = (parentPath[parentPath.length - 1] || {}).id || null;
    const parentTitle = (parentPath[parentPath.length - 1] || {}).title || null;

    this.setState({
      query: null,
      parentID,
      parentTitle,
      parentPath
    });

    this.reloadTopics(null, parentID);
  }

  handleTopicClick(chosenTopic, e) {
    e.preventDefault();

    const parentID = chosenTopic.id;
    const parentKind = chosenTopic.kind;
    const parentTitle = chosenTopic.title;
    const parent = { id: parentID, title: parentTitle, kind: parentKind };

    if (parentID && parentTitle) {
      const {
        state: { parentPath }
      } = this;
      const pathLength = parentPath.length;
      let shouldPush = true;
      let stopPos = pathLength;

      for (let i = 0; i < pathLength; i++) {
        const curPath = parentPath[i];
        if (curPath.id === parentID) {
          shouldPush = false;
          stopPos = i + 1;
          break;
        }
      }

      const numPathToPop = pathLength - stopPos;
      if (numPathToPop > 0) {
        for (let j = pathLength; j > stopPos; j--) {
          parentPath.pop();
        }
      }

      if (shouldPush) {
        parentPath.push(parent);
      }

      this.setState({
        query: null,
        parentID,
        parentTitle,
        parentPath
      });
    }

    this.reloadTopics(null, parentID);
  }

  returnState = () => this.state;

  handleTopicSelect(chosenTopic, e) {
    e && e?.preventDefault();

    const { id } = chosenTopic;
    const title = chosenTopic.title || chosenTopic.attributes?.title;
    const slug = chosenTopic.slug || chosenTopic.attributes?.slug;
    const kind = chosenTopic.kind || chosenTopic.attributes?.kind;
    const masks = chosenTopic.masks || chosenTopic.attributes?.masks;
    const abilities =
      chosenTopic.abilities || chosenTopic.attributes?.abilities;

    // FUTURE USE: we may want to add something to the titles
    // title = kind === 'Subtopic' ? '../' + title : title;

    const topic = { id, title, slug, kind };
    const objectType = inflection.pluralize(this.props.topicsOf, null);
    const selectingTopic = {
      id,
      type: 'topics',
      relationships: { masks: clone(masks), abilities: clone(abilities) }
    };

    if (id && title) {
      const {
        props: { multiple },
        state: { selectedTopics }
      } = this;
      let newTopics = [];
      let shouldAdd = true;
      let shouldRemove = false;

      if (multiple) {
        const isSelected =
          selectedTopics.findIndex(
            selectedTopic =>
              Number.parseInt(selectedTopic.id) === Number.parseInt(topic.id)
          ) !== -1;

        shouldAdd = !isSelected;
        shouldRemove = isSelected;
      } else if (
        selectedTopics.findIndex(
          selectedTopic => selectedTopic.id === topic.id
        ) !== -1
      ) {
        shouldRemove = true;
      }

      if (
        !this.props.pickYourBoard &&
        Ability.can('create', objectType, selectingTopic) === false
      ) {
        APIRequest.showErrorMessage(
          'This Board is locked from creating ' + objectType
        );

        shouldAdd = false;
      }

      if (shouldAdd) {
        if (chosenTopic?.fromFooter) {
          newTopics = [topic];
        } else newTopics = [...selectedTopics, topic];
      }

      if (shouldRemove) {
        newTopics = selectedTopics.filter(
          selectedTopic => selectedTopic.id !== topic.id
        );
      }

      this.setState({
        selectedTopics: newTopics
      });

      const topics = selectedTopics.map(tp => {
        return { value: tp.id, label: tp.title };
      });

      this.props.onSelectTopic &&
        this.props.onSelectTopic([...topics, { value: id, label: title }]);

      if (this.props.skipConfirmation) {
        this.props.actionButtonHandler(newTopics);
      }

      this.saveCustomOrder(newTopics.map(t => t.id));
    }
  }

  toggleSelectAllSubboards = () => {
    const { allSubboardsSelected } = this.state;

    const topics = this.props.topics.map(topic => ({
      value: topic.id,
      label: topic.title
    }));
    const selectedTopics = this.state.selectedTopics.map(selectedTopic => ({
      value: selectedTopic.id,
      label: selectedTopic.title
    }));

    this.props.selectAllSubboards(
      allSubboardsSelected
        ? selectedTopics.filter(
            ({ value: id1 }) => !topics.some(({ value: id2 }) => id2 === id1)
          )
        : [...selectedTopics, ...topics]
    );
  };

  addTopic(topic) {}

  emptySelectedTopics() {}

  removeTopic(selectedTopics, topic) {
    // TODO: Find a way to stop mutating state, we need a duplicate object
    // May want to install ImmutableJS as a way to catch where we are mutating (LATER)

    this.forceUpdate();
  }

  handleTopicRemove(topicID) {
    const {
      state: { selectedTopics }
    } = this;

    const newSelectedTopics = selectedTopics.filter(
      topic => topic.id !== topicID
    );

    this.setState({
      selectedTopics: newSelectedTopics
    });
    if (this.props.skipConfirmation) {
      this.props.actionButtonHandler(this.state.selectedTopics);
    }

    this.saveCustomOrder(newSelectedTopics.map(t => t.id));
  }

  handleTopicAdd(title, parentID) {
    const {
      state: { selectedTopics }
    } = this;
    const { domain } = this.props;

    //set tag_list notes & share settings to private as default when create a note board
    let tag_list, share_settings;
    if (this.props.isNotes) {
      tag_list = ['notes'];
      share_settings = this.props.isMyNotes && {
        data: [
          {
            id: 'private',
            type: 'users',
            sharing_object_id: 'private',
            sharing_object_type: 'users',
            sharing_object_name: 'Just Me (Private)'
          }
        ]
      };
    }

    if (this.props.isKnowledgeBase) {
      tag_list = ['knowledge'];
    }

    APIRequest.post({
      resource: 'topics',
      domain,
      data: {
        data: {
          type: 'topics',
          attributes: {
            title: title,
            parent_id: parentID,
            tag_list
          },
          relationships: {
            share_settings
          }
        }
      }
    })
      .done(
        ({
          data,
          data: {
            id,
            attributes: { title }
          }
        }) => {
          //NOTE: This temp solution to ensure redux knows about the topics that might be selected until we can rebuild
          this.props.addTopics(normalizeTopic({ data: { data } }).topics);

          this.setState({
            query: null,
            parentID,
            selectedTopics: [...selectedTopics, { id, title }]
            // isLoadingTopics: true
          });

          this.reloadTopics(null, parentID);
          MainFormStore.emitEvent(window.TOPIC_CREATE_ON_FLY_EVENT);
          APIRequest.showSuccessMessage('Board added');

          scrollToEl(
            this.rootRef.current.querySelector('.topics-select-menu'),
            '.list-group-item.selected'
          );
        }
      )
      .fail(xhr => {
        APIRequest.showErrorMessage(xhr.responseJSON.errors.detail);
      });
  }

  handleTopicsFilter(query, parentID) {
    this.setState({
      query: query,
      parentID: parentID
      // isLoadingTopics: true,
    });

    this.reloadTopics(query, parentID);
  }

  handleTopicsScroll(e) {
    const {
      props: { topicsOf }
    } = this;
    tiphive.detectElemScrollEnd(
      topicsOf + '-topics-select-menu',
      topicsOf + '-topics-select-menu-content'
    );
  }

  onTopicsScrollEnd() {
    // we're loading 999 topics - let's see if it'll work first
  }

  reloadTopics = async (query, parentID) => {
    this.props.setSearchQuery(query);
    this.props.setParentId(parentID == '0' ? null : parentID);
  };

  clearSearchQuery(e) {
    e.preventDefault();
    this.setState({ query: null });
    this.reloadTopics(null, this.state.parentID);
  }

  handleActionClick(e) {
    e.preventDefault();

    vex.dialog.confirm({
      message: 'Are you sure?',
      callback: value => {
        if (value) {
          const selectedTopics = this.state.selectedTopics;
          const actionButtonHandler = this.props.actionButtonHandler;
          actionButtonHandler(selectedTopics);
        }
      }
    });
  }

  toggleAddView = () => {
    setTimeout(() => {
      this.setState(prev => ({ openAddTopic: !prev.openAddTopic }));
    });
  };

  togglePickYourBoardsFilter = () => {
    this.props.setUserFilterSettings({
      pick_your_boards: !this.props.pickYourBoardsFilter
    });
  };

  render() {
    const {
      state: {
        parentID,
        parentTitle,
        parentPath,
        selectedTopics,
        allSubboardsSelected,
        isLoadingTopics,
        query,
        hideTopicSelector,
        showLoader,
        openAddTopic
      },
      props: {
        topicsOf,
        multiple,
        hasInput,
        selectTitle,
        actionButtonLabel,
        actionButtonHandler,
        actionButtonClass,
        isCollapsed,
        hideHeader,
        hideTopicsSelectMenuInput,
        inputMode,
        disallowCreate,
        hideAddTopicLink,
        skipConfirmation,
        showAddBoard,
        pickYourBoard,
        pickYourBoardsFilter,
        allowSelectBoard,
        topics,
        tagged
      }
    } = this;

    let actionButton = null,
      buttonClass = null;
    if (actionButtonLabel && actionButtonHandler) {
      buttonClass = cx('btn', actionButtonClass, {
        disabled: selectedTopics.length <= 0
      });

      actionButton = (
        <div className="text-center">
          <a className={buttonClass} onClick={this.handleActionClick}>
            {actionButtonLabel}
          </a>
        </div>
      );
    }

    let topicsSelectMenuInput = null;
    if (hasInput) {
      topicsSelectMenuInput = (
        <TopicsSelectMenuInput
          name={topicsOf + '[topic_ids]'}
          id={topicsOf + '_topic_ids'}
          parentID={parentID}
          multiple={multiple}
          selectedTopics={selectedTopics}
          handleTopicRemove={this.handleTopicRemove}
          handleTopicAdd={this.handleTopicAdd}
          handleTopicsFilter={this.handleTopicsFilter}
          inputMode={inputMode}
          disallowCreate={disallowCreate}
          isRequired={this.props.isRequired}
          onInputFocus={this.props.onInputFocus}
          onInputBlur={this.props.onInputBlur}
          onChange={this.props.onChange}
        />
      );
    }

    let queryContent;
    if (query) {
      let searchPath;
      if (parentTitle) {
        searchPath = <em> in {parentTitle} </em>;
      }

      queryContent = (
        <div className="form-group query-info">
          <em>Searching for:</em> <strong>{query}</strong> {searchPath}
          <a
            href="javascript:void(0)"
            className="query-clear-link"
            onClick={this.clearSearchQuery}
          >
            clear search
          </a>
        </div>
      );
    }

    return (
      <div ref={this.rootRef}>
        {!hideHeader && (
          <h4 className="topics_select_menu_selectTitle">
            {selectTitle || 'Select Board(s) to add ' + topicsOf + ' to'}
          </h4>
        )}
        {pickYourBoard && (
          <div className="mb12 flex flex-r-center">
            Pick your Boards
            <Switch
              className="ml12"
              on={pickYourBoardsFilter}
              onClick={this.togglePickYourBoardsFilter}
            />
          </div>
        )}
        {showAddBoard && (
          <div>
            {!openAddTopic ? (
              <div
                style={{ cursor: 'pointer', marginBottom: 12 }}
                onClick={this.toggleAddView}
              >
                <div>+ Add Board</div>
                <small className="action-description">
                  For organizing projects, tasks, notes, chats and more
                </small>
              </div>
            ) : (
              <LeftMenuNewTopicInput
                parentTopicId={null}
                noRedirect
                onDismiss={this.toggleAddView}
                extraStyle={{ marginLeft: '0' }}
                afterCreate={this.handleTopicSelect}
                boardTypeSmallModal={this.props.boardTypeSmallModal}
                noDesign
                isMyNotes={this.props.isMyNotes}
                boardIndex={!tagged ? 0 : null}
              />
            )}
          </div>
        )}

        {!hideTopicsSelectMenuInput &&
          (!pickYourBoard || pickYourBoardsFilter) &&
          topicsSelectMenuInput}

        {queryContent}

        {showLoader ? <div className="text-center">Please wait...</div> : null}
        {!hideTopicSelector &&
        (!pickYourBoard || pickYourBoardsFilter || allowSelectBoard) ? (
          <TopicSelector
            isLoading={isLoadingTopics}
            handleTopicsScroll={this.handleTopicsScroll}
            topics={topics}
            selectedTopics={selectedTopics}
            topicsOf={topicsOf}
            parentPath={parentPath}
            handleTopicSelect={this.handleTopicSelect}
            handleTopicBack={this.handleTopicBack}
            handleTopicClick={this.handleTopicClick}
            hasInput={false}
            isCollapsed={isCollapsed}
            hideHeader={hideHeader}
            hideAddTopicLink={hideAddTopicLink}
            showAddBoard={showAddBoard}
            isNotes={this.props.isNotes}
            paginationRelay={this.props.relay}
            {...this.props.topicsSelectorProps}
          />
        ) : null}
        {!skipConfirmation ? actionButton : null}
        {this.props.selectAllSubboards && (
          <button
            onClick={this.toggleSelectAllSubboards}
            className="footer-button"
          >
            <span className="mr5">Select all subboards</span>
            <i
              className={className(
                'fa active-filter-chip__toggle-filter-btn',
                allSubboardsSelected
                  ? 'fa-toggle-on green'
                  : 'fa-toggle-off grey-button-color'
              )}
              style={{ marginLeft: 'auto' }}
            />
          </button>
        )}
      </div>
    );
  }
}

TopicsSelectMenu.propTypes = {
  topicsOf: PropTypes.string,
  multiple: PropTypes.bool,
  hasInput: PropTypes.bool,
  stayOpen: PropTypes.bool,
  selectedTopics: PropTypes.array,
  selectTitle: PropTypes.string,
  actionButtonLabel: PropTypes.string,
  actionButtonHandler: PropTypes.func,
  actionButtonClass: PropTypes.string,
  isCollapsed: PropTypes.bool,
  startAt: PropTypes.string,
  path: PropTypes.array,
  currentUser: PropTypes.object,
  topics: PropTypes.array,
  currentTopic: PropTypes.object,
  addTopics: PropTypes.func,
  onSelectTopic: PropTypes.func
};

TopicsSelectMenu.defaultProps = {
  topicsOf: 'tip',
  multiple: true,
  hasInput: true,
  stayOpen: false,
  selectedTopics: [],
  selectTitle: null,
  actionButtonLabel: null,
  actionButtonHandler: null,
  actionButtonClass: 'btn-primary',
  isCollapsed: false,
  startAt: null,
  path: []
};

const afterQueryHoc = Component => props => {
  const topics = getNodes(props.topicsQuery?.topics).map(topic => ({
    ...topic,
    id: toId(topic.id)
  }));

  useTopicCreatedUpdatedSubscription(null, () => {
    props.relay.refetchConnection(15);
  });

  const selectedTopicIds = props.useBoardOrder
    ? props.activeTopicsOrder?.order || []
    : props.selectedTopicIds;

  return (
    <Component {...props} topics={topics} selectedTopicIds={selectedTopicIds} />
  );
};

const hoc = Component => props => {
  const [parentId, setParentId] = useState(props.parentId);
  const [searchQuery, setSearchQuery] = useState();

  return (
    <Component
      {...props}
      parentId={parentId}
      searchQuery={searchQuery}
      setParentId={setParentId}
      setSearchQuery={setSearchQuery}
    />
  );
};

const mapDispatch = {
  addTopics,
  getFilterSettings,
  setUserFilterSettings
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const { page } = sm;
  const topicId = props.topicId || page.topicId;
  const currentTopic = sm.topics[topicId];

  const filterSettings = getFilterSettings(state, topicId);
  const lenseId = getCustomLensId(state, topicId);
  const lenseKey = getRelevantViewForPage(state, topicId);

  let topics = getSortedTopicArray(state);

  if (props.topicsFilter) {
    topics = topics.filter(props.topicsFilter);
  }

  let parentId = null;
  if (props.path && !isNaN(props.startAt)) {
    const index = props.path.findIndex(item => item.id == props.startAt);
    const parent = props.path[index - 1];
    parentId = parent?.id;
  }

  const selectedTopicIds = props.pickYourBoard
    ? filterSettings.active_tool_board_order || []
    : (props.selectedTopics || []).map(item => item.value || item.id);

  return {
    currentUser: sm.user,
    currentTopic: currentTopic,
    topics,
    parentId,
    pickYourBoardsFilter: filterSettings.pick_your_boards,
    selectedTopicIds,
    topicId,
    lenseId,
    lenseKey
  };
};

const PaginationContainer = createPaginationContainer(
  afterQueryHoc(TopicsSelectMenu),
  {
    topicsQuery: graphql`
      fragment topicsSelectMenu_topicsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          parentId: { type: ID }
          searchQuery: { type: String }
          tagged: { type: "[String!]" }
          filter: { type: JSON }
        ) {
        topics(
          first: 99
          after: $cursor
          parentId: $parentId
          title: $searchQuery
          tagged: $tagged
          filter: $filter
        ) @connection(key: "topicsSelectMenu_topics") {
          edges {
            node {
              id
              title
              slug
              kind
              masks {
                isAdmin
                isOwner
                isGuest
                isCollaborator
                isMember
                isPower
              }
              abilities {
                self {
                  canCreate
                }
                tips {
                  canCreate
                }
                questions {
                  canCreate
                }
                comments {
                  canCreate
                }
              }
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props.topicsQuery?.topics,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query topicsSelectMenuPaginationQuery(
        $cursor: String
        $parentId: ID
        $searchQuery: String
        $tagged: [String!]
        $filter: JSON
      ) {
        ...topicsSelectMenu_topicsQuery
          @arguments(
            cursor: $cursor
            parentId: $parentId
            searchQuery: $searchQuery
            tagged: $tagged
            filter: $filter
          )
      }
    `
  }
);

export default connect(mapState, mapDispatch, null, {
  withRef: true
})(
  hoc(
    QueryRenderer(
      props => (
        <PaginationContainer {...props} topicsQuery={rootFragments(props)} />
      ),
      {
        query: graphql`
          query topicsSelectMenuQuery(
            $useBoardOrder: Boolean!
            $topicId: ID
            $lenseId: ID
            $lenseKey: String
            $parentId: ID
            $searchQuery: String
            $tagged: [String!]
            $filter: JSON
          ) {
            ...topicsSelectMenu_topicsQuery
              @arguments(
                parentId: $parentId
                searchQuery: $searchQuery
                tagged: $tagged
                filter: $filter
              )
            activeTopicsOrder: activeCustomOrder(
              orderType: topics
              topicId: $topicId
              lenseId: $lenseId
              lenseKey: $lenseKey
            ) @include(if: $useBoardOrder) {
              id
              name
              order
            }
          }
        `,
        vars: ({
          useBoardOrder,
          topicId,
          lenseId,
          lenseKey,
          parentId,
          searchQuery,
          topicsParams,
          tagged
        }) => ({
          useBoardOrder: !!useBoardOrder,
          topicId: toGid('Topic', topicId),
          lenseId: toGid('Topic', lenseId),
          lenseKey,
          parentId: toGid('Topic', parentId),
          searchQuery,
          tagged,
          ...topicsParams
        })
      }
    )
  )
);
