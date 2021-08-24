import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import UserBoxHeader from './UserBoxHeader';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import CardsSection from '../CardsSection';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { columns } from 'Src/components/lenses/card_lenses/Sheet/sheetConfig/index';
import { getUiSettings } from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';

const UserBox = props => {
  const [userWorkload, setuserWorkload] = useState(0);

  const {
    item,
    cards,
    projectPlan,
    disabled,
    disableMessage,
    startDate,
    endDate,
    isExpanded,
    updateExpanded,
    columnMode,
    active_design,
    goalPlan
  } = props;

  return (
    <div className="relative">
      <div
        className="team_plan-user_box"
        style={{
          opacity: disabled ? 0.5 : undefined,
          border: `1px solid ${
            active_design.card_font_color
              ? active_design.card_font_color
              : 'rgba(0, 0, 0, 0.1)'
          }`
        }}
      >
        <UserBoxHeader
          user={item}
          cards={cards}
          {...props}
          startDate={startDate}
          endDate={endDate}
          userWorkload={userWorkload}
          handleExpandToggle={() => updateExpanded(!isExpanded)}
          isExpanded={isExpanded}
        />
        {isExpanded && (
          <CardsSection
            item={item}
            {...props}
            extraColumns={projectPlan ? [columns.assignee] : []}
            disabled={disabled}
            setUserWorkload={setuserWorkload}
            dueDate={endDate}
            startDate={startDate}
            columnMode={columnMode}
            linkingBoards={goalPlan}
          />
        )}
      </div>
      {disabled && (
        <div className="overlay flex-r-center-center pe-none">
          {isExpanded && disableMessage}
        </div>
      )}
    </div>
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    tools: { timeframe },
    page: { topicId }
  } = sm;

  const viewKey = getRelevantViewForPage(state, topicId);
  const { columnMode, startDate, endDate, offsets } =
    timeframe[viewKey] || timeframe;
  let { cards, projectPlan, item } = props;

  const checkDueDate = due_date => {
    if (!due_date) return false;
    if (columnMode != 'days') {
      const rangeDates = moment.range(startDate, endDate);
      return rangeDates.contains(moment(due_date));
    } else
      return (
        startDate.format('DD MM YYYY') == moment(due_date).format('DD MM YYYY')
      );
  };

  let filterCards;
  if (projectPlan) {
    filterCards = cards => {
      return cards.filter(card =>
        columnMode != 'allCards' ? checkDueDate(card.attributes.due_date) : true
      );
    };
    const cardsByTopic = getSortedFilteredCardsByTopic(state);
    cards = cardsByTopic[item.value] || [];
    cards = cards.filter(card => !card.relationships.follows_tip.data);
  } else {
    cards = cards
      .filter(card => !card.relationships.follows_tip.data)
      .filter(card =>
        card.relationships.tip_assignments.data.includes(item.id)
      );
    cards =
      columnMode != 'allCards'
        ? cards.filter(card => checkDueDate(card.attributes.due_date))
        : cards;
  }

  return {
    cards,
    filterCards,
    columnMode,
    startDate,
    endDate,
    offsets
  };
};

UserBox.propTypes = {
  cards: PropTypes.array,
  startDate: PropTypes.object,
  endDate: PropTypes.object
};

export default connect(mapState)(UserBox);
