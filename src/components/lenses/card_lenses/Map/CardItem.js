import React, { Component, PureComponent } from 'react';
import Icon from 'Src/components/shared/Icon';
import { getCardTypeIconAttribute } from 'Src/utils/icons';
import { toggleCardsSplitScreen } from 'Src/newRedux/interface/menus/actions.js';
import { updateSelectedCard } from 'Src/newRedux/database/user/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { connect } from 'react-redux';
import IconButton from 'Components/shared/buttons/IconButton';

class CardItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cardHasLocation: props.card?.latitude && props.card?.longitude
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.card.latitude != this.props.card.latitude)
      this.setState({
        cardHasLocation: this.props.card?.latitude && this.props.card?.longitude
      });
  }

  handleOpenCard = card => {
    const {
      cardsSplitScreen,
      toggleCardsSplitScreen,
      updateSelectedCard
    } = this.props;
    const slug = card;
    !cardsSplitScreen && toggleCardsSplitScreen();
    updateSelectedCard(slug);
  };

  handleClickTitle = () => {
    const { card, handleOpenCard } = this.props;
    handleOpenCard(card);
  };

  navigateToMarker = () => {
    const { card, handleNavigateToMarker } = this.props;
    const { cardHasLocation } = this.state;

    if (cardHasLocation) {
      handleNavigateToMarker(card);
    }
  };

  render() {
    const { card } = this.props;
    const { cardHasLocation } = this.state;

    return (
      <div className="card_item">
        <div className="flex_details">
          <Icon
            fontSize={25}
            icon={getCardTypeIconAttribute(card.cardType).icon}
            outlined
            color={getCardTypeIconAttribute(card.cardType).defaultColor}
          />
          <div className="card_title" onClick={this.handleClickTitle}>
            {card.title}
          </div>
        </div>
        <IconButton
          fontSize={25}
          icon="room"
          outlined
          color={`${cardHasLocation ? '#56CCF2' : '#C4C4C4'}`}
          onClick={this.navigateToMarker}
          additionalClasses={!cardHasLocation && 'noPointer'}
        />
      </div>
    );
  }
}

const mapState = state => {
  const { menus } = stateMappings(state);
  return { cardsSplitScreen: menus.cardsSplitScreen };
};

const mapDispatch = { toggleCardsSplitScreen, updateSelectedCard };

export default connect(mapState, mapDispatch)(CardItem);
