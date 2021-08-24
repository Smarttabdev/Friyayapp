import React, { useState } from 'react';
import { connect } from 'react-redux';
import IconButton from 'Src/components/shared/buttons/IconButton';
import { getCustomLensId } from 'Src/helpers/user_config';
import { createTopic } from 'Src/newRedux/database/topics/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { success, failure } from 'Utils/toast';

const preFilledText = [
  'Renovation project',
  'Product launch',
  'Social Media Calendar',
  'Hiring',
  'New Employee Onboarding'
];

const handleDefaults = text => {
  switch (text) {
    case preFilledText[0]:
      return {
        boardType: 'project',
        defaultViewId: 'PROJECT_OVERVIEW'
      };
    case preFilledText[1]:
      return {
        boardType: 'task',
        defaultViewId: 'ACTION_PLAN'
      };
    case preFilledText[2]:
      return {
        boardType: 'task',
        defaultViewId: 'CALENDAR'
      };
    case preFilledText[3]:
      return {
        boardType: 'task',
        defaultViewId: 'KANBAN'
      };
    case preFilledText[4]:
      return {
        boardType: 'knowledge',
        defaultViewId: 'KNOWLEDGE_BASE'
      };
    default:
      return {};
  }
};

const active = '#6fcf97';
const inactive = '#DADADA';

const CreateFewBoards = ({
  history,
  createTopic,
  topicId,
  lenseId,
  lenseKey,
  activeTopicsOrder
}) => {
  const [valueOne, setValueOne] = useState('');
  const [valueTwo, setValueTwo] = useState('');
  const [valueThree, setValueThree] = useState('');
  const [valueFour, setValueFour] = useState('');
  const [valueFive, setValueFive] = useState('');
  const [loading, setLoading] = useState(false);

  const saveCustomOrder = ids => {
    const boardId = toGid('Topic', topicId || 0);
    const lensId = toGid('Lens', lenseId);

    mutations.createOrUpdateCustomOrder({
      customOrder: activeTopicsOrder,
      orderTitle: 'Tool Board',
      orderType: 'topics',
      topicId: boardId,
      lenseId: lensId,
      lenseKey,
      order: ids
    });
  };

  const createBoard = async title => {
    const defaults = handleDefaults(title);
    const result = await createTopic({
      attributes: {
        title,
        parent_id: topicId,
        tag_list: [defaults.boardType],
        default_view_id: defaults.defaultViewId
      }
    });
    const id = result?.data?.data?.id || null;
    if (defaults.defaultViewId && id) {
      await mutations.createPinnedLensesOrder({
        name: 'Default Tool',
        order: [defaults.defaultViewId],
        topicId: toGid('Topic', id),
        isTeamDefault: true
      });
    }
    return result;
  };
  const handleCreateTopic = async () => {
    let data = [valueOne, valueTwo, valueThree, valueFour, valueFive];
    data = data.filter(Boolean);

    if (data?.length < 1) {
      return failure('Minimum of one board');
    } else {
      success('Creating Boards, please wait...', 5);

      Promise.all(data.map(x => createBoard(x)))
        .then(data => {
          saveCustomOrder(data.map(x => x.data.data.id));
          success('Boards created', 5);
          handleClickNext();
        })
        .catch(err => {
          console.log(err);
          failure('Something went wrong, try again.');
        });
      setLoading(false);
    }
  };

  const handleClickNext = () => history.push('/introduction/add_board_types');
  const handleClickPrev = () => history.push('/introduction/choose_design');

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
          <h1>Let's create a few Boards</h1>
          <p>
            Boards let you organize just about anything: projects, tasks, notes,
            chats, files and more!
          </p>
        </div>
        <div className="intro-initial-setup__boards-panel">
          <input
            type="text"
            className="form-control"
            value={valueOne}
            placeholder="Type Board title"
            onChange={({ target }) => setValueOne(target.value)}
          />
          <input
            type="text"
            className="form-control"
            value={preFilledText[0]}
            disabled
          />
          <IconButton
            color={valueOne ? active : inactive}
            icon="add_circle"
            tooltip="Add"
            containerClasses="add_button"
            tooltipOptions={{ place: 'bottom' }}
            onClick={() => {
              !valueOne ? setValueOne(preFilledText[0]) : setValueOne('');
            }}
          />
        </div>
        <div className="intro-initial-setup__boards-panel">
          <input
            type="text"
            className="form-control"
            value={valueTwo}
            placeholder="Type Board title"
            onChange={({ target }) => setValueTwo(target.value)}
          />
          <input
            type="text"
            className="form-control"
            value={preFilledText[1]}
            disabled
          />
          <IconButton
            color={valueTwo ? active : inactive}
            icon="add_circle"
            tooltip="Add"
            containerClasses="add_button"
            tooltipOptions={{ place: 'bottom' }}
            onClick={() => {
              !valueTwo ? setValueTwo(preFilledText[1]) : setValueTwo('');
            }}
          />
        </div>
        <div className="intro-initial-setup__boards-panel">
          <input
            type="text"
            className="form-control"
            value={valueThree}
            placeholder="Type Board title"
            onChange={({ target }) => setValueThree(target.value)}
          />
          <input
            type="text"
            className="form-control"
            value={preFilledText[2]}
            disabled
          />
          <IconButton
            color={valueThree ? active : inactive}
            icon="add_circle"
            tooltip="Add"
            containerClasses="add_button"
            tooltipOptions={{ place: 'bottom' }}
            onClick={() => {
              !valueThree ? setValueThree(preFilledText[2]) : setValueThree('');
            }}
          />
        </div>
        <div className="intro-initial-setup__boards-panel">
          <input
            type="text"
            className="form-control"
            value={valueFour}
            placeholder="Type Board title"
            onChange={({ target }) => setValueFour(target.value)}
          />
          <input
            type="text"
            className="form-control"
            value={preFilledText[3]}
            disabled
          />
          <IconButton
            color={valueFour ? active : inactive}
            icon="add_circle"
            tooltip="Add"
            containerClasses="add_button"
            tooltipOptions={{ place: 'bottom' }}
            onClick={() => {
              !valueFour ? setValueFour(preFilledText[3]) : setValueFour('');
            }}
          />
        </div>
        <div className="intro-initial-setup__boards-panel">
          <input
            type="text"
            className="form-control"
            value={valueFive}
            placeholder="Type Board title"
            onChange={({ target }) => setValueFive(target.value)}
          />
          <input
            type="text"
            className="form-control"
            value={preFilledText[4]}
            disabled
          />
          <IconButton
            color={valueFive ? active : inactive}
            icon="add_circle"
            tooltip="Add"
            containerClasses="add_button"
            tooltipOptions={{ place: 'bottom' }}
            onClick={() => {
              !valueFive ? setValueFive(preFilledText[4]) : setValueFive('');
            }}
          />
        </div>

        <div
          style={{
            width: '240px'
          }}
          // onClick={() => setLoading(true)}
          className="intro-initial-setup__boards-done_section"
        >
          <button
            disabled={loading}
            className="large-btn"
            onClick={handleCreateTopic}
          >
            Next {loading && <i className="fa fa-spinner fa-pulse ml5" />}
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

  const lenseId = getCustomLensId(state, topicId);
  const lenseKey = 'STARTER';

  return {
    topicId,
    lenseId,
    lenseKey
  };
};

const mapDispatch = {
  createTopic
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(CreateFewBoards, {
    query: graphql`
      query CreateFewBoardsQuery(
        $topicId: ID!
        $lenseId: ID
        $lenseKey: String
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
      }
    `,
    vars: ({ topicId, lenseId, viewKey }) => ({
      topicId: toGid('Topic', topicId || 0),
      lenseId: toGid('Lens', lenseId),
      lenseKey: viewKey
    })
  })
);
