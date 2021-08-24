import React from 'react';
import ColumnAddCard from './ColumnAddCard';
import ColumnItem from './ColumnItem';
import LoadMore from 'Components/shared/LoadMore';

const CardsNest = props => {
  const tips = getNodes(props.tipsQuery?.tips);
  console.log({ tips });

  const type = 'Tip';

  return (
    <div className="cards_section">
      {tips.map((tip, i) => {
        const id = toId(tip.id);
        return (
          // this.renderItem(item, i)
          <ColumnItem
            key={i}
            tip={tip}
            id={id}
            parentId={props.id}
            handleClickTitle={props.handleClickTitle}
            handleExpandItem={() =>
              props.addNestedLevel({
                type,
                id,
                level: props.level,
                parentTopicId: props.parentTopicId
              })
            }
            isExpanded={
              !!props.nestedLevels.find(
                level => level.id == id && level.type == type
              )
            }
            baseType={type}
          />
        );
      })}
      <LoadMore relay={props.relay} style={{ margin: '5px 0' }} />
      <ColumnAddCard topicId={props.parentTopicId} cardId={props.id} />
    </div>
  );
};

const CardsNestContainer = createPaginationContainer(
  CardsNest,
  {
    tipsQuery: graphql`
      fragment CardsNest_tipsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          tipId: { type: ID }
          sort: { type: JSON }
        ) {
        tips(first: 15, after: $cursor, tipId: $tipId, sort: $sort)
          @connection(key: "CardsNest_tips") {
          totalCount
          edges {
            node {
              id
              title
              slug
              cardType
              nestedTips {
                totalCount
              }
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.tipsQuery?.tips,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query CardsNestTipsQuery($cursor: String, $tipId: ID, $sort: JSON) {
        ...CardsNest_tipsQuery
          @arguments(cursor: $cursor, sort: $sort, tipId: $tipId)
      }
    `
  }
);

export default QueryRenderer(
  props => <CardsNestContainer {...props} tipsQuery={props} />,
  {
    query: graphql`
      query CardsNestQuery($cursor: String, $tipId: ID, $sort: JSON) {
        ...CardsNest_tipsQuery
          @arguments(cursor: $cursor, tipId: $tipId, sort: $sort)
      }
    `,
    vars: props => ({
      tipId: toGid('Topic', props.id),
      sort: { created_at: 'desc' }
    })
  }
);
