import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardDetails from 'Components/lenses/card_lenses/Card/CardDetails';
import NotesList from './NotesList';
import IconButton from 'Components/shared/buttons/IconButton';
import Search from './Search';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  updateTopic,
  createTopic,
  getTopic,
  getTopics
} from 'Src/newRedux/database/topics/thunks';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import { PickBoardDropdown } from 'Components/shared/PickBoardButton';
import PropTypes from 'prop-types';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import DMLoader from 'Src/dataManager/components/DMLoader';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import CardList from './CardList';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import ActiveFilterMessages from 'Components/shared/filters/ActiveFilterMessages';

function MyNotesLens(props) {
  const [topicDropdown, settopicDropdown] = useState(false);
  const [hideTopicSelector, sethideTopicSelector] = useState(true);
  const [selectedCard, setselectedCard] = useState(null);
  const {
    topic,
    topics,
    updateTopic,
    createTopic,
    getTopic,
    getTopics,
    user,
    subtopics,
    cardRequirements,
    moveOrCopyCardInOrToTopicFromDragAndDrop,
    isNotebook = false,
    isKnowledgeBase = false,
    containerClasses,
    cards
  } = props;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTopics({ tagged: ['notes'] });
    const hasDefaultBoards = Object.keys(topics).some(key => {
      if (
        topics[key].attributes.tag_list?.indexOf(
          `user-${user.id}-default-notes`
        ) >= 0
      ) {
        return true;
      }
    });

    if (
      topic?.id == 1 && //only if on root/main board
      !isKnowledgeBase &&
      !isNotebook &&
      !hasDefaultBoards
    ) {
      // const parent_id = cardRequirements?.topicId || null;
      const newTopic = {
        attributes: {
          title: `${user.attributes.first_name}'s Notes`,
          tag_list: [`user-${user.id}-default-notes`, 'notes']
        },
        relationships: {
          share_settings: {
            data: [
              {
                sharing_object_id: 'private'
              }
            ]
          }
        }
      };
      createTopic(newTopic);
    }
  }, []);

  useEffect(() => {
    const getFirstCardId = cards.filter(card => {
      if (!isNotebook && !isKnowledgeBase) {
        //if my notes tool filter topic that created by current user
        return card.attributes.creator.id == user.id;
      } else {
        return true;
      }
    })[0]?.id;

    if (!selectedCard) setselectedCard(getFirstCardId);
  }, [cards]);

  const onInputFocus = () => {
    setTimeout(() => {
      sethideTopicSelector(false);
    });
  };

  const handleTopicSelected = async list => {
    await getTopic({ topicId: list[list.length - 1].value });
    const topic = topics[list[list.length - 1].value];
    let attributes;
    if (isKnowledgeBase) {
      if (topic.attributes.tag_list.indexOf('knowledge') < 0) {
        attributes = {
          tag_list: [...topic.attributes.tag_list, 'knowledge']
        };
      }
    } else {
      // if ('tag_list' in topic.attributes) {
      //set notes if tag_list doesn't has 'notes'
      if (topic.attributes.tag_list.indexOf('notes') < 0) {
        attributes = {
          tag_list: [...topic.attributes.tag_list, 'notes']
        };
      }
    }
    await updateTopic({ id: topic.id, attributes });
    // } else {
    //   const nestedTopic = await getTopic({
    //     topicId: list[list.length - 1].value
    //   });
    //   const attributes = {
    //     ...nestedTopic.attributes,
    //     tag_list: [...nestedTopic.attributes.tag_list, 'notes']
    //   };
    //   await updateTopic({ id: nestedTopic.id, attributes });
    // }
  };
  const renderNotesList = topic => {
    if (!topic.attributes?.parent_id) {
      if (
        //check sharing_object_id for temporary solution for show board API error
        topic.attributes?.tag_list?.indexOf('notes') >= 0
        //temp solution for private board bugs
        // && topic.relationships?.share_settings.data[0].sharing_object_id == 'private'
      )
        return (
          <NotesList
            handleRemoveBoard={handleRemoveBoard}
            userId={user.id}
            topicId={topic.id}
            key={topic.id}
            cardRequirements={cardRequirements}
            onDropCard={moveOrCopyCardInOrToTopicFromDragAndDrop}
            renderSubtopicSection={subtopic => renderNotesList(subtopic)}
            handleCardDetails={setselectedCard}
            selectedCard={selectedCard}
            isKnowledgeBase={isKnowledgeBase}
          />
        );
    } else {
      return (
        <NotesList
          handleRemoveBoard={handleRemoveBoard}
          userId={user.id}
          topicId={topic.id}
          key={topic.id}
          cardRequirements={cardRequirements}
          onDropCard={moveOrCopyCardInOrToTopicFromDragAndDrop}
          renderSubtopicSection={subtopic => renderNotesList(subtopic)}
          handleCardDetails={setselectedCard}
          selectedCard={selectedCard}
          isKnowledgeBase={isKnowledgeBase}
        />
      );
    }
  };

  const renderNestedCard = card => {
    return (
      <CardList
        card={card}
        topicId={topic.id}
        handleCardDetails={setselectedCard}
        selectedCard={selectedCard}
        renderItem={card => renderNestedCard(card)}
      />
    );
  };

  const handleRemoveBoard = topic => {
    const attributes = {
      tag_list: isKnowledgeBase
        ? topic.attributes.tag_list.filter(tag => tag != 'knowledge')
        : topic.attributes.tag_list.filter(tag => tag != 'notes')
    };
    updateTopic({ id: topic.id, attributes });
  };
  return (
    <>
      <ActiveFiltersPanel additionalContainerClass={'pl30 mb10'} />
      <div className={`my-notes-container ${containerClasses}`}>
        <div className="notes-list-container">
          <div className="notes-list-topbar">
            <div className="add-boards">
              <div>
                {/* <IconButton
                color="#6fcf97"
                icon="add_circle"
                containerClasses="notes-list-topbar"
                tooltip={
                  isKnowledgeBase ? 'Add Knowledge Board' : 'Add Notes Board'
                }
                onClick={() => settopicDropdown(!topicDropdown)}
              /> */}

                <AddCardOrSubtopic
                  icon="add_circle"
                  color="#6fcf97"
                  additionalClasses="notes-list-topbar"
                  topic={topic}
                  displayAddCardButton
                  displayAddSubtopicButton
                  hideOtherButton
                  cardTypeFilter={['NOTES']}
                  boardTypeFilter={isKnowledgeBase ? ['knowledge'] : ['notes']}
                  isPrivate={!isNotebook && !isKnowledgeBase}
                  PickAnExistingBoard={() => (
                    <PickBoardDropdown
                      open={true}
                      onClose={() => settopicDropdown(false)}
                      parentTopic={topic}
                      panelProps={{
                        actionButtonLabel: 'Select Board',
                        isNotes: true,
                        isMyNotes: !isNotebook && !isKnowledgeBase,
                        boardTypeSmallModal: true,
                        onSelectTopic: handleTopicSelected,
                        topicsSelectMenuProps: {
                          allowSelectBoard: true
                        }
                      }}
                    />
                  )}
                />
                {/* <PickBoardDropdown
                open={topicDropdown}
                onClose={() => settopicDropdown(false)}
                parentTopic={topic}
                panelProps={{
                  actionButtonLabel: 'Select Board',
                  isNotes: true,
                  isMyNotes: !isNotebook && !isKnowledgeBase,
                  boardTypeSmallModal: true,
                  onSelectTopic: handleTopicSelected,
                  topicsSelectMenuProps: {
                    allowSelectBoard: true
                  }
                }}
              /> */}
              </div>
            </div>
            <Search handleSearchQuery={setSearchQuery} />
          </div>
          {/* render nested topics */}
          <div className="notes-list-items-container">
            <div className="notes-list root-card">
              <GenericDragDropListing
                itemContainerClassName=""
                itemList={cards.filter(card =>
                  card.attributes.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )}
                dropClassName="task-board-card-list"
                dragClassName="task-view_drag-card"
                dropZoneProps={{ topicId: topic.id }}
                draggedItemProps={{ origin: { topicId: topic.id } }}
                itemType={dragItemTypes.CARD}
                onDropItem={moveOrCopyCardInOrToTopicFromDragAndDrop}
                selectedCard={selectedCard}
                renderItem={card => renderNestedCard(card)}
              >
                <DMLoader
                  dataRequirements={{
                    cardsWithAttributes: {
                      attributes: { ...cardRequirements, topicId: topic.id }
                    },
                    subtopicsForTopic: { topicId: topic.id }
                  }}
                  loaderKey="cardsWithAttributes"
                />
              </GenericDragDropListing>
            </div>
            {subtopics
              .filter(subtopic =>
                subtopic.attributes.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .sort(subtopic =>
                subtopic.attributes.tag_list?.indexOf(
                  `user-${user.id}-default-notes`
                )
              )
              .reverse()
              .map(subtopic => renderNotesList(subtopic))}

            <ActiveFilterMessages
              containerClasses="my10 mx25"
              containerStyles={{ marginTop: 7 }}
              showMainFilters
              showingTitle={isKnowledgeBase && 'Knowledge Boards'}
            />
          </div>
          {/* <div>
          {queryRenderer({
            query: graphql`
              query MyNotesLensQuery($havingTips: JSON) {
                ...TopicList_topicsQuery @arguments(havingTips: $havingTips)
              }
            `,
            vars: { havingTips },
            render: ({ props }) => (
              <TopicList
                topicsQuery={props}
                searchQuery={searchQuery}
                tipsFilter={havingTips.filter}
                // onTipClick={handleSelectTip}
              />
            )
          })}
        </div> */}
        </div>
        {selectedCard && (
          <div className="notes-preview">
            <CardDetails
              rootContainerClass="my-notes-container"
              cardId={selectedCard}
              showMinMax
            />
          </div>
        )}
      </div>
    </>
  );
}

MyNotesLens.propTypes = {
  containerClasses: PropTypes.string,
  isNotebook: PropTypes.bool,
  isKnowledgeBase: PropTypes.bool
};

const mapState = (state, props) => {
  const {
    topics,
    user,
    page: { topicId }
  } = stateMappings(state);
  const topic = topics[topicId];
  return {
    topic,
    topics,
    cards:
      getSortedFilteredCardsByTopic(state)[props.topicId] || props.cards || [],
    user
  };
};

const mapDispatch = {
  updateTopic,
  createTopic,
  getTopic,
  getTopics,
  moveOrCopyCardInOrToTopicFromDragAndDrop
};

export default connect(mapState, mapDispatch)(MyNotesLens);
