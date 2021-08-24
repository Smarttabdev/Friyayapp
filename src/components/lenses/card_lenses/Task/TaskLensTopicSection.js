import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { updateTopic, viewTopic } from 'Src/newRedux/database/topics/thunks';
import ListCard from '../List/ListCard';
import FormInput from 'Components/shared/forms/FormInput';
import Tooltip from 'Components/shared/Tooltip';
import GenericDropZone from 'Components/shared/drag_and_drop/GenericDropZone';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import DMLoader from 'Src/dataManager/components/DMLoader';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';
import TopicActionsDropdown from 'Components/shared/topics/elements/TopicActionsDropdown';
import TopicTitleEditor from 'Src/components/shared/topics/elements/TopicTitleEditor';
import TopicTitleLink from 'Src/components/shared/topics/elements/TopicTitleLink';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import Icon from 'Components/shared/Icon';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import { getBoardTypeAttributes } from 'Src/utils/icons';
import { getBoardType, convertTypeIntoNormalString } from 'Lib/utilities';

class TaskLensTopicSection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inEditMode: false,
      sectionIsOpen: !props.displayHeader,
      topicTitle: props.topic.attributes.title,
      inCardInputMode: false,
      inSubtopicInputMode: false,
      timeoutID: null,
      totalCard: props.topic.attributes.tip_count
    };
  }

  handleSaveTopicWithNewTitle = async () => {
    const {
      state: { topicTitle },
      props: { topicId, updateTopic }
    } = this;
    const attributes = { title: topicTitle };
    updateTopic({ id: topicId, attributes });
    this.setState({ cardTitle: '', isSaving: false });
    this.handleToggleTopicNameEditMode();
  };

  handleToggleTopicNameEditMode = () => {
    this.setState(state => ({
      inEditMode: !state.inEditMode,
      topicTitle: this.props.topic.attributes.title
    }));
  };

  handleSetTopicTitle = topicTitle => {
    this.setState({ topicTitle });
  };

  handleToggleSectionOpen = open => {
    this.setState(state => ({ sectionIsOpen: open }));
  };

  handleTopicTitleClick = () => {
    const { topic, viewTopic } = this.props;
    viewTopic({ topicSlug: topic.attributes.slug });
  };

  handleAddCardOrSubtopic = (id, type) => {
    type === 'card'
      ? this.setState(state => ({
          inCardInputMode: !state.inCardInputMode,
          inSubtopicInputMode: false,
          sectionIsOpen: true
        }))
      : this.setState(state => ({
          inSubtopicInputMode: !state.inSubtopicInputMode,
          inCardInputMode: false,
          sectionIsOpen: true
        }));
  };

  handleTimeoutIDChange = timeoutID => {
    this.setState({ timeoutID });
  };

  getClickHandler = () => {
    const { timeoutID } = this.state;
    const { viewTopic, topic } = this.props;
    const delay = 250;
    if (!timeoutID) {
      this.handleTimeoutIDChange(
        window.setTimeout(() => {
          viewTopic({ topicSlug: topic.attributes.slug });
          this.handleTimeoutIDChange(null);
        }, delay)
      );
    } else {
      this.handleTimeoutIDChange(window.clearTimeout(timeoutID));
    }
  };

  handleTitleLinkDoubleClick = () => {
    this.setState({ inEditMode: !this.state.inEditMode });
  };

  totalCardHandler = () => {
    this.setState({ totalCard: this.state.totalCard + 1 });
  };

  render() {
    const {
      cards = [],
      cardRequirements,
      displayHeader,
      dmLoading,
      onDropCard,
      renderSubtopicSection,
      subtopics,
      topic,
      topicId,
      moveTopic,
      level,
      isRootCard,
      isRootBoard,
      filesCardOnly,
      showCardCounter = true,
      showCardDetails,
      showCardFiles,
      designType,
      card_font_color,
      isHome
    } = this.props;
    const { inEditMode, sectionIsOpen, topicTitle } = this.state;

    return (
      <div
        className="task-lens-child-board-section-container task-lens-board-section-container"
        style={isRootCard && { marginLeft: isHome ? 0 : 10, marginRight: 10 }}
      >
        {displayHeader && (
          <div
            className={`${sectionIsOpen &&
              'task-board-subtopic-header-open'} task-board-subtopic-header ${this
              .props.cardRequirements?.topicId == 1 && 'root-board'}`}
            style={{
              borderTop:
                filesCardOnly &&
                card_font_color &&
                `solid 1px ${card_font_color}`
            }}
          >
            <span className="task-board-subtopic-title">
              <Fragment>
                <GenericDropZone
                  dropClassName={`${isRootBoard ||
                    (Boolean(topic.attributes?.ancestry) &&
                      'list-nested-caret')} ${sectionIsOpen &&
                    'list-caret-down'} list-caret`}
                  dropsDisabled={true}
                  itemType={dragItemTypes.CARD}
                  onDragEnter={() => this.handleToggleSectionOpen(true)}
                >
                  <i
                    className={`fa ${
                      sectionIsOpen ? 'fa-caret-down' : 'fa-caret-right'
                    }`}
                    onClick={() => this.handleToggleSectionOpen(!sectionIsOpen)}
                    style={filesCardOnly && { color: card_font_color }}
                  />
                </GenericDropZone>
                <div
                  data-tip={convertTypeIntoNormalString(
                    getBoardType(topic),
                    'board'
                  )}
                  data-for={topic.id}
                >
                  <Icon
                    containerClasses="ml10"
                    style={{
                      fontSize: !getBoardType(topic) ? '16px' : '18px'
                    }}
                    icon={getBoardTypeAttributes(getBoardType(topic)).icon}
                    fontAwesome={
                      getBoardTypeAttributes(getBoardType(topic)).fontAwesome
                    }
                    color={
                      (filesCardOnly && card_font_color) ||
                      getBoardTypeAttributes(getBoardType(topic)).color
                    }
                    outlined={
                      getBoardTypeAttributes(getBoardType(topic)).outlined
                    }
                  />
                  <Tooltip place="bottom" id={topic.id} />
                </div>
                {inEditMode ? (
                  <div className="list-tool-board-title-editor">
                    <TopicTitleEditor
                      topic={topic}
                      onFinishEditing={this.handleToggleTopicNameEditMode}
                      color={filesCardOnly && card_font_color}
                    />
                  </div>
                ) : (
                  <>
                    <TopicTitleLink
                      additionalClasses={`task-view_topic-title-link t${topic.id}`}
                      topic={topic}
                      onClick={this.getClickHandler}
                      onDoubleClick={this.handleTitleLinkDoubleClick}
                      hideActivityIndicator
                      color={filesCardOnly && card_font_color}
                    />
                    <div className="list-tool-board-action">
                      <AddCardOrSubtopic
                        additionalEffects={() => {
                          this.totalCardHandler(),
                            this.setState({ sectionIsOpen: true });
                        }}
                        secondaryIcon
                        displayAddCardButton
                        displayAddSubtopicButton
                        addBothText=" "
                        topic={topic}
                        handleAddCardOrSubtopic={this.handleAddCardOrSubtopic}
                        instantUpload={this.props.instantUpload}
                        color={filesCardOnly && card_font_color}
                      />
                      <TopicActionsDropdown
                        topic={topic}
                        onRenameTopicSelected={
                          this.handleToggleTopicNameEditMode
                        }
                        isSmall
                        color={filesCardOnly && card_font_color}
                      />
                    </div>
                  </>
                )}
              </Fragment>
            </span>
            {showCardCounter && (
              <span className="task-board-subtopic-card-count">
                {this.state.totalCard} Cards
              </span>
            )}
          </div>
        )}
        {(sectionIsOpen || !displayHeader) && (
          <div className="list-topic-section-container">
            {!designType && isRootBoard && (
              <div className="list-topic-purple-padding"></div>
            )}
            {Boolean(topic.attributes?.ancestry) ||
              (!designType && !isRootCard && (
                <div className="list-topic-purple-padding"></div>
              ))}
            <div
              className={
                isRootCard
                  ? 'list-board root-list-card'
                  : 'task-view_section-container'
              }
              style={isRootCard && { paddingBottom: 0, paddingLeft: 15 }}
            >
              <GenericDragDropListing
                itemContainerClassName=""
                itemList={
                  filesCardOnly
                    ? cards.filter(
                        card => card.attributes.attachments.length > 0
                      )
                    : cards
                }
                dropClassName={`task-board-card-list ${
                  displayHeader ? 'subtopic' : ''
                } `}
                dragClassName="task-view_drag-card"
                dropZoneProps={{ topicId: topicId }}
                draggedItemProps={{ origin: { topicId: topicId } }}
                itemType={dragItemTypes.CARD}
                onDropItem={onDropCard}
                renderItem={card => (
                  <ListCard
                    card={card}
                    topicId={topicId}
                    useLevel={isRootCard}
                    filesCardOnly={filesCardOnly}
                    showCardFileList={showCardFiles}
                    showCardDetails={showCardDetails}
                  />
                )}
              >
                {/* render children even if cards = 0, to fix drop cards to empty board issue */}
                {cards.length == 0 && <span>&nbsp;</span>}

                <DMLoader
                  dataRequirements={{
                    cardsWithAttributes: {
                      attributes: { ...cardRequirements, topicId }
                    },
                    subtopicsForTopic: { topicId }
                  }}
                  loaderKey="cardsWithAttributes"
                />
                {renderSubtopicSection && (
                  <AddCardCard
                    inInputMode={this.state.inCardInputMode}
                    topicId={topicId}
                    onDismiss={this.handleNewCardInputButtonClick}
                    addCardUI=" "
                    fullHeight={false}
                  />
                )}
                {/* {renderSubtopicSection && (
                  <AddSubtopicCard
                    inInputMode={this.state.inSubtopicInputMode}
                    parentTopicId={topic ? topic.id : null}
                  />
                )} */}
              </GenericDragDropListing>

              <div className="task-view_child-container">
                {renderSubtopicSection && (
                  <GenericDragDropListing
                    itemList={subtopics}
                    itemType={dragItemTypes.TOPIC}
                    draggedItemProps={{ origin: { topicId } }}
                    dropZoneProps={{ topicId }}
                    onDropItem={moveTopic}
                    renderItem={renderSubtopicSection}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

TaskLensTopicSection.propTypes = {
  isRootBoard: PropTypes.bool,
  isRootCard: PropTypes.bool,
  filesCardOnly: PropTypes.bool,
  showCardCounter: PropTypes.bool,
  showCardDetails: PropTypes.bool,
  showCardFiles: PropTypes.bool
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const topic = sm.topics[props.topicId];
  return {
    cards:
      getSortedFilteredCardsByTopic(state)[props.topicId] || props.cards || [],
    subtopics: getSortedFilteredTopicsByParentTopic(state)[props.topicId] || [],
    topic: topic,
    card_font_color: sm.utilities.active_design.card_font_color
  };
};

const mapDispatch = {
  updateTopic,
  viewTopic
};

export default connect(mapState, mapDispatch)(TaskLensTopicSection);
