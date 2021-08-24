import React from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import DMLoader from 'Src/dataManager/components/DMLoader';
import CardDetails from 'Components/lenses/card_lenses/Card/CardDetails';

const CardEditor = ({ cardId, card }) =>
  card ? (
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
  ) : (
    <DMLoader
      dataRequirements={{
        cardsWithAttributes: {
          attributes: {
            filterIDs: [cardId]
          }
        }
      }}
      loaderKey="cardsWithAttributes"
    />
  );

const mapState = (state, props) => {
  const { cards } = stateMappings(state);

  const card = cards[props.cardId];

  return {
    card
  };
};

export default connect(mapState)(CardEditor);
