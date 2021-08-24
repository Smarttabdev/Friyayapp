import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import CardsContainer from './CardsContainer';
import MapBackground from './MapBackground';
import { getSort } from 'Components/lenses/card_lenses/Starter/utils';
import { addTip } from 'Lib/tips';
import { toggleCardsSplitScreen } from 'Src/newRedux/interface/menus/actions.js';
import { updateSelectedCard } from 'Src/newRedux/database/user/thunks';
import { useWindowSize } from 'Lib/utilities';
import { useOutsideAlerter } from 'Lib/hooks';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';

const MapLens = props => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [cardInFocus, setCardInFocus] = useState(null);
  const [locationInFocus, setLocationInFocus] = useState(null);
  const [isAddingCardFromButton, setIsAddingCardFromButton] = useState(false);
  const [cardCreatedCounter, setCardCreatedCounter] = useState(0);
  const cards = getNodes(props.query.tips);
  const [width, height] = useWindowSize();

  const addCardContainerRef = useRef(null);
  useOutsideAlerter(addCardContainerRef, () =>
    setIsAddingCardFromButton(false)
  );

  const handleNavigateToMarker = card => {
    setCardInFocus(card);
  };

  const handleNavigateToLocation = ({ latitude, longitude }) => {
    setLocationInFocus({ latitude, longitude });
  };

  const handleOpenCard = card => {
    const {
      cardsSplitScreen,
      toggleCardsSplitScreen,
      updateSelectedCard
    } = props;
    const { slug } = card;
    !cardsSplitScreen && toggleCardsSplitScreen();
    updateSelectedCard(slug);
  };

  const toggleAddOptions = () => setIsAddingCardFromButton(true);
  // setIsAddingCardFromButton(!isAddingCardFromButton);

  useEffect(() => {
    const disposer = requestSubscription({
      subscription: graphql`
        subscription MapLensTipCreatedSubscription($topicId: ID!) {
          tipCreated(topicId: $topicId) {
            tip {
              id
              title
              slug
              cardType
              longitude
              latitude
              address
            }
          }
        }
      `,
      vars: {
        topicId: toGid('Topic', props.topicId || 0)
      },
      onNext: data => {
        const tip = data.tipCreated?.tip;
        tip &&
          addTip({
            tip,
            componentName: 'MapLens',
            connectionVars: props.connectionVars
          });
      }
    });
    return () => disposer.dispose();
  }, [props.topicId]);

  const afterCardCreated = () => {
    setCardCreatedCounter(cardCreatedCounter + 1);
    setIsAddingCardFromButton(false);
  };

  return (
    <div
      className="map_lens"
      // style={{ height: `${window.innerHeight - 200}px` }}
      style={{
        height: `${height - 200 + (!props.boardTabsIsOpen ? 60 : 0)}px`
      }}
    >
      <MapBackground
        cards={cards}
        setSelectedLocation={setSelectedLocation}
        cardInFocus={cardInFocus}
        locationInFocus={locationInFocus}
        handleOpenCard={handleOpenCard}
      />
      <CardsContainer
        cards={cards}
        topic={props.topic}
        card_font_color={props.card_font_color}
        selectedLocation={selectedLocation}
        removeSelectedLocation={() => setSelectedLocation(null)}
        handleNavigateToMarker={handleNavigateToMarker}
        searchQuery={props.mapLens.searchQuery}
        onLocationResultClick={handleNavigateToLocation}
        paginationRelay={props.relay}
        handleOpenCard={handleOpenCard}
        toggleAddOptions={toggleAddOptions}
        cardCreatedCounter={cardCreatedCounter}
        afterCardCreated={afterCardCreated}
      />
      {isAddingCardFromButton && (
        <div className="add_card_container" ref={addCardContainerRef}>
          <AddCardOrSubtopic
            isVisible
            displayAddCardButton
            displayAddSubtopicButton
            displayAddChatButton
            displayAddVideoRoomButton
            displayAddGoalButton
            displayAddProjectButton
            className="add_button"
            topic={props.topic}
            boardTypeSmallModal
            hideOtherButton
            afterCardCreated={afterCardCreated}
          />
        </div>
      )}
    </div>
  );
};

const mapState = state => {
  const {
    page: { topicId, boardTabsIsOpen },
    tools: { mapLens },
    utilities: {
      active_design: { card_font_color }
    },
    menus: { cardsSplitScreen }
  } = stateMappings(state);

  const connectionVars = {
    topicId: toGid('Topic', topicId),
    filter: { title: mapLens.searchQuery },
    sort: getSort(mapLens.sort)
  };

  return {
    topicId,
    mapLens,
    card_font_color,
    connectionVars,
    cardsSplitScreen,
    boardTabsIsOpen
  };
};

const mapDispatch = {
  updateSelectedCard,
  toggleCardsSplitScreen
};

const MapLensContainer = createPaginationContainer(
  MapLens,
  {
    query: graphql`
      fragment MapLens_query on Query
        @argumentDefinitions(
          cursor: { type: String }
          topicId: { type: ID }
          filter: { type: JSON }
          sort: { type: JSON }
        ) {
        tips(
          first: 15
          after: $cursor
          topicId: $topicId
          filter: $filter
          sort: $sort
        ) @connection(key: "MapLens_tips") {
          totalCount
          edges {
            node {
              id
              title
              slug
              cardType
              longitude
              latitude
              address
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.query?.tips,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query MapLensTipsPaginationQuery(
        $cursor: String
        $topicId: ID
        $filter: JSON
        $sort: JSON
      ) {
        ...MapLens_query
          @arguments(
            cursor: $cursor
            topicId: $topicId
            filter: $filter
            sort: $sort
          )
      }
    `
  }
);

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <MapLensContainer {...props} query={props} />, {
    query: graphql`
      query MapLensTipsQuery($topicId: ID, $filter: JSON, $sort: JSON) {
        ...MapLens_query
          @arguments(topicId: $topicId, filter: $filter, sort: $sort)
      }
    `,
    vars: props => props.connectionVars
  })
);
