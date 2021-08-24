import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import StatusTableGridRow from './StatusTableGridRow';
import { addRemoveAssignedUsersOnCard } from 'Src/newRedux/database/cards/thunks';
import { stateMappings } from 'newRedux/stateMappings';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import Tooltip from 'Components/shared/Tooltip';
import { getCustomLensId } from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';

class StatusTableGrid extends Component {
  static propTypes = {
    cardRequirements: PropTypes.any,
    cards: PropTypes.object,
    className: PropTypes.string,
    columnMode: PropTypes.string,
    timeframeDate: PropTypes.object,
    topicId: PropTypes.any,
    users: PropTypes.array,
    updateCard: PropTypes.func,
    dmLoading: PropTypes.bool
  };

  state = {
    columns: columnsConfig[this.props.columnMode](this.props.timeframeDate),
    usersToShow: null
  };

  componentDidMount() {
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

    if (!this.state.usersToShow) {
      updates.usersToShow = Object.keys(cards).reduce(
        (res, id) => ({ ...res, [id]: true }),
        {}
      );
    }

    this.setState(updates);
  }

  componentWillUnmount() {
    this.cardsRef.removeEventListener('scroll', this.handleCardsScroll);
  }

  handleCardsScroll = ev => {
    requestAnimationFrame(() => {
      this.headerRef.style.left = `-${ev.target.scrollLeft}px`;
    });
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

  handleChangeUserForLane = (prevPerson, newPersonId) => {
    const { peopleOrderPeopleIds } = this.props;
    const revisedPeopleOrderPeopleIds = peopleOrderPeopleIds.filter(
      id => id != newPersonId
    );

    prevPerson
      ? revisedPeopleOrderPeopleIds.splice(
          revisedPeopleOrderPeopleIds.indexOf(prevPerson.id),
          1,
          newPersonId
        )
      : revisedPeopleOrderPeopleIds.push(newPersonId);
    this.updatePeopleOrder(revisedPeopleOrderPeopleIds);
    this.setState({ newLane: newPersonId });
  };

  render() {
    const {
      cardRequirements,
      cards,
      peopleOrderPeople,
      topicId,
      dmLoading
    } = this.props;

    const { columns } = this.state;
    const gridClassNames = classNames(this.props.className, 'planning-grid');

    return (
      <div className={gridClassNames}>
        <div
          ref={ref => (this.headerRef = ref)}
          className="planning-grid__header"
        >
          <div className="planning-grid__row">
            <div className="planning-grid__cell planning-grid__cell--user" />
            {columns.map(col => (
              <Fragment key={col.id}>
                <div
                  className="planning-grid__cell planning-grid__cell--header"
                  data-tip
                  data-for={col.id}
                >
                  <div
                    className="status-table-grid_cell--header"
                    style={{ backgroundColor: col.colorHex }}
                  >
                    {col.name}
                  </div>
                </div>
                <Tooltip place="top" id={col.id}>
                  <span>{col.description}</span>
                </Tooltip>
              </Fragment>
            ))}
          </div>
        </div>
        <div
          ref={ref => (this.cardsRef = ref)}
          className="planning-grid__cards"
        >
          <StatusTableGridRow
            cardRequirements={cardRequirements}
            cards={cards.unassigned || []}
            columns={columns}
            isCollapsible
            onChangeUserForRow={this.handleChangeUserForLane}
            showCardsList
            title="Unassigned"
            topicId={topicId}
            dmLoading={dmLoading}
            user={null}
          />
          {peopleOrderPeople.map(user => (
            <StatusTableGridRow
              cardRequirements={cardRequirements}
              cards={cards[user.id] || []}
              columns={columns}
              key={user.id}
              isCollapsible
              onChangeUserForRow={this.handleChangeUserForLane}
              showCardsList
              showUserSelector
              topicId={topicId}
              dmLoading={dmLoading}
              user={user}
            />
          ))}
          <StatusTableGridRow
            cardRequirements={cardRequirements}
            cards={[]}
            columns={columns}
            onChangeUserForRow={this.handleChangeUserForLane}
            showUserSelector
            topicId={topicId}
            user={null}
          />
        </div>
      </div>
    );
  }
}

const columnsNames = [
  {
    id: 'unstarted',
    name: 'Unstarted',
    colorHex: '#F2994A',
    description: 'All Cards that should have started'
  },
  {
    id: 'progress',
    name: 'In Progress',
    colorHex: '#56CCF2',
    description: 'All Cards in progress'
  },
  {
    id: 'overdue',
    name: 'Overdue',
    colorHex: '#EB5757',
    description: 'All Cards that should have been completed'
  },
  {
    id: 'completed',
    name: 'Completed',
    colorHex: '#6FCF97',
    description: 'All Cards that have been completed'
  }
];

const columnsConfig = {
  weeks: month =>
    [...new Array(4)].map((item, index) => {
      const { name, description, colorHex, id } = columnsNames[index];
      const start = month.startOf('month');
      const end = month.clone().endOf('month');
      return { id, name, colorHex, description, range: [start, end] };
    }),
  days: week =>
    [...new Array(4)].map((item, index) => {
      const { name, description, colorHex, id } = columnsNames[index];
      const start = week.startOf('week');
      const end = week.clone().endOf('week');
      return { id, name, colorHex, description, range: [start, end] };
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
  const lenseId = getCustomLensId(state);
  const lenseKey = getRelevantViewForPage(state);
  return {
    topicId: sm.page.topicId,
    lenseId,
    lenseKey,
    confirmedNewOrChangeOrderIds:
      sm.session.peopleOrdersUserHasConfirmedNewOrChangeOrder,
    people: sm.people,
    informedNoSelectedOrder:
      sm.session.topicsUserHasBeenInformedNoSelectedPeopleOrder
  };
};

const mapDispatch = {
  addRemoveAssignedUsersOnCard,
  updateCard
};

const FragmentContainer = createFragmentContainer(hoc(StatusTableGrid), {
  activePeopleOrderQuery: graphql`
    fragment StatusTableGrid_activePeopleOrderQuery on Query
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
        query StatusTableGridQuery(
          $topicId: ID!
          $lenseId: ID
          $lenseKey: String
        ) {
          ...StatusTableGrid_activePeopleOrderQuery
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
