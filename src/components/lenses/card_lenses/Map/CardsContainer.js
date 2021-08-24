import React, { Component, useRef } from 'react';
import CardItem from './CardItem';
import CardsContainerHeader from './CardsContainerHeader';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';
import SearchContainer from './SearchContainer';
import { useOutsideAlerter } from 'Src/lib/hooks';
import LoadMore from 'Components/shared/LoadMore';

const hideMapTip = 'hideMapTip';

const RenderAddContainer = props => {
  const { topic, selectedLocation, removeSelectedLocation } = props;
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => removeSelectedLocation());

  const afterCardCreated = () => {
    removeSelectedLocation();
    props.afterCardCreated();
  };

  return (
    <div ref={wrapperRef}>
      <AddCardOrSubtopic
        isVisible
        displayAddCardButton
        displayAddSubtopicButton
        displayAddChatButton
        displayAddVideoRoomButton
        displayAddGoalButton
        displayAddProjectButton
        className="add_button"
        topic={topic}
        boardTypeSmallModal
        hideOtherButton
        location={selectedLocation}
        afterCardCreated={afterCardCreated}
      />
    </div>
  );
};

class CardsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedLocation: props?.selectedLocation };
  }

  handleClickExpandCard = () => {
    this.setState(prev => ({ cardsIsExpanded: !prev.cardsIsExpanded }));
  };

  componentDidMount() {
    this.setIsSearching();
    const hideTip = JSON.parse(window.localStorage.getItem(hideMapTip));
    this.setState({ hideTip });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery != this.props.searchQuery) {
      this.setIsSearching();
    }
    // if (
    //   prevProps?.selectedLocation?.longitude !=
    //   this.state.selectedLocation?.longitude
    // ) {
    //   this.setState({ selectedLocation: this.props.selectedLocation });
    // }
  }

  setIsSearching = () => {
    if (this.props.searchQuery) {
      if (this.props.searchQuery.length > 0)
        this.setState({ isSearching: true });
      else this.setState({ isSearching: false });
    } else this.setState({ isSearching: false });
  };

  handleHideTip = () => {
    window.localStorage.setItem(hideMapTip, JSON.stringify(true));
    this.setState({ hideTip: true });
  };

  handleAddCardWithLocation = selectedLocation => {
    this.setState({ selectedLocation });
  };

  removeSelectedLocation = () => {
    this.props.removeSelectedLocation();
    this.setState({ selectedLocation: null });
  };

  render() {
    const {
      cards,
      topic,
      card_font_color,
      handleNavigateToMarker,
      onLocationResultClick,
      paginationRelay,
      handleOpenCard,
      toggleAddOptions,
      afterCardCreated,
      cardCreatedCounter
    } = this.props;

    const { isSearching, hideTip } = this.state;

    const { cardsIsExpanded } = this.state;

    const selectedLocation =
      this.state.selectedLocation ?? this.props?.selectedLocation;
    return (
      <div
        className="cards_container"
        style={{
          width: selectedLocation ? '920px' : '400px',
          minHeight: selectedLocation && '335px'
        }}
      >
        <div className="card_listings">
          <CardsContainerHeader
            topic={topic}
            card_font_color={card_font_color}
            cardsIsExpanded={isSearching || cardsIsExpanded}
            handleClickExpandCard={this.handleClickExpandCard}
            toggleAddOptions={toggleAddOptions}
            cardCreatedCounter={cardCreatedCounter}
          />

          {(isSearching || cardsIsExpanded) && (
            <div className={`cards_section ${hideTip && 'hasBorderRadius'}`}>
              {isSearching ? (
                <SearchContainer
                  cardResults={cards}
                  handleNavigateToMarker={handleNavigateToMarker}
                  onLocationResultClick={onLocationResultClick}
                  handleAddCardWithLocation={this.handleAddCardWithLocation}
                  topicId={topic.id}
                />
              ) : (
                <>
                  {cards.map((card, i) => (
                    <CardItem
                      key={i}
                      card={card}
                      handleNavigateToMarker={handleNavigateToMarker}
                      handleOpenCard={handleOpenCard}
                    />
                  ))}
                  <LoadMore
                    relay={paginationRelay}
                    style={{ margin: '5px 0' }}
                  />
                </>
              )}
            </div>
          )}

          {cardsIsExpanded && !hideTip && (
            <div className="tip_section">
              <>
                <div>Double click anywhere on the map to add a Card.</div>
                <a onClick={this.handleHideTip}>Hide this tip.</a>
              </>
            </div>
          )}
        </div>
        {selectedLocation && (
          <RenderAddContainer
            topic={topic}
            selectedLocation={selectedLocation}
            removeSelectedLocation={this.removeSelectedLocation}
            afterCardCreated={afterCardCreated}
          />
        )}
      </div>
    );
  }
}

export default CardsContainer;
