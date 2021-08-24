import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Icon from 'Components/shared/Icon';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import IconButton from 'Components/shared/buttons/IconButton';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getCardTypeIconAttribute } from 'Src/utils/icons';
import { getCardTypeAndIndex } from 'src/components/shared/CardAndBoardTypes';
import { viewPayload } from 'Src/utils/views';
import { setUserUiSettings, getUiSettings } from 'Src/helpers/user_config';
import { setUserLensPinSettings } from 'Src/newRedux/database/topics/thunks';

const TilesCardViewSegment = ({
  active_design: { card_font_color },
  list,
  parentTopic,
  allCardsHash,
  setUserUiSettings,
  uiSettings,
  setUserLensPinSettings
}) => {
  const [isSegmentOpen, setIsSegmentOpen] = useState(false);
  const [displayAddCard, setDisplayAddCard] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [addNestedCard, setAddNestedCard] = useState(false);

  const toggleSegmentOpenClose = () => {
    setAddNestedCard(false);
    setIsSegmentOpen(prev => !prev);
  };

  const handleAddCard = () => {
    setDisplayAddCard(prev => !prev);
  };

  const handleSelectedCardId = id => {
    setSelectedCardId(id);
  };

  const handleAddNestedCard = () => {
    setIsSegmentOpen(true);
    setAddNestedCard(true);
  };

  const getCardType = title => {
    switch (title) {
      case 'Cards':
        return 'CARD';
      case 'Task Cards':
        return 'TASK';
      case 'Note Cards':
        return 'NOTES';
      case 'Data Cards':
        return 'DATA';
      default:
        return 'CARD';
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

    switch (type) {
      case 'Cards':
        return setUserUiSettings(viewPayload('LIST'));
      case 'Task Cards':
        return setUserUiSettings(viewPayload('TODO'));
      case 'Note Cards':
        return setUserUiSettings(viewPayload('GRID'));
      case 'Data Cards':
        return setUserUiSettings(viewPayload('SHEET'));
      default:
        break;
    }
  };

  const handleSelectedCardType = () => {
    const type = getCardType(list.title);
    setSelectedCardType(getCardTypeAndIndex(type));
  };

  const RenderItem = ({ card, nested }) => {
    if (nested && !card) return null;
    return (
      <Fragment>
        {!nested && (
          <IconButton
            fontAwesome
            icon={
              isSegmentOpen && card.id === selectedCardId
                ? 'caret-down'
                : 'caret-right'
            }
            onClick={toggleSegmentOpenClose}
            containerClasses="tile-view-topic-caret"
          />
        )}
        <Icon
          icon={getCardTypeIconAttribute(card?.attributes?.card_type).icon}
          outlined
          color={
            card_font_color ||
            getCardTypeIconAttribute(card?.attributes?.card_type).defaultColor
          }
          style={{ fontSize: 14 }}
        />

        <CardTitleLink
          additionalClasses="tile-card_title"
          card={card}
          color={card_font_color}
          truncate
        />
      </Fragment>
    );
  };

  return (
    <div className="tile-view" onClick={handleSelectedCardType}>
      <div
        className="tile-view__topic"
        style={{ borderColor: card_font_color || '#E2E2E2' }}
      >
        <div
          onClick={() => setLens(list.title)}
          className="tile-view__topic-header-title-wrapper"
        >
          <Icon
            icon={getCardTypeIconAttribute(getCardType(list.title)).icon}
            outlined
            color={
              card_font_color ||
              getCardTypeIconAttribute(getCardType(list.title)).defaultColor
            }
            style={{
              fontSize: 16
            }}
          />
          <h5>{list.title}</h5>
        </div>
        <div>
          <IconButton
            additionalClasses="grey-link"
            fontSize={14}
            icon="add"
            color={card_font_color}
            onClick={handleAddCard}
            tooltip="Add Card"
            tooltipOptions={{ place: 'bottom' }}
          />
        </div>
      </div>
      <div>
        {list.cards.map((card, i) => (
          <Fragment key={i}>
            <div
              className="tile-view__topic-title-wrapper"
              style={{ borderColor: card_font_color || '#E2E2E2' }}
              onClick={() => handleSelectedCardId(card.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <RenderItem card={card} key={i} />
              </div>
              <IconButton
                additionalClasses="grey-link tile-view__topic-title-wrapper__add"
                fontSize={16}
                icon="add"
                color={card_font_color}
                onClick={handleAddNestedCard}
                tooltip="Add Nested Card"
                tooltipOptions={{ place: 'bottom' }}
              />
            </div>
            {isSegmentOpen && card.id === selectedCardId && (
              <Fragment>
                {card?.relationships?.nested_tips?.data?.length > 0 &&
                  card.relationships.nested_tips.data
                    .flat(Infinity)
                    .map(itemId => (
                      <Fragment key={itemId}>
                        {allCardsHash[itemId] && (
                          <div
                            className="tile-view__topic-title-wrapper ml20"
                            style={{
                              borderColor: card_font_color || '#E2E2E2',
                              width: 'auto'
                            }}
                            onClick={() => {
                              handleSelectedCardType();
                              handleSelectedCardId(card.id);
                            }}
                          >
                            <RenderItem card={allCardsHash[itemId]} nested />
                          </div>
                        )}
                      </Fragment>
                    ))}
                {addNestedCard && (
                  <AddCardCard
                    inInputMode
                    cardStyle={{ width: 'auto' }}
                    selectedCardType={selectedCardType}
                    newCardRelationships={{ follows_tip: { data: card.id } }}
                    topicId={parentTopic.id}
                    topMenu={true}
                    onDismiss={() => setAddNestedCard(false)}
                  />
                )}
              </Fragment>
            )}
          </Fragment>
        ))}
        {displayAddCard && (
          <AddCardCard
            cardStyle={{ width: '100%' }}
            selectedCardType={selectedCardType}
            inInputMode={true}
            onDismiss={() => setDisplayAddCard(false)}
            topicId={parentTopic.id}
            topMenu={true}
          />
        )}
      </div>
    </div>
  );
};

const mapState = state => {
  const {
    utilities: { active_design },
    cards,
    topics,
    page: { topicId }
  } = stateMappings(state);

  const ui_settings = getUiSettings(state);

  const parentTopic = topics[topicId];
  return {
    uiSettings: ui_settings,
    active_design,
    parentTopic,
    allCardsHash: cards
  };
};

const mapDispatch = {
  setUserUiSettings,
  setUserLensPinSettings
};

export default connect(mapState, mapDispatch)(TilesCardViewSegment);
