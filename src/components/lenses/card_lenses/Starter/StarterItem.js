import React from 'react';
import { connect } from 'react-redux';
import { getToolIcon } from 'Src/utils/icons';
import { getIconColor } from 'Src/utils/color';
import { getProjectOrGoalSpeed as Speed } from 'Src/components/lenses/card_lenses/Plan/Speed.js';
import {
  setShowVideoRoomModal,
  setShowChatModal
} from 'Src/newRedux/interface/modals/actions';
import { viewCard } from 'Src/newRedux/database/cards/thunks';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import CardActionsDropdown from 'src/components/shared/cards/elements/CardActionsDropdown';
import TopicActionsDropdown from 'Components/shared/topics/elements/TopicActionsDropdown';
import { updateSelectedCard } from 'Src/newRedux/database/user/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import GenericDragContainer from 'Components/shared/drag_and_drop/GenericDragContainer';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import Tooltip from 'Components/shared/Tooltip';
import { convertTypeIntoNormalString } from 'Lib/utilities';

const StarterItem = props => {
  const {
    title,
    baseType,
    type,
    slug,
    id,
    completionPercent = 0,
    fontColor,
    speed = 0,
    updateSelectedCard,
    cardsSplitScreen,
    item = {}
  } = props;

  //  board title
  const nestedCardTitle = item.tip?.parent?.title;
  const cardTopicTitle = item.tip?.topic?.title;
  const parentTopicTitle = item.topic?.parent?.title;

  const parentTitle = nestedCardTitle || cardTopicTitle || parentTopicTitle;

  const nestedCardId = item.tip?.parent?.id;
  const cardTopicId = item.tip?.topic?.id;
  const parentTopicId = item.topic?.parent?.id;

  const parentId = nestedCardId || cardTopicId || parentTopicId;

  const handleClick = () => {
    const {
      viewCard: showCard,
      viewTopic: showTopic,
      setShowVideoRoomModal: showVideoRoom,
      setShowChatModal: showChat
    } = props;

    if (item.baseType === 'Topic') {
      showTopic({ topicSlug: slug });
    } else if (item.itemType === 'VIDEO_CHAT_CARD') {
      showVideoRoom({ isOpen: true, videoRoomId: toId(id) });
    } else if (item.itemType === 'CHAT_CARD') {
      showChat({ isOpen: true, chatId: toId(id) });
    } else {
      if (cardsSplitScreen) {
        updateSelectedCard(slug);
      } else {
        showCard({ cardSlug: slug });
      }
    }
  };
  const icon = getToolIcon(type);
  const color = getIconColor(type);

  let showProgressbar = false;
  if (type === 'PROJECT' || type === 'GOAL') showProgressbar = true;

  return (
    <GenericDragContainer
      dragPreview={
        <div
          style={{
            border: `1px solid ${fontColor || 'rgba(0,0,0,0.1)'}`,
            fontWeight: 'bold',
            color: fontColor || '#000',
            width: '50%',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px'
          }}
          className="item_card"
        >
          {title}
        </div>
      }
      draggedItemProps={{
        type: item.baseType === 'Tip' ? 'card' : 'topic',
        origin: { topicId: toId(parentId) }
      }}
      item={item}
      itemType={
        item.baseType === 'Tip' ? dragItemTypes.CARD : dragItemTypes.TOPIC
      }
      onDropElsewhere={() => {}}
    >
      <div
        className="item_card"
        style={
          fontColor
            ? {
                border: `1px solid ${fontColor}`
              }
            : {
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }
        }
      >
        <div data-tip={convertTypeIntoNormalString(type, '')} data-for={id}>
          <div className="icon" style={{ background: color, color: '#fff' }}>
            <i className="material-icons-outlined">{icon}</i>
          </div>
          <Tooltip place="bottom" id={id} />
        </div>
        <div className="title">
          <div className="title--div" role="button" onClick={handleClick}>
            <span
              style={{
                fontWeight: 'bold'
              }}
            >
              {title}
            </span>
            {parentTitle && (
              <span
                className="title--div_parent ml5"
                style={{
                  color: fontColor || '#ccc'
                }}
              >
                in {parentTitle}
              </span>
            )}
          </div>
          {baseType === 'Tip' && (
            <CardActionsDropdown
              dropdownLeft
              color={fontColor}
              cardId={toId(id)}
              additionalClasses="title--dropdown "
            />
          )}
          {baseType === 'Topic' && (
            <TopicActionsDropdown
              dropdownLeft
              color={fontColor}
              topicId={toId(id)}
              className="title--dropdown"
            />
          )}
        </div>
        {showProgressbar && (
          <div className="progress_container">
            <div className="progress_background">
              <div
                style={{ width: `${completionPercent}%` }}
                className="progress_foreground"
              />
            </div>
            <div className="progress_image">
              <Speed speed={speed} />
            </div>
          </div>
        )}
      </div>
    </GenericDragContainer>
  );
};

const mapState = state => {
  const { menus } = stateMappings(state);
  const cardsSplitScreen = menus.cardsSplitScreen;
  return { cardsSplitScreen };
};

const mapDispatch = {
  setShowVideoRoomModal,
  setShowChatModal,
  viewTopic,
  viewCard,
  updateSelectedCard
};

export default connect(mapState, mapDispatch)(StarterItem);
