import React, { useState, useEffect } from 'react';
import Avatar from 'Components/shared/Avatar';
import IconButton from 'Src/components/shared/buttons/IconButton';
import { getAvatarUrl } from 'Lib/utilities';
import GoalBox from 'src/components/lenses/card_lenses/GoalBoards/GoalBox';
import BoardBox from 'src/components/lenses/card_lenses/ProjectBoards/BoardBox';
import Dropdown from 'Components/shared/Dropdown';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import store from 'src/store/store';

const color = '#808080';

const TeamMemberProjectBox = props => {
  const {
    user,
    fontColor,
    removeUser,
    boards,
    isExpanded,
    updateExpanded,
    path,
    allTopics,
    query
  } = props;
  const [selectedTopics, setSelectedTopics] = useState([]);
  const { linkedBoardsConfig } = query || {};

  useEffect(() => {
    const topicIds = linkedBoardsConfig?.value || [];
    const topics = topicIds
      .filter(id => allTopics[id])
      .map(id => ({
        title: allTopics[id]?.attributes.title,
        ...allTopics[id]
      }));

    let filteredSubtopics = [];
    if (boards?.length > 0) {
      filteredSubtopics = boards.filter(
        topic =>
          topic.relationships.assignments.data.filter(
            user => user.assigned_id === Number(props?.user?.id)
          ).length > 0
      );
      filteredSubtopics = filteredSubtopics.map(x => ({
        title: x?.attributes.title,
        ...x
      }));
    }
    setSelectedTopics(filteredSubtopics.concat(topics));
  }, [linkedBoardsConfig?.value]);

  const saveSelectedTopicIds = ids => {
    let boardIds = ids || [];

    mutations.setConfig({
      owner: toGid('User', user?.id),
      config: 'TEAM_PROJECTS_user.boards',
      value: boardIds
    });
  };

  const getTopicsSelected = list => {
    const selectedTopicsArr = list.map(topic => ({
      title: allTopics[topic.value]?.attributes.title,
      ...allTopics[topic.value]
    }));

    return setSelectedTopics(selectedTopicsArr);
  };

  const handleTopicSelected = topicsArr => {
    const list = topicsArr.map(topic => ({
      value: topic.id,
      label: topic.title
    }));
    getTopicsSelected(list);
    saveSelectedTopicIds(list.map(opt => opt.value));
  };

  return (
    <div className="team-projects-list">
      <div
        style={
          !isExpanded
            ? { transform: 'translateY(5px)' }
            : { transform: 'translateY(0)' }
        }
        className="team-projects-list__top"
      >
        <IconButton
          fontAwesome
          icon={isExpanded ? 'caret-down' : 'caret-right'}
          onClick={() => updateExpanded(!isExpanded)}
        />
        <Avatar
          url={getAvatarUrl(user)}
          initial={(user.attributes?.first_name[0] || '').toUpperCase()}
          border={'none'}
        />
        <span className="ml7 mr5">{user?.attributes?.first_name}</span>
        <IconButton
          additionalClasses="team-projects-list__remove"
          icon="close"
          color={fontColor || '#808080'}
          tooltip="Remove team member"
          fontSize={14}
          onClick={() => removeUser(user.id)}
          tooltipOptions={{ place: 'bottom' }}
        />
      </div>
      <div
        style={isExpanded ? { height: '100%', opacity: 1 } : {}}
        className="team-projects-list__bottom"
      >
        <div className="team-projects-list__bottom-box">
          {selectedTopics?.length > 0
            ? selectedTopics.map(board => (
                <div key={board.id} style={{ marginBottom: '25px' }}>
                  <BoardBox topic={board} hideAddAssigne />
                </div>
              ))
            : null}
        </div>
        <Dropdown
          trigger={
            <IconButton
              additionalClasses="large"
              additionalIconClasses="large"
              color={'#2e3037'}
              icon="add"
              tooltip={`Assign a Project Board to ${user?.attributes?.first_name}`}
            />
          }
          menuClassName="p-a-0 max-h-unset"
          closeOnClick={false}
          className="team-projects-list__add-board"
        >
          <TopicsListDropdown
            additionalClasses="invite-form-dropdown-menu d-block static max-h-unset"
            actionButtonLabel="Select Board"
            actionButtonHandler={handleTopicSelected}
            actionButtonClass="btn-primary"
            path={path.concat({ id: '0' })}
            startAt={path && '0'}
            hideHeader
            hideTopicSelector={false}
            inputMode="list"
            showAddBoard
            disallowCreate
            multiple
            hideAddTopicLink
            skipConfirmation
            onInputBlur={() => {}}
            onInputFocus={() => {}}
            domain={window.currentDomain}
            onSelectTopic={() => {}}
            extraStyle={{ maxHeight: 'unset' }}
            selectedTopics={selectedTopics}
            tagged={'project'}
          />
        </Dropdown>
      </div>
    </div>
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    page: { topicId, parentTopicId },
    utilities: { active_design }
  } = sm;

  const id = parentTopicId || topicId;
  const allTopics = stateMappings(store.getState()).topics;
  const topic = allTopics[id];
  const path = topic?.attributes.path;

  return {
    path,
    allTopics,
    topicId: id,
    active_font_color: active_design.card_font_color
  };
};

const RefetchContainer = createRefetchContainer(
  TeamMemberProjectBox,
  {
    query: graphql`
      fragment TeamMemberProjectBox_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        linkedBoardsConfig: config(
          owner: $owner
          config: "TEAM_PROJECTS_user.boards"
        ) {
          value
        }
      }
    `
  },
  graphql`
    query TeamMemberProjectBoxRefetchQuery($owner: ID!) {
      ...TeamMemberProjectBox_query @arguments(owner: $owner)
    }
  `
);

export default connect(mapState)(
  QueryRenderer(props => <RefetchContainer {...props} query={props} />, {
    query: graphql`
      query TeamMemberProjectBoxQuery($owner: ID!) {
        ...TeamMemberProjectBox_query @arguments(owner: $owner)
      }
    `,
    vars: ({ user }) => ({
      owner: toGid('User', user?.id || 0)
    })
  })
);
