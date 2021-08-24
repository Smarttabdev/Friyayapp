import React, { useState } from 'react';
import Tiles from 'src/components/views/card_views/tiles/Tiles';
import { moveTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { dragItemTypes } from 'Components/shared/drag_and_drop/_index';
import TilesTopicViewSegment from 'src/components/views/card_views/tiles/TileTopicViewSegment';
import TilesCardViewSegment from 'src/components/views/card_views/tiles/TileCardViewSegment';
import { stateMappings } from 'Src/newRedux/stateMappings';
import TileVideoRoomsViewSegment from 'src/components/views/card_views/tiles/TileVideoRoomsViewSegment';
import TileChatsViewSegment from 'src/components/views/card_views/tiles/TileChatsViewSegment';
import TileFilesViewSegment from 'src/components/views/card_views/tiles/TileFilesViewSegment';

const ProjectHubLens = props => {
  const {
    moveTopicFromDragAndDrop,
    subtopics,
    topic,
    cards,
    projectHubLens,
    card_font_color
  } = props;
  const [showMessage, setShowMessage] = useState(true);

  const groupBy = projectHubLens.activeFilters;

  const getCardsByTypes = type => {
    if (!cards || cards.length === 0) return [];
    const cardsArray = cards.filter(card => card.attributes.card_type === type);
    return cardsArray;
  };

  const getFiles = () => {
    if (!cards || cards.length === 0) return [];
    const files = cards.filter(card => card.attributes.attachments.length > 0);
    return files;
  };

  const getBoardsByType = type => {
    if (!subtopics || subtopics.length === 0) return [];
    let boards = [];
    if (type) {
      boards = subtopics.filter(topic =>
        topic.attributes.tag_list.includes(type)
      );
    } else {
      boards = subtopics.filter(
        topic => topic.attributes.tag_list.length === 0
      );
    }
    return boards;
  };

  // cardTypes
  const regCards = [{ title: 'Cards', cards: getCardsByTypes('CARD') }];
  const taskCards = [{ title: 'Task Cards', cards: getCardsByTypes('TASK') }];
  const noteCards = [{ title: 'Note Cards', cards: getCardsByTypes('NOTES') }];
  const dataCards = [{ title: 'Data Cards', cards: getCardsByTypes('DATA') }];
  const videoRooms = [{ title: 'Video Chats', cards: [] }];
  const chats = [{ title: 'Chats', cards: [] }];
  const files = [{ title: 'Files', cards: getFiles() }];

  // boardTypes
  const regBoards = [{ title: 'Boards', cards: getBoardsByType(null) }];
  const noteBoards = [
    { title: 'Note Boards', cards: getBoardsByType('notes') }
  ];
  const fileBoards = [{ title: 'File Boards', cards: getBoardsByType('file') }];
  const taskBoards = [{ title: 'Task Boards', cards: getBoardsByType('task') }];
  const knowledgeBoards = [
    { title: 'Knowledge Boards', cards: getBoardsByType('knowledge') }
  ];
  const dataBoards = [{ title: 'Data Boards', cards: getBoardsByType('data') }];
  const goalBoards = [{ title: 'Goal Boards', cards: getBoardsByType('goal') }];
  const projectBoards = [
    { title: 'Project Boards', cards: getBoardsByType('project') }
  ];

  const renderBoardTileContent = item => {
    return <TilesTopicViewSegment key={item.title} topic={topic} list={item} />;
  };

  const renderCardTypeTileContent = item => {
    return <TilesCardViewSegment key={item.title} topic={topic} list={item} />;
  };

  const renderVideoRoomTileContent = item => {
    return <TileVideoRoomsViewSegment key={item.title} list={item} />;
  };

  const renderChatTileContent = item => {
    return <TileChatsViewSegment key={item.title} list={item} />;
  };

  const renderFIleTileContent = item => {
    return <TileFilesViewSegment key={item.title} list={item} />;
  };

  const dropZoneProps = { topicId: topic ? topic.id : null };

  const itemType = dragItemTypes.TOPIC;

  const handleDropItem = props => {
    return moveTopicFromDragAndDrop(props);
  };

  return (
    <div className="project-hub-tool">
      <div className="tile-grid-layout">
        {groupBy.includes('CARD') && (
          <Tiles
            items={regCards}
            renderItem={renderCardTypeTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('TASK_CARD') && (
          <Tiles
            items={taskCards}
            renderItem={renderCardTypeTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('NOTE_CARD') && (
          <Tiles
            items={noteCards}
            renderItem={renderCardTypeTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('DATA_CARD') && (
          <Tiles
            items={dataCards}
            renderItem={renderCardTypeTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('FILE_CARD') && (
          <Tiles
            items={files}
            renderItem={renderFIleTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('CHAT_CARD') && (
          <Tiles
            items={chats}
            renderItem={renderChatTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('VIDEO_CHAT_CARD') && (
          <Tiles
            items={videoRooms}
            renderItem={renderVideoRoomTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('BOARD') && (
          <Tiles
            items={regBoards}
            renderItem={renderBoardTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('PROJECT_BOARD') && (
          <Tiles
            items={projectBoards}
            renderItem={renderBoardTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('GOAL_BOARD') && (
          <Tiles
            items={goalBoards}
            renderItem={renderBoardTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('NOTE_BOARD') && (
          <Tiles
            items={noteBoards}
            renderItem={renderBoardTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('FILE_BOARD') && (
          <Tiles
            items={fileBoards}
            renderItem={renderBoardTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('KNOWLEDGE_BOARD') && (
          <Tiles
            items={knowledgeBoards}
            renderItem={renderBoardTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('TASK_BOARD') && (
          <Tiles
            items={taskBoards}
            renderItem={renderBoardTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
        {groupBy.includes('DATA_BOARD') && (
          <Tiles
            items={dataBoards}
            renderItem={renderBoardTileContent}
            dropZoneProps={dropZoneProps}
            onDropItem={handleDropItem}
            itemType={itemType}
          />
        )}
      </div>
      {showMessage && (
        <div className="project-hub-tool__message">
          <p style={{ color: card_font_color || '#b8b8b8' }}>
            Use Cards for tasks and notes. Use Boards to organize your cards in
            groups. Customize which Card and Board Types to show by clicking on
            the gear icon on the top right.{' '}
            <span onClick={() => setShowMessage(false)}>
              Hide this message.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const dataRequirements = ({ topicId, cardRequirements }) => ({
  cardsWithAttributes: {
    attributes: {
      ...cardRequirements,
      topicId
    }
  }
});

const mapState = state => {
  const {
    page: { topicId },
    utilities: { active_design },
    tools: { projectHubLens }
  } = stateMappings(state);

  return {
    card_font_color: active_design?.card_font_color || null,
    topicId,
    projectHubLens
  };
};

const mapDispatch = {
  moveTopicFromDragAndDrop
};

export default withDataManager(dataRequirements, mapState, mapDispatch, {
  dontShowLoadingIndicator: false
})(ProjectHubLens);
