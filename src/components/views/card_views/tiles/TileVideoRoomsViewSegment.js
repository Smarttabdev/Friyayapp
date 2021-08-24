import React, { useEffect, useState, Fragment } from 'react';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  getVideoRoomsForTopic,
  getVideoRoomArray
} from 'Src/newRedux/database/cards/selectors';
import IconButton from 'Components/shared/buttons/IconButton';
import CardTitleLink from 'src/components/shared/cards/elements/CardTitleLink';
import CreateVideoRoomCard from 'src/components/shared/video_rooms/CreateVideoRoomCard';
import { setShowVideoRoomModal } from 'Src/newRedux/interface/modals/actions';
import { viewPayload } from 'Src/utils/views';
import { setUserUiSettings, getUiSettings } from 'Src/helpers/user_config';
import { setUserLensPinSettings } from 'Src/newRedux/database/topics/thunks';

const TileVideoRoomsViewSegment = ({
  videoRooms,
  list,
  card_font_color,
  topicId,
  topics,
  setShowVideoRoomModal,
  setUserUiSettings,
  uiSettings,
  setUserLensPinSettings
}) => {
  const [data, setData] = useState(null);
  const [displayAddCard, setDisplayAddCard] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    setData({ ...list, cards: videoRooms });
  }, [videoRooms, list]);

  const handleSelectedCardId = id => {
    setSelectedCardId(id);
  };

  const handleAddCard = () => {
    setDisplayAddCard(prev => !prev);
  };

  const handleClick = id =>
    setShowVideoRoomModal({ isOpen: true, videoRoomId: toId(id) });

  const setLens = () => {
    let pinnedLenses = uiSettings.pinned_lenses || [];

    pinnedLenses = [...new Set(['PROJECT_HUB', ...pinnedLenses])];

    setUserLensPinSettings({
      ui_settings: {
        pinned_lenses: pinnedLenses
      }
    });
    setUserUiSettings(viewPayload('VIDEO_CHAT'));
  };

  return (
    <div className="tile-view">
      <div
        className="tile-view__topic"
        style={{ borderColor: card_font_color || '#E2E2E2' }}
      >
        <div
          onClick={setLens}
          className="tile-view__topic-header-title-wrapper"
        >
          <IconButton
            icon="videocam"
            color={card_font_color || '#EB5757'}
            outlined
            fontSize={20}
          />
          <h5 className="ml6">{list.title}</h5>
        </div>
        <div>
          <IconButton
            additionalClasses="grey-link"
            fontSize={14}
            icon="add"
            color={card_font_color}
            onClick={handleAddCard}
            tooltip="Add Video Chat"
            tooltipOptions={{ place: 'bottom' }}
          />
        </div>
      </div>
      <div>
        {data?.cards?.length > 0 &&
          data?.cards.map(card => (
            <Fragment key={card.id}>
              <div
                className="tile-view__topic-title-wrapper"
                style={{ borderColor: card_font_color || '#E2E2E2' }}
                onClick={() => handleSelectedCardId(card.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    icon="videocam"
                    color={card_font_color || '#EB5757'}
                    outlined
                    fontSize={20}
                  />

                  <CardTitleLink
                    additionalClasses="tile-card_title ml6"
                    card={card}
                    color={card_font_color}
                    truncate
                    onClick={() => handleClick(card.id)}
                  />
                </div>
              </div>
            </Fragment>
          ))}
        {displayAddCard && (
          <CreateVideoRoomCard
            topicId={topicId}
            topics={topics}
            onDismiss={() => handleAddCard()}
          />
        )}
      </div>
    </div>
  );
};

const dataRequirements = ({ topicId, cardRequirements }) => ({
  cardsWithAttributes: {
    attributes: {
      ...cardRequirements,
      topicId,
      isVideoRoom: true
    }
  }
});

const mapState = state => {
  const {
    page: { topicId },
    topics,
    utilities: { active_design }
  } = stateMappings(state);

  const videoRooms = topicId
    ? getVideoRoomsForTopic(state, topicId)
    : getVideoRoomArray(state);

  const ui_settings = getUiSettings(state);

  return {
    uiSettings: ui_settings,
    topicId,
    topics,
    videoRooms,
    card_font_color: active_design?.card_font_color || null
  };
};

const mapDispatch = {
  setShowVideoRoomModal,
  setUserUiSettings,
  setUserLensPinSettings
};
export default withDataManager(dataRequirements, mapState, mapDispatch, {
  dontShowLoadingIndicator: false
})(TileVideoRoomsViewSegment);
