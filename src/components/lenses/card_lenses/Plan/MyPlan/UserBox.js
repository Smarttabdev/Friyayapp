import React, { useState } from 'react';
import TimeframeSelectors from 'Components/shared/TimeframeSelectors';
import CompletionSlider from 'Components/shared/CompletionSlider';
import CardsSection from '../CardsSection';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Speed from '../Speed';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { updateTimeframe } from 'Src/newRedux/interface/lenses/actions';
import Tooltip from 'Components/shared/Tooltip';
import GroupByDropDown from 'Components/shared/assemblies/GroupByDropDown';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Dropdown from 'Components/shared/Dropdown';
import get from 'lodash/get';
import { updateUser } from 'Actions/appUser';
import { Link } from 'react-router-dom';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
const moment = extendMoment(Moment);
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';

const UserBox = props => {
  const {
    completionLevel,
    cards,
    completedCards,
    totalBonusPoints,
    columnMode,
    startDate,
    endDate,
    offsets,
    user,
    rootUrl,
    active_design
  } = props;

  const [userWorkload, setuserWorkload] = useState(0);
  const [workloadAvailability, setworkloadAvailability] = useState(
    user.attributes?.user_profile.resource_capacity || 0
  );

  const handleTimelineModeChange = columnMode => {
    props.updateTimeframe({ columnMode, tool: props.viewKey });
  };

  const handleDateRangeChange = ({ startDate, endDate }) => {
    props.updateTimeframe({ startDate, endDate, tool: props.viewKey });
  };

  const handleOffsetChange = (id, offset) => {
    props.updateTimeframe({
      offsets: {
        ...props.offsets,
        [id]: offset
      },
      tool: props.viewKey
    });
  };

  const handleWorkloadAvailabilityChange = e => {
    if (e.target.value.length <= 3) setworkloadAvailability(e.target.value);
  };

  const submitWorkload = e => {
    e.preventDefault();
    document.activeElement.blur();
  };

  const handleWorkloadSave = () => {
    const value = workloadAvailability;
    const isValidValue = value && value >= 0 && value <= 168;
    const isChanged = user.attributes?.user_profile.resource_capacity !== value;

    if (isValidValue && isChanged) {
      props.updateUser({
        id: user.id,
        resourceCapacity: Number(value)
      });
    }
  };

  const forId = Math.ceil(Math.random() * 100000, 6);
  const peopleUrl = (rootUrl == '/' ? '' : rootUrl) + '/users';
  const userUrl = peopleUrl + `/${user.id}`;
  return (
    <div
      className="my_plan-user_box"
      style={{
        border: `1px solid ${active_design?.card_font_color ||
          'rgba(0, 0, 0, 0.1)'}`
      }}
    >
      <div className="my_plan-user_box-header">
        <TimeframeSelectors
          mode={columnMode}
          startDate={startDate}
          endDate={endDate}
          offsets={offsets}
          onModeChange={handleTimelineModeChange}
          onDateRangeChange={handleDateRangeChange}
          onOffsetChange={handleOffsetChange}
          dropZoneEnabled
        />
        <div className="completion-bar">
          <GroupByDropDown additionalClass={' pr5 mr10'} />
          {userWorkload > user.attributes?.user_profile.resource_capacity && (
            <Dropdown
              closeOnClick={false}
              menuStyle={{ left: -100 }}
              trigger={
                <div
                  data-for={`workload-indicator-${user?.id}`}
                  data-tip={`Overload: Estimated work exceeds ${user.attributes
                    ?.user_profile?.resource_capacity || 0} hours`}
                  style={{ cursor: 'pointer' }}
                >
                  &#x1F605;
                  <Tooltip place="top" id={`workload-indicator-${user?.id}`} />
                </div>
              }
            >
              <div className="user-workload">
                <Link to={userUrl}>
                  <UserAvatar
                    user={get(user, 'attributes')}
                    margin={0}
                    size={50}
                    tooltipText={false}
                    color="#bbb"
                  />
                </Link>
                <div>
                  <Link to={userUrl}>{get(user, 'attributes.name')}</Link>
                  <form
                    className="workload-form"
                    onSubmit={e => submitWorkload(e)}
                  >
                    <span>Available</span>
                    <input
                      type="number"
                      max="168"
                      min="0"
                      placeholder="0"
                      value={workloadAvailability}
                      onChange={e => handleWorkloadAvailabilityChange(e)}
                      onBlur={handleWorkloadSave}
                    />
                    <span>hours / week</span>
                  </form>
                </div>
              </div>
            </Dropdown>
          )}
          <Speed cards={cards} completionLevel={completionLevel} />
          <span>{cards.length - completedCards.length} to go</span>
          <div className="header-completion-slider">
            <CompletionSlider value={completionLevel} />
          </div>
          <div
            data-tip="Bonus Points"
            data-for={forId}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div className="header-bonus_points">
              <img
                src={'/images/bonus-points.png'}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
                alt="B.P"
              />
            </div>
            {totalBonusPoints}
            <Tooltip place="bottom" id={forId} />
          </div>
        </div>
      </div>
      {
        <CardsSection
          {...props}
          startDate={startDate}
          endDate={endDate}
          item={user}
          setUserWorkload={setuserWorkload}
        />
      }
    </div>
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    user,
    page: { topicId, rootUrl },
    tools: {
      // timeframe: { columnMode, startDate, endDate, offsets }
      timeframe
    }
  } = sm;

  const viewKey = getRelevantViewForPage(state, topicId);
  const { columnMode, startDate, endDate } = timeframe[viewKey] || timeframe;

  const cardsByTopic = getSortedFilteredCardsByTopic(state);

  const cards = topicId ? props.cards : cardsByTopic['0'] || [];

  const checkDueDate = due_date => {
    if (!due_date) return false;
    return moment(due_date).isBetween(
      startDate,
      moment(endDate).endOf('second'),
      null,
      '[]'
    );
  };
  let userCards = Object.keys(cards)
    .map(cardId => cardId)
    .map(cardId => cards[cardId])
    .filter(card => !card.relationships.follows_tip.data)
    .filter(card => card.relationships.tip_assignments.data.includes(user.id));
  userCards =
    columnMode !== 'allCards'
      ? userCards.filter(card => checkDueDate(card.attributes.due_date))
      : userCards;

  const completedCards = userCards.filter(
    card => card.attributes.completed_percentage == 100
  );
  const completionLevel = Math.floor(
    (completedCards.length / userCards.length) * 100
  );
  let totalBonusPoints = 0;
  userCards.forEach(card => {
    totalBonusPoints = totalBonusPoints + card.attributes.cactii;
  });

  return {
    cards: userCards,
    completionLevel: isFinite(completionLevel) ? completionLevel : 0,
    // columnMode,
    // startDate,
    // endDate,
    // offsets,
    ...timeframe,
    ...timeframe[viewKey],
    user,
    completedCards,
    totalBonusPoints,
    rootUrl,
    viewKey
  };
};

const mapDispatch = {
  updateTimeframe,
  updateUser
};

export default connect(mapState, mapDispatch)(UserBox);
