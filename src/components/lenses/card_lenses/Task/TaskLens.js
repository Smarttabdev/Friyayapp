import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import { moveOrCopyTopicInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';
import { getSortedFilteredSearchedTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import TaskLensTopicSection from './TaskLensTopicSection';
import { scrollToShow } from 'Src/lib/utilities';

import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import {
  setUserFilterSettings,
  getFilterSettings
} from 'Src/helpers/user_config';
import cardLenses from 'Lib/config/lenses/cards';
import { stateMappings } from 'Src/newRedux/stateMappings';

class TaskLens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prev_include_subtopic_cards: '',
      showActionPlanMessage: true
    };
  }
  componentDidMount() {
    this.setState({
      prev_include_subtopic_cards: this.props.filterSettings
        ?.include_subtopic_cards
    });
    this.props.setUserFilterSettings({ include_subtopic_cards: false });
  }

  componentWillUnmount() {
    this.props.setUserFilterSettings({
      include_subtopic_cards: this.state.prev_include_subtopic_cards
    });
  }
  renderTopicSection = topic => {
    const {
      cardRequirements,
      moveOrCopyCardInOrToTopicFromDragAndDrop,
      isFilesTool,
      designType,
      isHome
    } = this.props;
    return (
      <TaskLensTopicSection
        cardRequirements={cardRequirements}
        displayHeader={true}
        key={topic.id}
        onDropCard={moveOrCopyCardInOrToTopicFromDragAndDrop}
        renderSubtopicSection={subtopic => this.renderTopicSection(subtopic)}
        topicId={topic.id}
        moveTopic={this.moveTopic}
        filesCardOnly={isFilesTool}
        showCardCounter={!isFilesTool}
        showCardDetails={isFilesTool}
        showCardFiles={isFilesTool}
        designType={designType}
        instantUpload={isFilesTool}
        isHome={isHome}
      />
    );
  };

  renderRootTopicSection = topic => {
    const {
      cardRequirements,
      moveOrCopyCardInOrToTopicFromDragAndDrop,
      isFilesTool,
      designType,
      isHome
    } = this.props;
    return (
      <TaskLensTopicSection
        cardRequirements={cardRequirements}
        displayHeader={true}
        key={topic.id}
        onDropCard={moveOrCopyCardInOrToTopicFromDragAndDrop}
        renderSubtopicSection={subtopic => this.renderTopicSection(subtopic)}
        topicId={topic.id}
        moveTopic={this.moveTopic}
        isRootBoard
        filesCardOnly={isFilesTool}
        showCardCounter={!isFilesTool}
        showCardDetails={isFilesTool}
        showCardFiles={isFilesTool}
        designType={designType}
        instantUpload={isFilesTool}
        isHome={isHome}
      />
    );
  };

  afterCardCreated = cardId => {
    if (this.props.cardsSplitScreen) {
      this.props.updateSelectedCard(cardId);
    }
    const elem = document.querySelector('.card-title.c' + cardId);
    scrollToShow(elem, 14, 24);
  };

  moveTopic = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    if (!droppedItemProps.origin) {
      droppedItemProps.origin = { topicId: this.props?.topic?.id };
    }
    this.props.moveOrCopyTopicInOrToTopicFromDragAndDrop({
      droppedItemProps,
      dropZoneProps,
      itemOrder
    });
  };

  handleHideActionMessage = ({ hideMessageUsersArray, topicId, userId }) => {
    hideMessageUsersArray.push(userId);
    mutations.setConfig({
      owner: toGid('Topic', topicId),
      config: 'hide_action_message',
      value: hideMessageUsersArray
    });
    this.setState(showActionPlanMessage => ({
      showActionPlanMessage: !showActionPlanMessage
    }));
  };

  render() {
    const {
      isHome,
      cardRequirements,
      cards,
      moveOrCopyCardInOrToTopicFromDragAndDrop,
      subtopics,
      topic,
      isFilesTool,
      containerClasses,
      designType,
      appUser,
      card_font_color
    } = this.props;
    const hideMessageUsersArray =
      topic?.attributes.configs.hide_action_message || [];

    return (
      <div
        className={`task-board ${designType &&
          `task-board-${designType}`} ${containerClasses}`}
        style={{ marginTop: 10, marginBottom: 100 }}
      >
        <ActiveFiltersPanel additionalContainerClass={'pl45 mb10'} />
        {topic && (
          <TaskLensTopicSection
            cards={cards}
            cardRequirements={cardRequirements}
            displayHeader={false}
            topicId={topic.id}
            onDropCard={moveOrCopyCardInOrToTopicFromDragAndDrop}
            isRootCard
            filesCardOnly={isFilesTool}
            showCardFiles={isFilesTool}
            designType={designType}
            showCardDetails={isFilesTool}
            isHome={isHome}
          />
        )}
        <div
          className={'root-task-board'}
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 20,
            paddingLeft: isHome ? 15 : 25
          }}
        >
          <GenericDragDropListing
            itemList={subtopics}
            itemType={dragItemTypes.TOPIC}
            draggedItemProps={{ origin: { topicId: this.props?.topic?.id } }}
            dropZoneProps={{ topicId: this.props?.topic?.id }}
            onDropItem={this.moveTopic}
            renderItem={
              topic ? this.renderRootTopicSection : this.renderTopicSection
            }
          />
        </div>
        {topic && (
          <div style={{ marginLeft: isHome ? '-10px' : 0 }}>
            <AddCardCard
              inInputMode={true}
              topicId={topic.id}
              addCardUI=" "
              fullHeight={false}
              placeholder={isFilesTool ? 'Upload file' : 'Type new Card title'}
              containerClassName="add-card-list-container"
              newDesign
              hideItemTypeDropdown={isFilesTool}
              uploadFileForm={isFilesTool}
              transparent={isFilesTool}
            />
            <AddSubtopicCard
              inInputMode={true}
              parentTopicId={topic ? topic.id : null}
              containerClassName="add-topic-form-container"
              newDesign
              tag={cardLenses[this.props.cardView].boardType}
              formPlaceholder="Add Board"
              hideItemTypeDropdown={isFilesTool}
              isFilesTool={isFilesTool}
              card_font_color={card_font_color}
              transparent={isFilesTool}
            />
          </div>
        )}

        {isFilesTool &&
          this.state.showActionPlanMessage &&
          !hideMessageUsersArray.includes(appUser.id) && (
            <p
              className={`tools-message ${this.props.topic.id == 1 &&
                'root-board'}`}
              style={{ color: card_font_color }}
            >
              Use Boards to organize your files in groups.
              <span
                className="tools-message-cta"
                onClick={() =>
                  this.handleHideActionMessage({
                    hideMessageUsersArray,
                    topicId: topic.id,
                    userId: appUser.id
                  })
                }
              >
                Hide this message
              </span>
              .
            </p>
          )}
      </div>
    );
  }
}

TaskLens.propTypes = {
  topic: PropTypes.object,
  group: PropTypes.object,
  cards: PropTypes.array.isRequired,
  isFilesTool: PropTypes.bool,
  containerClasses: PropTypes.string,
  designType: PropTypes.oneOf(['minimalist'])
};

const mapState = (state, props) => {
  const filterSettings = getFilterSettings(state);
  const sm = stateMappings(state);
  const {
    page: { isHome }
  } = sm;

  return {
    isHome,
    filterSettings,
    appUser: state.appUser,
    card_font_color: sm.utilities.active_design.card_font_color,
    subtopics:
      getSortedFilteredSearchedTopicsByParentTopic(state)[props.topic.id] || []
  };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  moveOrCopyTopicInOrToTopicFromDragAndDrop,
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(TaskLens);
