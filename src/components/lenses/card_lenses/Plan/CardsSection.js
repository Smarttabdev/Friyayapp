import React, { Component } from 'react';
import SheetLens from 'Src/components/lenses/card_lenses/Sheet/SheetLens';
import { columns } from 'Src/components/lenses/card_lenses/Sheet/sheetConfig/index';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import get from 'lodash/get';
import { getNextDueDate } from 'Lib/utilities';

const sheetColumns = [columns.due_date, columns.completion];

class CardsSection extends Component {
  state = {};

  static defaultProps = {
    extraColumns: []
  };

  toggleAddCard = () => {
    this.setState(prevState => ({ displayAddCard: !prevState.displayAddCard }));
  };
  render() {
    const {
      cards,
      item,
      user,
      startDate,
      endDate,
      topicId,
      projectPlan,
      extraColumns,
      disabled,
      columnMode,
      linkingBoards
    } = this.props;

    const { displayAddCard } = this.state;
    let newCardRelationships = {};
    !projectPlan &&
      (newCardRelationships = {
        tip_assignments: {
          data: [get(item, 'id') || get(user, 'id')]
        }
      });
    const newCardAttributes = {
      start_date: startDate.format(),
      due_date: getNextDueDate(startDate).format()
    };

    const allColumns = sheetColumns.concat(extraColumns);
    return (
      <div
        className="plan_lenses-card_section"
        style={{ pointerEvents: disabled ? 'none' : undefined }}
      >
        <SheetLens
          forceColor={false}
          columns={allColumns}
          showFooter
          hideTopicSection
          {...this.props}
          topicId={projectPlan ? item.value : topicId}
          additionalClasses="ActionPlan-board"
          newCardAttributes={newCardAttributes}
          newCardRelationships={newCardRelationships}
          cardRequirements={{
            ...this.props.cardRequirements,
            ...(projectPlan || columnMode == 'allCards'
              ? {}
              : {
                  dueDateFrom: moment(this.props.startDate).toISOString(),
                  dueDateTo: moment(this.props.endDate).toISOString()
                })
          }}
          planLens
          user={item}
          dueDate={moment(endDate)}
          startDate={moment(startDate)}
          columnMode={columnMode}
          linkingBoards={linkingBoards}
        />
      </div>
    );
  }
}

const mapState = (state, props) => {
  const {
    page: { topicId }
  } = stateMappings(state);

  return {
    topicId: topicId || '0'
  };
};

export default connect(mapState)(CardsSection);
