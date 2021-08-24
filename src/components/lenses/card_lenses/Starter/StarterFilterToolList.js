import React from 'react';

import {
  useTipCreatedUpdatedSubscription,
  useTopicCreatedUpdatedSubscription
} from 'Src/lib/hooks';
import StarterFilterTool from './StarterFilterTool';

const ToolContainer = createRefetchContainer(
  props => {
    const refetch = () => props.relay.refetch(vars => vars);
    props.topicSubscription &&
      useTopicCreatedUpdatedSubscription(props.topicId, refetch);
    props.tipSubscription &&
      useTipCreatedUpdatedSubscription(props.topicId, refetch);
    return (
      <StarterFilterTool {...props} count={props?.query?.items?.totalCount} />
    );
  },
  {
    query: graphql`
      fragment StarterFilterToolList_query on Query
        @argumentDefinitions(
          itemTypes: { type: "[ItemTypeEnum!]" }
          filters: { type: JSON }
          topicId: { type: ID }
        ) {
        items(itemTypes: $itemTypes, topicId: $topicId, filters: $filters) {
          totalCount
        }
      }
    `
  },
  graphql`
    query StarterFilterToolListCountRefetchQuery(
      $itemTypes: [ItemTypeEnum!]
      $topicId: ID
      $filters: JSON
    ) {
      ...StarterFilterToolList_query
        @arguments(itemTypes: $itemTypes, topicId: $topicId, filters: $filters)
    }
  `
);

export default function StarterFilterToolList({
  topicId,
  fragments,
  activeFilters,
  onFilterClick,
  fontColor,
  onlyCardsTools
}) {
  const background = '#2e3037';

  const cardTools = [
    {
      name: 'Cards',
      key: 'CARD',
      itemType: 'CARD',
      tipSubscription: true
    },
    {
      name: 'Task Cards',
      key: 'TASK_CARD',
      itemType: 'TASK_CARD',
      tipSubscription: true
    },
    {
      name: 'Note Cards',
      key: 'NOTES_CARD',
      itemType: 'NOTES_CARD',
      tipSubscription: true
    },
    {
      name: 'Data Cards',
      key: 'DATA_CARD',
      itemType: 'DATA_CARD',
      tipSubscription: true
    },
    {
      name: 'Chats',
      key: 'CHAT',
      itemType: 'CHAT_CARD',
      tipSubscription: true
    },
    {
      name: 'Video Chats',
      key: 'VIDEO_CHAT',
      itemType: 'VIDEO_CHAT_CARD',
      tipSubscription: true
    },
    {
      name: 'Files',
      key: 'FILE',
      itemType: 'FILE_CARD',
      tipSubscription: true
    }
  ];

  const boardTools = [
    {
      name: 'Boards',
      key: 'BOARD',
      background,
      itemType: 'BOARD',
      tipSubscription: true
    },

    {
      name: 'Project Boards',
      key: 'PROJECT',
      background,
      itemType: 'PROJECT_BOARD',
      tipSubscription: true
    },
    {
      name: 'Goal Boards',
      key: 'GOAL',
      background,
      itemType: 'GOAL_BOARD',
      tipSubscription: true
    },
    {
      name: 'Note Boards',
      key: 'NOTES_BOARD',
      background,
      itemType: 'NOTES_BOARD',
      tipSubscription: true
    },
    {
      name: 'Knowledge Boards',
      key: 'KNOWLEDGE_BOARD',
      background,
      itemType: 'KNOWLEDGE_BOARD',
      tipSubscription: true
    },
    {
      name: 'File Boards',
      key: 'FILE_BOARD',
      background,
      itemType: 'FILE_BOARD',
      tipSubscription: true
    },
    {
      name: 'Task Boards',
      key: 'TASK_BOARD',
      background,
      itemType: 'TASK_BOARD',
      tipSubscription: true
    },
    {
      name: 'Data Boards',
      key: 'DATA_BOARD',
      background,
      itemType: 'DATA_BOARD',
      tipSubscription: true
    }
  ];

  let tools = [
    {
      name: 'All',
      key: 'ALL',
      itemType: 'ALL',
      topicSubscription: true,
      tipSubscription: true
    }
  ];

  tools.push(...cardTools);
  if (!onlyCardsTools) tools.push(...boardTools);

  return (
    <div className="tool_filter">
      {tools.map(tool =>
        queryRenderer({
          query: graphql`
            query StarterFilterToolListCountQuery(
              $itemTypes: [ItemTypeEnum!]
              $topicId: ID
              $filters: JSON
            ) {
              ...StarterFilterToolList_query
                @arguments(
                  itemTypes: $itemTypes
                  topicId: $topicId
                  filters: $filters
                )
            }
          `,
          vars: {
            itemTypes: tool.itemType,
            topicId: toGid('Topic', topicId),
            filters: fragments?.__fragmentOwner?.variables?.filters
          },
          render: ({ props }) => (
            <ToolContainer
              key={tool.key}
              topicId={topicId}
              query={props}
              toolKey={tool.key}
              type={tool.itemType}
              name={tool.name}
              topicSubscription={tool.topicSubscription}
              tipSubscription={tool.tipSubscription}
              isActive={activeFilters.includes(tool.itemType)}
              onClick={onFilterClick}
              fontColor={fontColor}
              background={tool.background}
            />
          )
        })
      )}
    </div>
  );
}
