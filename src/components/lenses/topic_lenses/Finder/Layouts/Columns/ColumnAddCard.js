import React, { useState } from 'react';
import AddCardCard from 'Components/shared/cards/AddCardCard';

const ColumnAddCard = props => {
  const [isAddingCard, setIsAddingCard] = useState(false);

  const toggleAddCard = () => setIsAddingCard(!isAddingCard);

  return !isAddingCard ? (
    <div className="add_button" onClick={toggleAddCard}>
      + Add Card
    </div>
  ) : (
    <AddCardCard
      topicId={props.topicId}
      // afterCardCreated={afterCardCreated}
      inInputMode
      onDismiss={toggleAddCard}
      newCardRelationships={
        props.cardId ? { follows_tip: { data: props.cardId } } : undefined
      }
      topMenu
    />
  );
};

export default ColumnAddCard;
