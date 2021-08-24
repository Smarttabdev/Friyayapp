import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'src/newRedux/stateMappings';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import Icon from 'Components/shared/Icon';
import {
  handleCreatedRecord,
  handleDeletedRecord,
  handleReorderRecords
} from 'Lib/utilities';
import BlockSelector from './BlockSelector';
import Block from './Block';
import blockTypes from './blocks';

const CanvasLens = props => {
  const rootRef = useRef();
  const [showSelector, setShowSelector] = useState();

  useEffect(() => {
    if (
      props.blockKey &&
      props.blocks !== undefined &&
      props.blocks.length === 0
    ) {
      const hasGoalDescription = Boolean(
        props.blocks?.find(block => block.type === 'goalDescription')
      );

      const hasProjectDescription = Boolean(
        props.blocks?.find(block => block.type === 'projectDescription')
      );

      const hasSprintBar = Boolean(
        props.blocks?.find(block => block.type === 'sprintBar')
      );

      const hasTeamList = Boolean(
        props.blocks?.find(block => block.type === 'teamList')
      );

      const { domainId, topicId } = props;
      const ownerId = topicId
        ? toGid('Topic', topicId)
        : toGid('Domain', domainId);

      const createDefaultBlocks = async () => {
        if (props.blockKey == 'goalOverview') {
          if (!hasGoalDescription) {
            await mutations.createBlock({
              ownerId,
              key: props.blockKey,
              type: 'goalDescription',
              position: 0,
              config: blockTypes['goalDescription'].defaultConfig || {}
            });
          }
        } else if (props.blockKey == 'projectOverview') {
          if (!hasProjectDescription) {
            await mutations.createBlock({
              ownerId,
              key: props.blockKey,
              type: 'projectDescription',
              position: 0,
              config: blockTypes['projectDescription'].defaultConfig || {}
            });
          }
        }

        if (!hasSprintBar) {
          await mutations.createBlock({
            ownerId,
            key: props.blockKey,
            type: 'sprintBar',
            position: 1,
            config: blockTypes['sprintBar'].defaultConfig || {}
          });
        }

        if (!hasTeamList) {
          mutations.createBlock({
            ownerId,
            key: props.blockKey,
            type: 'teamList',
            position: 2,
            config: blockTypes['teamList'].defaultConfig || {}
          });
        }
      };

      createDefaultBlocks();
    }
  }, [props.blocks]);

  const { blocks = [], domainId, topicId, blockKey } = props;

  const ownerId = topicId ? toGid('Topic', topicId) : toGid('Domain', domainId);

  useEffect(() => {
    const disposer = subscriptions.blockCreated({
      ownerId,
      updater: store => {
        handleCreatedRecord({
          rootField: 'blockCreated',
          field: 'block',
          recordsField: 'blocks',
          recordsVars: { ownerId, key: blockKey },
          store
        });
      }
    });
    return () => disposer.dispose();
  }, [ownerId]);

  useEffect(() => {
    // console.log(blocks);
    const disposers = blocks.map(block =>
      subscriptions.blockUpdated({
        id: block.id,
        updater: store => {
          handleDeletedRecord({
            rootField: 'blockUpdated',
            field: 'block',
            id: block.id,
            recordsField: 'blocks',
            recordsVars: { ownerId, key: blockKey },
            store
          });
        }
      })
    );

    return () => disposers.forEach(d => d.dispose());
  }, [blocks]);

  const handleToggleSelector = () => setShowSelector(!showSelector);

  const handleSelectBlock = type => {
    mutations.createBlock({
      ownerId,
      key: blockKey,
      type,
      position: blocks.length,
      config: blockTypes[type].defaultConfig || {}
    });
  };

  const handleRemoveBlock = async block => {
    const blockType = blockTypes[block.type];
    blockType.onDelete && (await blockType.onDelete(block));
    await mutations.deleteBlock({ id: block.id });
  };

  const handleDropBlock = ({ itemOrder }) => {
    itemOrder.forEach((item, i) =>
      mutations.updateBlock({
        id: item.id,
        position: i
      })
    );
    updateStore(store => {
      handleReorderRecords({
        field: 'client:root',
        recordsField: 'blocks',
        recordsVars: { ownerId, key: blockKey },
        itemOrder,
        store
      });
    });
  };

  return (
    <div className="canvas-lens" ref={rootRef}>
      <GenericDragDropListing
        dropClassName="flex flex-wrap"
        itemList={blocks}
        itemType={dragItemTypes.BLOCK}
        onDropItem={handleDropBlock}
        itemContainerClassName="generic-block-container"
        manual
        dragPreview={() => (
          <div
            className="flex flex-r-center-center relative"
            style={{
              width: 230,
              height: 150,
              transform: 'translate(calc(-100% + 20px), -50%)',
              cursor: 'grab'
            }}
          >
            <Icon
              outlined
              icon="drag_indicator"
              containerStyle={{
                position: 'absolute',
                top: '50%',
                right: 5,
                transform: 'translateY(-50%)'
              }}
            />
          </div>
        )}
        renderItem={(
          item,
          dragLeaveHandlers,
          index,
          { connectDragSource, handleDrag } = {}
        ) => (
          <Block
            key={item.id}
            id={item.id}
            type={item.type}
            config={item.config}
            topicId={topicId}
            connectDragSource={connectDragSource}
            handleDrag={handleDrag}
            onRemove={() => handleRemoveBlock(item)}
            maxWidth={rootRef.current?.clientWidth - 70}
          />
        )}
      />
      <img
        src="/images/icons/edge-plus.svg"
        className="show-selector-btn"
        onClick={handleToggleSelector}
      />
      {(!blocks.length || showSelector) && (
        <BlockSelector onSelectBlock={handleSelectBlock} />
      )}
    </div>
  );
};

const mapState = (state, props) => {
  const {
    page: { domainId, topicId: pageTopicId },
    topics
  } = stateMappings(state);

  const topicId = props?.topic?.id || pageTopicId;
  return {
    domainId,
    topicId,
    topic: topics[topicId]
  };
};

export default connect(mapState)(
  QueryRenderer(CanvasLens, {
    query: graphql`
      query CanvasLensQuery($ownerId: ID!, $blockKey: String) {
        blocks(ownerId: $ownerId, key: $blockKey) {
          id
          type
          position
          config
        }
      }
    `,
    vars: ({ domainId, topicId, blockKey }) => ({
      ownerId: topicId ? toGid('Topic', topicId) : toGid('Domain', domainId),
      blockKey
    })
  })
);
