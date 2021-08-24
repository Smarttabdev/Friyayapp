import React, { useEffect, useState } from 'react';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { getCards } from 'Src/newRedux/database/cards/thunks';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import Loader from 'src/components/shared/Loader';

const RenderNestedItem = ({ getCards, card, color }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!card) return;
    getCardDetails();
  }, [card]);

  const getCardDetails = async () => {
    try {
      setLoading(true);
      const result = await getCards({ filterIDs: [card.id] });
      setData(result.data.data[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader isLoading={loading} small />;
  }

  if (Object.entries(data).length === 0 && !loading) {
    return null;
  }

  return (
    <CardTitleLink
      additionalClasses="tile-card_title"
      card={data}
      color={color}
      truncate
      showCardTypeIcon
      cardTypeIconSize={14}
    />
  );
};

const dataRequirements = () => {
  return {};
};

const mapDispatch = {
  getCards
};

export default withDataManager(dataRequirements, undefined, mapDispatch, {
  dontShowLoadingIndicator: false
})(RenderNestedItem);
