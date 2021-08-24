import orderBy from 'lodash/orderBy';
import React from 'react';
import moment from 'moment';
import Icon from 'Components/shared/Icon';
import Tooltip from 'Components/shared/Tooltip';

export const getSpeedIcon = (completion, speed) => {
  if (isNaN(completion) || isNaN(speed)) {
    return getSpeedIcons('Snooze');
  } else {
    if (completion === 100) {
      return getSpeedIcons('Done');
    } else if (speed <= 1.1 && speed >= 0.9) {
      return getSpeedIcons('Horse');
    } else if (speed < 0.9 && speed >= 0.4) {
      return getSpeedIcons('Turtle');
    } else if (speed < 0.4) {
      return getSpeedIcons('Snail');
    } else if (speed > 1.1 && speed <= 1.5) {
      return getSpeedIcons('Car');
    } else {
      return getSpeedIcons('Rocket');
    }
  }
};

export const getSpeed = card => {
  const horse = '🏇';
  const car = '🏎️';
  const turtle = '🐢';
  const snail = '🐌';
  const rocket = '🚀';
  const done = '💯';
  if (
    card &&
    card.attributes &&
    ((card.attributes.completed_percentage >= 0 &&
      card.attributes.start_date &&
      card.attributes.due_date) ||
      card.attributes.completed_percentage === 100)
  ) {
    const start = moment(card.attributes.start_date, 'YYYY-MM-DD').startOf(
      'day'
    );
    const end = moment(card.attributes.due_date, 'YYYY-MM-DD').endOf('day');
    const totalDuration = Math.abs(start.diff(end, 'days')) + 1;
    const daySpent = Math.ceil(
      Math.abs(moment.duration(start.diff(moment().startOf('day'))).asDays())
    );

    const currentSpeed = (daySpent / totalDuration) * 100;
    const speed = card.attributes.completed_percentage / currentSpeed;

    if (card.attributes.completed_percentage === 100) {
      return 'Done';
    } else if (speed <= 1.1 && speed >= 0.9) {
      return 'Horse';
    } else if (speed < 0.9 && speed >= 0.4) {
      return 'Turtle';
    } else if (speed < 0.4) {
      return 'Snail';
    } else if (speed > 1.1 && speed <= 1.5) {
      return 'Car';
    } else {
      return 'Rocket';
    }
  }
  return 'Snooze';
};

export const getSpeedIcons = iconName => {
  const horse = '🏇';
  const car = '🏎️';
  const turtle = '🐢';
  const snail = '🐌';
  const rocket = '🚀';
  const done = '💯';
  switch (iconName) {
    case 'Done':
      return (
        <span className="SprintBar__icon-flip">
          <span>{done}</span>
        </span>
      );
    case 'Car':
      return (
        <span className="SprintBar__icon-flip">
          <span>{car}</span>
        </span>
      );
    case 'Turtle':
      return (
        <span className="SprintBar__icon-flip">
          <span>{turtle}</span>
        </span>
      );
    case 'Snail':
      return (
        <span className="SprintBar__icon-flip">
          <span>{snail}</span>
        </span>
      );
    case 'Rocket':
      return (
        <span className="SprintBar__icon-flip">
          <span>{rocket}</span>
        </span>
      );
    case 'Horse':
      return (
        <p className="SprintBar__icon-flip">
          <span>{horse}</span>
        </p>
      );
    default:
      return <Icon fontSize="20px" icon="snooze" color="white" />;
  }
};

export const CurrentEmoji = props => {
  const horse = '🏇';
  const car = '🏎️';
  const turtle = '🐢';
  const snail = '🐌';
  const rocket = '🚀';
  const done = '💯';
  const forId = Math.ceil(Math.random() * 100000, 6);
  if (
    props.card &&
    props.card.attributes &&
    ((props.card.attributes.completed_percentage >= 0 &&
      props.card.attributes.start_date &&
      props.card.attributes.due_date) ||
      props.card.attributes.completed_percentage === 100)
  ) {
    const start = moment(
      props.card.attributes.start_date,
      'YYYY-MM-DD'
    ).startOf('day');
    const end = moment(props.card.attributes.due_date, 'YYYY-MM-DD').endOf(
      'day'
    );
    const totalDuration = Math.abs(start.diff(end, 'days')) + 1;
    const daySpent = Math.ceil(
      Math.abs(moment.duration(start.diff(moment().startOf('day'))).asDays())
    );

    const currentSpeed = (daySpent / totalDuration) * 100;
    const speed = props.card.attributes.completed_percentage / currentSpeed;

    if (props.card.attributes.completed_percentage === 100) {
      return (
        <p data-tip={'Completed'} data-for={`scoreCard-${forId}`}>
          <span>{done}</span>
          <Tooltip {...{ place: 'bottom' }} id={`scoreCard-${forId}`} />
        </p>
      );
    } else if (speed <= 1.1 && speed >= 0.9) {
      return (
        <p
          className="SprintBar__icon-flip"
          data-tip={'On Track'}
          data-for={`scoreCard-${forId}`}
        >
          <span>{horse}</span>
          <Tooltip {...{ place: 'bottom' }} id={`scoreCard-${forId}`} />
        </p>
      );
    } else if (speed < 0.9 && speed >= 0.4) {
      return (
        <p
          className="SprintBar__icon-flip"
          data-tip={'Behind'}
          data-for={`scoreCard-${forId}`}
        >
          <span>{turtle}</span>
          <Tooltip {...{ place: 'bottom' }} id={`scoreCard-${forId}`} />
        </p>
      );
    } else if (speed < 0.4) {
      return (
        <p data-tip={'Far Behind'} data-for={`scoreCard-${forId}`}>
          <span>{snail}</span>
          <Tooltip {...{ place: 'bottom' }} id={`scoreCard-${forId}`} />
        </p>
      );
    } else if (speed > 1.1 && speed <= 1.5) {
      return (
        <p
          className="SprintBar__icon-flip"
          data-tip={'Ahead'}
          data-for={`scoreCard-${forId}`}
        >
          <span>{car}</span>
          <Tooltip {...{ place: 'bottom' }} id={`scoreCard-${forId}`} />
        </p>
      );
    } else {
      return (
        <p data-tip={'Far Ahead'} data-for={`scoreCard-${forId}`}>
          <span>{rocket}</span>
          <Tooltip {...{ place: 'bottom' }} id={`scoreCard-${forId}`} />
        </p>
      );
    }
  }
  return (
    <span data-tip={'Not Started'} data-for={`scoreCard-${forId}`}>
      <Icon
        onClick={() => props.onClick && props.onClick()}
        icon="snooze"
        color="lightblue"
      />
      <Tooltip {...{ place: 'bottom' }} id={`scoreCard-${forId}`} />
    </span>
  );
};

export default {
  cssModifier: 'speed',
  display: 'Speed',
  resizableProps: {
    minWidth: '200'
  },
  render(card) {
    return <CurrentEmoji card={card} />;
  },
  renderSummary: () => null,
  sort(cards, order) {
    return orderBy(cards, card => card.attributes.completed_percentage, order);
  }
};
