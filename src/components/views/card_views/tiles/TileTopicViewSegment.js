import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from 'Components/shared/Icon';
import TopicTitleLink from 'Components/shared/topics/elements/TopicTitleLink';
import IconButton from 'Components/shared/buttons/IconButton';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';
import TopicTitleEditor from 'Src/components/shared/topics/elements/TopicTitleEditor';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getBoardTypeAttributes } from 'Src/utils/icons';
import RenderNestedItem from 'src/components/views/card_views/tiles/RenderNestedItem';
import { getTopic } from 'Src/newRedux/database/topics/thunks';
import Loader from 'src/components/shared/Loader';
import { getCardTypeAndIndex } from 'src/components/shared/CardAndBoardTypes';
import { viewPayload } from 'Src/utils/views';
import { setUserUiSettings, getUiSettings } from 'Src/helpers/user_config';
import { setUserLensPinSettings } from 'Src/newRedux/database/topics/thunks';

const TilesTopicViewSegment = ({
  active_design: { card_font_color },
  list,
  viewTopic,
  parentTopicId,
  getTopic,
  setUserUiSettings,
  uiSettings,
  setUserLensPinSettings
}) => {
  const [isSegmentOpen, setIsSegmentOpen] = useState(false);
  const [displayAddSubtopic, setDisplayAddSubtopic] = useState(false);
  const [topicNameEditMode, setTopicNameEditMode] = useState(false);
  const [selectedBoardType, setSelectedBoardType] = useState(false);
  const [cardType, setCardType] = useState(null);
  const [timeoutID, setTimeoutID] = useState(null);
  const [editTopicId, setEditTopicId] = useState(null);
  const [addNestedCard, setAddNestedCard] = useState(false);
  const [addNestedSubtopic, setAddNestedSubtopic] = useState(false);

  const toggleSegmentOpenClose = () => {
    setAddNestedSubtopic(false);
    setAddNestedCard(false);
    setIsSegmentOpen(prev => !prev);
  };

  const handleToggleTopicNameEditMode = () =>
    setTopicNameEditMode(prev => !prev);

  const handleAddSubtopic = () => setDisplayAddSubtopic(prev => !prev);
  const handleTimeoutIDChange = timeout => {
    setTimeoutID(timeout);
  };

  const handleAddNestedCard = () => {
    setIsSegmentOpen(true);
    setAddNestedCard(true);
  };

  const handleAddNestedSubtopic = () => {
    setIsSegmentOpen(true);
    setAddNestedSubtopic(true);
  };

  const handleEditTopicId = id => {
    setEditTopicId(id);
  };

  const getClickHandler = topic => {
    const delay = 250;
    if (!timeoutID) {
      handleTimeoutIDChange(
        window.setTimeout(() => {
          viewTopic({ topicSlug: topic.attributes.slug });
          handleTimeoutIDChange(null);
        }, delay)
      );
    } else {
      handleTimeoutIDChange(window.clearTimeout(timeoutID));
      handleToggleTopicNameEditMode();
    }
  };

  const setCardTypeAttr = type => {
    let cardType = null;

    if (type === 'notes') {
      cardType = getCardTypeAndIndex('NOTES');
      return setCardType(cardType);
    }
    if (type === 'task') {
      cardType = getCardTypeAndIndex('TASK');
      return setCardType(cardType);
    }
    if (type === 'data') {
      cardType = getCardTypeAndIndex('DATA');
      return setCardType(cardType);
    }
  };

  const getBoardTypes = title => {
    switch (title) {
      case 'Boards':
        return null;
      case 'Note Boards':
        return 'notes';
      case 'File Boards':
        return 'file';
      case 'Task Boards':
        return 'task';
      case 'Knowledge Boards':
        return 'knowledge';
      case 'Data Boards':
        return 'data';
      case 'Goal Boards':
        return 'goal';
      case 'Project Boards':
        return 'project';
      default:
        return null;
    }
  };

  const setLens = type => {
    let pinnedLenses = uiSettings.pinned_lenses || [];
    pinnedLenses = [...new Set(['PROJECT_HUB', ...pinnedLenses])];
    setUserLensPinSettings({
      ui_settings: {
        pinned_lenses: pinnedLenses
      }
    });

    setUserUiSettings(viewPayload('TOPIC_TILES'));
    // switch (type) {
    //   case 'Cards':
    //     return
    //   case 'Task Cards':
    //     return setUserUiSettings(viewPayload('TODO'));
    //   case 'Note Cards':
    //     return setUserUiSettings(viewPayload('GRID'));
    //   case 'Data Cards':
    //     return setUserUiSettings(viewPayload('LIST'));
    //   default:
    //     break;
    // }
  };

  const handleSelectedBoardType = () => {
    const type = getBoardTypes(list.title);
    setCardTypeAttr(type);
    setSelectedBoardType(type);
  };

  const RenderBoardItem = ({ card, nested }) => {
    const [data, setData] = useState(!nested ? card : {});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (!nested) return;
      getSubtopicDetails();
    }, [card, nested]);

    const getSubtopicDetails = async () => {
      try {
        setLoading(true);
        const result = await getTopic({ topicId: card.id });
        setData(result?.data?.data || {});
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (loading) {
      return <Loader isLoading={loading} small />;
    }

    if (nested && Object.entries(data).length === 0 && !loading) {
      return null;
    }

    return (
      <Fragment>
        <Icon
          icon={getBoardTypeAttributes(data?.attributes?.tag_list[0]).icon}
          fontAwesome={
            getBoardTypeAttributes(data?.attributes?.tag_list[0]).fontAwesome
          }
          outlined={
            getBoardTypeAttributes(data?.attributes?.tag_list[0]).outlined
          }
          color={
            card_font_color ||
            getBoardTypeAttributes(data?.attributes?.tag_list[0]).color
          }
          style={{
            fontSize:
              getBoardTypeAttributes(data?.attributes?.tag_list[0]).icon ===
              'hashtag'
                ? 14
                : 16
          }}
        />
        {topicNameEditMode && data.id === editTopicId ? (
          <TopicTitleEditor
            topic={data}
            onFinishEditing={handleToggleTopicNameEditMode}
          />
        ) : (
          <TopicTitleLink
            additionalClasses="tile-card_title"
            topic={data}
            color={card_font_color}
            truncate
            onClick={() => getClickHandler(data)}
            onDoubleClick={() => {
              handleEditTopicId(data.id);
              handleToggleTopicNameEditMode(data.id);
            }}
          />
        )}
      </Fragment>
    );
  };

  return (
    <div className="tile-view" onClick={handleSelectedBoardType}>
      <div
        className="tile-view__topic"
        style={{ borderColor: card_font_color || '#E2E2E2' }}
      >
        <div
          onClick={() => setLens(list.title)}
          className="tile-view__topic-header-title-wrapper"
        >
          <Icon
            icon={getBoardTypeAttributes(getBoardTypes(list.title)).icon}
            fontAwesome={
              getBoardTypeAttributes(getBoardTypes(list.title)).fontAwesome
            }
            outlined={
              getBoardTypeAttributes(getBoardTypes(list.title)).outlined
            }
            color={
              card_font_color ||
              getBoardTypeAttributes(getBoardTypes(list.title)).color
            }
            style={{
              fontSize:
                getBoardTypeAttributes(getBoardTypes(list.title)).icon ===
                'hashtag'
                  ? 14
                  : 16
            }}
          />
          <h5>{list.title}</h5>
        </div>
        <div>
          <IconButton
            additionalClasses="grey-link"
            fontSize={16}
            icon="add"
            color={card_font_color}
            onClick={handleAddSubtopic}
            tooltip="Add Board"
            tooltipOptions={{ place: 'bottom' }}
          />
        </div>
      </div>
      <div>
        {list.cards.map((card, i) => (
          <Fragment key={card.id}>
            <div
              className="tile-view__topic-title-wrapper"
              style={{ borderColor: card_font_color || '#E2E2E2' }}
              onClick={() => {
                handleEditTopicId(card.id);
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  fontAwesome
                  icon={
                    isSegmentOpen && card.id === editTopicId
                      ? 'caret-down'
                      : 'caret-right'
                  }
                  onClick={toggleSegmentOpenClose}
                  containerClasses="tile-view-topic-caret"
                />
                <RenderBoardItem card={card} />
              </div>
              <OptionsDropdownButton
                color={card_font_color}
                icon="add"
                className="tile-view__topic-title-wrapper__add"
              >
                <a
                  className="dropdown-option-item"
                  onClick={handleAddNestedCard}
                >
                  Add Card
                </a>
                <a
                  className="dropdown-option-item"
                  onClick={handleAddNestedSubtopic}
                >
                  Add Board
                </a>
              </OptionsDropdownButton>
            </div>
            {isSegmentOpen && card.id === editTopicId && (
              <div className="mt6 mb6">
                {card.attributes?.subtopics?.length > 0 &&
                  card.attributes.subtopics.map(subtopic => (
                    <div
                      key={subtopic.id}
                      className="ml20 tile-view__topic-title-wrapper--nested"
                      style={{
                        borderColor: card_font_color || '#E2E2E2'
                      }}
                    >
                      <RenderBoardItem nested card={subtopic} />
                    </div>
                  ))}
                {card.attributes?.tips.length > 0 &&
                  card.attributes?.tips.map(tip => {
                    return (
                      <div
                        key={tip.id}
                        className="tile-view__topic-title-wrapper ml20"
                        style={{
                          borderColor: card_font_color || '#E2E2E2',
                          width: 'auto'
                        }}
                      >
                        <RenderNestedItem card={tip} color={card_font_color} />
                      </div>
                    );
                  })}
                {addNestedSubtopic && (
                  <AddSubtopicCard
                    cardStyle={{
                      width: 'auto',
                      marginLeft: '20px',
                      marginTop: '6px'
                    }}
                    inInputMode
                    parentTopicId={card.id}
                    tag={selectedBoardType}
                    onDismiss={() => setAddNestedSubtopic(false)}
                  />
                )}
                {addNestedCard && (
                  <AddCardCard
                    inInputMode
                    cardStyle={{
                      width: 'auto',
                      marginLeft: '20px'
                    }}
                    topicId={card.id}
                    topMenu={true}
                    onDismiss={() => setAddNestedCard(false)}
                    selectedCardType={cardType}
                  />
                )}
              </div>
            )}
          </Fragment>
        ))}
        {displayAddSubtopic && (
          <AddSubtopicCard
            cardStyle={{ width: '100%' }}
            inInputMode={true}
            onDismiss={handleAddSubtopic}
            parentTopicId={parentTopicId}
            tag={selectedBoardType}
          />
        )}
      </div>
    </div>
  );
};

const mapState = (state, { topic }) => {
  const {
    utilities: { active_design },
    topics,
    page: { topicId }
  } = stateMappings(state);
  const parentTopic = topics[topic.id || topicId];
  const ui_settings = getUiSettings(state);
  return {
    uiSettings: ui_settings,
    active_design,
    parentTopicId: parentTopic.id
  };
};

const mapDispatch = {
  viewTopic,
  getTopic,
  setUserUiSettings,
  setUserLensPinSettings
};

export default connect(mapState, mapDispatch)(TilesTopicViewSegment);
