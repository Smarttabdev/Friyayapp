import React, { Component } from 'react';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import get from 'lodash/get';
import CompletionSlider from 'Components/shared/CompletionSlider';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import IconButton from 'Components/shared/buttons/IconButton';
import { updateTeamPlanUsers } from 'Src/newRedux/database/GIDBFLenses/actions';
import SelectableUserList from 'Src/components/shared/users/elements/SelectableUserList';
import { viewTopic, updateTopic } from 'Src/newRedux/database/topics/thunks';
import GroupByDropDown from 'Components/shared/assemblies/GroupByDropDown';
import Speed from '../Speed';
import Tooltip from 'Components/shared/Tooltip';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Dropdown from 'Components/shared/Dropdown';
import { Link } from 'react-router-dom';
import { updateUser } from 'Actions/appUser';
import Icon from 'Components/shared/Icon';
import { getBoardTypeAttributes } from 'Src/utils/icons';
import { getBoardType } from 'Lib/utilities';

const moment = extendMoment(Moment);

class UserBoxHeader extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {
      workloadAvailability:
        props.user.attributes?.user_profile?.resource_capacity || 0
    };
  }
  removeBox = type => {
    if (type == 'user') {
      const order = this.props.selectedUserIds.filter(
        id => id != this.props.user.id
      );
      this.props.updatePeopleOrder(order);
    } else {
      this.props.removeSelectedTopic(this.props.user);
    }
  };

  toggleUserDropdown = () => {
    this.setState(prevState => ({ userDropdown: !prevState.userDropdown }));
  };

  handleSelectUser = userId => {
    const { user, selectedUserIds } = this.props;
    const revisedPeopleOrderPeopleIds = selectedUserIds.filter(
      id => id != userId[0]
    );
    revisedPeopleOrderPeopleIds.splice(
      revisedPeopleOrderPeopleIds.indexOf(user.id),
      1,
      userId[0]
    );
    this.props.updatePeopleOrder(revisedPeopleOrderPeopleIds);
    // updateTeamPlanUsers({ userId: userId[0], replaceId: user.id });
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element.contains(event.target) || this.isVisible(element)) {
        this.setState({ userDropdown: false });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  componentDidUpdate() {
    if (this.state.userDropdown) {
      const dropdown = this.dropdownRef.current;
      this.hideDropdownOnClickOut(dropdown);
    }
  }

  handleEditBoardTitle = edit => () => {
    const { topic } = this.props;
    this.setState({
      editBoardTitle: edit,
      newBoardTitle: edit ? topic.attributes.title : this.state.newBoardTitle
    });
  };

  handleChange = state => e => {
    this.setState({ [state]: e.target.value });
  };

  handleKeyUpBoardTitle = e => {
    if (e.key === 'Escape') {
      this.setState({ editBoardTitle: false });
    } else if (e.nativeEvent.key === 'Enter') {
      this.handleSubmitBoardTitle();
    }
  };

  handleSubmitBoardTitle = e => {
    const { topic, updateTopic } = this.props;
    const { newBoardTitle } = this.state;
    e.preventDefault();
    updateTopic({ id: topic.id, attributes: { title: newBoardTitle } });
    this.setState({ editBoardTitle: false });
  };

  handleWorkloadAvailabilityChange = e => {
    if (e.target.value.length <= 3)
      this.setState({ workloadAvailability: e.target.value });
  };

  submitWorkload = e => {
    e.preventDefault();
    document.activeElement.blur();
  };

  handleWorkloadSave = () => {
    const value = this.state.workloadAvailability;
    const isValidValue = value && value >= 0 && value <= 168;
    const isChanged =
      this.props.user.attributes?.user_profile?.resource_capacity !== value;

    if (isValidValue && isChanged) {
      this.props.updateUser({
        id: this.props.user.id,
        resourceCapacity: Number(value)
      });
    }
  };

  render() {
    const {
      user,
      topic,
      completionLevel,
      cards,
      completedCards,
      users,
      projectPlan,
      viewTopic,
      totalBonusPoints,
      userWorkload,
      currentUser,
      rootUrl,
      isExpanded = true,
      vertical,
      handleExpandToggle
    } = this.props;
    const { userDropdown, newBoardTitle, editBoardTitle } = this.state;
    const peopleUrl = (rootUrl == '/' ? '' : rootUrl) + '/users';
    const userUrl = peopleUrl + `/${currentUser.id}`;

    return (
      <div
        className={`team_plan-user_box-header ${!vertical &&
          !isExpanded &&
          'horizontal-collapsed'}`}
      >
        <div className="left_contents">
          {!projectPlan ? (
            <div
              className={`user-container ${!vertical &&
                !isExpanded &&
                'team-user-collapse-horizontal'}`}
            >
              <IconButton
                fontAwesome
                icon={isExpanded ? 'caret-down' : 'caret-right'}
                onClick={handleExpandToggle}
              />
              <div
                className={`user ${!vertical &&
                  !isExpanded &&
                  'team-user-collapse-horizontal'}`}
                onClick={this.toggleUserDropdown}
              >
                <UserAvatar
                  user={get(user, 'attributes')}
                  margin={0}
                  size={24}
                  tooltipText={false}
                  color="#bbb"
                  noPointer
                />
                <div className="name mr7">
                  {get(user, 'attributes.first_name')}
                </div>
                <div className="remove mr3">
                  <IconButton
                    icon="close"
                    fontSize="20px"
                    onClick={() => this.removeBox('user')}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`user topic ${!vertical &&
                !isExpanded &&
                'topic-collapse-horizontal'}`}
            >
              <IconButton
                fontAwesome
                icon={isExpanded ? 'caret-down' : 'caret-right'}
                onClick={handleExpandToggle}
              />
              <Icon
                icon={getBoardTypeAttributes(getBoardType(topic)).icon}
                outlined={getBoardTypeAttributes(getBoardType(topic)).outlined}
                style={{
                  fontSize:
                    getBoardTypeAttributes(getBoardType(topic)).icon ===
                    'hashtag'
                      ? 16
                      : 18
                }}
                fontAwesome={
                  getBoardTypeAttributes(getBoardType(topic)).fontAwesome
                }
                color={getBoardTypeAttributes(getBoardType(topic)).color}
              />
              {!editBoardTitle ? (
                <div
                  className="name mr10"
                  onDoubleClick={this.handleEditBoardTitle(true)}
                >
                  {get(topic, 'attributes.title')}
                </div>
              ) : (
                <form className="name" onSubmit={this.handleSubmitBoardTitle}>
                  <input
                    className="form-control form-control-minimal"
                    value={newBoardTitle}
                    onChange={this.handleChange('newBoardTitle')}
                    onBlur={this.handleEditBoardTitle(false)}
                    onKeyUp={this.handleKeyUpBoardTitle}
                    autoFocus
                  />
                </form>
              )}
              <div className="view-board-btn">
                <IconButton
                  icon="launch"
                  fontSize="20px"
                  onClick={() => viewTopic({ topicId: topic.id })}
                />
              </div>
              <div className="remove">
                <IconButton
                  icon="close"
                  fontSize="20px"
                  onClick={() => this.removeBox('topic')}
                />
              </div>
            </div>
          )}
          {userDropdown && (
            <div
              className="dropdown-menu label-select-dropdown"
              aria-labelledby="dLabel"
              ref={this.dropdownRef}
            >
              <SelectableUserList
                onChangeSelection={this.handleSelectUser}
                users={users}
                // selectedUserIds={selectedUserIds}
              />
            </div>
          )}
        </div>

        {/* hide user result if collapsed */}
        {isExpanded && (
          <div className="user-results">
            <GroupByDropDown additionalClass={' pr5 mr10'} />
            {userWorkload >
              user.attributes?.user_profile?.resource_capacity && (
              <>
                {currentUser.id === user.id ? (
                  <Dropdown
                    closeOnClick={false}
                    menuStyle={{ left: -100 }}
                    trigger={
                      <div
                        data-for={`workload-indicator-${user?.id}`}
                        data-tip={`Overload: Estimated work exceeds ${user
                          .attributes?.user_profile?.resource_capacity ||
                          0} hours`}
                        style={{ cursor: 'pointer', marginRight: 10 }}
                      >
                        &#x1F605;
                        <Tooltip
                          place="top"
                          id={`workload-indicator-${user?.id}`}
                        />
                      </div>
                    }
                  >
                    <div className="user-workload">
                      <Link to={userUrl}>
                        <UserAvatar
                          user={get(user, 'attributes')}
                          margin={0}
                          size={50}
                          tooltipText={false}
                          color="#bbb"
                        />
                      </Link>
                      <div>
                        <Link to={userUrl}>{get(user, 'attributes.name')}</Link>
                        <form
                          className="workload-form"
                          onSubmit={this.submitWorkload}
                        >
                          <span>Available</span>
                          <input
                            type="number"
                            max="168"
                            min="0"
                            placeholder="0"
                            value={this.state.workloadAvailability}
                            onChange={this.handleWorkloadAvailabilityChange}
                            onBlur={this.handleWorkloadSave}
                          />
                          <span>hours / week</span>
                        </form>
                      </div>
                    </div>
                  </Dropdown>
                ) : (
                  <div
                    data-for={`workload-indicator-${user?.id}`}
                    data-tip={`Overload: Estimated work exceeds ${user
                      .attributes?.user_profile?.resource_capacity || 0} hours`}
                    style={{ cursor: 'help', marginRight: 10 }}
                  >
                    &#x1F605;
                    <Tooltip
                      place="bottom"
                      id={`workload-indicator-${user?.id}`}
                    />
                  </div>
                )}
              </>
            )}
            <Speed cards={cards} completionLevel={completionLevel} />
            <span className="to-go">
              {cards.length - completedCards.length} to go
            </span>
            <div className="header-completion-slider">
              <CompletionSlider value={completionLevel} />
            </div>
            <div style={{ fontWeight: 'bold' }}>
              {completedCards.length}/{cards.length}
            </div>
            <div
              className="user-bonus-points"
              data-tip="Bonus Points"
              data-for={'bonus-points'}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <div className="header-bonus_points">
                <img
                  src={'/images/bonus-points.png'}
                  style={{
                    maxWidth: '2rem',
                    maxHeight: '2rem'
                  }}
                  alt="B.P"
                />
              </div>
              {totalBonusPoints}
              <Tooltip place="bottom" id={'bonus-points'} />
            </div>
          </div>
        )}

        {projectPlan && !isExpanded && (
          <div className="user-results">
            <div className="header-completion-slider">
              <CompletionSlider value={completionLevel} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state, props) => {
  const {
    topics,
    people,
    GIDBFLenses: {
      team_plan: { userIds }
    },
    page: { rootUrl },
    tools
  } = stateMappings(state);
  const {
    cards,
    user,
    projectPlan,
    startDate,
    endDate,
    selectedUserIds
  } = props;

  const users = Object.keys(people)
    .map(peopleId => peopleId)
    .map(peopleId => people[peopleId])
    .filter(usr => !selectedUserIds.includes(usr.id) && usr.id != user.id);

  const completedCards = cards.filter(
    card => card.attributes.completed_percentage == 100
  );
  const completionLevel = Math.floor(
    (completedCards.length / cards.length) * 100
  );

  let topic = null;
  projectPlan && (topic = topics[user.value]);

  const checkDueDate = due_date => {
    if (!due_date) return false;
    return moment(due_date).isBetween(
      startDate,
      moment(endDate).endOf('second'),
      null,
      '[]'
    );
  };

  let userCards = Object.keys(cards)
    .map(cardId => cardId)
    .map(cardId => cards[cardId])
    .filter(card => !card.relationships.follows_tip.data)
    .filter(
      card =>
        card.relationships.tip_assignments.data.includes(user.id) &&
        checkDueDate(card.attributes.due_date)
    );

  let totalBonusPoints = 0;
  userCards?.forEach(card => {
    totalBonusPoints = totalBonusPoints + card.attributes.cactii;
  });

  return {
    cards,
    completedCards,
    completionLevel: isFinite(completionLevel) ? completionLevel : 0,
    users,
    topic,
    totalBonusPoints,
    currentUser: stateMappings(state).user,
    rootUrl,
    vertical: props.goalPlan
      ? tools.goalPlanLens.vertical
      : props.projectPlan
      ? tools.projectPlanLens.vertical
      : tools.teamPlanLens.vertical
  };
};

const mapDispatch = {
  updateTeamPlanUsers,
  viewTopic,
  updateTopic,
  updateUser
};

export default connect(mapState, mapDispatch)(UserBoxHeader);
