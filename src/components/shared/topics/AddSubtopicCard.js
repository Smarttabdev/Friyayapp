import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import set from 'lodash/set';
import PropTypes from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import FormInput from 'Components/shared/forms/FormInput';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { setCopyTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import Icon from 'Components/shared/Icon';
import BoardAndCardTypeListDropdown from '../BoardAndCardTypeListDropdown';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import cardLenses from 'Lib/config/lenses/cards';
import { PickBoardDropdown } from 'Components/shared/PickBoardButton';
import {
  createTopic,
  setUserLensPinSettings
} from 'Src/newRedux/database/topics/thunks';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';
import { updateUiSettings } from 'Src/newRedux/database/topics/apiCalls';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import AddAssignee from '../cards/AddAssignee';
import { setDefaultView } from 'src/lib/utilities';
class AddSubtopicCard extends PureComponent {
  constructor(props) {
    super(props);

    const lensConfig = cardLenses[props.viewKey];

    this.state = {
      topicTitle: '',
      inInputMode: props.inInputMode,
      isSaving: false,
      boardType: this.props.tag || lensConfig?.boardType || null,
      boardIndex: this.props.boardIndex,
      showPickAnExistingBoardComponent: false,
      dueDate: null,
      selectedTopicIds: [],
      assignees: []
    };
  }

  componentDidMount() {
    if (this.props.inInputMode) {
      window.addEventListener('keydown', this.handleKeyDown, true);
    }
    if (this.props.boardIndex === 0) {
      this.setState({ boardType: null });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.inInputMode !== prevProps.inInputMode) {
      this.handleToggleInputMode();
    }
  }

  handleCreateSubtopic = async () => {
    const {
      state: {
        topicTitle,
        boardType,
        dueDate,
        assignees = [],
        selectedTopicIds
      },
      props: {
        createTopic,
        newTopicAttributes = {},
        newTopicRelationships = {},
        parentTopicId = null,
        selectedGroupId,
        selectedUserId,
        tag,
        selectedGoalId,
        trackerLaneView,
        setUserLensPinSettings,
        setUserUiSettings,
        isPrivate
      }
    } = this;

    this.setState({ isSaving: true });
    const defaultViewId = setDefaultView(boardType);
    let attributes = {
      ...newTopicAttributes,
      title: topicTitle,
      parent_id: parentTopicId,
      tag_list: boardType ? [boardType] : [],
      default_view_id: defaultViewId,
      due_date: dueDate || newTopicAttributes?.due_date
    };

    let relationships = { ...newTopicRelationships };

    if (this.props.tag) {
      attributes = {
        ...attributes,
        tag_list: [tag]
      };

      if (
        (selectedGroupId || selectedUserId) &&
        tag === 'goal' &&
        trackerLaneView
      ) {
        relationships = {
          ...relationships,
          assignments: {
            ...newTopicRelationships?.assignments,
            data: [
              {
                assigned_type: selectedUserId ? 'User' : 'Group',
                assigned_id: toId(selectedUserId || selectedGroupId)
              }
            ]
          }
        };
      }

      if (selectedGoalId && tag === 'project' && trackerLaneView) {
        attributes = {
          ...attributes,
          parent_id: selectedGoalId ? toId(selectedGoalId) : null
        };
      }
    }
    relationships = {
      ...relationships,
      assignments: {
        data: newTopicRelationships?.assignments?.data
          ? newTopicRelationships?.assignments?.data
          : assignees?.length > 0
          ? [
              ...assignees.map(i => ({
                assigned_type: 'User',
                assigned_id: toId(i.id)
              }))
            ]
          : []
      },
      share_settings: isPrivate && {
        data: [
          {
            sharing_object_id: 'private'
          }
        ]
      }
    };

    parentTopicId && set(relationships, 'parent.data', parentTopicId);
    const newTopic = await createTopic({ attributes, relationships });
    this.setState({ topicTitle: '', isSaving: false });
    this.handleToggleInputMode();
    this.props.afterTopicCreated &&
      this.props.afterTopicCreated(newTopic.data.data.id);
    this.props.onDismiss && this.props.onDismiss();
  };

  handleSetSubtopicTitle = topicTitle => {
    this.setState({ topicTitle });
  };

  handleSetOtherDetails = ({ assignees, dueDate, selectedTopicIds }) => {
    this.setState({ assignees, dueDate, selectedTopicIds });
  };

  handleToggleInputMode = () => {
    this.state.inInputMode
      ? window.removeEventListener('keydown', this.handleKeyDown, true)
      : window.addEventListener('keydown', this.handleKeyDown, true);
    this.setState(state => ({ inInputMode: !state.inInputMode }));
  };

  handleKeyDown = e => {
    if (e.key == 'Escape' || e.keyCode == 27) {
      this.handleToggleInputMode();
      this.props.onDismiss && this.props.onDismiss();
    }
  };

  toggleTemplates = () => {
    this.setState(prev => {
      return {
        showTemplates: !prev.showTemplates
      };
    });
  };

  handleUseTemplate = async topic => {
    const { setCopyTopicModalOpen } = this.props;
    setCopyTopicModalOpen(true, topic);
  };

  render() {
    const {
      containerClassName,
      addTopicUI,
      templates,
      newDesign,
      cardStyle = {},
      formPlaceholder = 'Type new Board title',
      card_font_color,
      isFilesTool,
      transparent = false,
      topicHeader,
      parentTopicId = null,
      PickAnExistingBoard,
      newTopicAttributes,
      newTopicRelationships,
      lessDesign,
      hideAssignee
    } = this.props;
    const {
      topicTitle,
      inInputMode,
      isSaving,
      showTemplates,
      showPickBoard,
      showPickAnExistingBoardComponent,
      boardType,
      boardIndex
    } = this.state;

    const content = (
      <div className="add-subtopic-card_content" style={cardStyle}>
        {isSaving && <LoadingIndicator />}
        {addTopicUI && (
          <a
            className="dark-grey-link w400"
            onClick={this.handleToggleInputMode}
          >
            {inInputMode ? null : addTopicUI}
          </a>
        )}

        {!isSaving && inInputMode && (
          <div
            className="add-sub-topic-input-wrapper"
            style={{ color: transparent && card_font_color }}
          >
            <div className="flex-r-center">
              <BoardAndCardTypeListDropdown
                listType="board"
                itemType={this.state.boardType}
                setItemType={boardTypeValue => {
                  this.setState({ boardType: boardTypeValue });
                }}
                containerStyle={{ paddingBottom: 12 }}
                smallModal={this.props.boardTypeSmallModal}
                itemListClasses="item-list-icon"
                containerClasses="item-list-icon"
                color={transparent && card_font_color}
              />
              <FormInput
                autoFocus
                defaultValue={topicTitle}
                onChange={this.handleSetSubtopicTitle}
                onSubmit={this.handleCreateSubtopic}
                placeholder="Board title"
                color={transparent && card_font_color}
                transparent={transparent}
              />
            </div>
            {!hideAssignee && (
              <AddAssignee
                transparent={transparent}
                createBoard
                topicHeader={topicHeader}
                topicId={parentTopicId}
                getDetails={this.handleSetOtherDetails}
                // taskCard={
                //   boardType === 'task' && boardIndex !== 0 ? true : false
                // }
                initialDueDate={newTopicAttributes?.due_date}
                initialAssignments={newTopicRelationships?.assignments?.data}
              />
            )}
            <div
              className="add-sub-topic-input-footer"
              style={{ color: transparent && card_font_color }}
            >
              <button onClick={this.handleCreateSubtopic}>Create</button>
            </div>

            {PickAnExistingBoard && <hr />}
            {/* <div
              onClick={this.toggleTemplates}
              style={{
                cursor: 'pointer',
                color: (transparent && card_font_color) || '#bbb'
              }}
            >
              Use a template
            </div>
            {showTemplates && (
              <div>
                {templates.map((template, i) => (
                  <div key={i} style={{ margin: '5px 0 5px 15px' }}>
                    <div
                      onClick={() => this.handleUseTemplate(template)}
                      style={{ display: 'inline', cursor: 'pointer' }}
                    >
                      {template.attributes.title}
                    </div>
                  </div>
                ))}
              </div>
            )} */}

            {PickAnExistingBoard && (
              <button
                className="pick-an-existing-board"
                onClick={() =>
                  this.setState({
                    showPickAnExistingBoardComponent: !showPickAnExistingBoardComponent
                  })
                }
              >
                Pick an existing Board
              </button>
            )}
            {showPickAnExistingBoardComponent && <PickAnExistingBoard />}
          </div>
        )}
      </div>
    );

    if (newDesign) {
      return (
        <div
          className={`${containerClassName} add-topic-form-new-design-container ${this
            .props.parentTopicId == 1 && 'root-board'}`}
          style={
            isFilesTool &&
            card_font_color && {
              borderTop: `solid 1px ${card_font_color}`,
              borderBottom: `solid 1px ${card_font_color}`
            }
          }
        >
          <div className="add-sub-topic-input-wrapper">
            <div className="plus-icon">
              <Icon
                icon="add"
                style={{ fontSize: lessDesign ? '24px' : '16px' }}
                color={
                  (isFilesTool && card_font_color) ||
                  (isFilesTool && '#6fcf97') ||
                  (lessDesign && '#6FCF97') ||
                  '#ffffff'
                }
              />
            </div>
            {!isSaving && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  marginLeft: lessDesign ? '0.5rem' : '1.5rem',
                  width: '100%'
                }}
              >
                <BoardAndCardTypeListDropdown
                  listType="board"
                  itemType={this.state.boardType}
                  setItemType={boardTypeValue =>
                    this.setState({ boardType: boardTypeValue })
                  }
                  containerStyle={{ paddingBottom: 8, paddingRight: 4 }}
                  smallModal={this.props.boardTypeSmallModal}
                  itemListClasses="item-list-icon"
                  containerClasses="item-list-icon"
                  hideItemTypeDropdown={this.props.hideItemTypeDropdown}
                  color={transparent && card_font_color}
                />
                <FormInput
                  defaultValue={topicTitle}
                  onChange={this.handleSetSubtopicTitle}
                  onSubmit={this.handleCreateSubtopic}
                  placeholder={formPlaceholder}
                  additionalClasses="add-subtopic-form"
                  color={transparent && card_font_color}
                  transparent={transparent}
                  lessDesign={lessDesign}
                />
                <div
                  onClick={() =>
                    this.setState({ showPickBoard: !showPickBoard })
                  }
                  style={{
                    cursor: 'pointer',
                    color:
                      ((isFilesTool || lessDesign) && card_font_color) ||
                      '#b8b8b8',
                    fontSize: '12px'
                  }}
                  className="select-board"
                >
                  Pick a board
                </div>
                <PickBoardDropdown
                  open={showPickBoard}
                  onClose={() => this.setState({ showPickBoard: false })}
                  parentTopic={this.props.parentTopicId}
                  panelProps={{
                    actionButtonLabel: 'Select Board',
                    boardTypeSmallModal: true,
                    topicsSelectMenuProps: {
                      allowSelectBoard: true
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return containerClassName ? (
        <div className={containerClassName}>{content}</div>
      ) : (
        content
      );
    }
  }
}

const mapState = state => {
  const {
    tools: {
      trackerLens: { selectedUserId, selectedGroupId, selectedGoalId }
    }
  } = stateMappings(state);
  let allWorkspaceViews = getSortedFilteredTopicsByParentTopic(state)[0] || [];
  const templates = allWorkspaceViews.filter(
    topic => topic.attributes.is_template == true
  );
  return {
    templates,
    selectedUserId,
    selectedGroupId,
    selectedGoalId,
    viewKey: getRelevantViewForPage(state),
    card_font_color: stateMappings(state).utilities.active_design
      .card_font_color
  };
};

const mapDispatch = {
  createTopic,
  setCopyTopicModalOpen,
  getUiSettings,
  setUserLensPinSettings,
  setUserUiSettings,
  createCard,
  updateUiSettings
};

export default connect(mapState, mapDispatch)(AddSubtopicCard);
