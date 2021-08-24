import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compactFilters } from 'Lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getFilterSettings } from 'Src/helpers/user_config';
import { updateStarterLens } from 'Src/newRedux/interface/lenses/actions';
import StarterHeader from './StarterHeader';
import ItemList from './ItemList';
import StarterFilterIconList from './StarterFilterIconList';
import { getSort } from './utils';
import { addTopicItem, addTipItem } from 'Lib/items';

const StarterLens = props => {
  const {
    topicId,
    topic,
    query,
    relay,
    starterLens,
    updateStarterLens,
    active_design,
    page
  } = props;

  useEffect(() => {
    const disposer = requestSubscription({
      subscription: graphql`
        subscription StarterLensTipCreatedSubscription($topicId: ID!) {
          tipCreated(topicId: $topicId) {
            tip {
              id
              title
              slug
              cardType
              createdAt
              updatedAt
            }
          }
        }
      `,
      vars: {
        topicId: toGid('Topic', topicId || 0)
      },
      onNext: data => {
        const tip = data.tipCreated?.tip;
        tip &&
          addTipItem(
            {
              id: tip.id,
              attributes: {
                title: tip.title,
                slug: tip.slug,
                card_type: tip.cardType,
                created_at: tip.createdAt,
                updated_at: tip.updatedAt
              }
            },
            'StarterLens'
          );
      }
    });
    return () => disposer.dispose();
  }, [topicId]);

  useEffect(() => {
    const disposer = requestSubscription({
      subscription: graphql`
        subscription StarterLensTopicCreatedSubscription($topicId: ID!) {
          topicCreated(topicId: $topicId) {
            topic {
              id
              title
              slug
              tagList
              createdAt
              updatedAt
            }
          }
        }
      `,
      vars: {
        topicId: toGid('Topic', topicId || 0)
      },
      onNext: data => {
        const topic = data.topicCreated?.topic;
        topic &&
          addTopicItem(
            {
              id: topic.id,
              attributes: {
                title: topic.title,
                slug: topic.slug,
                tag_list: topic.tagList,
                created_at: topic.createdAt,
                updated_at: topic.updatedAt
              }
            },
            'StarterLens'
          );
      }
    });
    return () => disposer.dispose();
  }, [topicId]);

  useEffect(() => {
    updateStarterLens({ activeFilters: ['ALL'] });
  }, [topicId]);

  const onFilterClick = type => {
    let activeFilters = [];
    if (type != 'ALL') {
      activeFilters = starterLens.activeFilters.find(t => t == type)
        ? starterLens.activeFilters.filter(t => t != type)
        : starterLens.activeFilters.concat(type);
      activeFilters = activeFilters.filter(t => t != 'ALL');
    }
    if (!activeFilters.length) {
      activeFilters.push('ALL');
    }
    updateStarterLens({ activeFilters });
  };

  return (
    <div
      className="starter_container"
      style={page === 'topic' ? { paddingLeft: '25px' } : {}}
    >
      <StarterHeader
        topic={topic}
        fragments={rootFragments(props)}
        activeFilters={starterLens.activeFilters}
        onFilterClick={onFilterClick}
      />
      <StarterFilterIconList
        fontColor={active_design?.card_font_color}
        initialSort={starterLens.sort}
      />
      <ItemList
        items={getNodes(query?.items)}
        paginationRelay={relay}
        fontColor={active_design?.card_font_color}
      />
    </div>
  );
};

const StarterLensContainer = createPaginationContainer(
  StarterLens,
  {
    query: graphql`
      fragment StarterLens_query on Query
        @argumentDefinitions(
          cursor: { type: String }
          sort: { type: JSON }
          filters: { type: JSON }
          itemTypes: { type: "[ItemTypeEnum!]" }
          topicId: { type: ID }
        ) {
        items(
          first: 15
          after: $cursor
          sort: $sort
          filters: $filters
          itemTypes: $itemTypes
          topicId: $topicId
        ) @connection(key: "StarterLens_items") {
          totalCount
          edges {
            node {
              id
              ...ItemList_items
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.query?.items,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query StarterLensItemsQuery(
        $cursor: String
        $sort: JSON
        $filters: JSON
        $itemTypes: [ItemTypeEnum!]
        $topicId: ID
      ) {
        ...StarterLens_query
          @arguments(
            cursor: $cursor
            sort: $sort
            filters: $filters
            itemTypes: $itemTypes
            topicId: $topicId
          )
      }
    `
  }
);

const mapState = state => {
  const sm = stateMappings(state);
  const {
    page: { topicId, page },
    tools: { starterLens },
    utilities: { active_design }
  } = sm;

  return {
    topicId,
    filterSettings: getFilterSettings(state),
    starterLens,
    active_design,
    page
  };
};

const mapDispatch = {
  updateStarterLens
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <StarterLensContainer {...props} query={props} />, {
    query: graphql`
      query StarterLensQuery(
        $cursor: String
        $sort: JSON
        $filters: JSON
        $itemTypes: [ItemTypeEnum!]
        $topicId: ID
      ) {
        ...StarterLens_query
          @arguments(
            cursor: $cursor
            sort: $sort
            filters: $filters
            itemTypes: $itemTypes
            topicId: $topicId
          )
      }
    `,
    vars: props => ({
      sort: getSort(props.starterLens.sort),
      filters: {
        ...compactFilters(props.filterSettings),
        query: props.starterLens.searchQuery
      },
      itemTypes: props.starterLens.activeFilters.filter(x => x != 'ALL'),
      topicId: toGid('Topic', props.topicId)
    })
  })
);
