import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import SheetHeader from './SheetHeader';
import GroupByDropDown from 'Components/shared/assemblies/GroupByDropDown';
import SheetTopicSection from './SheetTopicSection';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import { createTopic } from 'Src/newRedux/database/topics/thunks';
import { scrollToShow, getColumnFieldIds, toGid } from 'Src/lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { debounce } from 'lodash';
import { updateOrCreateTopicOrderOnSheetViewColumnChange } from 'Src/newRedux/database/topicOrders/abstractions';
import {
  getUiSettings,
  getFilterSettings,
  getCustomLensId
} from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';

const SheetLensRoot = ({
  topicId,
  lenseId,
  lenseKey,
  topicQuery,
  currentDomain,
  columns,
  children
}) => {
  const dispose = disposers => () => disposers.forEach(d => d && d.dispose());
  const columnFieldGids = getColumnFieldIds(columns);

  useEffect(() => {
    if (!currentDomain) return;
    const disposer = requestSubscription({
      subscription: graphql`
        subscription SheetLensDomainUpdatedSubscription($id: ID!) {
          domainUpdated(id: $id) {
            domain {
              id
              customFields {
                id
                name
                fieldType
              }
              activeFields {
                id
                customField {
                  id
                }
              }
            }
          }
        }
      `,
      vars: { id: currentDomain.id }
    });
    return () => disposer.dispose();
  }, [currentDomain && currentDomain.id]);

  useEffect(() => {
    if (topicQuery) {
      const disposer = requestSubscription({
        subscription: graphql`
          subscription SheetLensTopicUpdatedSubscription($topicId: ID!) {
            topicUpdated(id: $topicId) {
              topic {
                id
                activeFields {
                  id
                  customField {
                    id
                  }
                }
              }
            }
          }
        `,
        vars: { topicId: topicQuery.id }
      });
      return () => disposer.dispose();
    }
  }, [topicQuery?.id]);

  useEffect(() => {
    const disposers = columnFieldGids.map(customFieldId => {
      subscriptions.customFieldUpdated({
        id: customFieldId
      });
    });
    return dispose(disposers);
  }, [JSON.stringify(columnFieldGids)]);

  useEffect(() => {
    const disposer = subscriptions.customOrdersUpdated({
      orderType: 'column_order',
      onNext: () => {
        fetchQuery(
          graphql`
            query SheetLensActiveColumnOrderQuery(
              $topicId: ID
              $lenseId: ID
              $lenseKey: String
            ) {
              activeColumnOrder: activeCustomOrder(
                orderType: column_order
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
          {
            topicId: toGid('Topic', topicId),
            lenseId: toGid('Lens', lenseId),
            lenseKey
          }
        );
      }
    });
    return () => disposer.dispose();
  }, []);

  return children;
};

class SheetLens extends Component {
  static propTypes = {
    cardRequirements: PropTypes.object,
    cards: PropTypes.array.isRequired,
    columns: PropTypes.array,
    configureColumns: PropTypes.bool,
    subtopics: PropTypes.array,
    topic: PropTypes.object,
    createCard: PropTypes.func.isRequired,
    createTopic: PropTypes.func.isRequired,
    showFooter: PropTypes.bool,
    forceColor: PropTypes.bool,
    appUser: PropTypes.object,
    actionPlan: PropTypes.bool
  };

  static defaultProps = {
    columns: [],
    configureColumns: true,
    showFooter: true,
    forceColor: true,
    additionalClasses: 'Sheetlens-board'
  };

  state = {
    addCardOrSubtopic: { topicId: null, mode: null },
    columns: this.props.columns,
    expandedTopics: {},
    sortColumn: null,
    sortOrder: 'asc',
    selectedCardId: null,
    viewTitle: '',
    cardTitle: '',
    columnWidth: {},
    showActionPlanMessage: true
  };

  getTopicSheetColumnStorageId = topicId => `sheet_view_columns_${topicId}`;

  componentDidMount() {
    const { topic, topicQuery } = this.props;

    this.setState({
      expandedTopics:
        topicQuery?.config?.value ||
        topic.attributes.configs?.expandedTopics ||
        {}
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.topic &&
      this.props.topic &&
      this.props.topic.id !== prevProps.topic.id
    ) {
      this.handleSortToggle(null);
    }
    if (
      this.props.configureColumns &&
      this.props.activeColumnOrder != prevProps.activeColumnOrder
    ) {
      const order = this.props.activeColumnOrder?.order || [];
      const columns = order.map(col => JSON.parse(col || '{}').column);
      if (columns[0] == 'title') {
        columns.shift();
      }
      const columnWidth = order.reduce((obj, col) => {
        const json = JSON.parse(col || '{}');
        obj[json.column] = json.width;
        return obj;
      }, {});
      const formattedOrder = order.map(x => JSON.parse(x || '{}'));
      const sortColumn = formattedOrder?.length
        ? formattedOrder[0].sortColumn
        : this.state.sortColumn;
      const sortOrder = formattedOrder?.length
        ? formattedOrder[0].sortOrder
        : this.state.sortOrder;

      this.setState({ columns, columnWidth, sortColumn, sortOrder });
    }
  };

  handleAddCardOrSubtopic = (topicId, mode) => {
    this.setState({
      addCardOrSubtopic: { topicId, mode },
      expandedTopics: { ...this.state.expandedTopics, [topicId]: true }
    });
  };

  handleCardCreated = cardId => {
    const elem = document.querySelector('.card-title.c' + cardId);
    scrollToShow(elem, 14, 24);
    this.handleSelectCard(cardId);
  };

  handleAddCardOrSubtopicSubmit = title => {
    const { mode, topicId: parent_id } = this.state.addCardOrSubtopic;
    if (mode === 'card') {
      this.props
        .createCard({
          attributes: { title },
          relationships: { topics: { data: [parent_id] } }
        })
        .then(({ data: { data: newCard } }) => {
          this.handleCardCreated(newCard.id);
        })
        .then(({ data: { data: newCard } }) => {
          if (this.props.cardsSplitScreen) {
            this.props.updateSelectedCard(newCard.id);
          }
        });
    } else {
      this.props.createTopic({ attributes: { title, parent_id } });
    }

    this.setState({
      addCardOrSubtopic: { topicId: null, mode: null },
      expandedTopics: { ...this.state.expandedTopics, [parent_id]: true }
    });
  };

  saveColumns = ({ columns, columnWidth, sortOrder, sortColumn }) => {
    const { topicId, lenseId, lenseKey, activeColumnOrder } = this.props;

    if (columns[0] != 'title') {
      columns = ['title', ...columns];
    }

    const order = columns.map(column => {
      return JSON.stringify({
        column,
        width: (columnWidth || this.state.columnWidth)[column],
        sortOrder: sortOrder || this.state.sortOrder,
        sortColumn: sortColumn || this.state.sortColumn
      });
    });

    mutations.createOrUpdateCustomOrder({
      customOrder: activeColumnOrder,
      orderTitle: 'Column',
      orderType: 'column_order',
      topicId,
      lenseId,
      lenseKey,
      order
    });
  };

  handleColumnsReorder = columns => {
    this.setState({ columns });

    const topicId = this.props.topicId;

    if (this.props.configureColumns && topicId) {
      // localStorage.setItem('sheet_view_columns', JSON.stringify(columns));
      localStorage.setItem(
        this.getTopicSheetColumnStorageId(topicId),
        JSON.stringify(columns)
      );

      this.saveColumns({ columns });
    }
  };

  handleReplaceColumn = (oldColumn, newColumn) => {
    const idx = this.state.columns.findIndex(col => col === oldColumn);
    if (idx === -1) return;

    const columns = this.state.columns.slice();
    columns.splice(idx, 1, newColumn);

    this.setColumns(columns);
  };

  handleColumnToggle = column => {
    const columns = this.state.columns.filter(col => col !== column);

    if (columns.length === this.state.columns.length) {
      columns.push(column);
    }

    this.setColumns(columns);
  };

  setColumns = columns => {
    this.setState({ columns }, () => {
      this.contentRef.scrollLeft =
        this.contentRef.scrollWidth - this.contentRef.offsetWidth;
      let cardWrapper = document.getElementsByClassName(
        'sheet-view__container-wrapper'
      )[0];
      if (cardWrapper) {
        cardWrapper.scrollLeft = cardWrapper.scrollWidth;
      }
    });

    const topicId = this.props.topicId;

    if (this.props.configureColumns && topicId) {
      // localStorage.setItem('sheet_view_columns', JSON.stringify(columns));
      localStorage.setItem(
        this.getTopicSheetColumnStorageId(topicId),
        JSON.stringify(columns)
      );

      this.saveColumns({ columns });
    }
  };

  handleColumnResize = debounce((columnName, width) => {
    const topicId = this.props.topicId;
    const columnWidth = { ...this.state.columnWidth, [columnName]: width };
    this.setState({ columnWidth });
    this.saveColumns({ columns: this.state.columns, columnWidth });
  }, 500);

  handleSortToggle = column => {
    const sortColumn = column;
    const sortOrder =
      this.state.sortColumn === column
        ? this.state.sortOrder === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';
    this.setState({
      sortColumn,
      sortOrder
    });

    this.saveColumns({ columns: this.state.columns, sortOrder, sortColumn });
  };

  handleTopicExpand = topicId => {
    this.setState({
      expandedTopics: {
        ...this.state.expandedTopics,
        [topicId]: !this.state.expandedTopics[topicId]
      }
    });
    mutations.setConfig({
      owner: toGid('Topic', this.props.topicId || 0),
      config: 'expandedTopics',
      value: {
        ...this.state.expandedTopics,
        [topicId]: !this.state.expandedTopics[topicId]
      }
    });
  };

  handleSelectCard = cardId => {
    this.setState({ selectedCardId: cardId });
  };

  saveHeaderRef = ref => (this.headerScrollRef = ref);
  saveContentRef = ref => (this.contentRef = ref);

  handleKeyPress = type => async e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { createTopic, createCard } = this.props;
      const topicId = this.props.topicId;
      if (type === 'board') {
        await createTopic({
          attributes: {
            title: this.state.viewTitle,
            parent_id: topicId
          }
        });
        this.setState({ viewTitle: '' });
      } else {
        await createCard({
          attributes: { title: this.state.cardTitle },
          relationships: { topics: { data: [topicId] } }
        });
        this.setState({ cardTitle: '' });
      }
    }
  };

  checkUserExistence = (array, userId) => {
    return array.includes(userId);
  };

  handleHideActionMessage = ({ hideMessageUsersArray, topicId, userId }) => {
    hideMessageUsersArray.push(userId);
    mutations.setConfig({
      owner: toGid('Topic', topicId),
      config: 'hide_action_message',
      value: hideMessageUsersArray
    });
    this.setState(showActionPlanMessage => ({
      showActionPlanMessage: !showActionPlanMessage
    }));
  };
  render() {
    const groupByOptions = this.props.groupByOptions;
    let {
      additionalClasses,
      active_design,
      forceColor,
      hideTopicSection,
      planLens,
      dueDate,
      startDate,
      columnMode,
      newCardAttributes,
      newCardRelationships,
      topicId,
      projectPlan,
      currentDomain,
      user,
      appUser,
      actionPlan,
      topic,
      isHome,
      lenseKey,
      linkingBoards
    } = this.props;
    const { showActionPlanMessage } = this.state;
    const { card_font_color } = active_design || {};
    const hideMessageUsersArray =
      topic && topic.attributes.configs.hide_action_message
        ? topic.attributes.configs.hide_action_message
        : [];
    const customFields = currentDomain ? currentDomain.customFields : [];
    const sheetBorderStyle =
      lenseKey == 'SHEET' ? { borderColor: active_design.card_font_color } : {};
    return (
      <SheetLensRoot
        {...{
          topicId,
          lenseId: this.props.lenseId,
          lenseKey,
          topicQuery: this.props.topicQuery,
          currentDomain
        }}
        columns={this.state.columns}
        columnWidth={this.state.columnWidth}
      >
        {(lenseKey == 'ACTION_PLAN' || lenseKey == 'SHEET') && (
          <GroupByDropDown
            additionalClass={`sheet-view__groupby ${
              lenseKey == 'SHEET' ? 'ml30' : ''
            }`}
          />
        )}
        <div className={`h100 sheet-board-container ${additionalClasses}`}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ActiveFiltersPanel
              additionalContainerClass={`mb10 ${
                actionPlan
                  ? 'ml20'
                  : planLens
                  ? 'ml10'
                  : isHome
                  ? 'ml35'
                  : 'ml45'
              }`}
            />
          </div>
          <div ref={this.saveContentRef} className="h100 sheet-board">
            <SheetHeader
              columns={this.state.columns}
              configureColumns={!!this.props.configureColumns}
              scrollContainerRef={this.saveHeaderRef}
              sortColumn={this.state.sortColumn}
              sortOrder={this.state.sortOrder}
              onColumnToggle={this.handleColumnToggle}
              onSortToggle={this.handleSortToggle}
              topic={this.props.topic}
              handleAddCardOrSubtopic={this.handleAddCardOrSubtopic}
              handleCardCreated={this.handleCardCreated}
              onColumnResize={this.handleColumnResize}
              columnWidth={this.state.columnWidth}
              onColumnsReorder={this.handleColumnsReorder}
              planLens={planLens}
              topicId={topicId}
              onReplaceColumn={this.handleReplaceColumn}
              customFields={customFields}
              currentDomain={this.props.currentDomain}
              topicQuery={this.props.topicQuery}
              sheetBorderStyle={sheetBorderStyle}
              {...this.props.headerProps}
            />
            <div className="sheet-view__content">
              <div className="sheet-view__grid">
                <SheetTopicSection
                  showFooter={this.props.showFooter}
                  color={forceColor ? card_font_color : ''}
                  addCardOrSubtopic={this.state.addCardOrSubtopic}
                  cardRequirements={this.props.cardRequirements}
                  columns={this.state.columns}
                  configureColumns={!!this.props.configureColumns}
                  expandedTopics={this.state.expandedTopics}
                  level={0}
                  showAddCard={
                    this.state.addCardOrSubtopic.topicId === topicId &&
                    this.state.addCardOrSubtopic.mode === 'card'
                  }
                  showAddSubtopic={
                    this.state.addCardOrSubtopic.topicId === topicId &&
                    this.state.addCardOrSubtopic.mode === 'topic'
                  }
                  sortColumn={this.state.sortColumn}
                  sortOrder={this.state.sortOrder}
                  topicId={topicId}
                  onAddCardOrSubtopic={this.handleAddCardOrSubtopic}
                  onAddCardOrSubtopicSubmit={this.handleAddCardOrSubtopicSubmit}
                  onTopicExpand={this.handleTopicExpand}
                  groupBy={groupByOptions}
                  columnWidth={this.state.columnWidth}
                  cards={this.props.cards}
                  hideTopicSection={hideTopicSection}
                  planLens={planLens}
                  dueDate={dueDate}
                  startDate={startDate}
                  newCardAttributes={newCardAttributes}
                  newCardRelationships={newCardRelationships}
                  projectPlan={projectPlan}
                  customFields={customFields}
                  currentDomain={this.props.currentDomain}
                  topicQuery={this.props.topicQuery}
                  tips={this.props.tips}
                  subtopics={this.props.subtopics}
                  topicsFilter={this.props.topicsFilter}
                  filterCards={this.props.filterCards}
                  user={user}
                  setUserWorkload={this.props.setUserWorkload}
                  sheetBorderStyle={sheetBorderStyle}
                  columnMode={columnMode}
                  linkingBoards={linkingBoards}
                  {...this.props.topicSectionProps}
                />
              </div>
            </div>
            <div style={{ flexGrow: 1 }}>
              {actionPlan &&
                showActionPlanMessage &&
                !this.checkUserExistence(hideMessageUsersArray, appUser.id) && (
                  <p className="action-plan-message">
                    Use Cards for tasks and notes. Use Boards to organize your
                    cards in groups.
                    <span
                      className="action-plan-message__link"
                      onClick={() =>
                        this.handleHideActionMessage({
                          hideMessageUsersArray,
                          topicId: topic.id,
                          userId: appUser.id
                        })
                      }
                    >
                      Hide this message
                    </span>
                    .
                  </p>
                )}
            </div>
          </div>
        </div>
      </SheetLensRoot>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    page,
    topicOrders,
    topics,
    utilities: { active_design }
  } = sm;
  const appUser = state.appUser;
  const topicId =
    props.topicId || (props.topic && props.topic.id) || page.topicId || '0';
  const topic = props.topic || topics[topicId];
  const filterSettings = getFilterSettings(state);
  const groupByOptions = filterSettings.group_by.groupBy || [];
  const uiSettings = getUiSettings(state);
  const lenseId = getCustomLensId(state);
  const lenseKey = uiSettings.current_active_template;
  const cards =
    props.cards || getSortedFilteredCardsByTopic(state)[topicId] || [];
  return {
    topic,
    cards,
    viewKey: getRelevantViewForPage(state),
    topicId,
    lenseId,
    lenseKey,
    topicOrders,
    active_design,
    groupByOptions,
    isHome: page.isHome,
    appUser
  };
};

export default connect(mapState, {
  createCard,
  createTopic,
  updateOrCreateTopicOrderOnSheetViewColumnChange
})(
  QueryRenderer({
    query: graphql`
      query SheetLensQuery(
        $topicId: ID
        $lenseId: ID
        $lenseKey: String
        $tipIds: [ID!]!
        $includeTips: Boolean!
        $customFieldValuesFilter: JSON
      ) {
        currentDomain {
          id
          customFields {
            id
            name
            fieldType
          }
          activeFields {
            id
            customField {
              id
            }
          }
          abilities {
            self {
              canUpdate
            }
          }
        }
        topicQuery: topic(id: $topicId) {
          id
          activeFields {
            id
            customField {
              id
            }
          }
          abilities {
            self {
              canUpdate
            }
          }
          config(config: "expandedTopics") {
            value
          }
        }
        tips: allTips(ids: $tipIds) @include(if: $includeTips) {
          id
          customFieldValues(filter: $customFieldValuesFilter) {
            id
            value
            customField {
              id
            }
          }
        }
        activeColumnOrder: activeCustomOrder(
          orderType: column_order
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
    vars: props => ({
      topicId: toGid('Topic', props.topicId),
      lenseId: toGid('Lens', props.lenseId),
      lenseKey: props.lenseKey,
      tipIds: (props.cards || []).map(card => toGid('Tip', card.id)).sort(),
      includeTips: Boolean(props.cards && props.cards.length)
    }),
    showLoader: false,
    component: SheetLens
  })
);
