import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  boardTypes,
  getBoardTypeIndex
} from 'src/components/shared/CardAndBoardTypes';
import { updateTopic } from 'Src/newRedux/database/topics/thunks';
import { setDefaultView } from 'src/lib/utilities';
import BoardAndCardTypeListDropdown from 'Components/shared/BoardAndCardTypeListDropdown';
import IconButton from 'Components/shared/buttons/IconButton';
import { useTopicCreatedUpdatedSubscription } from 'Src/lib/hooks';

const AddBoardTypes = ({ history, query, updateTopic, relay, topicId }) => {
  const refetch = () => relay.refetchConnection(15);
  useTopicCreatedUpdatedSubscription(topicId, refetch);
  const { topics } = query;
  const boards = topics?.edges || [];

  const updateBoard = async (id, tag) => {
    const defaultViewId = setDefaultView(tag);
    if (defaultViewId) {
      await mutations.createPinnedLensesOrder({
        name: 'Default Tool',
        order: [defaultViewId],
        topicId: id,
        isTeamDefault: true
      });
    }

    const result = await updateTopic({
      id: toId(id),
      attributes: {
        tag_list: tag ? [tag] : [],
        default_view_id: defaultViewId,
        user_configurations: {}
      }
    });

    return result;
  };

  const handleClickNext = () =>
    history.push('/introduction/pin_tools_to_boards');

  const handleClickPrev = () => history.push('/introduction/create_boards');

  if (!boards?.length) return null;

  const DisplayDropdown = ({ type, id }) => {
    const index = getBoardTypeIndex(type || null) || 0;
    const itemType = boardTypes[index];
    const {
      iconType,
      fontAwesome,
      fontSize,
      outlined,
      color,
      label
    } = itemType;
    return (
      <Fragment>
        <div className="intro-initial-setup__boards-panel--box">
          <div className="intro-initial-setup__boards-panel--box__content">
            <div className="intro-initial-setup__boards-panel--box__content-left">
              <IconButton
                additionalClasses="font-size-16 mr5"
                icon={iconType}
                outlined={outlined}
                fontAwesome={fontAwesome}
                color={color}
                fontSize={fontSize}
              />
              <p>{label}</p>
            </div>
          </div>
        </div>
        <BoardAndCardTypeListDropdown
          dropDownMenuClassName="intro-initial-setup__boards-panel--box__content-dropdown-boardTypes"
          dropdownIconClasses="intro-initial-setup__boards-panel--box__content-dropdown-icon"
          hideItemTypeIcon
          listType="board"
          itemType={type}
          setItemType={type => {
            updateBoard(id, type);
          }}
        />
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
          <h1>Select what type of Boards these are</h1>
          <p>
            Board types are a quick way to configure your board to what you want
            to use it for
          </p>
        </div>
        {boards.map((x, i) => (
          <div key={i} className="intro-initial-setup__boards-panel">
            <input
              type="text"
              className="form-control"
              value={x.node.title || ''}
              placeholder="Type Board title"
              disabled
            />
            <DisplayDropdown type={x.node.tagList[0] || ''} id={x.node.id} />
          </div>
        ))}
        <div
          style={{
            width: '240px'
          }}
          className="intro-initial-setup__boards-done_section"
        >
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
  AddBoardTypes,
  {
    query: graphql`
      fragment AddBoardTypes_query on Query
        @argumentDefinitions(topicId: { type: ID }, cursor: { type: String }) {
        topics(
          first: 15
          after: $cursor
          all: true
          parentId: $topicId
          sort: "created_at desc"
        ) @connection(key: "AddBoardTypes_topics") {
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
      query AddBoardTypesRefetchQuery($topicId: ID, $cursor: String) {
        ...AddBoardTypes_query @arguments(topicId: $topicId, cursor: $cursor)
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
      query AddBoardTypesQuery($topicId: ID, $cursor: String) {
        ...AddBoardTypes_query @arguments(topicId: $topicId, cursor: $cursor)
      }
    `,
    vars: ({ topicId }) => ({
      topicId: toGid('Topic', topicId || null)
    })
  })
);
