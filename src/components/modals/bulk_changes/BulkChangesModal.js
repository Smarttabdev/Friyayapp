import React, { useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { mapValues } from 'lodash';

import { stateMappings } from 'src/newRedux/stateMappings';
import {
  boardTypeTags,
  boardTypeOptions,
  cardTypeOptions
} from 'Components/shared/CardAndBoardTypes';
import Modal from 'Components/shared/Modal';
import ReactSelectCustom from 'Components/shared/ReactSelectCustom';
import LoadMore from 'Components/shared/LoadMore';
import { setBulkChangesModal } from 'Src/newRedux/interface/modals/actions';
import { getTopicCards } from 'Src/newRedux/database/cards/selectors';
import { getAllTopicSubtopics } from 'Src/newRedux/database/topics/selectors';
import { changeCard } from 'Src/newRedux/database/cards/actions';
import { changeTopic } from 'Src/newRedux/database/topics/actions';
import cardLenses from 'Lib/config/lenses/cards';
import store from 'Src/store/store';

export const toolConfig = mapValues(cardLenses, val => ({
  boardType: val.boardType || null,
  cardType: val.cardType || 'CARD'
}));

export const updateCardTypesInStore = ({ topicId, config: allConfig }) => {
  topicId = toId(topicId);

  const state = store.getState();

  const allTopics = stateMappings(state).topics;

  const topics = getAllTopicSubtopics(state, topicId);
  topics.unshift(allTopics[topicId]);

  topics.forEach(topic => {
    const toolKey = topic.attributes.default_view_id;
    if (!toolKey) return;

    const config = allConfig[topic.id];
    const lensConfig = toolConfig[toolKey];

    const boardType = config ? config.boardType : lensConfig.boardType;
    const cardType = config ? config.cardType : lensConfig.cardType;

    const tags = topic.attributes.tag_list.filter(
      tag => !boardTypeTags.includes(tag)
    );

    if (boardType) {
      tags.push(boardType);
    }

    store.dispatch(
      changeTopic({
        ...topic,
        attributes: {
          ...topic.attributes,
          tag_list: tags
        }
      })
    );

    const cards = getTopicCards(state, topic.id);

    cards.forEach(card => {
      store.dispatch(
        changeCard({
          ...card,
          attributes: {
            ...card.attributes,
            card_type: cardType
          }
        })
      );
    });
  });
};

const SubtopicList = ({ topicsQuery, renderItem, relay }) => {
  const topics = getNodes(topicsQuery?.topics);
  return (
    <Fragment>
      {topics.map(renderItem)}
      {relay.hasMore() && (
        <tr>
          <td colSpan={100}>
            <LoadMore relay={relay} />
          </td>
        </tr>
      )}
    </Fragment>
  );
};

const SubtopicListPaginationContainer = createPaginationContainer(
  SubtopicList,
  {
    topicsQuery: graphql`
      fragment BulkChangesModal_topicsQuery on Query
        @argumentDefinitions(cursor: { type: String }, topicId: { type: ID }) {
        topics(first: 99, after: $cursor, parentId: $topicId)
          @connection(key: "BulkChangesModal_topics") {
          edges {
            node {
              id
              title
              defaultViewId
              topics {
                totalCount
              }
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.topicsQuery?.topics,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query BulkChangesModalTopicsPaginationQuery(
        $cursor: String
        $topicId: ID
      ) {
        ...BulkChangesModal_topicsQuery
          @arguments(cursor: $cursor, topicId: $topicId)
      }
    `
  }
);

const BulkChangesModal = ({ open, topic, setBulkChangesModal }) => {
  const [config, _setConfig] = useState({});
  const [expand, _setExpand] = useState({});
  const [loading, setLoading] = useState();
  const topicsMapRef = useRef({});

  const setConfig = (topicId, key, val) => {
    topicId = toId(topicId);
    _setConfig({
      ...config,
      [topicId]: {
        ...config[topicId],
        [key]: val
      }
    });
  };

  const setExpand = (topicId, val) =>
    _setExpand({
      ...expand,
      [topicId]: val
    });

  const handleReset = () => {
    _setConfig(
      mapValues(topicsMapRef.current, (val, key) => {
        const topic = topicsMapRef.current[key];
        return {
          ...config[key],
          boardType:
            toolConfig[topic.defaultViewId || 'GRID']?.boardType || null,
          cardType:
            toolConfig[topic.defaultViewId || 'GRID']?.cardType || 'CARD'
        };
      })
    );
  };

  const handleApply = async () => {
    setLoading(true);
    await mutations.updateCardTypes({ topicId: topic.id, config, toolConfig });
    updateStore();
    setLoading(false);
    onClose();
  };

  const updateStore = () => {
    updateCardTypesInStore({ topicId: topic.id, config });
  };

  const onClose = () => {
    !loading && setBulkChangesModal({ isOpen: false });
  };

  const renderItem = (topic, { depth, boardType, cardType }) => {
    const open = !!expand[topic.id];
    const hasChildren = topic.topics?.totalCount > 0;

    if (!topicsMapRef.current[toId(topic.id)]) {
      topicsMapRef.current[toId(topic.id)] = topic;
      _setConfig({
        ...config,
        [toId(topic.id)]: {
          boardType: null,
          cardType: 'CARD'
        }
      });
    }

    return (
      <Fragment>
        <tr>
          <td style={{ paddingLeft: 20 * depth }}>
            <i
              className={cn(
                'fa',
                open ? 'fa-caret-down mr5' : 'fa-caret-right mr8',
                !hasChildren && 'color-c8',
                hasChildren && 'pointer'
              )}
              onClick={() => hasChildren && setExpand(topic.id, !open)}
            />
            {topic.title}
          </td>
          <td>
            <ReactSelectCustom
              value={
                boardTypeOptions.find(
                  x => x.value == config[toId(topic.id)]?.boardType
                ) || boardTypeOptions[0]
              }
              options={boardTypeOptions}
              onChange={e => setConfig(topic.id, 'boardType', e.value)}
              portal
            />
          </td>
          <td className="cards-filter-col">All Cards</td>
          <td>
            <ReactSelectCustom
              value={
                cardTypeOptions.find(
                  x => x.value == config[toId(topic.id)]?.cardType
                ) || cardTypeOptions[0]
              }
              options={cardTypeOptions}
              onChange={e => setConfig(topic.id, 'cardType', e.value)}
              portal
            />
          </td>
        </tr>
        {open &&
          queryRenderer({
            query: graphql`
              query BulkChangesModalSubtopicsQuery($topicId: ID) {
                ...BulkChangesModal_topicsQuery @arguments(topicId: $topicId)
              }
            `,
            vars: {
              topicId: toGid('Topic', topic.id)
            },
            render: ({ props }) => (
              <SubtopicListPaginationContainer
                topicsQuery={props}
                renderItem={topic =>
                  renderItem(topic, {
                    depth: depth + 1,
                    boardType: config[toId(topic.id)]?.boardType || null,
                    cardType: config[toId(topic.id)]?.cardType || 'CARD'
                  })
                }
              />
            )
          })}
      </Fragment>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      containerClassName={cn('bulk-changes-container', loading && 'disabled')}
    >
      <div className="font-size-16 bold mb21">Bulk Changes</div>
      <div>
        Set all Boards to the settings of the default Tool you are using for
        each board.{' '}
        <span
          role="button"
          className="bg-purple color-white ph10 pv5 br6 ml15"
          onClick={handleReset}
        >
          Reset
        </span>
      </div>
      <table className="bulk-changes-table mt25">
        <thead>
          <tr>
            <th></th>
            <th className="board-type-col">Board Type</th>
            <th className="cards-filter-col"></th>
            <th className="card-type-col">Card Type</th>
          </tr>
        </thead>
        <tbody>
          {topic &&
            renderItem(topic, {
              depth: 0,
              boardType: config[toId(topic.id)]?.boardType || null,
              cardType: config[toId(topic.id)]?.cardType || 'CARD'
            })}
        </tbody>
      </table>
      <span
        role="button"
        className="d-inline-block bg-green color-white ph10 pv5 br6 mt40"
        onClick={handleApply}
        style={{ marginBottom: 38 }}
      >
        Apply
        {loading && <i className="fa fa-spinner fa-pulse ml5" />}
      </span>
    </Modal>
  );
};

const mapState = (state, props) => {
  const {
    page,
    modals: { bulkChangesModal }
  } = stateMappings(state);

  const topicId = bulkChangesModal.topicId || page.topicId;

  return {
    topicId,
    open: bulkChangesModal.isOpen
  };
};

const mapDispatch = {
  setBulkChangesModal
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(BulkChangesModal, {
    query: graphql`
      query BulkChangesModalQuery($topicId: ID, $hasTopic: Boolean!) {
        topic(id: $topicId) @include(if: $hasTopic) {
          id
          title
          defaultViewId
          topics {
            totalCount
          }
        }
      }
    `,
    vars: ({ topicId }) => ({
      topicId: toGid('Topic', topicId),
      hasTopic: !!topicId
    })
  })
);
