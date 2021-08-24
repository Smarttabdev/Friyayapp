export const ammendPositionInfo = cards => {
  const ammendedCards = cards.map(
    ({ layer, right, maxLayer, ...card }) => card
  );
  ammendedCards.sort((a, b) =>
    a.startTime === b.startTime
      ? b.endTime - a.endTime
      : a.startTime - b.startTime
  );

  const conflictGroups = [{ index: -1 }];

  let layers = [];
  let maxEnd = 0;
  const noOfCards = ammendedCards.length;

  const getAvailableLayer = start => {
    const availableLayer = layers.findIndex(layer => layer.endTime <= start);
    return availableLayer === -1 ? layers.length : availableLayer;
  };

  const getRightCard = index => {
    const card = layers[index];
    return layers.find((lc, i) => i > index && lc.endTime > card.startTime);
  };

  ammendedCards.forEach((card, index) => {
    if (maxEnd !== 0 && card.startTime >= maxEnd) {
      conflictGroups.push({ index: index - 1, maxLayer: layers.length });
      layers = [];
      maxEnd = card.endTime;
    } else if (card.endTime > maxEnd) {
      maxEnd = card.endTime;
    }

    const layer = getAvailableLayer(card.startTime);
    card.layer = layer;
    layers[layer] = card;

    const leftCard = layers[layer - 1];

    if (
      leftCard &&
      leftCard.endTime > card.startTime &&
      card.endTime > leftCard.startTime
    ) {
      leftCard.right = card.layer;
    }

    const rightCard = getRightCard(layer);
    if (
      rightCard &&
      rightCard.endTime > card.startTime &&
      rightCard.startTime < card.endTime
    ) {
      card.right = rightCard.layer;
    }

    if (index === noOfCards - 1) {
      conflictGroups.push({ index, maxLayer: layers.length });
    }
  });

  for (let i = 1; i < conflictGroups.length; i++) {
    for (
      let j = conflictGroups[i - 1].index + 1;
      j <= conflictGroups[i].index;
      j++
    ) {
      ammendedCards[j].maxLayer = conflictGroups[i].maxLayer;
    }
  }

  return ammendedCards;
};
