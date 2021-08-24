import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateTopic } from 'Src/newRedux/database/topics/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import cardViews from 'Src/lib/config/lenses/cards';
import Dropdown from 'Components/shared/Dropdown';
import IconButton from 'Src/components/shared/buttons/IconButton';
import Switch from 'src/components/shared/ToggleSwitch';
import Tooltip from 'Components/shared/Tooltip';
import DriveIcon from 'src/components/svg_icons/driveIcon';
import { useTopicCreatedUpdatedSubscription } from 'Src/lib/hooks';
import { hiddenTools } from 'src/components/shared/lensesUtils';
import { groupBy } from 'lodash';

const allViews = Object.values(cardViews);
const forId = Math.ceil(Math.random() * 100000, 6);
const forDesId = Math.ceil(Math.random() * 100000, 6);
const viewSegments = groupBy(allViews, 'category');
console.log(viewSegments);

const PinToolsToBoards = props => {
  const { history, query, updateTopic, topicId, relay } = props;
  const refetch = () => relay.refetchConnection(15);
  useTopicCreatedUpdatedSubscription(topicId, refetch);
  const { topics } = query;
  const boards = topics?.edges || [];

  const handleClickNext = () =>
    history.push('/introduction/add_cards_to_boards');

  const handleClickPrev = () => history.push('/introduction/add_board_types');

  const updateBoard = async (
    id,
    defaultViewId,
    pinnedTool,
    pinnedLensesOrder
  ) => {
    const result = await updateTopic({
      id: toId(id),
      attributes: {
        default_view_id: defaultViewId
      }
    });

    if (pinnedTool !== defaultViewId) {
      if (pinnedLensesOrder) {
        await mutations.updatePinnedLensesOrder({
          id: pinnedLensesOrder.id,
          name: pinnedLensesOrder.name,
          order: [defaultViewId]
        });
      } else {
        await mutations.createPinnedLensesOrder({
          name: 'Default Tool Order',
          order: [defaultViewId],
          topicId: id,
          isTeamDefault: true
        });
      }
    }

    return result;
  };

  const handlePinLensClick = async (id, key, pinned, pinnedLensesOrder) => {
    if (pinned && pinnedLensesOrder) {
      await mutations.updatePinnedLensesOrder({
        id: pinnedLensesOrder.id,
        name: pinnedLensesOrder.name,
        order: []
      });
    } else if (!pinned && pinnedLensesOrder) {
      await mutations.updatePinnedLensesOrder({
        id: pinnedLensesOrder.id,
        name: pinnedLensesOrder.name,
        order: [key]
      });
    } else if (pinned && !pinnedLensesOrder) {
      await mutations.createPinnedLensesOrder({
        name: 'Default Tool Order',
        order: [],
        topicId: id,
        isTeamDefault: true
      });
    } else {
      await mutations.createPinnedLensesOrder({
        name: 'Default Tool Order',
        order: [key],
        topicId: id,
        isTeamDefault: true
      });
    }
  };

  if (!boards?.length) return null;

  const DisplayPinnedTool = ({
    id,
    defaultViewId,
    activePinnedLensesOrder
  }) => {
    const tool = cardViews[defaultViewId];
    const pinnedTool = activePinnedLensesOrder?.order[0] || null;
    const key = tool?.key || null;
    const icon = tool?.icon || null;
    const name = tool?.name || 'Select Tool';
    const teamIcon = tool?.teamIcon || null;
    const subIcon = tool?.subIcon || null;
    const projectIcon = tool?.projectIcon || null;
    const fontAwesomeIcon = tool?.fontAwesomeIcon || null;
    const outlineIcon = tool?.outlineIcon || null;

    const pinned = pinnedTool === tool?.key ? true : false;

    return (
      <Fragment>
        <div className="intro-initial-setup__boards-panel--box">
          <div className="intro-initial-setup__boards-panel--box__content">
            <span className="intro-initial-setup__boards-panel--box__content-left">
              {icon ? (
                <Fragment>
                  {tool?.icon === 'drive' ? (
                    <DriveIcon className="ml5 icon" />
                  ) : (
                    <IconButton
                      icon={icon}
                      outlined={
                        outlineIcon || icon === 'category' ? true : false
                      }
                      teamIcon={teamIcon}
                      projectIcon={projectIcon}
                      fontAwesome={fontAwesomeIcon}
                      subIcon={subIcon}
                    />
                  )}
                </Fragment>
              ) : null}
              <p>{name || 'Select a Tool'}</p>
            </span>
            {tool && (
              <span
                data-tip={pinned ? 'Unpin Tool' : 'Pin Tool'}
                data-for={forId}
                onClick={() => {
                  handlePinLensClick(id, key, pinned, activePinnedLensesOrder);
                }}
              >
                <Switch on={pinned ? true : false} />
                <Tooltip {...{ place: 'bottom' }} id={forId} />
              </span>
            )}
          </div>
        </div>
        <Dropdown
          menuClassName={'intro-initial-setup__boards-panel__dropdown'}
          closeOnClick={true}
          trigger={
            <IconButton
              color={'#DADADA'}
              icon="add_circle"
              tooltip="Add"
              containerClasses="add-pin-tool-button"
              additionalClasses="add-pin-tool-button-icon"
              tooltipOptions={{ place: 'bottom' }}
            />
          }
        >
          {Object.keys(viewSegments)
            .filter(cat => cat !== 'board_views' && cat !== 'my_tools')
            .map(category => (
              <div key={category}>
                <h4
                  className={`intro-initial-setup__boards-panel__dropdown__category  intro-initial-setup__boards-panel__dropdown__category--${category}`}
                >
                  {category.replace(/_/g, ' ').toUpperCase()}
                  {category !== 'board_lists' && ' TOOLS'}
                </h4>
                {viewSegments[category]
                  .filter(board => !hiddenTools.includes(board.key))
                  .map(x => {
                    const {
                      key,
                      icon,
                      name,
                      teamIcon,
                      subIcon,
                      projectIcon,
                      fontAwesomeIcon,
                      outlineIcon,
                      description
                    } = x;
                    return (
                      <div
                        data-tip={description}
                        data-for={forDesId}
                        className="intro-initial-setup__boards-panel__dropdown__item"
                        key={key}
                        onClick={() =>
                          updateBoard(
                            id,
                            key,
                            pinnedTool,
                            activePinnedLensesOrder
                          )
                        }
                      >
                        <span className="intro-initial-setup__boards-panel__dropdown__item-left">
                          {icon === 'drive' ? (
                            <DriveIcon className="ml5 icon" />
                          ) : (
                            <IconButton
                              icon={icon}
                              outlined={
                                outlineIcon || icon === 'category'
                                  ? true
                                  : false
                              }
                              teamIcon={teamIcon}
                              projectIcon={projectIcon}
                              fontAwesome={fontAwesomeIcon}
                              subIcon={subIcon}
                            />
                          )}
                        </span>
                        <p className="intro-initial-setup__boards-panel__dropdown__item-name">
                          {name}
                        </p>
                        <Tooltip {...{ place: 'bottom' }} id={forDesId} />
                      </div>
                    );
                  })}
              </div>
            ))}
        </Dropdown>
      </Fragment>
    );
  };

  return (
    <div style={{ color: '#000' }} className="intro-initial-setup">
      <div className="intro-initial-setup__header">
        <img
          className="intro-initial-setup-logo"
          src="/images/Friyay-Logo-01.png"
        />
      </div>
      <div className="intro-initial-setup__boards">
        <div className="intro-initial-setup__boards-title-section">
          <h1>We have pinned a Tool to each Board</h1>
          <p>
            There are Tools to help you organize your Boards with Tasks, Notes,
            Chats, Timeline and more. You can easily add or remove Tools as you
            go. You can have multiple Tools per board to organize different
            items or the same items in different ways.
          </p>
        </div>
        {boards.map((x, i) => (
          <div key={i} className="intro-initial-setup__boards-panel">
            <input
              type="text"
              className="form-control"
              value={x?.node?.title || ''}
              placeholder="Type Board title"
              disabled
            />
            {queryRenderer({
              query: graphql`
                query PinToolsToBoardsActiveToolsOrderQuery($topicId: ID!) {
                  activePinnedLensesOrder(topicId: $topicId) {
                    id
                    name
                    order
                  }
                }
              `,
              vars: {
                topicId: x?.node?.id
              },
              render: ({ props }) => (
                <DisplayPinnedTool
                  id={toId(x?.node?.id)}
                  defaultViewId={x?.node?.defaultViewId}
                  activePinnedLensesOrder={props.activePinnedLensesOrder}
                />
              )
            })}
          </div>
        ))}

        <div className="intro-initial-setup__boards-done_section">
          <button className="large-btn" onClick={handleClickNext}>
            Next
          </button>
          <span role="button" className="text-btn" onClick={handleClickPrev}>
            Go back
          </span>
        </div>
      </div>
    </div>
  );
};

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  return {
    topicId
  };
};

const mapDispatch = {
  updateTopic
};

const RefetchContainer = createPaginationContainer(
  PinToolsToBoards,
  {
    query: graphql`
      fragment PinToolsToBoards_query on Query
        @argumentDefinitions(topicId: { type: ID }, cursor: { type: String }) {
        topics(
          first: 15
          after: $cursor
          all: true
          parentId: $topicId
          sort: "created_at desc"
        ) @connection(key: "PinToolsToBoards_topics") {
          totalCount
          edges {
            node {
              id
              title
              defaultViewId
              tagList
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.query?.topics,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query PinToolsToBoardsRefetchQuery($topicId: ID, $cursor: String) {
        ...PinToolsToBoards_query @arguments(topicId: $topicId, cursor: $cursor)
      }
    `
  }
);

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <RefetchContainer {...props} query={props} />, {
    query: graphql`
      query PinToolsToBoardsQuery($topicId: ID, $cursor: String) {
        ...PinToolsToBoards_query @arguments(topicId: $topicId, cursor: $cursor)
      }
    `,
    vars: ({ topicId }) => ({
      topicId: toGid('Topic', topicId || 0)
    })
  })
);
