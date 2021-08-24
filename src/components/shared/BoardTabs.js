import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import Icon from 'Components/shared/Icon';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { getCustomLensId } from 'Src/helpers/user_config';
import ToggleSwitch from 'Components/shared/ToggleSwitch';
import Dropdown from 'Components/shared/Dropdown';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import {
  GenericDropZone,
  dragItemTypes as dropItemTypes
} from 'Components/shared/drag_and_drop/_index';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import { setPageDetails } from 'Src/newRedux/interface/page/actions';
import { fetchQuery } from 'Lib/relay';
import TopicTitleEditor from 'Src/components/shared/topics/elements/TopicTitleEditor';
import {
  ensureCard,
  addRemoveCardFromTopics
} from 'src/newRedux/database/cards/thunks';
import {
  ensureTopic,
  moveTopicContents
} from 'src/newRedux/database/topics/thunks';
import store from 'Src/store/store';

const TabHeader = ({
  active,
  onClick,
  onClickGoto,
  onRemove,
  children,
  id,
  setHoveredBoardId
}) => (
  <div
    onMouseEnter={() => {
      setHoveredBoardId && setHoveredBoardId(toId(id));
    }}
    className={cn(
      'board-tabs__tab-header',
      active && 'board-tabs__tab-header--active'
    )}
  >
    <span className="pointer" onClick={onClick}>
      {children}
    </span>
    {onClickGoto && <Icon button icon="launch" onClick={onClickGoto} />}
    {!active && (
      <Icon
        button
        icon="close"
        onClick={onRemove}
        containerStyle={{ marginLeft: 6 }}
      />
    )}
  </div>
);

const BoardTabs = ({
  path,
  topicId,
  userId,
  page,
  parentTopicId,
  parentTopicSlug,
  lenseId,
  viewKey,
  activeTopicsOrder,
  multiRowsConfig,
  viewTopic,
  setPageDetails,
  topic,
  shiftKeyDown,
  addRemoveCardFromTopics,
  moveTopicContents,
  ensureCard,
  ensureTopic
}) => {
  const [orderTopics, setOrderTopics] = useState([]);
  const [editTopicId, setEditTopicId] = useState();
  const [hoveredBoardId, setHoveredBoardId] = useState('0');

  const topicIds = activeTopicsOrder?.order || [];

  useEffect(() => {
    if (!activeTopicsOrder?.order?.length && orderTopics.length) {
      setOrderTopics([]);
    }
  }, [activeTopicsOrder?.order]);

  useEffect(() => {
    fetchQuery(
      graphql`
        query BoardTabsTopicsQuery($topicIds: [ID!], $include: Boolean!) {
          topics(ids: $topicIds, all: true) @include(if: $include) {
            edges {
              node {
                id
                title
                slug
              }
            }
          }
        }
      `,
      {
        topicIds,
        include: !!topicIds?.length
      }
    ).then(results => {
      if (!results?.topics) return;
      const topics = getNodes(results?.topics);
      const ordered = topicIds
        .map(id => topics.find(t => toId(t.id) == id))
        .filter(x => x);
      if (
        JSON.stringify(ordered.map(t => t.id)) ===
        JSON.stringify(orderTopics.map(t => t.id))
      )
        return;
      setOrderTopics(ordered);
    });
  }, [JSON.stringify(topicIds)]);

  const handleFinishEdit = (topicId, title) => {
    setOrderTopics(
      orderTopics.map(topic =>
        topic.id != topicId
          ? topic
          : {
              ...topic,
              title
            }
      )
    );
    setEditTopicId();
  };

  const selectCurrentBoard = () => {
    setPageDetails({
      parentTopicId: null,
      parentTopicSlug: null,
      topicId: parentTopicId,
      topicSlug: parentTopicSlug
    });
  };

  const handleClickCurrent = () => selectCurrentBoard();

  const handleClickView = topic => {
    setPageDetails({
      parentTopicId,
      parentTopicSlug,
      topicId: toId(topic.id),
      topicSlug: topic.slug
    });
  };

  const handleClickGoto = topicId => {
    viewTopic({ topicId });
  };

  const handleClickRemove = topicId => {
    mutations.confirmUpdateCustomOrder({
      orderTitle: 'Tool Board',
      orderType: 'topics',
      topicId: parentTopicId,
      lenseId,
      lenseKey: viewKey,
      customOrder: activeTopicsOrder,
      order: activeTopicsOrder.order.filter(id => id != topicId)
    });
  };

  const handleClose = () => {
    selectCurrentBoard();
    mutations.setConfig({
      owner: toGid('Topic', parentTopicId),
      config: `${viewKey}.boardTabsClosed`,
      value: true
    });
  };

  const handleToggleMultiRows = () => {
    mutations.setConfig({
      owner: toGid('User', userId),
      config: 'tabs.multi_rows',
      value: !multiRowsConfig?.value
    });
  };

  const handleDropCard = ({ draggedItemProps }) => {
    let originTopicId = draggedItemProps.item.relationships.topics.data;
    let topicToAdd = [hoveredBoardId];

    if (shiftKeyDown) {
      topicToAdd = [
        ...topicToAdd,
        ...draggedItemProps.item.relationships.topics.data
      ];
      originTopicId = [];
    }

    addRemoveCardFromTopics(
      draggedItemProps.item,
      [...new Set(topicToAdd)],
      originTopicId
    );
  };

  const handleTopicDrop = itemProps => {
    moveTopicContents({
      destinationTopicId: hoveredBoardId,
      topicId: itemProps.draggedItemProps.item.id
    });
  };

  const handleDropOrderItem = props => {
    const { itemOrder, droppedItemProps, dropZoneProps } = props;

    droppedItemProps.itemType === dragItemTypes.TOPIC;

    mutations.createOrUpdateCustomOrder({
      customOrder: activeTopicsOrder,
      orderTitle: 'Tool Board',
      orderType: 'topics',
      topicId: parentTopicId,
      lenseId,
      lenseKey: viewKey,
      order: itemOrder.map(item => toId(item.id))
    });
  };

  const handleDrop = async itemProps => {
    const item = itemProps.draggedItemProps.item;
    const id = toId(item.itemId);

    if (item.baseType === 'Topic') {
      await ensureTopic(id);
      itemProps.draggedItemProps.item = stateMappings(store.getState()).topics[
        id
      ];
    } else if (item.baseType === 'Tip') {
      await ensureCard(id);
      itemProps.draggedItemProps.item = stateMappings(store.getState()).cards[
        id
      ];
    }

    if (itemProps.draggedItemProps.itemType === dropItemTypes.CARD) {
      handleDropCard(itemProps);
    } else if (
      itemProps.draggedItemProps.itemType === dragItemTypes.TOPIC ||
      itemProps.draggedItemProps.itemType === dragItemTypes.SUBTOPIC_HEX
    ) {
      handleTopicDrop(itemProps);
    }
  };

  // const handleDragEnter = itemProps => {
  //   console.log('handleEnter', itemProps);
  // };
  // const handleDragLeave = itemProps => {
  //   console.log('handleEnter', itemProps);
  // };

  return (
    <div className="board-tabs">
      <GenericDropZone
        itemType={[
          dropItemTypes.CARD,
          dropItemTypes.FOLDER,
          dropItemTypes.TOPIC,
          dropItemTypes.SUBTOPIC_HEX
        ]}
        // onDragEnter={handleDragEnter}
        // onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        item={topic}
        style={{ maxWidth: 'calc(100% - 93px)', overflow: 'hidden' }}
      >
        <GenericDragDropListing
          dropClassName={cn(
            'board-tabs__tabs-header-container',
            multiRowsConfig?.value && 'flex-wrap'
          )}
          itemList={orderTopics}
          itemType={dragItemTypes.FOLDER}
          onDropItem={handleDropOrderItem}
          prefix={
            <TabHeader
              active={parentTopicId == page.topicId}
              onClick={handleClickCurrent}
            >
              Current
            </TabHeader>
          }
          renderItem={topic => (
            <TabHeader
              setHoveredBoardId={setHoveredBoardId}
              key={topic.id}
              id={topic.id}
              active={toId(topic.id) == page.topicId}
              onClick={() => handleClickView(topic)}
              onClickGoto={() => handleClickGoto(toId(topic.id))}
              onRemove={() => handleClickRemove(toId(topic.id))}
            >
              {editTopicId == topic.id ? (
                <TopicTitleEditor
                  topic={topic}
                  onFinishEditing={title => handleFinishEdit(topic.id, title)}
                />
              ) : (
                <span onDoubleClick={() => setEditTopicId(topic.id)}>
                  {topic.title}
                </span>
              )}
            </TabHeader>
          )}
        />
      </GenericDropZone>
      <div className="mt6 flex-r-center" style={{ alignSelf: 'flex-start' }}>
        <Dropdown
          trigger={<Icon icon="add_circle" />}
          className="ml5 mt11"
          MenuComponent="div"
          menuClassName="p-a-0 max-h-unset"
          menuStyle={{ left: -100 }}
          closeOnClick={false}
        >
          <TopicsListDropdown
            additionalClasses="invite-form-dropdown-menu d-block static max-h-unset"
            actionButtonLabel="Share selected Boards"
            actionButtonHandler={() => {}}
            actionButtonClass="btn-primary"
            path={path.concat({ id: '0' })}
            startAt={path && '0'}
            hideHeader
            inputMode="list"
            disallowCreate
            multiple
            hideAddTopicLink
            skipConfirmation
            domain={window.currentDomain}
            onSelectTopic={() => {}}
            showAddBoard
            topicsSelectMenuProps={{
              useBoardOrder: true,
              topicId: parentTopicId
            }}
            extraStyle={{ top: 38, left: '75%' }}
          />
        </Dropdown>
        <ToggleSwitch className="ml9 mr9 mt8" on onClick={handleClose} />
        <Dropdown
          trigger={<Icon button icon="arrow_drop_down_circle" />}
          className="ml-auto mt11 mr8"
          menuClassName="p-a-15px max-h-unset"
          menuStyle={{ left: -280, width: 320, maxHeight: '65vh' }}
          closeOnClick={false}
        >
          <li className="p-a-20px">
            Multi Rows
            <ToggleSwitch
              className="ml9"
              on={!!multiRowsConfig?.value}
              onClick={handleToggleMultiRows}
            />
          </li>
          <li>
            <a
              className={cn('p-y-10px p-x-20px')}
              onClick={handleClickCurrent}
              style={{
                fontWeight: parentTopicId == page.topicId ? 'bold' : undefined
              }}
            >
              Current
            </a>
          </li>
          <li>
            <GenericDragDropListing
              itemList={orderTopics}
              itemType={dragItemTypes.FOLDER}
              onDropItem={handleDropOrderItem}
              renderItem={topic => (
                <div
                  key={topic.id}
                  className="p-y-10px p-x-20px flex-r-center cursor-default dropdown-item"
                  style={{ display: 'flex' }}
                >
                  <span
                    className={cn(
                      'flex-grow pointer mr10',
                      toId(topic.id) == page.topicId && 'bold'
                    )}
                    onClick={() => handleClickView(topic)}
                  >
                    {topic.title}
                  </span>
                  <span className="flex-r-center">
                    <Icon
                      button
                      icon="launch"
                      fontSize={18}
                      onClick={() => handleClickGoto(toId(topic.id))}
                    />
                    <Icon
                      button
                      icon="close"
                      fontSize={18}
                      onClick={() => handleClickRemove(toId(topic.id))}
                      containerStyle={{ marginLeft: 6 }}
                    />
                  </span>
                </div>
              )}
            />
          </li>
        </Dropdown>
      </div>
    </div>
  );
};

const mapState = state => {
  const { page, topics, utilities, user } = stateMappings(state);
  const parentTopicId = page.parentTopicId || page.topicId;
  const parentTopicSlug = page.parentTopicSlug || page.topicSlug;
  const topic = topics[parentTopicId];
  const path = topic?.attributes.path;
  const lenseId = getCustomLensId(state, parentTopicId);
  const viewKey = getRelevantViewForPage(state, parentTopicId);
  return {
    userId: user.id,
    path,
    shiftKeyDown: utilities.shiftKeyDown,
    page,
    parentTopicId,
    parentTopicSlug,
    lenseId,
    viewKey,
    topic
  };
};

const mapDispatch = {
  viewTopic,
  setPageDetails,
  ensureCard,
  ensureTopic,
  addRemoveCardFromTopics,
  moveTopicContents
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(BoardTabs, {
    query: graphql`
      query BoardTabsQuery(
        $topicId: ID!
        $lenseId: ID
        $lenseKey: String
        $userId: ID!
      ) {
        activeTopicsOrder: activeCustomOrder(
          orderType: topics
          topicId: $topicId
          lenseId: $lenseId
          lenseKey: $lenseKey
        ) {
          id
          name
          order
        }
        multiRowsConfig: config(owner: $userId, config: "tabs.multi_rows") {
          id
          config
          value
        }
      }
    `,
    vars: ({ parentTopicId, lenseId, viewKey, userId }) => ({
      topicId: toGid('Topic', parentTopicId),
      lenseId: toGid('Lens', lenseId),
      lenseKey: viewKey,
      userId: toGid('User', userId)
    })
  })
);
