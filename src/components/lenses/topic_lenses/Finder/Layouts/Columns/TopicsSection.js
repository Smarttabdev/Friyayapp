import React, { useState } from 'react';
import RenderItem from './RenderItem';
import LoadMore from 'Components/shared/LoadMore';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import { compactFilters } from 'Lib/utilities';
import { getFilterSettings } from 'Src/helpers/user_config';
import { connect } from 'react-redux';
import { getSort } from 'Components/lenses/card_lenses/Starter/utils';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { boardTypes } from 'Src/components/shared/CardAndBoardTypes';

const TopicsSection = props => {
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const topics = getNodes(props.query?.topics);

  return (
    <div className="topics_section">
      <div className="renderedItems">
        {topics.map((topic, i) => (
          <RenderItem key={i} topic={topic} {...props} />
        ))}
      </div>

      {!isAddingTopic ? (
        <div className="add_button" onClick={() => setIsAddingTopic(true)}>
          + Add Board
        </div>
      ) : (
        <AddSubtopicCard
          inInputMode
          parentId={props.parentId}
          containerClassName="add-topic-form-container"
          // tag={cardLenses[this.props.cardView].boardType}
          formPlaceholder="Add Board"
          transparent
          onDismiss={() => setIsAddingTopic(false)}
        />
      )}
    </div>
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    tools: { finderLens }
  } = sm;

  const { activeFilters } = finderLens;

  let boardTypeFilters = [];

  if (activeFilters[0] != 'ALL') {
    boardTypeFilters = activeFilters
      // .filter(filterType => !!boardTypes.find(bt => bt.itemType == filterType))
      .map(filterType => {
        let type = boardTypes.find(bt => bt.itemType == filterType)?.type;
        return !type
          ? boardTypes.find(bt => bt.itemType == filterType)?.type_def ?? null
          : type;
      });
  }

  return {
    finderLens,
    boardTypeFilters,
    filterSettings: getFilterSettings(state)
  };
};

export default connect(mapState)(
  QueryRenderer(props => <TopicsSection {...props} query={props} />, {
    query: graphql`
      query TopicsSectionQuery(
        $parentId: ID
        $cursor: String
        $title: String
        $tagged: [String!]
        $sort: JSON
      ) {
        topics(
          after: $cursor
          parentId: $parentId
          title: $title
          tagged: $tagged
          sort: $sort
        ) {
          edges {
            node {
              id
              title
              slug
              tagList
            }
          }
        }
      }
    `,
    vars: props => ({
      parentId: toGid('Topic', props.parentId),
      tagged: props.boardTypeFilters,
      title: props.finderLens.searchQuery,
      parentTopicId: props.parentId,
      // filter: {
      //   parentTopicId: props.parentId
      // }
      sort: getSort(props.finderLens.sort)
    })
  })
);
