import React, { useEffect, useState, Fragment } from 'react';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  getChatsForTopic,
  getChatsArray
} from 'Src/newRedux/database/cards/selectors';
import IconButton from 'Components/shared/buttons/IconButton';
import CardTitleLink from 'src/components/shared/cards/elements/CardTitleLink';
import { setShowChatModal } from 'Src/newRedux/interface/modals/actions';
import CreateChatCard from 'src/components/shared/chat/ChatPanel/CreateChatCard';
import { viewPayload } from 'Src/utils/views';
import { setUserUiSettings, getUiSettings } from 'Src/helpers/user_config';
import { setUserLensPinSettings } from 'Src/newRedux/database/topics/thunks';

const TileChatsViewSegment = ({
  chats,
  list,
  topicId,
  card_font_color,
  setShowChatModal,
  setUserUiSettings,
  uiSettings,
  setUserLensPinSettings
}) => {
  const [data, setData] = useState(null);
  const [displayAddCard, setDisplayAddCard] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    setData({ ...list, cards: chats });
  }, [chats]);

  const handleSelectedCardId = id => {
    setSelectedCardId(id);
  };

  const handleAddCard = () => {
    setDisplayAddCard(prev => !prev);
  };

  const handleClick = id =>
    setShowChatModal({ isOpen: true, chatId: toId(id) });

  const setLens = () => {
    let pinnedLenses = uiSettings.pinned_lenses || [];

    pinnedLenses = [...new Set(['PROJECT_HUB', ...pinnedLenses])];

    setUserLensPinSettings({
      ui_settings: {
        pinned_lenses: pinnedLenses
      }
    });
    setUserUiSettings(viewPayload('CHAT'));
  };

  return (
    <div>
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
              icon="forum"
              color={card_font_color || '#F2C94C'}
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
              tooltip="Add Chat"
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
                      icon="forum"
                      color={card_font_color || '#F2C94C'}
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
            <CreateChatCard
              topicId={topicId}
              hideCardTypeDropdown
              onDismiss={() => handleAddCard()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const dataRequirements = ({ topicId, cardRequirements }) => ({
  cardsWithAttributes: {
    attributes: {
      ...cardRequirements,
      topicId,
      isChat: true
    }
  }
});

const mapState = state => {
  const {
    page: { topicId },
    utilities: { active_design }
  } = stateMappings(state);

  const ui_settings = getUiSettings(state);

  const chats = topicId
    ? getChatsForTopic(state, topicId)
    : getChatsArray(state);

  return {
    uiSettings: ui_settings,
    topicId,
    chats,
    card_font_color: active_design?.card_font_color || null
  };
};

const mapDispatch = {
  setShowChatModal,
  setUserUiSettings,
  setUserLensPinSettings
};
export default withDataManager(dataRequirements, mapState, mapDispatch, {
  dontShowLoadingIndicator: false
})(TileChatsViewSegment);
