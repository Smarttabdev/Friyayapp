import React, { Component } from 'react';
import moment from 'moment';
import IconButton from 'Components/shared/buttons/IconButton';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import Ability from 'Lib/ability';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { connect } from 'react-redux';
import { failure } from 'Utils/toast';

class PlanBoxCard extends Component {
  handleToggleCompleteCard = () => {
    const { updateCard, card } = this.props;

    if (Ability.can('update', 'self', card)) {
      const { completed_percentage, completion_date } = card.attributes;
      const attributes = {
        completion_date: completion_date ? null : moment().toISOString(),
        completed_percentage: completed_percentage == 100 ? 0 : 100
      };

      updateCard({ id: card.id, attributes });
    } else {
      failure("You don't have permission to complete that card!");
    }
  };

  render() {
    const { card } = this.props;
    const cardIsCompleted = card.attributes.completed_percentage == 100;
    return (
      <div className="plan_box_card">
        <div className="card_check_title">
          <IconButton
            onClick={this.handleToggleCompleteCard}
            icon={cardIsCompleted ? 'check_box' : 'check_box_outline_blank'}
            color=""
            outlined
          />
          <CardTitleLink
            card={card}
            style={{
              textDecoration: cardIsCompleted ? 'line-through' : 'none'
            }}
          />
        </div>
        <div className="due_date">
          {moment(card.attributes.due_date).format('MMMM DD')}
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  updateCard
};

export default connect(undefined, mapDispatch)(PlanBoxCard);
