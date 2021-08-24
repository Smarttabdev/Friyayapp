import { PureComponent } from 'react';
import { connect } from 'react-redux';

import store from '../../../store/store';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import { nestCardUnderCard } from 'Src/newRedux/database/cards/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';

class GenericCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    this.props.nestCardUnderCard({
      nestedCard: droppedItemProps.item,
      parentCard: this.props.cards[dropZoneProps.cardId],
      fromTopicId: droppedItemProps.origin.topicId,
      toTopicId: dropZoneProps.topicId,
      itemOrder
    });
  };

  handleNestedCardsCaretClick = () => {
    const { card } = this.props;
    this.setState(state => ({ showNestedCards: !state.showNestedCards }));
    mutations.setConfig({
      owner: toGid('Tip', card.id || 0),
      config: 'is_card_expanded',
      value: !this.state.showNestedCards
    });
  };

  showAsNestable = attrs => {
    const { card } = this.props;
    if (card.id != attrs.draggedItemProps.item.id) {
      this.setState({
        nestedTips: [
          ...card.relationships.nested_tips.data,
          attrs.draggedItemProps.item.id
        ],
        showNestedCards: true,
        draggedCard: attrs.draggedItemProps.item
      });
    }
  };

  dontShowAsNestable = attrs => {
    const { card } = this.props;
    if (card.id != attrs.draggedItemProps.item.id) {
      this.setState({
        nestedTips: null,
        showNestedCards: false,
        draggedCard: null
      });
    }
  };

  handleNestCard = itemProps => {
    const { card } = this.props;
    const dragged = itemProps.draggedItemProps;
    if (dragged.item.id === card.id) {
      return;
    }
    this.props.nestCardUnderCard({
      nestedCard: dragged.item,
      parentCard: card,
      fromTopicId: dragged.origin.topicId,
      toTopicId: itemProps.dropZoneProps.topicId || dragged.origin.topicId,
      itemOrder: [...card.relationships.nested_tips.data, dragged.item.id]
    });
    setTimeout(() => {
      this.setState({ showNestedCards: true });
    });
  };

  render() {
    return;
  }
}

export default GenericCard;
