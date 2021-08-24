import React, { Fragment, Component } from 'react';
import { array, func, object } from 'prop-types';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import IconButton from 'Components/shared/buttons/IconButton';
import GenericDropZone from 'Components/shared/drag_and_drop/GenericDropZone';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import KanbanLaneOptionsMenu from './KanbanLaneOptionsMenu';
import LabelIndicatorBar from 'Components/shared/labels/elements/LabelIndicatorBar';
import LabelSelect from 'Components/shared/labels/elements/LabelSelect';
import DMLoader from 'Src/dataManager/components/DMLoader';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { scrollToShow } from 'Src/lib/utilities';
import cx from 'classnames';
import GenericPlanningCard from 'Src/components/shared/cards/GenericPlanningCard';

class KanbanLane extends Component {
  static propTypes = {
    cards: array.isRequired,
    label: object,
    onChangeLabelForLane: func.isRequired,
    onDropCard: func
  };

  constructor(props) {
    super(props);
    this.state = {
      laneIsOpen: true,
      isEditingSelected: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.cards.length == 0 && this.props.cards.length > 0) ||
      (this.props.label && this.props.label.id == this.props.newLane)
    ) {
      if (this.state.laneIsOpen !== true) {
        this.setState({ laneIsOpen: true });
      }
    }
  }

  afterCardCreated = cardId => {
    if (this.props.cardsSplitScreen) {
      this.props.updateSelectedCard(cardId);
    }
    const elem = document.querySelector('.card-title.c' + cardId);
    scrollToShow(elem, 14, 24);
  };

  handleEditSelectedLaneLabel = () => {
    this.setState(prevState => ({
      isEditingSelected: prevState.isEditingSelected + 1
    }));
  };

  render() {
    const {
      cardRequirements,
      cards,
      label,
      onChangeLabelForLane,
      onDropCard,
      onRemoveLane,
      topicId
    } = this.props;
    const { laneIsOpen, isEditingSelected } = this.state;
    const labelId = label ? label.id : null;

    return (
      <div className={cx('kanban-lane', { 'is-open': laneIsOpen })}>
        <div
          className={cx({ flex: laneIsOpen })}
          style={{ marginLeft: laneIsOpen && '-15px' }}
        >
          {label ? (
            <Fragment>
              <LabelIndicatorBar
                additionalClassNames="kanban-lane-label-indicator"
                labels={[label]}
              />
              <GenericDropZone
                dropClassName="kanban-lane_open-close-button"
                dropsDisabled
                itemType={dragItemTypes.CARD}
                onDragEnter={() => this.setState({ laneIsOpen: true })}
              >
                <IconButton
                  additionalClasses={'medium-icon'}
                  icon={`${
                    laneIsOpen ? 'remove_circle_outline' : 'add_circle_outline'
                  }`}
                  outlined
                  onClick={() => this.setState({ laneIsOpen: !laneIsOpen })}
                />
              </GenericDropZone>
            </Fragment>
          ) : (
            <div className="kanban-lane_open-close-button">
              <IconButton
                additionalClasses={'medium-icon'}
                icon={`${
                  laneIsOpen ? 'remove_circle_outline' : 'add_circle_outline'
                }`}
                outlined
                onClick={() => this.setState({ laneIsOpen: !laneIsOpen })}
              />
            </div>
          )}

          {laneIsOpen ? (
            <div className="kanban-lane_open-header">
              <LabelSelect
                canAddOrEdit
                onSelectLabel={newLabelId =>
                  onChangeLabelForLane(label, newLabelId)
                }
                selectedLabel={label}
                isEditingSelected={isEditingSelected}
              />
              <KanbanLaneOptionsMenu
                label={label}
                onRemoveLane={onRemoveLane}
                onEditLabel={this.handleEditSelectedLaneLabel}
              />
            </div>
          ) : (
            <div className="kanban-lane_closed-header">
              <div className="kanban-lane_closed-label">
                {label
                  ? `${label.attributes.name} (${cards.length})`
                  : 'Select Label'}
              </div>
            </div>
          )}
        </div>

        {laneIsOpen && label && (
          <GenericDragDropListing
            dropClassName="kanban-view_lane-catchment"
            dragClassName="task-view_drag-card"
            dropZoneProps={{ labelId: labelId, topicId: topicId }}
            draggedItemProps={{
              origin: { labelId: labelId, topicId: topicId }
            }}
            itemContainerClassName=""
            itemList={cards}
            itemType={dragItemTypes.CARD}
            onDropItem={onDropCard}
            renderItem={card => (
              <GenericPlanningCard
                card={card}
                key={card.id}
                topicId={topicId}
              />
            )}
          >
            <AddCardCard
              cardStyle={{
                padding: '0px 6px 6px 6px'
              }}
              cardClassName="kanban-card"
              newCardRelationships={{ labels: { data: [labelId] } }}
              topicId={topicId}
              afterCardCreated={this.afterCardCreated}
              topMenu
            />

            <DMLoader
              dataRequirements={{
                cardsWithAttributes: {
                  attributes: { ...cardRequirements, labelId, topicId }
                }
              }}
              loaderKey="cardsWithAttributes"
            />
          </GenericDragDropListing>
        )}
      </div>
    );
  }
}

export default KanbanLane;
