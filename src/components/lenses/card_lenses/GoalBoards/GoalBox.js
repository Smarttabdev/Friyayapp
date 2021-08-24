import React, { useState, useRef } from 'react';
import Icon from 'Components/shared/Icon';
import SprintBar from 'src/components/shared/topics/SprintBar/SprintBar';
import TopicTitleLink from 'Components/shared/topics/elements/TopicTitleLink';
import { getBoardTypeAttributes } from 'Src/utils/icons';
import { getBoardType } from 'Lib/utilities';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import Tooltip from 'Components/shared/Tooltip';
import { setUpdateTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import { connect } from 'react-redux';

function GoalBox(props) {
  const { board, users, setUpdateTopicModalOpen, hideAddAssignee } = props;
  const boardType = getBoardType(board);
  const { icon, fontAwesome, outlined, color } = getBoardTypeAttributes(
    boardType
  );

  const usersAssignments = board.relationships?.assignments?.data || [];
  const [showAllUsers, setShowAllUsers] = useState(false);
  const allUsersDropdownRef = useRef();

  return (
    <div className="goal-box-container">
      <div
        className="title-header-container"
        style={{
          background: color
        }}
      >
        <Icon
          icon={icon}
          outlined={outlined}
          fontAwesome={fontAwesome}
          additionalClasses={boardType == 'project' && 'tiphive-icon'}
        />
        <TopicTitleLink
          additionalClasses="title"
          topic={board}
          color={'#FFF'}
          truncate
          hideActivityIndicator
        />
        <div
          style={{
            display: hideAddAssignee ? 'none' : 'flex',
            marginLeft: 'auto',
            marginRight: '13px',
            position: 'relative'
          }}
        >
          {usersAssignments.map((user, i) => {
            if (i < 2) {
              return (
                <div
                  key={i}
                  data-tip={users[user.assigned_id].attributes.name}
                  data-for={user.assigned_id}
                >
                  <UserAvatar
                    userId={user.assigned_id}
                    margin={3}
                    size={24}
                    tooltipText={false}
                    color={'#F1F1F1'}
                    noPointer
                  />
                  <Tooltip {...{ place: 'bottom' }} id={user.assigned_id} />
                </div>
              );
            }
          })}
          {usersAssignments.length > 10 && (
            <div onClick={() => setShowAllUsers(!showAllUsers)}>
              <UserAvatar
                user={{ name: `+${usersAssignments.length - 10}` }}
                margin={3}
                size={24}
                tooltipText={false}
                color={'#F1F1F1'}
                isCounter
              />
            </div>
          )}
          {showAllUsers && (
            <div
              className="dropdown-menu"
              style={{
                display: 'flex',
                maxHeight: '200px',
                overflowY: 'auto',
                flexWrap: 'wrap',
                left: '-100px',
                top: 'calc(100% + 3px)'
              }}
              ref={allUsersDropdownRef}
            >
              {usersAssignments.map((user, i) => (
                <div
                  key={i}
                  data-tip={users[user.assigned_id].attributes.name}
                  data-for={user.assigned_id}
                >
                  <UserAvatar
                    user={user.user}
                    userId={user.assigned_id}
                    margin={5}
                    marginTop={5}
                    size={24}
                    tooltipText={false}
                    color={'#F1F1F1'}
                    noPointer
                  />
                  <Tooltip {...{ place: 'bottom' }} id={user.assigned_id} />
                </div>
              ))}
            </div>
          )}
          <div
            data-tip={'+ Add Assignee'}
            data-for={'+ Add Assignee'}
            onClick={() => setUpdateTopicModalOpen(board?.id, true, 4)}
          >
            <UserAvatar
              user={{ name: `+` }}
              margin={3}
              size={24}
              tooltipText={false}
              color={'#F1F1F1'}
              isCounter
            />
            <Tooltip {...{ place: 'bottom' }} id={'+ Add Assignee'} />
          </div>
        </div>
      </div>
      <SprintBar topic={board} showSprintBar hideFilter />
    </div>
  );
}

export default connect(null, { setUpdateTopicModalOpen })(GoalBox);
