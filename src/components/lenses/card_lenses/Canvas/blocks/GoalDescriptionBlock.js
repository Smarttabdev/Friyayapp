import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import DMLoader from 'Src/dataManager/components/DMLoader';
import { stateMappings } from 'Src/newRedux/stateMappings';
import CardDetails from 'Components/lenses/card_lenses/Card/CardDetails';
import {
  createCard,
  updateCard,
  removeCardSilent
} from 'Src/newRedux/database/cards/thunks';
import store from 'Src/store/store';
import Icon from 'Components/shared/Icon';

const GoalDescriptionBlock = props => {
  const { id, config, card, topicId, createCard, updateCard } = props;

  useEffect(() => {
    if (!card) return;
    if (card.attributes.card_type === 'SYSTEM') return;
    updateCard({
      id: card.id,
      attributes: { card_type: 'SYSTEM' }
    });
  }, [card]);

  useEffect(() => {
    if (id && !config.tip_id) {
      (async function() {
        const response = await createCard({
          attributes: {
            title: `[GoalDescriptionBlock#${toId(id)} Card]`,
            card_type: 'SYSTEM'
          },
          relationships:
            topicId && topicId != '0'
              ? {
                  topics: {
                    data: [topicId]
                  }
                }
              : {}
        });
        await mutations.updateBlock({
          id,
          config: {
            ...config,
            tip_id: response.data.data.id
          }
        });
      })();
    }
  }, [id]);

  return (
    <>
      <div className="header goal-desc flex-r-center">
        <Icon icon="flag" color="#fff" outlined fontSize={20} />
        <span>Goal Description</span>
      </div>
      {card && (
        <CardDetails
          cardId={card.id}
          onEditorScroll={() => {}}
          rootContainerClass="wiki-board"
          editorConfig={{
            toolbarInline: true
          }}
          showTitle={false}
          showIcons={false}
          // showMinMax
          hideUploader
          useDesignColor
          autoSave
          hideCardLinks
        />
      )}
      {config.tip_id && (
        <DMLoader
          dataRequirements={{
            cardsWithAttributes: {
              attributes: {
                filterIDs: [toId(config.tip_id)]
              }
            }
          }}
          loaderKey="cardsWithAttributes"
        />
      )}
    </>
  );
};

const mapState = (state, props) => {
  const { cards } = stateMappings(state);
  const card = props.config.tip_id && cards[toId(props.config.tip_id)];
  return {
    card
  };
};

const mapDispatch = {
  createCard,
  updateCard
};

export default {
  label: 'Goal description',
  defaultConfig: {
    height: 169
  },
  iconProps: {
    icon: 'title',
    color: '#56CCF2'
  },
  onDelete: ({ config }) => {
    const cardId = toId(config.tip_id);
    cardId && store.dispatch(removeCardSilent(cardId));
  },
  Component: connect(mapState, mapDispatch)(GoalDescriptionBlock)
};
