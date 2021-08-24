import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import Icon from 'Components/shared/Icon';
import calendarIcon from 'Src/assets/calendar.png';
import cactiiIcon from 'Src/assets/cactii.png';
import estimationIcon from 'Src/assets/estimation.png';
import { CurrentEmoji } from './speed';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import classname from 'classnames';
import CompletionSlider from 'Components/shared/CompletionSlider';
import Tooltip from 'Components/shared/Tooltip';

const PulseDropdown = ({
  card,
  onUpdate,
  user,
  people,
  openEditModal,
  isFixed,
  dimensions,
  style = {}
}) => {
  const [input, setInput] = useState('');
  const {
    updates,
    completed_percentage,
    start_date,
    due_date,
    resource_required,
    cactii
  } = card.attributes;
  const [overLeft, setOverLeft] = useState(false);
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  const y =
    dimensions.y - 20 > vh / 2
      ? dimensions.y - 40 - Math.min(321 + 71 * updates.length, 500)
      : dimensions.y + 40;
  useEffect(() => {
    if (dimensions.x < 600) setOverLeft(true);
  }, [dimensions]);
  const storeUpdate = e => {
    e.preventDefault();
    if (input) {
      const data = [
        ...updates,
        { user: user.id, date: moment().toISOString(), comment: input }
      ];
      onUpdate({ attributes: { updates: data } });
      setInput('');
    }
  };

  const daysLeft = () => {
    if (due_date && completed_percentage !== 100) {
      const end = moment(due_date);
      const current = moment();
      return end.diff(current, 'days') + 1 || '-';
    }
    return '-';
  };

  const hrsLeft = () => {
    if (completed_percentage === 100) {
      return <span>0 Hrs</span>;
    } else if (resource_required) {
      const singlePercent = resource_required / 100;
      const completed = singlePercent * completed_percentage;
      const estimated_remaining = resource_required - completed;
      return <span>{estimated_remaining} Hrs</span>;
    }
    return '-';
  };

  const hrsPerDay = () => {
    if (resource_required && start_date) {
      const singlePercent = resource_required / 100;
      const completed = singlePercent * completed_percentage;
      const current = moment();
      const start = moment(start_date);
      const past = current.diff(start, 'days') + 1;
      if (completed === 0 || past === 0) {
        return 0;
      }
      return (completed / past).toFixed(0) + ' Hrs';
    }
    return 'N/A';
  };

  const percentPerDay = () => {
    if (completed_percentage && start_date) {
      const current = moment();
      const start = moment(start_date);
      const past = current.diff(start, 'days') + 1;
      return (completed_percentage / past).toFixed(0);
    }
    return 0;
  };

  const getEpochs = timestamp => moment(timestamp).valueOf();
  const leftPosition =
    dimensions.x > 600 ? dimensions.x - 550 : dimensions.x - 30;
  return (
    <div
      className={classname(
        'dropdown-menu dropdown-menu-updates dropdown-menu-updates-pulse',
        { 'dropdown-menu-updates-pulse-fixed': isFixed },
        { 'dropdown-menu-updates-pulse-overleft': overLeft }
      )}
      id="domain-dropdown"
      style={{
        position: isFixed ? 'fixed' : 'absolute',
        top: isFixed && `${y}px`,
        left: isFixed && `${leftPosition}px`,
        ...style
      }}
    >
      <CompletionSlider
        showPercentage={true}
        card={card}
        value={completed_percentage}
        width="100%"
        onChange={value =>
          onUpdate({
            attributes: {
              completed_percentage: value,
              completion_date: value === 100 ? moment().toISOString() : null
            }
          })
        }
      />
      {/* <div className="pulse-comp-completion">
        <div
          style={{ width: `${completed_percentage}%` }}
          className="pulse-comp-completion-percent"
        >
          {completed_percentage > 10 && (
            <p style={{ right: '5px' }} className="pulse-comp-completion-data">
              {completed_percentage}%
            </p>
          )}
        </div>
        {completed_percentage <= 10 && (
          <p style={{ left: '5px' }} className="pulse-comp-completion-data">
            {completed_percentage}%
          </p>
        )}
      </div> */}
      <div className="pulse-comp-dates">
        <div
          onClick={openEditModal}
          className="pulse-comp-start-date flexCenter"
        >
          <img src={calendarIcon} alt="calendar" />
          {start_date
            ? moment(start_date).format("DD MMM 'YY")
            : 'Add a start date'}
        </div>
        <div
          onClick={openEditModal}
          className="pulse-comp-start-date flexCenter"
        >
          <img src={calendarIcon} alt="calendar" />
          {due_date ? moment(due_date).format("DD MMM 'YY") : 'Add a due date'}
        </div>
      </div>
      <div className="pulse-comp-stats">
        <CurrentEmoji onClick={openEditModal} card={card} />
        <div className="">{percentPerDay()}% / day</div>
        <div className="pulse-comp-stats-data">
          {completed_percentage < 100 ? hrsPerDay() : '-'} work / day
        </div>
        <div className="pulse-comp-stats-data">{hrsLeft()} work left</div>
        <div className="pulse-comp-stats-data">
          {daysLeft() < 0
            ? `${Math.abs(daysLeft())} extra days`
            : `${daysLeft()} days left`}
        </div>
      </div>
      <div className="pulse-comp-points">
        <div onClick={openEditModal} className="pulse-comp-points-data">
          <img src={estimationIcon} alt="est" />
          <p>{Number(resource_required).toFixed(0)} hrs</p>
        </div>
        <div onClick={openEditModal} className="pulse-comp-points-data">
          <img src={cactiiIcon} alt="est" />
          <p>{cactii || 0} Bonus Points</p>
        </div>
      </div>
      <div className="flexCenter">
        <form className="update-form" onSubmit={storeUpdate}>
          <input
            value={input}
            onChange={({ target: { value } }) => {
              setInput(value);
            }}
            placeholder="Write Update"
            className="update-input pulse-update-input"
          />
          <button
            type="submit"
            className="update-input-button pulse-update-input-button"
          >
            🙋
          </button>
        </form>
      </div>
      <div className="update-display-list">
        {updates
          .sort((a, b) => getEpochs(b.date) - getEpochs(a.date))
          .map((u, i) => {
            return (
              <li className="flexCenter update-display-data" key={i}>
                <UserAvatar key={i} userId={u.user} readonly />
                <div className="update-display-wrapper">
                  <p>
                    {people[u.user].attributes.first_name}{' '}
                    {moment(u.date).format('MMM DD h:mm a')}
                  </p>
                  <div className="update-display-comment">
                    <span>{u.comment}</span>
                  </div>
                </div>
              </li>
            );
          })}
      </div>
    </div>
  );
};

const pulseComponent = ({
  card,
  handleValueUpdate,
  user,
  people,
  setEditCardModalOpen,
  isFixed,
  handleClickPulse,
  size,
  style,
  additionalClasses,
  dropdownStyle = {},
  containerStyle = {}
}) => {
  const myRef = useRef(null);
  const pulseRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = e => {
    if (myRef.current && !myRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  const handlePulseIconClick = () => {
    setVisible(!visible);
    handleClickPulse != undefined && handleClickPulse != null
      ? handleClickPulse()
      : null;
  };

  const forId = Math.ceil(Math.random() * 100000, 6);

  return (
    <div
      ref={myRef}
      className={`dropdown ${visible ? 'open' : ''}`}
      style={containerStyle}
    >
      <div data-tip="Pulse" data-for={forId}>
        <Icon
          style={style}
          size={size ? size : 'small'}
          onClick={() => handlePulseIconClick()}
          icon={'track_changes'}
          id="pulse-icon"
          additionalClasses={additionalClasses || 'pulse-icon'}
        />
        <Tooltip {...{ place: 'bottom' }} id={forId} />
      </div>
      {visible && (
        <PulseDropdown
          card={card}
          user={user}
          people={people}
          onUpdate={handleValueUpdate}
          isFixed={isFixed}
          dimensions={
            myRef.current ? myRef.current.getBoundingClientRect() : {}
          }
          openEditModal={() => {
            setEditCardModalOpen({ cardId: card.id, tab: 'Plan' });
            setVisible(false);
          }}
          style={dropdownStyle}
        />
      )}
    </div>
  );
};

const mapState = state => {
  const { user, people } = stateMappings(state);
  return {
    user,
    people
  };
};

export const PulseComponent = connect(mapState, { setEditCardModalOpen })(
  pulseComponent
);

export default {
  cssModifier: 'pulse',
  display: 'Pulse',
  resizableProps: {
    minWidth: '150'
  },
  Component: PulseComponent,
  renderSummary: () => null
};
