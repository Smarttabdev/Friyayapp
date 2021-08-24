import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import groupBy from 'lodash/groupBy';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import PlanningGridRow from './PlanningGridRow';
import { addRemoveAssignedUsersOnCard } from 'Src/newRedux/database/cards/thunks';
import { getSelectedLabelOrder } from 'Src/newRedux/database/labelOrders/selectors';
import { updateOrCreateLabelOrder } from 'Src/newRedux/database/labelOrders/abstractions';
import { getRelevantTopicOrderForTopic } from 'Src/newRedux/database/topicOrders/selectors';
import { updateOrCreateTopicOrder } from 'Src/newRedux/database/topicOrders/abstractions';
import { stateMappings } from 'newRedux/stateMappings';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import getWeeksInMonth from 'Lib/getWeeksInMonth';
import Icon from 'Src/components/shared/Icon';
import Dropdown from 'Components/shared/Dropdown';
import { PRIORITY_LEVELS } from 'Src/constants';
import { getCustomLensId } from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { getPeopleObject } from 'Src/newRedux/database/people/selectors';

const commonOptions = [
  { value: 'board', label: 'Board', color: '#9B51E0' },
  { value: 'assignee', label: 'Assignee', color: '#56CCF2' },
  // { value: 'due_date', label: 'Due Date', color: '#EB5757' },
  // { value: 'start_date', label: 'Start Date', color: '#2F80ED' },
  { value: 'priority_level', label: 'Priority level', color: '#F256D9' },
  { value: 'label', label: 'Label', color: '#E5F24C' },
  // { value: 'update_date', label: 'Update Date', color: '#F2994A' },
  { value: 'status', label: 'Status', color: '#B52727' }
  // { value: 'speed', label: 'Speed', color: '#5694F2' },
  // { value: 'completion', label: 'Completion Date', color: '#6FCF97' },
  // { value: 'created_date', label: 'Created Date', color: '#C98909' },
  // { value: 'comment_date', label: 'Comment Creation Date', color: '#6FCF97' },
  // { value: 'created_by', label: 'Created By', color: '#C2C2C2' }
  // { value: 'sub_view', label: 'Sub-View', color: '#6FCF97' },
];

const statusList = [
  {
    id: 1,
    level: 'Unstarted',
    colorHex: '#F2994A'
  },
  {
    id: 2,
    level: 'InProgress',
    colorHex: '#56CCF2'
  },
  {
    id: 3,
    level: 'Overdue',
    colorHex: '#EB5757'
  },
  {
    id: 4,
    level: 'Completed',
    colorHex: '#6FCF97'
  }
];
class PlanningGrid extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
    this.state = {
      columns: columnsConfig[this.props.columnMode](this.props.timeframeDate),
      showSettings: false,
      usersToCollapse: {},
      usersToShow: null,
      usersToShowEdit: {},
      showGroupByDropdown: false,
      filterData: {
        activeSection: 'row',
        selectedRow:
          props.planningFilterConfigs[props.appUserId]?.selectedRow ||
          'assignee',
        selectedColumn:
          props.planningFilterConfigs[props.appUserId]?.selectedColumn ||
          'due_date'
      },
      groupedCards: {}
    };
  }

  static propTypes = {
    activeDesignColor: PropTypes.string,
    cardRequirements: PropTypes.any,
    cards: PropTypes.array,
    className: PropTypes.string,
    columnMode: PropTypes.string,
    timeframeDate: PropTypes.object,
    topicId: PropTypes.any,
    users: PropTypes.array,
    updateCard: PropTypes.func,
    dmLoading: PropTypes.bool,
    peopleOrderPeopleIds: PropTypes.array,
    peopleOrderPeople: PropTypes.array,
    labelOrderLabelIds: PropTypes.array,
    updateOrCreateLabelOrder: PropTypes.func,
    labelOrderLabels: PropTypes.array,
    topicOrderTopics: PropTypes.array,
    topicOrderTopicsIds: PropTypes.array,
    updateOrCreateTopicOrder: PropTypes.func,
    topic: PropTypes.object
  };

  componentDidMount() {
    //this.setState({filterData: planningFilters});
    this.updateCards(this.props.cards);
    this.cardsRef.addEventListener('scroll', this.handleCardsScroll);
  }

  UNSAFE_componentWillReceiveProps({ cards, columnMode, timeframeDate }) {
    const updates = {};

    if (
      columnMode !== this.props.columnMode ||
      timeframeDate !== this.props.timeframeDate
    ) {
      updates.columns = columnsConfig[columnMode](timeframeDate);
    }

    /*  if (!this.state.usersToShow) {
       updates.usersToShow = Object.keys(cards).reduce(
         (res, id) => ({ ...res, [id]: true }),
         {}
       );
     } */

    this.setState(updates);
  }

  componentDidUpdate = (prevProps, prevState) => {
    let sortedCards = [];
    if (prevProps.planningFilterConfigs != this.props.planningFilterConfigs) {
      const updatedFilterData = {
        ...this.state.filterData,
        selectedRow:
          this.props.planningFilterConfigs[this.props.appUserId]?.selectedRow ||
          'assignee',
        selectedColumn:
          this.props.planningFilterConfigs[this.props.appUserId]
            ?.selectedColumn || 'due_date'
      };
      this.setState({ filterData: updatedFilterData });
    }
    if (
      prevProps.cards !== this.props.cards ||
      prevState.filterData.selectedRow != this.state.filterData.selectedRow
    ) {
      if (
        this.state.filterData.selectedRow == 'assignee' ||
        this.state.filterData.selectedRow == 'label' ||
        this.state.filterData.selectedRow == 'board'
      ) {
        this.updateCards(this.props.cards);
      } else {
        sortedCards = orderBy(this.props.cards, ({ attributes }) => [
          moment(attributes.start_date).valueOf(),
          moment(attributes.due_date).valueOf()
        ]);
        if (this.state.filterData.selectedRow == 'status') {
          sortedCards.forEach(card => {
            const cardStatus = this.getStatus(card.attributes);
            card.attributes.status = cardStatus;
          });
        }
        const groupedCards = groupBy(
          sortedCards,
          ({ attributes }) =>
            attributes[this.state.filterData.selectedRow] || 'unassigned'
        );
        this.setState({ groupedCards });
      }
    }
  };

  componentWillUnmount() {
    this.cardsRef.removeEventListener('scroll', this.handleCardsScroll);
  }

  selectPropertiesForOrder = () => {
    const { filterData } = this.state;
    switch (filterData.selectedRow) {
      case 'assignee':
        return {
          itemList: this.props.peopleOrderPeople,
          onChangeFunction: this.handleChangeUserForLane
        };
      case 'label':
        return {
          itemList: this.props.labelOrderLabels,
          onChangeFunction: this.handleChangeLabelForLane
        };
      case 'board':
        return {
          itemList: this.props.topicOrderTopics,
          onChangeFunction: this.handleChangeBoardForLane
        };
      case 'status':
        return {
          itemList: statusList,
          onChangeFunction: () => {}
        };

      case 'priority_level':
        return {
          itemList: PRIORITY_LEVELS,
          onChangeFunction: () => {}
        };
    }
  };

  updateCards = cards => {
    const {
      filterData: { selectedRow }
    } = this.state;
    let sortedCards = [];
    cards.forEach(card => {
      const hasNoDates =
        !card.attributes.due_date && !card.attributes.start_date;

      if (!hasNoDates) {
        const data =
          selectedRow == 'assignee'
            ? card.relationships.tip_assignments.data
            : selectedRow == 'board'
            ? card.relationships.topics.data
            : card.relationships.labels.data;
        data.length == 0 || data[0] == null
          ? sortedCards.push({ ...card, [selectedRow]: 'unassigned' })
          : data.forEach(item =>
              sortedCards.push({ ...card, [selectedRow]: item })
            );
      }
    });

    sortedCards = orderBy(sortedCards, ({ attributes }) => [
      moment(attributes.start_date).valueOf(),
      moment(attributes.due_date).valueOf()
    ]);
    const groupedCards = groupBy(
      sortedCards,
      ({ [selectedRow]: data }) => data
    );
    this.setState({ groupedCards });
  };

  getStatus = attributes => {
    if (attributes.completed_percentage === 100) {
      return 'Completed';
    } else if (moment() > moment(attributes.due_date)) {
      return 'Overdue';
    } else if (attributes.completed_percentage > 0) {
      return 'InProgress';
    } else {
      return 'Unstarted';
    }
  };

  handleCardsScroll = ev => {
    requestAnimationFrame(() => {
      this.headerRef.style.left = `-${ev.target.scrollLeft}px`;
    });
  };

  toggleRowsColumns = value => {
    let { activeSection } = this.state.filterData;
    activeSection = value;
    const updatedFilterData = { ...this.state.filterData, activeSection };
    this.setState({ filterData: updatedFilterData });
  };

  updateSelectedRowOrColumn = selectedFilter => {
    const { planningFilterConfigs, appUserId, topicId } = this.props;
    let { selectedRow, selectedColumn } = this.state.filterData;
    const { activeSection } = this.state.filterData;
    if (activeSection == 'column') {
      selectedColumn = selectedFilter;
    } else {
      selectedRow = selectedFilter;
    }
    const updatedFilterData = {
      ...this.state.filterData,
      selectedColumn,
      selectedRow
    };
    this.setState({ filterData: updatedFilterData });
    if (appUserId) {
      planningFilterConfigs[appUserId] = {
        selectedColumn,
        selectedRow
      };

      mutations.setConfig({
        owner: toGid('Topic', topicId),
        config: 'planningFilters',
        value: planningFilterConfigs
      });
    }
  };

  setFilterOptions = () => {
    const { filterData } = this.state;
    if (filterData.activeSection == 'row') {
      return commonOptions.filter(
        item => item.value !== filterData.selectedColumn
      );
    } else {
      return commonOptions.filter(
        item => item.value !== filterData.selectedRow
      );
    }
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

  handleChangeUserForLane = (prevAssignee, newAssigneeId) => {
    const { peopleOrderPeopleIds } = this.props;
    const revisedPeopleOrderPeopleIds = peopleOrderPeopleIds.filter(
      id => id != newAssigneeId
    );

    prevAssignee
      ? revisedPeopleOrderPeopleIds.splice(
          revisedPeopleOrderPeopleIds.indexOf(prevAssignee.id),
          1,
          newAssigneeId
        )
      : revisedPeopleOrderPeopleIds.push(newAssigneeId);
    this.updatePeopleOrder(revisedPeopleOrderPeopleIds);
  };

  handleChangeBoardForLane = (prevBoard, newSubtopicId) => {
    const { topicOrderTopicsIds, updateOrCreateTopicOrder } = this.props;
    const revisedTopicOrderTopicsIds = topicOrderTopicsIds.filter(
      id => id != newSubtopicId
    );

    prevBoard
      ? revisedTopicOrderTopicsIds.splice(
          revisedTopicOrderTopicsIds.indexOf(prevBoard.id),
          1,
          newSubtopicId
        )
      : revisedTopicOrderTopicsIds.push(newSubtopicId);
    updateOrCreateTopicOrder({
      topicId: this.props.topicId,
      subtopicOrder: revisedTopicOrderTopicsIds
    });
  };

  handleChangeLabelForLane = (prevLabel, newLabelId) => {
    const { labelOrderLabelIds, updateOrCreateLabelOrder } = this.props;
    const revisedLabelOrderLabelIds = labelOrderLabelIds.filter(
      id => id != newLabelId
    ); //map is temp solution as server returning ints

    prevLabel
      ? revisedLabelOrderLabelIds.splice(
          revisedLabelOrderLabelIds.indexOf(prevLabel.id),
          1,
          newLabelId
        )
      : revisedLabelOrderLabelIds.push(newLabelId);

    updateOrCreateLabelOrder(revisedLabelOrderLabelIds);
  };

  render() {
    const {
      cardRequirements,
      topicId,
      dmLoading,
      activeDesignColor,
      topic
    } = this.props;

    const buttonCustomStyle = {
      fontWeight: 600,
      backgroundColor: '#edecec'
    };

    const {
      columns,
      showGroupByDropdown,
      filterData,
      groupedCards
    } = this.state;
    const gridClassNames = classNames(this.props.className, 'planning-grid');

    return (
      <div className={gridClassNames}>
        <div
          ref={ref => (this.headerRef = ref)}
          className="planning-grid__header"
        >
          <div className="planning-grid__row">
            <div className="planning-grid__cell planning-grid__cell--user planning-grid__cell-padding">
              <Dropdown
                trigger={
                  <Icon
                    color={activeDesignColor || '#292b2d'}
                    style={{ fontSize: '20px' }}
                    outlined
                    fontAwesome
                    icon="cog"
                    onClick={() =>
                      this.setState({
                        showGroupByDropdown: !showGroupByDropdown
                      })
                    }
                  />
                }
                menuClassName={'planning-grid-dropdown__menu'}
                rowsColumnsRef={this.buttonRef}
              >
                <Fragment>
                  <div
                    className="planning-grid-dropdown__buttons"
                    ref={this.buttonRef}
                  >
                    <span
                      className="planning-grid-dropdown__button mr5"
                      style={
                        filterData.activeSection == 'row'
                          ? buttonCustomStyle
                          : { backgroundColor: 'transparent' }
                      }
                      onClick={() => this.toggleRowsColumns('row')}
                    >
                      Rows
                    </span>
                    {/* <span
                      className="planning-grid-dropdown__button ml5"
                      style={
                        filterData.activeSection == 'column'
                          ? buttonCustomStyle
                          : { backgroundColor: 'transparent' }
                      }
                      onClick={() => this.toggleRowsColumns('column')}
                    >
                      Columns
                    </span> */}
                  </div>
                  {this.setFilterOptions().map((item, i) => (
                    <li key={i} className="planning-grid-dropdown__menu-item">
                      <div
                        className="planning-grid-dropdown__indicator"
                        style={{ backgroundColor: item.color }}
                      />
                      <span
                        className="planning-grid-dropdown__text"
                        style={{ color: item.color }}
                        onClick={() =>
                          this.updateSelectedRowOrColumn(item.value)
                        }
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </Fragment>
              </Dropdown>
            </div>
            {this.state.columns.map(col => (
              <div
                key={col.id}
                className="planning-grid__cell planning-grid__cell--header"
              >
                {col.name}
              </div>
            ))}
          </div>
        </div>
        <div
          ref={ref => (this.cardsRef = ref)}
          className="planning-grid__cards"
        >
          {filterData.selectedRow != 'status' && (
            <PlanningGridRow
              cardRequirements={cardRequirements}
              cards={
                (filterData.selectedRow == 'board'
                  ? groupedCards[topicId]
                  : groupedCards.unassigned) || []
              }
              columns={columns}
              isCollapsible
              showCardsList
              title={
                filterData.selectedRow == 'board'
                  ? topic.attributes.title
                  : 'Unassigned'
              }
              topicId={topicId}
              dmLoading={dmLoading}
              filteredValue={null}
              filterOption={filterData.selectedRow}
            />
          )}
          {filterData.selectedRow == 'label' ||
          filterData.selectedRow == 'assignee' ||
          filterData.selectedRow == 'board' ? (
            <Fragment>
              {this.selectPropertiesForOrder().itemList.map(item => (
                <PlanningGridRow
                  cardRequirements={cardRequirements}
                  cards={groupedCards[item.id] || []}
                  columns={columns}
                  key={item.id}
                  isCollapsible
                  onChangeOrderRow={
                    this.selectPropertiesForOrder().onChangeFunction
                  }
                  showCardsList
                  showUserSelector
                  topicId={topicId}
                  dmLoading={dmLoading}
                  filteredValue={item}
                  filterOption={filterData.selectedRow}
                />
              ))}
              <PlanningGridRow
                cardRequirements={cardRequirements}
                cards={[]}
                title={
                  filterData.selectedRow == 'assignee'
                    ? 'Select Assignee'
                    : filterData.selectedRow == 'board'
                    ? 'Select Board'
                    : 'Select label'
                }
                columns={columns}
                onChangeOrderRow={
                  this.selectPropertiesForOrder().onChangeFunction
                }
                showUserSelector
                topicId={topicId}
                filterOption={filterData.selectedRow}
                filteredValue={null}
              />
            </Fragment>
          ) : (
            this.selectPropertiesForOrder().itemList.map(item => (
              <PlanningGridRow
                cardRequirements={cardRequirements}
                cards={groupedCards[item.level] || []}
                columns={columns}
                key={item.id}
                isCollapsible
                onChangeOrderRow={
                  this.selectPropertiesForOrder().onChangeFunction
                }
                showCardsList
                topicId={topicId}
                dmLoading={dmLoading}
                filterOption={filterData.selectedRow}
                filteredValue={item.level}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

const columnsConfig = {
  quarters: year =>
    [...new Array(4)].map((item, index) => {
      const quarterIndex = index + 1;
      const quarter = year.clone().set({ quarter: quarterIndex });

      const name = `Q${quarterIndex}`;
      const quarterStart = quarter.startOf('quarter');
      const quarterEnd = quarter.clone().endOf('quarter');

      return { id: name, name, range: [quarterStart, quarterEnd] };
    }),
  months: year =>
    [...new Array(12)].map((item, index) => {
      const month = year.clone().set({ month: index });

      const name = month.format('MMMM');
      const monthStart = month.startOf('month');
      const monthEnd = month.clone().endOf('month');

      return { id: name, name, range: [monthStart, monthEnd] };
    }),
  weeks: month =>
    [...new Array(getWeeksInMonth(month))].map((item, index) => {
      const monthStart = month.clone().startOf('month');
      const week = monthStart.add(index, 'weeks');

      const weekStart = week.startOf('week');
      const weekEnd = week.clone().endOf('week');
      const name = `${weekStart.format('MMM D')} - ${weekEnd.format('MMM D')}`;

      return { id: name, name, range: [weekStart, weekEnd] };
    }),
  weeksWD: month =>
    [...new Array(getWeeksInMonth(month))].map((item, index) => {
      const monthStart = month.clone().startOf('month');
      const week = monthStart.add(index, 'weeks');

      const weekStart = week.startOf('week').add(1, 'days');
      const weekEnd = week
        .clone()
        .startOf('week')
        .add(5, 'days');
      const name = `${weekStart.format('MMM D')} - ${weekEnd.format('MMM D')}`;

      return { id: name, name, range: [weekStart, weekEnd] };
    }),
  days: week =>
    [...new Array(7)].map((item, index) => {
      const day = week.clone().set({ day: index });

      const name = day.format('dddd');
      const dayStart = day.startOf('day');
      const dayEnd = day.clone().endOf('day');

      return { id: name, name, range: [dayStart, dayEnd] };
    }),
  daysWD: week =>
    [...new Array(5)].map((item, index) => {
      const day = week.clone().set({ day: index + 1 });

      const name = day.format('dddd');
      const dayStart = day.startOf('day');
      const dayEnd = day.clone().endOf('day');

      return { id: name, name, range: [dayStart, dayEnd] };
    })
};

const hoc = Component => props => {
  const selectedPeopleOrder =
    props.activePeopleOrderQuery?.activePeopleOrder?.order || [];

  const peopleOrderPeopleIds = selectedPeopleOrder
    ? selectedPeopleOrder.filter(userId => !!props.people[userId])
    : [];

  return (
    <Component
      {...props}
      peopleOrderPeopleIds={peopleOrderPeopleIds}
      peopleOrderPeople={peopleOrderPeopleIds.map(id => props.people[id])}
    />
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const selectedLabelOrder = getSelectedLabelOrder(state);
  const labelOrderLabelIds = selectedLabelOrder
    ? selectedLabelOrder.attributes.order.filter(
        labelId => !!sm.labels[labelId]
      )
    : [];
  const selectedTopicOrder = getRelevantTopicOrderForTopic(
    state,
    props.topicId
  );
  const topicOrderTopicsIds = selectedTopicOrder
    ? selectedTopicOrder.attributes.subtopic_order.filter(
        subtopicId => !!sm.topics[subtopicId]
      )
    : [];
  const appUser = state.appUser;
  const topics = state._newReduxTree.database.topics;
  const lenseId = getCustomLensId(state);
  const lenseKey = getRelevantViewForPage(state);
  const planningFilterConfigs =
    topics[props.topicId]?.attributes?.configs?.planningFilters || {};

  return {
    appUserId: appUser.id,
    planningFilterConfigs,
    topicId: sm.page.topicId,
    lenseId,
    lenseKey,
    confirmedNewOrChangeOrderIds:
      sm.session.peopleOrdersUserHasConfirmedNewOrChangeOrder,
    people: sm.people,
    informedNoSelectedOrder:
      sm.session.topicsUserHasBeenInformedNoSelectedPeopleOrder,
    confirmedNewOrChangeLabelOrderIds:
      sm.session.labelOrdersUserHasConfirmedNewOrChangeOrder,
    labelOrderLabelIds: labelOrderLabelIds,
    labelOrderLabels: labelOrderLabelIds.map(id => sm.labels[id]),
    topicOrderTopicsIds: topicOrderTopicsIds,
    topicOrderTopics: topicOrderTopicsIds.map(id => sm.topics[id])
  };
};

const mapDispatch = {
  addRemoveAssignedUsersOnCard,
  updateCard,
  updateOrCreateLabelOrder,
  updateOrCreateTopicOrder
};

const FragmentContainer = createFragmentContainer(hoc(PlanningGrid), {
  activePeopleOrderQuery: graphql`
    fragment PlanningGrid_activePeopleOrderQuery on Query
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
    props => <FragmentContainer {...props} activePeopleOrderQuery={props} />,
    {
      query: graphql`
        query PlanningGridQuery(
          $topicId: ID!
          $lenseId: ID
          $lenseKey: String
        ) {
          ...PlanningGrid_activePeopleOrderQuery
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
