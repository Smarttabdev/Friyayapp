import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import LoadMore from 'Components/shared/LoadMore';
import Table from '../Table';
import CardEditor from './ActivitiesTable/CardEditor';

const ActivitiesTable = ({ tipsQuery, relay, setSelectedItem }) => {
  const items = useMemo(() => {
    const tips = getNodes(tipsQuery?.tips);
    return tips.map(tip => ({
      id: tip.id,
      title: tip.title,
      icon: (
        <Icon
          icon="featured_play_list"
          outlined
          color="white"
          style={{ fontSize: 18, marginTop: -2 }}
        />
      ),
      tip
    }));
  }, [tipsQuery]);

  return (
    <Table
      label="Activities"
      darkColor="#6FCF97"
      items={items}
      footer={<LoadMore relay={relay} />}
      onClick={setSelectedItem}
    />
  );
};

const ActivitiesTablePagination = createPaginationContainer(
  ActivitiesTable,
  {
    tipsQuery: graphql`
      fragment ActivitiesTable_tipsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          topicsParams: { type: JSON }
        ) {
        tips(
          first: 10
          after: $cursor
          filter: "title != ''"
          topicsParams: $topicsParams
        ) @connection(key: "ActivitiesTable_tips") {
          edges {
            node {
              id
              title
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
      query ActivitiesTablePaginationQuery(
        $cursor: String
        $topicsParams: JSON
      ) {
        ...ActivitiesTable_tipsQuery
          @arguments(cursor: $cursor, topicsParams: $topicsParams)
      }
    `
  }
);

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  return {
    topicId
  };
};

const ConnectedActivitiesTable = connect(mapState)(
  QueryRenderer(
    props => <ActivitiesTablePagination {...props} tipsQuery={props} />,
    {
      query: graphql`
        query ActivitiesTableQuery($topicsParams: JSON) {
          ...ActivitiesTable_tipsQuery @arguments(topicsParams: $topicsParams)
        }
      `,
      vars: ({ topicId }) => ({
        topicsParams: {
          parent_id: toId(topicId),
          tagged: ['project']
        }
      })
    }
  )
);

export default () => {
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    return eventBus.subscribe(`tracker.tab.click`, () => {
      setSelectedItem();
    });
  }, []);

  return selectedItem ? (
    <CardEditor cardId={toId(selectedItem.id)} />
  ) : (
    <ConnectedActivitiesTable setSelectedItem={setSelectedItem} />
  );
};
