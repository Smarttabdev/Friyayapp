import React, { useState, useEffect } from 'react';
import ColumnAddCard from './ColumnAddCard';
import ColumnItem from './ColumnItem';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import { addTopicItem, addTipItem } from 'Lib/items';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getFilterSettings } from 'Src/helpers/user_config';
import { compactFilters } from 'Lib/utilities';
import LoadMore from 'Components/shared/LoadMore';
import TopicsSection from './TopicsSection';
import CardsSection from './CardsSection';

const sort = { created_at: 'desc' };

const TopicsNest = props => {
  let topicId = props.id;

  return (
    <>
      <TopicsSection parentId={topicId} {...props} />
      <CardsSection topicId={topicId} {...props} />
    </>
  );
};

export default TopicsNest;
