import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import UserBox from './UserBox';
import IconButton from 'Components/shared/buttons/IconButton';
import SelectableUserList from 'Src/components/shared/users/elements/SelectableUserList';
import { getActivities } from 'Src/newRedux/database/activity/thunks';
import DMLoader from 'Src/dataManager/components/DMLoader';
import { getCustomLensId } from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';

class TeamDayLens extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {};
  }

  async componentDidMount() {
    const { getActivities, startDate, endDate } = this.props;
    await getActivities({ from: startDate.format(), to: endDate.format() });
  }

  async componentDidUpdate(prevProps) {
    const { getActivities, startDate, endDate } = this.props;

    if (prevProps.startDate != this.props.startDate) {
      await getActivities({ from: startDate.format(), to: endDate.format() });
    }
    if (this.state.userDropdown) {
      const dropdown = this.dropdownRef.current;
      this.hideDropdownOnClickOut(dropdown);
    }
  }

  toggleUserDropdown = () => {
    this.setState(prev => ({
      userDropdown: !prev.userDropdown
    }));
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element.contains(event.target) || this.isVisible(element)) {
        this.setState({ userDropdown: false });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
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
    const revisedPeopleOrderPeopleIds = selectedUserIds.filter(
      id => id != userId[0]
    );
    revisedPeopleOrderPeopleIds.push(userId[0]);
    this.updatePeopleOrder(revisedPeopleOrderPeopleIds);
  };

  render() {
    const { userDropdown } = this.state;
    const { selectedUserIds, users, cardRequirements } = this.props;
    return (
      <div className="day_lenses">
        <div className="team_day_lens">
          <div className="boxes">
            {users.map((user, i) => (
              <UserBox
                key={i}
                user={user}
                {...this.props}
                updatePeopleOrder={this.updatePeopleOrder}
              />
            ))}
            {this.props.cards.length < 350 && (
              <DMLoader
                dataRequirements={{
                  cardsWithAttributes: { attributes: cardRequirements }
                }}
                loaderKey="cardsWithAttributes"
                style={{ display: 'none' }}
              />
            )}
            <div className="add_user">
              <div>
                <IconButton
                  additionalClasses="large"
                  additionalIconClasses="large"
                  icon="add"
                  onClick={this.toggleUserDropdown}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const hoc = Component => props => {
  const peopleOrderPeopleIds =
    props.activePeopleOrderQuery?.activePeopleOrder?.order || [];

  const users = peopleOrderPeopleIds
    .map(userId => props.people[userId])
    .filter(x => x);

  const assignedIds = peopleOrderPeopleIds.filter(id => !isNaN(id));

  return (
    <Component
      {...props}
      users={[{ id: 'team' }, ...users]}
      peopleOrderPeopleIds={peopleOrderPeopleIds}
      selectedUserIds={peopleOrderPeopleIds}
      cardRequirements={{
        ...props.cardRequirements,
        assignedId: assignedIds
      }}
    />
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    page: { topicId },
    people,
    tools: { timeframe }
  } = sm;
  let cards = topicId ? props.cards : sm.cards;

  !topicId && (cards = Object.keys(cards).map(id => cards[id]));

  const lenseId = getCustomLensId(state);
  const lenseKey = getRelevantViewForPage(state);
  const { startDate, endDate } = timeframe[lenseKey] || timeframe;

  return {
    topicId,
    lenseId,
    lenseKey,
    people,
    cards,
    startDate,
    endDate,
    cardRequirements: {
      ...props.cardRequirements,
      ccuDateFrom: moment(startDate).format(),
      ccuDateTo: moment(endDate).format()
    }
  };
};

const mapDispatch = {
  getActivities
};

const FragmentContainer = createFragmentContainer(hoc(TeamDayLens), {
  activePeopleOrderQuery: graphql`
    fragment TeamDayLens_activePeopleOrderQuery on Query
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
        query TeamDayLensQuery($topicId: ID!, $lenseId: ID, $lenseKey: String) {
          ...TeamDayLens_activePeopleOrderQuery
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
