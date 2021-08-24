import classNames from 'classnames';
import React, { Component, Fragment } from 'react';
import get from 'lodash/get';
import { array, func, number, object, string, bool } from 'prop-types';
import { connect } from 'react-redux';

import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone.js';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import CardActions from 'Components/shared/cards/elements/assemblies/CardActions';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import CardLabels from 'Components/shared/cards/elements/assemblies/CardLabels';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import CardTopicLink from 'Components/shared/cards/elements/CardTopicLink';
import IconButton from 'Components/shared/buttons/IconButton';
import GridCardAttachmentDropOptions from 'Components/lenses/card_lenses/Grid/GridCardAttachmentDropOptions';
import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import {
  nestCardUnderCard as nestCardUnderCardAction,
  updateCard
} from 'Src/newRedux/database/cards/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import GenericCard from 'Components/lenses/card_lenses/GenericCard';
import { PulseComponent } from 'Src/components/lenses/card_lenses/Sheet/sheetConfig/pulse';
import tiphive from 'Lib/tiphive';
import DocumentIcon from 'Components/shared/documents/document_icon';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import { getUiSettings } from 'Src/helpers/user_config';
class ListCard extends GenericCard {
  constructor(props) {
    super(props);
    // this.labelRef = React.createRef();
    // this.actionsRef = React.createRef();
  }
  static defaultProps = { dragLeaveHandlersForParentLists: [], level: 0 };

  static propTypes = {
    allCardsHash: object.isRequired,
    card: object.isRequired,
    dragLeaveHandlersForParentLists: array,
    level: number,
    nestCardUnderCard: func.isRequired,
    topicId: string,
    showCardFileList: bool,
    showCardDetails: bool,
    filesCardOnly: bool
  };

  state = {
    showNestedCards: false,
    isAttachmentHoveringOnCard: false,
    showNewCardInput: false
  };

  handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    this.props.nestCardUnderCard({
      nestedCard: droppedItemProps.item,
      parentCard: this.props.allCardsHash[dropZoneProps.cardId],
      fromTopicId: droppedItemProps.origin.topicId,
      toTopicId: dropZoneProps.topicId,
      itemOrder
    });
  };

  handleNewCardInputButtonClick = () => {
    this.setState(state => ({
      showNestedCards: true,
      showNewCardInput: !state.showNewCardInput
    }));
  };

  toggleAttachmentHoveringOnCard = status => {
    this.setState({ isAttachmentHoveringOnCard: status });
  };

  handleValueUpdate = updates => {
    this.props.updateCard({ id: this.props.card.id, ...updates });
  };

  adjustLabel = () => {
    // const actionsRef = this.actionsRef.current;
    // const actionRefWidth = actionsRef.offsetWidth;
    // const labelRef = this.labelRef.current;
    // labelRef.style.right = `${actionRefWidth + 23}px`;
  };

  componentDidMount() {
    this.adjustLabel();
  }

  render() {
    if (!this.props.card.attributes) return <div>Missing item attributes</div>;

    const {
      props: {
        allCardsHash,
        card: {
          attributes: { creator, slug, title, attachments = [] },
          id: cardId,
          relationships: {
            nested_tips,
            topics: {
              data: [defaultTopicId]
            }
          }
        },
        active_design: { card_font_color },
        card,
        dragLeaveHandlersForParentLists,
        level,
        topicId,
        useLevel,
        filesCardOnly,
        showCardFileList,
        showCardDetails,
        currentView
      },
      state: { isAttachmentHoveringOnCard, showNestedCards }
    } = this;

    const className = classNames('list-card', {
      'show-caret': !showNestedCards
    });

    const levelMargin = level * 42;

    const nestedCards = nested_tips.data
      .map(nestedCardId => allCardsHash[nestedCardId])
      .filter(nestedCard => !!nestedCard);

    const card_type = card.attributes.card_type;
    return (
      <Fragment>
        <GenericDropZone
          dropClassName="list-card-item_section"
          onDragEnter={() => this.toggleAttachmentHoveringOnCard(true)}
          onDragLeave={() => this.toggleAttachmentHoveringOnCard(false)}
          dropsDisabled
          itemType={dragItemTypes.FILE}
          style={{
            borderTop:
              filesCardOnly && card_font_color && `solid 1px ${card_font_color}`
          }}
        >
          <div
            className={className}
            style={
              useLevel && {
                marginLeft: `${levelMargin}px`
                // width: `calc(100% - ${levelMargin}px`
              }
            }
          >
            <div
              className={`list-card__wrapper ${this.props.topicId == 1 &&
                'root-board'}`}
            >
              <GenericDropZone
                onDragStart={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDragEnter={attrs => this.showAsNestable(attrs)}
                onDragLeave={attrs => this.dontShowAsNestable(attrs)}
                itemType={dragItemTypes.CARD}
                onDrop={this.handleNestCard}
                key="nest-zone"
              >
                <div className="nest-zone">
                  <IconButton
                    additionalClasses="list-card__nested-cards-caret dark-grey-icon-button"
                    fontAwesome
                    icon={showNestedCards ? 'caret-down' : 'caret-right'}
                    onClick={this.handleNestedCardsCaretClick}
                    color={filesCardOnly && card_font_color}
                  />
                </div>
              </GenericDropZone>
              <div className="card-title-container">
                <div className="list-card_title-topic-container">
                  <div className="mr10">
                    <CardTitleLink
                      card={card}
                      showCardTypeIcon
                      cardTypeIconSize={currentView == 'TASK' ? 16 : 18}
                      color={filesCardOnly && card_font_color}
                      truncate
                    />
                  </div>
                  {isAttachmentHoveringOnCard ? (
                    <div className="list-card_file-dropzone">
                      <GridCardAttachmentDropOptions
                        card={card}
                        board="list-card"
                      />
                    </div>
                  ) : (
                    !showCardDetails && (
                      <div className="list-card__nested-cards-add">
                        <IconButton
                          icon="add"
                          onClick={this.handleNewCardInputButtonClick}
                          additionalClasses="small"
                        />

                        <CardActionsDropdown
                          card={card}
                          onAddCard={this.handleNewCardInputButtonClick}
                          isSmall
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
              {showCardFileList && (
                <div className="card-file-list">
                  {attachments.map(attachment => (
                    <div key={attachment.id} className="attachment-file">
                      <span className="mr10">
                        <DocumentIcon
                          documentName={tiphive.baseName(attachment.file.url)}
                          style={filesCardOnly && { color: card_font_color }}
                        />
                      </span>
                      <a
                        href={attachment.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {tiphive.baseName(attachment.file.url)}
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {showCardDetails && (
                // {/* <div ref={this.labelRef} className="list-card_label-container">
                //   <CardLabels card={card} expandDirection="left" />
                // </div> */}
                <div
                  ref={this.actionsRef}
                  className="list-card_actions-container"
                >
                  {/* <CardActions card={card} />
                <PulseComponent
                  card={card}
                  handleValueUpdate={this.handleValueUpdate}
                /> */}
                  <div
                    className="card-date"
                    style={filesCardOnly && { color: card_font_color }}
                  >
                    {moment(card.attributes.created_at).format('MMM D, YY')}
                  </div>
                  <UserAvatar
                    user={card.attributes.creator}
                    extraClass="flex-r-center-center"
                    size={24}
                  />

                  <CardActionsDropdown
                    card={card}
                    onAddCard={this.handleNewCardInputButtonClick}
                    color={filesCardOnly && card_font_color}
                  />
                </div>
              )}
            </div>
          </div>
          {showNestedCards && (
            <GenericDragDropListing
              dragClassName="task-view_drag-card"
              draggedItemProps={{ origin: { topicId, cardId } }}
              dropClassName="wiki-list_topic-dropzone"
              dropZoneProps={{ topicId, cardId }}
              itemList={
                filesCardOnly
                  ? nestedCards.filter(
                      card => card.attributes.attachments.length > 0
                    )
                  : nestedCards
              }
              itemType={dragItemTypes.CARD}
              onDropItem={this.handleDropCard}
              parentListDragLeaveHandlers={dragLeaveHandlersForParentLists}
              renderItem={(nestedCard, dragHandlers) => (
                <ConnectedListCard
                  card={nestedCard}
                  dragLeaveHandlersForParentLists={dragHandlers}
                  key={nestedCard.id}
                  level={level + 1}
                  topicId={topicId || defaultTopicId}
                  useLevel={useLevel}
                  showCardFileList={showCardFileList}
                  showCardDetails={showCardDetails}
                />
              )}
            >
              {this.state.showNewCardInput && (
                <AddCardCard
                  cardStyle={
                    useLevel
                      ? {
                          marginBottom: '10px',
                          marginLeft: `${levelMargin + 56}px`
                        }
                      : { marginLeft: '1.85rem' }
                  }
                  inInputMode
                  newCardRelationships={{ follows_tip: { data: card.id } }}
                  topicId={topicId}
                  onDismiss={this.handleNewCardInputButtonClick}
                  topMenu={true}
                  transparent
                />
              )}
            </GenericDragDropListing>
          )}
        </GenericDropZone>
      </Fragment>
    );
  }
}

function mapState(state) {
  const sm = stateMappings(state);
  const ui_settings = getUiSettings(state);
  const currentView = ui_settings.current_active_template;
  return {
    allCardsHash: sm.cards,
    active_design: sm.utilities.active_design,
    currentView
  };
}

const mapDispatch = { nestCardUnderCard: nestCardUnderCardAction, updateCard };

const ConnectedListCard = connect(mapState, mapDispatch)(ListCard);

export default ConnectedListCard;
