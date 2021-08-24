import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import DMLoader from 'Src/dataManager/components/DMLoader';
import { stateMappings } from 'Src/newRedux/stateMappings';
import CardDetails from 'Components/lenses/card_lenses/Card/CardDetails';
import TipSelector from 'Components/shared/TipSelector/TipSelector';

const CardBlock = ({ id, config, card, topic, ...restProps }) => {
  const handleSelectTip = tip => {
    mutations.updateBlock({
      id,
      config: {
        ...config,
        tip_id: toId(tip.id)
      }
    });
  };
  return (
    <Fragment>
      {!config.tip_id && (
        <Fragment>
          <div className="mb15">Select card:</div>
          <div className="flex-1 flex flex-c" style={{ minHeight: 0 }}>
            <TipSelector onTipClick={handleSelectTip} />
          </div>
        </Fragment>
      )}
      {card && (
        <CardDetails
          cardId={card.id}
          onEditorScroll={() => {}}
          rootContainerClass="wiki-board"
          editorConfig={{
            toolbarInline: true
          }}
          showMinMax
          hideUploader
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
    </Fragment>
  );
};

const mapState = (state, props) => {
  const { cards } = stateMappings(state);
  const card = props.config.tip_id && cards[toId(props.config.tip_id)];
  return {
    card
  };
};

export default {
  label: 'Card',
  iconProps: {
    icon: 'featured_play_list',
    color: '#56CCF2',
    outlined: true
  },
  renderDropdown: ({ id, type, config }) => {
    const handleSelectTip = () => {
      mutations.updateBlock({
        id,
        config: {
          ...config,
          tip_id: null
        }
      });
    };
    return (
      <li onClick={handleSelectTip}>
        <a>Select card</a>
      </li>
    );
  },
  Component: connect(mapState)(CardBlock)
};
