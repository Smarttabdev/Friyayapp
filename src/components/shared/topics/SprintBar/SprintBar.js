/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
// import AssigneeList from './AssigneeList';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import moment from 'moment';
import get from 'lodash/get';
import { setUpdateTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import {
  getCardsByTopic,
  getTopicCards
} from 'Src/newRedux/database/cards/selectors';
import { IconButton } from '../../buttons/index';
import DMLoader from 'Src/dataManager/components/DMLoader';
import {
  getUiSettings,
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { useTipCreatedUpdatedSubscription } from 'Lib/hooks';

export const getSpeedKey = (speed, completionPercent) => {
  return completionPercent == 100
    ? 'done'
    : completionPercent == 0 || speed < 0.4
    ? 'snail'
    : speed < 0.9 && speed >= 0.4
    ? 'turtle'
    : speed <= 1.1 && speed >= 0.9
    ? 'horse'
    : speed > 1.1 && speed <= 1.5
    ? 'car'
    : 'rocket';
};

const SprintBar = props => {
  const flag = '🏁';
  const calendar = '📅';
  const horse = '🏇';
  const car = '🏎️';
  const turtle = '🐢';
  const snail = '🐌';
  const rocket = '🚀';
  const done = '💯';

  const [cards, setCards] = useState([]);
  const [topic, setTopic] = useState([]);
  const [completion, setCompletion] = useState(0);
  const [topicSprint, setTopicSprint] = useState();
  const [totalCards, setTotalCards] = useState(0);
  const [totalCompletedCards, setTotalCompletedCards] = useState(0);
  const sprintBarRef = useRef(null);

  useTipCreatedUpdatedSubscription(props.topic?.id, () => {
    fetchQuery(
      graphql`
        query SprintBarTopicQuery($topicId: ID) {
          topic(id: $topicId, speed: true, completion: true) {
            id
            speed
            completion
          }
          tips(topicId: $topicId) {
            totalCount
          }
          completedTips: tips(topicId: $topicId, excludeUncompleted: true) {
            totalCount
          }
        }
      `,
      {
        topicId: toGid('Topic', props.topic?.id)
      }
    ).then(data => {
      setTopicSprint(data?.topic);
      setTotalCards(data?.tips?.totalCount);
      setTotalCompletedCards(data?.completedTips?.totalCount);
      setCompletion(data?.topic?.completion || 0);
    });
  });

  // const onCardData = currentCards => {
  //   if (currentCards && currentCards.length) {
  //     const tempCards = cards;
  //     const temp = currentCards.map(c => {
  //       const index = cards.findIndex(t => t.id === c.id);
  //       if (index >= 0) {
  //         tempCards.splice(index, 1);
  //       }
  //       return c;
  //     });
  //     setCards([...tempCards, ...temp]);
  //   }
  // };

  /*   useEffect(() => {
    const payload ={
      include_completed_cards: true,
      include_uncompleted_cards: true,
    };
  setUserFilterSettings(payload);
  }, []); */

  useEffect(() => {
    if (props.topic && props.topic.id !== topic.id) {
      setTopic(props.topic);
      setCards([]);
    }
  }, [props.topic]);

  useEffect(() => {
    const { cards, topicCards } = props;
    const cardIds = cards.map(card => card.id);
    topicCards.forEach(card => {
      if (!cardIds.includes(card.id) && !card.attributes.is_disabled) {
        cards.push(card);
      }
    });
    setCards(cards);
  }, [props.cards]);

  useEffect(() => {
    let temp = [];
    const tempCards = cards;
    cards.forEach(c => {
      const {
        relationships: {
          nested_tips: { data }
        }
      } = c;
      if (data.length) {
        data.forEach(nestedCardId => {
          const nestedCard = props.allCardsHash[nestedCardId];
          if (nestedCard) {
            const index = cards.findIndex(t => t.id === nestedCardId);
            if (index < 0) {
              temp.push(nestedCard);
            } else if (
              JSON.stringify(cards[index]) !== JSON.stringify(nestedCard)
            ) {
              tempCards.splice(index, 1);
              temp.push(nestedCard);
            }
          }
        });
      }
    });
    if (temp.length) {
      setCards([...tempCards, ...temp]);
    }
  }, [cards, setCards]);

  // const topicId = props.topic ? props.topic.id : '0';

  const countAssignee = () => {
    if (cards.length) {
      const assignees = cards.reduce((data, card) => {
        if (card.relationships.tip_assignments.data.length) {
          card.relationships.tip_assignments.data.map(userId => {
            if (!data[userId]) {
              data[userId] = {
                ...props.people[userId],
                cards: {
                  [card.id]: card
                }
              };
            } else {
              data[userId] = {
                ...data[userId],
                cards: { ...data[userId].cards, [card.id]: card }
              };
            }
          });
        } else {
          data.unassigned = data.unassigned
            ? { cards: { ...data.unassigned.cards, [card.id]: card } }
            : { cards: { [card.id]: card } };
        }
        return data;
      }, {});
      const { unassigned } = assignees;
      delete assignees.unassigned;
      assignees.unassigned = unassigned;
      return assignees;
    }
    return {};
  };

  const assignee = () => {
    const users = countAssignee();
    const completionCount = c => {
      return Object.keys(c).reduce((count, key) => {
        if (Number(c[key].attributes.completed_percentage) === 100) {
          count += 1;
        }
        return count;
      }, 0);
    };
    return (
      <Fragment>
        {Object.keys(users).map(key => {
          return (
            <div className="SprintBar__filter__assignee-data" key={key}>
              {get(users[key], 'attributes.first_name') ||
              key === 'unassigned' ? (
                <Fragment>
                  {key === 'unassigned' ? (
                    <span className="SprintBar__filter__assignee-data-unassigned">
                      Unassigned{' '}
                    </span>
                  ) : (
                    <span
                      onClick={() => props.toggleAssignedFilter(key)}
                      className="SprintBar__filter__assignee-data-unassigned"
                    >
                      {
                        get(users[key], 'attributes.first_name', '').split(
                          ' '
                        )[0]
                      }{' '}
                    </span>
                  )}
                  <span>
                    {users[key] ? completionCount(users[key].cards) : 0}
                  </span>
                  <span>/</span>
                  <span>
                    {users[key] ? Object.keys(users[key].cards).length : 0}
                  </span>
                </Fragment>
              ) : null}
            </div>
          );
        })}
      </Fragment>
    );
  };

  const completedCount = () => {
    return cards.reduce((count, card) => {
      if (Number(card.attributes.completed_percentage) === 100) {
        count += 1;
      }
      return count;
    }, 0);
  };

  const createDateArray = () => {
    let dateArray = [];
    if (props.topic && props.topic.attributes) {
      let currentDate = moment(props.topic.attributes.start_date);
      const endDate = moment(props.topic.attributes.due_date);

      while (currentDate <= endDate) {
        dateArray.push(moment(currentDate));
        currentDate = moment(currentDate).add(1, 'days');
      }
    }
    if (
      dateArray.length &&
      moment().format('MM-DD-YYYY') >
        dateArray[dateArray.length - 1].format('MM-DD-YYYY')
    ) {
      let currentDate = dateArray[dateArray.length - 1];
      const endDate = moment();
      endDate.endOf('day');
      while (currentDate <= endDate) {
        dateArray.push(moment(currentDate));
        currentDate = moment(currentDate).add(1, 'days');
      }
    }
    dateArray = dateArray.filter(
      (date, index, self) =>
        index ===
        self.findIndex(
          t => date.format('DD-MM-YYYY') === t.format('DD-MM-YYYY')
        )
    );
    return dateArray;
  };

  const dateClasses = date => {
    if (date.format('DD-MM-YYYY') < moment().format('DD-MM-YYYY')) {
      return 'SprintBar__date__date-old';
    } else if (date.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')) {
      return 'SprintBar__date__date-today';
    } else {
      return '';
    }
  };

  const getDueLeftPos = () => {
    let due_date = get(props.topic, 'attributes.due_date', '');
    if (due_date) {
      due_date = moment(due_date).format('DD-MM-YYYY');
      const dueElement = document.getElementById(`sprint-date-${due_date}`);
      if (dueElement) {
        if (moment().format('DD-MM-YYYY') === due_date) {
          return `${dueElement.offsetLeft + 10}px`;
        }
        return `${dueElement.offsetLeft - 30}px`;
      }
      return '60px';
    }
  };

  const getCurrentLeftPos = () => {
    const current = moment().format('DD-MM-YYYY');
    const currentEle = document.getElementById(`sprint-date-${current}`);
    if (currentEle) {
      return `${currentEle.offsetLeft - 35}px`;
    }
    return '40px';
  };

  const completed = completedCount();
  const dateArray = createDateArray();

  const getCurrentEmoji = () => {
    if (props.topic && props.topic.attributes) {
      // const start = moment(
      //   props.topic.attributes.start_date,
      //   'YYYY-MM-DD'
      // ).startOf('day');
      // const end = moment(props.topic.attributes.due_date, 'YYYY-MM-DD').endOf(
      //   'day'
      // );
      // const totalDuration = Math.abs(start.diff(end, 'days')) + 1;
      // const avgDaysPerCard = totalDuration / cards.length;
      // const daySpent = Math.ceil(
      //   Math.abs(moment.duration(start.diff(moment().startOf('day'))).asDays())
      // );
      // const currentAvg = completed !== 0 ? daySpent / completed : 0;
      // const currentSpeed = currentAvg !== 0 ? avgDaysPerCard / currentAvg : 0;

      const completion = topicSprint?.completion;
      const currentSpeed = topicSprint?.speed;

      props.returnSpeedAndCompletion &&
        props.returnSpeedAndCompletion({
          completion,
          speed: currentSpeed
        });

      const speedKey = getSpeedKey(currentSpeed, completion);

      if (speedKey == 'done') {
        return (
          <p>
            <span>{done}</span>
          </p>
        );
      } else if (speedKey == 'horse') {
        return (
          <p className="SprintBar__icon-flip">
            <span>{horse}</span>
          </p>
        );
      } else if (speedKey == 'turtle') {
        return (
          <p className="SprintBar__icon-flip">
            <span>{turtle}</span>
          </p>
        );
      } else if (speedKey == 'snail') {
        return (
          <p>
            <span>{snail}</span>
          </p>
        );
      } else if (speedKey == 'car') {
        return (
          <p className="SprintBar__icon-flip">
            <span>{car}</span>
          </p>
        );
      } else {
        return (
          <p>
            <span>{rocket}</span>
          </p>
        );
      }
    }
  };

  const openTopicModal = () => {
    props.setUpdateTopicModalOpen(props.topic.id, true, 4);
  };

  const daysSpent = () => {
    if (get(props.topic, 'attributes.start_date')) {
      const current = moment();
      const start = moment(props.topic.attributes.start_date);
      return current.diff(start, 'days') + 1 || '-';
    } else {
      return '-';
    }
  };

  const completedBy = () => {
    if (
      get(props.topic, 'attributes.start_date') &&
      get(props.topic, 'attributes.due_date')
    ) {
      const start = moment(props.topic.attributes.start_date);
      const end = moment(props.topic.attributes.due_date);
      const current = moment();
      let daysToAdd;
      if (totalCompletedCards === 0) {
        daysToAdd = end.diff(start, 'days') + 1;
      } else {
        const totalDays = current.diff(start, 'days') + 1;
        const avgCardDuration = Number(
          (totalDays / totalCompletedCards).toFixed(2)
        );
        const daysRemaining =
          (totalCards - totalCompletedCards) * avgCardDuration;
        daysToAdd = Math.floor(daysRemaining);
      }
      const actualDate = moment().add(daysToAdd, 'days');
      return `${actualDate.format('MMM Do')} (${daysToAdd || '-'} days)`;
    }
    return '-';
  };

  const daysLeft = () => {
    if (get(props.topic, 'attributes.due_date')) {
      const end = moment(props.topic.attributes.due_date);
      const current = moment();
      return end.diff(current, 'days') + 1 || '-';
    }
    return '-';
  };

  if (props.sprintBarVisible || props.showSprintBar) {
    return (
      <div className="SprintBar">
        {/* <AssigneeList
          cards={props.cards}
          topicId={topicId}
          onLoad={onCardData}
        /> */}
        <div ref={sprintBarRef} className="SprintBar__date">
          {props.topic &&
          props.topic.attributes &&
          props.topic.attributes.start_date &&
          props.topic.attributes.due_date ? (
            <Fragment>
              <div className="SprintBar__icon__wrapper">
                <div onClick={openTopicModal} className="SprintBar__icon">
                  <p className="SprintBar__icon__emoji">{flag}</p>
                  <p className="SprintBar__icon__title">START</p>
                </div>
                <div
                  style={{ left: getCurrentLeftPos() }}
                  className="SprintBar__icon SprintBar__icon-abs"
                >
                  <div className="SdivrintBar__icon__emoji SprintBar__icon__emoji-status">
                    {getCurrentEmoji()}
                  </div>
                </div>
                <div
                  onClick={openTopicModal}
                  style={{ left: getDueLeftPos() }}
                  className="SprintBar__icon SprintBar__icon-abs"
                >
                  <p className="SprintBar__icon__emoji">{calendar}</p>
                  <p className="SprintBar__icon__title">DUE</p>
                </div>
              </div>
              <div
                style={{
                  width: sprintBarRef.current
                    ? `${sprintBarRef.current.scrollWidth}px`
                    : 'auto'
                }}
                className="SprintBar__date__list"
              >
                {dateArray.map((date, index) => {
                  if (index === 0) {
                    return (
                      <Fragment key={index}>
                        <p
                          id={`sprint-date-${date.format('DD-MM-YYYY')}`}
                          className="SprintBar__date__month"
                          key={index}
                        >
                          {date.format('MMM')}
                        </p>
                        <p
                          id={`sprint-date-${date.format('DD-MM-YYYY')}`}
                          className={`SprintBar__date__date ${dateClasses(
                            date
                          )}`}
                        >
                          {date.format('DD')}
                        </p>
                      </Fragment>
                    );
                  } else if (
                    date.format('MMM') !== dateArray[index - 1].format('MMM')
                  ) {
                    return (
                      <Fragment key={index}>
                        <p className="SprintBar__date__month">
                          {date.format('MMM')}
                        </p>
                        <p
                          id={`sprint-date-${date.format('DD-MM-YYYY')}`}
                          className={`SprintBar__date__date ${dateClasses(
                            date
                          )}`}
                        >
                          {date.format('DD')}
                        </p>
                      </Fragment>
                    );
                  }
                  return (
                    <p
                      id={`sprint-date-${date.format('DD-MM-YYYY')}`}
                      className={`SprintBar__date__date ${dateClasses(date)}`}
                      key={index}
                    >
                      {date.format('DD')}
                    </p>
                  );
                })}
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="SprintBar__icon__wrapper">
                <div onClick={openTopicModal} className="SprintBar__icon">
                  <p className="SprintBar__icon__emoji">{flag}</p>
                  <p className="SprintBar__icon__title">START</p>
                </div>
                <div onClick={openTopicModal} className="SprintBar__icon">
                  <p className="SprintBar__icon__emoji">{calendar}</p>
                  <p className="SprintBar__icon__title">DUE</p>
                </div>
              </div>
              <div className="SprintBar__date__empty">
                Select start and due date
              </div>
            </Fragment>
          )}
        </div>
        <div className="SprintBar__card__wrapper">
          <div className="SprintBar__card__empty">
            {totalCards - totalCompletedCards ? (
              <div>{totalCards - totalCompletedCards} Cards to complete</div>
            ) : (
              <div>All cards completed</div>
            )}
            {(totalCompletedCards / totalCards) * 100 !== 100 && (
              <div>To be completed by {completedBy()}</div>
            )}
          </div>
          {totalCards - totalCompletedCards ? (
            <div className="SprintBar__card__days">
              <div>{daysSpent()} days past</div>
              <div>
                {Math.abs(daysLeft()) ? Math.abs(daysLeft()) : '-'} days{' '}
                {daysLeft() < 0 ? 'extra taken' : 'left'}
              </div>
            </div>
          ) : null}
        </div>
        <div className="SprintBar__percentage__wrapper">
          <div
            style={{
              width: `${completion}%`
            }}
            className="SprintBar__percentage__complete"
          />
          <div
            style={{
              left: completion > 0 ? `calc(${completion}% - 1.2%)` : '40px',
              color: completion > 0 ? '#fff' : '#ddd'
            }}
            className="SprintBar__percentage__percent"
          >
            {completion}%
          </div>
          <div className="SprintBar__percentage__total">
            {totalCompletedCards}/{totalCards}
          </div>
        </div>
        {!props.hideFilter && (
          <div className="SprintBar__filter__wrapper">
            {/* <div className="SprintBar__filter__empty">No Filter</div> */}
            <div className="SprintBar__filter__assignee">{assignee()}</div>
            <div className="SprintBar__filter__archived">
              <IconButton
                icon={
                  props.include_archived_cards
                    ? 'check_box'
                    : 'check_box_outline_blank'
                }
                onClick={() => {
                  const payload = {
                    include_archived_cards: !props.include_archived_cards
                  };
                  setUserFilterSettings(payload);
                }}
              />
              include archived cards
            </div>
          </div>
        )}
        {props.topicId && (
          <DMLoader
            dataRequirements={{
              cardsWithAttributes: {
                attributes: {
                  topicId: props.topicId
                }
              }
            }}
            loaderKey="cardsWithAttributes"
          />
        )}
      </div>
    );
  }
  return null;
};

SprintBar.defaultProps = {
  cards: []
};

SprintBar.propTypes = {
  cards: PropTypes.array.isRequired,
  topic: PropTypes.object,
  setUpdateTopicModalOpen: PropTypes.func
};

function mapState(state) {
  const {
    page: { topicId },
    cards,
    people
  } = stateMappings(state);
  const ui_settings = getUiSettings(state);
  const sprintBarVisible = ui_settings.sprint_bar_visible;
  const filter_setting = getFilterSettings(state);
  const topicCards = getCardsByTopic(state)[topicId] || [];
  const testCards = getTopicCards(state, topicId);

  return {
    include_archived_cards: filter_setting?.include_archived_cards,
    allCardsHash: cards,
    topicId,
    people,
    topicCards,
    sprintBarVisible
  };
}

export default connect(mapState, {
  setUpdateTopicModalOpen,
  setUserFilterSettings
})(SprintBar);
