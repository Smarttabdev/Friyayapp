import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import { useTipCreatedUpdatedSubscription } from 'Src/lib/hooks';
import Tooltip from 'Components/shared/Tooltip';
import cardViews from 'Src/lib/config/lenses/cards';
import IconButton from 'Src/components/shared/buttons/IconButton';

const forId = Math.ceil(Math.random() * 100000, 6);

const handleDefaultCardName = type => {
  switch (type) {
    case 'NOTES':
      return 'Note';
    case 'DATA':
      return 'Data';
    case 'TASK':
      return 'Task';
    case 'CARD':
      return 'Card';
    default:
      return 'Card';
  }
};

const active = '#6fcf97';
const inactive = '#DADADA';

const AddCardsToBoards = ({ history, query, createCard, relay, topicId }) => {
  const refetch = () => relay.refetchConnection(15);
  useTipCreatedUpdatedSubscription(topicId, () => refetch(vars => vars));

  const { topics, tips } = query;
  const [boards, setBoards] = useState([]);
  const [showIndex, setShowIndex] = useState(0);
  const [boardId, setBoardId] = useState(null);
  const [valueOne, setValueOne] = useState('');
  const [valueTwo, setValueTwo] = useState('');
  const [valueThree, setValueThree] = useState('');
  const [valueFour, setValueFour] = useState('');
  const [valueFive, setValueFive] = useState('');

  useEffect(() => {
    if (topics) {
      setBoards(topics.edges);
      setBoardId(topics?.edges[showIndex]?.node.id);
    }
  }, [topics]);

  const handleClickNext = () => history.push('/');
  const handleClickPrev = () =>
    history.push('/introduction/pin_tools_to_boards');

  const reset = () => {
    setValueOne('');
    setValueTwo('');
    setValueThree('');
    setValueFour('');
    setValueFive('');
  };

  const handleSetBoardId = id => {
    reset();
    setBoardId(id);
  };

  const handleCreateCard = async title => {
    const tool = boards[showIndex]?.node?.defaultViewId;
    let cardType = 'CARD';
    if (tool) {
      cardType = cardViews[tool].cardType || 'CARD';
    }

    if (!title) return;
    const attributes = {
      title,
      card_type: cardType
    };
    const relationships = {
      topics: { data: [toId(boardId)] }
    };
    const result = await createCard({ attributes, relationships });
    return result;
  };

  if (!boards?.length) return null;

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
          <h1>Lets add some Cards to your Boards</h1>
          <p>
            Use a Card for a Note, Task, File, Data record, Chat or Video Chat
          </p>
        </div>
        <div className="intro-initial-setup__boards-panel">
          <div className="intro-initial-setup__boards-panel--addCards">
            {boards.map((x, i) => (
              <div
                key={i}
                style={
                  x.node.id === boards[showIndex].node.id
                    ? { border: '2px solid #56CCF2' }
                    : {}
                }
                role="button"
                className="intro-initial-setup__boards-panel-addCards-left"
                onClick={() => {
                  handleSetBoardId(x.node.id);
                  setShowIndex(i);
                }}
              >
                {x.node.title || ''}
                {x.node.id === boards[showIndex].node.id && (
                  <span
                    style={{
                      marginBottom: '-3px',
                      fontSize: '20px',
                      position: 'absolute',
                      top: '16px',
                      right: '-40px'
                    }}
                    className="material-icons ml10"
                  >
                    arrow_forward
                  </span>
                )}
              </div>
            ))}
          </div>
          {boards.map((x, i) => {
            if (x.node.id !== boards[showIndex].node.id) return null;
            const cards = x?.node?.tips.edges || [];
            const tool = boards[showIndex]?.node?.defaultViewId;
            let cardType = 'CARD';
            if (tool) {
              cardType = cardViews[tool].cardType || 'CARD';
            }
            cardType = handleDefaultCardName(cardType);
            return (
              <div
                key={i}
                className="intro-initial-setup__boards-panel-addCards-right"
              >
                <div className="intro-initial-setup__boards-panel-addCards-right__input-container">
                  <input
                    type="text"
                    className="form-control"
                    value={cards[0]?.node.title || valueOne}
                    placeholder="Type Card title"
                    onChange={({ target }) => setValueOne(target.value)}
                    disabled={cards[0]?.node.title ? true : false}
                    onBlur={() => handleCreateCard(valueOne)}
                  />
                  {!cards[0]?.node?.title && (
                    <IconButton
                      color={active}
                      icon="add_circle"
                      tooltip="Add"
                      containerClasses="add_button_card"
                      tooltipOptions={{ place: 'bottom' }}
                      onClick={() => {
                        if (!valueOne) {
                          setValueOne(`${cardType} 1`);
                          handleCreateCard(`${cardType} 1`);
                        }
                        return null;
                      }}
                    />
                  )}
                </div>
                <div className="intro-initial-setup__boards-panel-addCards-right__input-container">
                  <input
                    type="text"
                    className="form-control"
                    value={cards[1]?.node.title || valueTwo}
                    placeholder="Type Card title"
                    onChange={({ target }) => setValueTwo(target.value)}
                    disabled={cards[1]?.node.title ? true : false}
                    onBlur={() => handleCreateCard(valueTwo)}
                  />
                  {!cards[1]?.node.title && (
                    <IconButton
                      color={active}
                      icon="add_circle"
                      tooltip="Add"
                      containerClasses="add_button_card"
                      tooltipOptions={{ place: 'bottom' }}
                      onClick={() => {
                        if (!valueTwo) {
                          setValueTwo(`${cardType} 2`);
                          handleCreateCard(`${cardType} 2`);
                        }
                        return null;
                      }}
                    />
                  )}
                </div>
                <div className="intro-initial-setup__boards-panel-addCards-right__input-container">
                  <input
                    type="text"
                    className="form-control"
                    value={cards[2]?.node.title || valueThree}
                    placeholder="Type Card title"
                    onChange={({ target }) => setValueThree(target.value)}
                    disabled={cards[2]?.node.title ? true : false}
                    onBlur={() => handleCreateCard(valueThree)}
                  />
                  {!cards[2]?.node.title && (
                    <IconButton
                      color={active}
                      icon="add_circle"
                      tooltip="Add"
                      containerClasses="add_button_card"
                      tooltipOptions={{ place: 'bottom' }}
                      onClick={() => {
                        if (!valueThree) {
                          setValueThree(`${cardType} 3`);
                          handleCreateCard(`${cardType} 3`);
                        }
                        return null;
                      }}
                    />
                  )}
                </div>
                <div className="intro-initial-setup__boards-panel-addCards-right__input-container">
                  <input
                    type="text"
                    value={cards[3]?.node.title || valueFour}
                    className="form-control"
                    placeholder="Type Card title"
                    onChange={({ target }) => setValueFour(target.value)}
                    disabled={cards[3]?.node.title ? true : false}
                    onBlur={() => handleCreateCard(valueFour)}
                  />
                  {!cards[3]?.node.title && (
                    <IconButton
                      color={active}
                      icon="add_circle"
                      tooltip="Add"
                      containerClasses="add_button_card"
                      tooltipOptions={{ place: 'bottom' }}
                      onClick={() => {
                        if (!valueFour) {
                          setValueFour(`${cardType} 4`);
                          handleCreateCard(`${cardType} 4`);
                        }
                        return null;
                      }}
                    />
                  )}
                </div>
                <div className="intro-initial-setup__boards-panel-addCards-right__input-container">
                  <input
                    type="text"
                    className="form-control"
                    value={cards[4]?.node.title || valueFive}
                    placeholder="Type Card title"
                    onChange={({ target }) => setValueFive(target.value)}
                    disabled={cards[4]?.node.title ? true : false}
                    onBlur={() => handleCreateCard(valueFive)}
                  />
                  {!cards[4]?.node.title && (
                    <IconButton
                      color={active}
                      icon="add_circle"
                      tooltip="Add"
                      containerClasses="add_button_card"
                      tooltipOptions={{ place: 'bottom' }}
                      onClick={() => {
                        if (!valueFive) {
                          setValueFive(`${cardType} 5`);
                          handleCreateCard(`${cardType} 5`);
                        }
                        return null;
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div
          data-tip={
            tips?.totalCount < 2
              ? 'Create a minimum of two cards to proceed'
              : ''
          }
          data-for={forId}
          className="intro-initial-setup__boards-done_section"
        >
          <button
            disabled={tips.totalCount < 2 ? true : false}
            className="large-btn"
            onClick={handleClickNext}
          >
            Next
          </button>
          <span role="button" className="text-btn" onClick={handleClickPrev}>
            Go back
          </span>
          <Tooltip {...{ place: 'bottom' }} id={forId} />
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
  createCard
};

const RefetchContainer = createPaginationContainer(
  AddCardsToBoards,
  {
    query: graphql`
      fragment AddCardsToBoards_query on Query
        @argumentDefinitions(topicId: { type: ID }, cursor: { type: String }) {
        topics(
          first: 15
          after: $cursor
          all: true
          parentId: $topicId
          sort: "created_at desc"
        ) @connection(key: "AddCardsToBoards_topics") {
          totalCount
          edges {
            node {
              id
              title
              defaultViewId
              tips(sort: "created_at desc") {
                totalCount
                edges {
                  node {
                    id
                    title
                  }
                }
              }
            }
          }
        }
        tips {
          totalCount
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.query?.topics,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query AddCardsToBoardsRefetchQuery($topicId: ID, $cursor: String) {
        ...AddCardsToBoards_query @arguments(topicId: $topicId, cursor: $cursor)
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
      query AddCardsToBoardsQuery($topicId: ID, $cursor: String) {
        ...AddCardsToBoards_query @arguments(topicId: $topicId, cursor: $cursor)
      }
    `,
    vars: ({ topicId }) => ({
      topicId: toGid('Topic', topicId || null)
    })
  })
);
