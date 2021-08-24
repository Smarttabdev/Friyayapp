import React, { Component, Fragment } from 'react';
import { func, number } from 'prop-types';
import { connect } from 'react-redux';
import TopicTile from './TopicTile';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { createTopic } from 'Src/newRedux/database/topics/thunks';
import { moveTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { getThisDomain } from 'Src/lib/utilities';
import DMLoader from 'Src/dataManager/components/DMLoader';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import { setTopicPanelView } from 'Src/newRedux/interface/menus/thunks';
import SubtopicFilterDropdown from 'Src/components/shared/topics/elements/SubtopicFilterOptionsDropdown';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { getRootTopic } from 'Src/newRedux/database/topics/selectors';
import { setDomainSubtopicsView } from 'Src/newRedux/interface/menus/thunks';
import {
  getUiSettings,
  setUserUiSettings,
  setUserFilterSettings,
  getFilterSettings
} from 'Src/helpers/user_config';
import BoardAndCardTypeListDropdown from 'Components/shared/BoardAndCardTypeListDropdown';
import BoardTypeFilters from 'src/components/lenses/topic_lenses/BoardTypeFilters';
import classNames from 'classnames';
import Tooltip from 'Src/components/shared/Tooltip';
import SubtopicViewOptionsDropdown from 'src/components/shared/topics/elements/SubtopicViewOptionsDropdown';
import { setWorkspaceHomeSearchQuery } from 'src/newRedux/filters/actions';
import { setDefaultView } from 'src/lib/utilities';
class SmallTiles extends Component {
  constructor(props) {
    super(props);
    this.handleTopicViewSelect = this.handleTopicViewSelect.bind(this);
    this.setTopicPanelView = props.setTopicPanelView;
    this.setDomainSubtopicsView = props.setDomainSubtopicsView;
    this.viewDropdownRef = React.createRef();
    // this.placeholderAddBoardFormRef = React.createRef();
  }

  state = {
    showAddSubtopicBox: false,
    title: '',
    placeholderTitle: '',
    boardType: null,
    placeholderBoardType: null,
    showPlaceholderAddForm: false
  };

  static propTypes = {
    selectedTopicId: number,
    createTopic: func.isRequired
  };

  toggleNewSubtopic = () => {
    const { showAddSubtopicBox } = this.state;
    this.setState({
      showAddSubtopicBox: !showAddSubtopicBox,
      title: ''
    });
  };

  handleKeyPress = ({ e, isPlaceholder }) => {
    if (e.key === 'Enter') {
      this.submitSubtopic({ isPlaceholder });
    }
    if (e.key === 'Escape') {
      this.setState({ showPlaceholderAddForm: false });
    }
  };

  componentDidMount() {
    this.props?.setUserFilterSettings &&
      this.props.setUserFilterSettings({ board_type: [] });
    if (this.props.showAddTopicInput === true) {
      this.toggleNewSubtopic();
    }

    const { setUserUiSettings } = this.props;
    const payload = {
      add_option: false
    };
    setUserUiSettings(payload);
  }

  componentDidUpdate(prevProps) {
    if (this.props.showAddTopicInput !== prevProps.showAddTopicInput) {
      this.props.showAddTopicInput === true && this.toggleNewSubtopic();
    }
    if (this.state.viewDropdown) {
      const dropdown = this.viewDropdownRef.current;
      this.hideViewDropdownOnClickOut(dropdown);
    }
    // if (this.state.showPlaceholderAddForm) {
    //   const addBoardForm = this.placeholderAddBoardFormRef.current;
    //   this.handlePlaceholderAddBoardFormClickOut(addBoardForm);
    // }
    // if (this.props.boardTypeFilter !== prevProps.boardTypeFilter) {
    //   this.handleCurrentBoardTypeFilter();
    // }
  }

  submitSubtopic = async ({ isPlaceholder = false }) => {
    const {
      props: { createTopic, topic, currentGroup },
      state: { title, boardType, placeholderBoardType, placeholderTitle }
    } = this;
    const newBoardTitle = isPlaceholder ? placeholderTitle : title;
    const defaultViewId = setDefaultView(boardType);
    const relationships = currentGroup
      ? {
          share_settings: {
            data: [{ id: currentGroup.id, type: 'groups' }]
          }
        }
      : null;

    if (newBoardTitle.trim() === '') {
      isPlaceholder
        ? this.setState({ placeholderTitle: '' })
        : this.toggleNewSubtopic();
    } else {
      const parent_id = topic ? topic.id : null;
      const newTopic = {
        attributes: {
          title: newBoardTitle,
          parent_id,
          tag_list: isPlaceholder ? [placeholderBoardType] : [boardType],
          default_view_id: defaultViewId
        },
        relationships
      };
      const result = await createTopic(newTopic);
      const id = result?.data?.data?.id || null;
      if (defaultViewId && id) {
        await mutations.createPinnedLensesOrder({
          name: 'Default Tool',
          order: [defaultViewId],
          topicId: toGid('Topic', id),
          isTeamDefault: true
        });
      }
      isPlaceholder
        ? this.setState({ placeholderTitle: '' })
        : this.toggleNewSubtopic();
    }
  };

  handleTitleChange = ({ title, isPlaceholder = false }) => {
    isPlaceholder
      ? this.setState({ placeholderTitle: title })
      : this.setState({ title });
  };

  getCurrentDomain = () => {
    const { domains } = this.props;
    const thisDomain = getThisDomain(domains);
    window.currentDomain = thisDomain;

    return thisDomain;
  };

  handleTopicViewSelect = topicViewMode => {
    const { topic, setUserUiSettings } = this.props;
    setUserUiSettings({
      subtopic_panel_visible: true,
      subtopic_view: topicViewMode
    });
  };

  handleViewsClick = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { viewDropdown: !prevState.viewDropdown };
    });
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideViewDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!event.defaultPrevented) {
        if (!element.contains(event.target) || this.isVisible(element)) {
          this.setState({ viewDropdown: false });
          removeClickListener();
        }
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  handlePlaceholderAddBoardFormClickOut = element => {
    const outsideClickListener = event => {
      if (!event.defaultPrevented) {
        if (!element.contains(event.target) || this.isVisible(element)) {
          this.setState({ showPlaceholderAddForm: false });
          removeClickListener();
        }
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  handleCurrentBoardTypeFilter = () => {
    const { boardTypeFilter } = this.props;
    if (boardTypeFilter.includes('PROJECT_BOARDS')) {
      return this.setState({
        boardType: 'project'
      });
    }
    if (boardTypeFilter.includes('GOAL_BOARDS')) {
      return this.setState({
        boardType: 'goal'
      });
    }
    if (boardTypeFilter.includes('NOTE_BOARDS')) {
      return this.setState({
        boardType: 'notes'
      });
    }
    if (boardTypeFilter.includes('FILE_BOARDS')) {
      return this.setState({
        boardType: 'file'
      });
    }
    if (boardTypeFilter.includes('KNOWLEDGE_BOARDS')) {
      return this.setState({
        boardType: 'knowledge'
      });
    }
    if (boardTypeFilter.includes('TASK_BOARDS')) {
      return this.setState({
        boardType: 'task'
      });
    }
    if (boardTypeFilter.includes('DATA_BOARDS')) {
      return this.setState({
        boardType: 'data'
      });
    }

    return this.setState({ boardType: null });
  };

  toggleAddOptions = () => {
    const { addViewsPanelVisible, setUserUiSettings } = this.props;
    const payload = {
      add_option: !addViewsPanelVisible
    };
    setUserUiSettings(payload);
  };

  renderAddOptionsToggler = () => {
    const { addViewsPanelVisible } = this.props;
    const toggleClass = classNames('fa', 'icon', {
      'fa-toggle-on': addViewsPanelVisible,
      'fa-toggle-off': !addViewsPanelVisible,
      green: addViewsPanelVisible
    });
    return (
      <div
        className="title"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          minWidth: '200px',
          marginBottom: '10px'
        }}
      >
        <span className="text" onClick={this.toggleAddOptions}>
          Show quick add options
        </span>
        <a onClick={this.toggleAddOptions}>
          <i className={toggleClass} />
        </a>
      </div>
    );
  };

  AddBoardForm = ({ boardType, title, isPlaceholder }) => {
    return (
      <div className="flex-r-center">
        <BoardAndCardTypeListDropdown
          itemType={boardType}
          listType="board"
          setItemType={boardTypeValue =>
            isPlaceholder
              ? this.setState({ placeholderBoardType: boardTypeValue })
              : this.setState({ boardType: boardTypeValue })
          }
        />
        <input
          type="text"
          onChange={({ target }) =>
            this.handleTitleChange({ title: target.value, isPlaceholder })
          }
          onBlur={({ target }) => {
            target.placeholder = 'Title';
            target.scrollLeft = target.scrollWidth;
          }}
          placeholder="Title"
          onFocus={({ target }) => {
            target.placeholder = '';
            target.selectionStart = target.selectionEnd = target.value.length;
            target.scrollLeft = target.scrollWidth;
          }}
          onKeyDown={elem => this.handleKeyPress({ e: elem, isPlaceholder })}
          // onKeyDown={this.handleKeyPress}
          value={title}
          className="add-subtopic-input flex-item"
          style={{ flexBasis: 155 }}
          autoFocus
        />
      </div>
    );
  };

  AddBoardPlaceholder = ({ RenderAddBoardForm }) => {
    const { showPlaceholderAddForm } = this.state;
    return (
      <div
        className="add-board-placeholder"
        // ref={this.placeholderAddBoardFormRef}
      >
        {showPlaceholderAddForm ? (
          RenderAddBoardForm()
        ) : (
          <div
            onClick={() => this.setState({ showPlaceholderAddForm: true })}
            onBlur={() => this.setState({ showPlaceholderAddForm: false })}
            className="add-board flex-r-center"
          >
            <span>+ Add Board</span>
          </div>
        )}
      </div>
    );
  };

  render() {
    let {
      moveTopicFromDragAndDrop,
      topic,
      topics,
      topicRequirements = {},
      setUserFilterSettings,
      boardTypeFilter,
      mainBoard,
      active_design,
      page,
      topicId,
      workspaceHomeSearchQuery,
      setWorkspaceHomeSearchQuery
    } = this.props;
    const {
      showAddSubtopicBox,
      title,
      boardType,
      placeholderBoardType,
      placeholderTitle
    } = this.state;
    const isBoardsPage = ['home', 'topics'].includes(page);
    if (Object.entries(mainBoard || {}).length > 0 && isBoardsPage) {
      topics = [mainBoard, ...topics];
    }
    const activeDesign = active_design.card_font_color;
    const forId = Math.ceil(Math.random() * 100000, 6);

    if (isBoardsPage) {
      topicRequirements = {
        ...topicRequirements,
        ...{
          title: workspaceHomeSearchQuery,
          parentTopicId: topicId,
          tagged: boardTypeFilter
        }
      };
    }

    return (
      <Fragment>
        <div style={{ position: 'relative' }}>
          <h3 className="subtopic-header-text">
            <div className="boards-btn-container">
              <span
                style={{
                  borderBottom:
                    boardTypeFilter.length === 0
                      ? `2px solid ${
                          activeDesign && !isBoardsPage
                            ? activeDesign
                            : '#c48FC8'
                        }`
                      : '',
                  color:
                    activeDesign && !isBoardsPage ? activeDesign : '#757a7e'
                }}
                onClick={() => setUserFilterSettings({ board_type: [] })}
                className="subtopic-header-text-text"
              >
                All Boards
              </span>

              <i
                style={{
                  fontSize: '12px',
                  color:
                    activeDesign && !isBoardsPage ? activeDesign : '#757a7e',
                  marginTop: '8px',
                  marginLeft: '3px',
                  cursor: 'pointer'
                }}
                onClick={this.handleViewsClick}
                className={`fa fa-caret-${
                  !this.state.viewDropdown ? 'down' : 'up'
                }`}
              ></i>
              <BoardTypeFilters
                defaultColor={activeDesign}
                isBoardsPage={isBoardsPage}
              />
              {isBoardsPage ? (
                <Fragment>
                  <div
                    style={{
                      display: 'flex',
                      marginLeft: '3px',
                      alignItems: 'center',
                      cursor: 'pointer',
                      background: '#70CF97',
                      borderRadius: '20px',
                      width: '120px',
                      padding: '5px  10px 5px 0'
                    }}
                    onClick={() => {
                      this.toggleNewSubtopic();
                      this.handleCurrentBoardTypeFilter();
                    }}
                  >
                    <i
                      style={{
                        color: '#fff',
                        fontSize: '22px',
                        fontWeight: 600,
                        marginTop: '2px'
                      }}
                      className="tiphive-icon material-icons addIcon"
                    >
                      add_circle
                    </i>
                    <span
                      style={{
                        color: '#fff',
                        fontWeight: 400,
                        fontSize: '12px',
                        marginLeft: '5px'
                      }}
                    >
                      Add a Board
                    </span>
                  </div>
                  <div className="small-tiles-board__search">
                    <input
                      type="search"
                      value={workspaceHomeSearchQuery}
                      onChange={({ target }) =>
                        setWorkspaceHomeSearchQuery(target.value)
                      }
                      autoFocus
                      placeholder="Find a Board"
                    />
                  </div>
                </Fragment>
              ) : (
                <div
                  data-tip={'Add Board'}
                  data-for={forId}
                  style={{
                    display: 'flex',
                    marginLeft: '3px',
                    marginTop: '2.5px'
                  }}
                >
                  <i
                    onClick={() => {
                      this.toggleNewSubtopic();
                      this.handleCurrentBoardTypeFilter();
                    }}
                    style={{
                      color: activeDesign ? activeDesign : null,
                      fontSize: '16px',
                      fontWeight: 600
                    }}
                    className="tiphive-icon material-icons addIcon"
                  >
                    add
                  </i>
                  <Tooltip {...{ place: 'right' }} id={forId} />
                </div>
              )}
            </div>
          </h3>
          {this.state.viewDropdown ? (
            <span
              ref={this.viewDropdownRef}
              className="viewOptionsAndFilterDropdown"
            >
              {this.renderAddOptionsToggler()}
              {!isBoardsPage && (
                <Fragment>
                  {' '}
                  <span className="title">Show Boards as:</span>
                  <SubtopicViewOptionsDropdown
                    onSelect={this.handleTopicViewSelect}
                  />{' '}
                </Fragment>
              )}
              <span className="title">Filter:</span>
              <SubtopicFilterDropdown
                closeDropdown={() => this.setState({ viewDropdown: false })}
              />
            </span>
          ) : null}
        </div>
        <div className="small-tiles-board">
          {topics.length === 0 ? (
            <div className="grid-view_card-container ml0">
              <button
                onClick={this.toggleNewSubtopic}
                className="img-placeholder"
                style={{ border: 'none' }}
              >
                + Add Board
              </button>
              <div
                className="flex-item add-subtopic-input"
                style={{ border: 'none' }}
              ></div>
            </div>
          ) : null}
          {showAddSubtopicBox && (
            <div className="small-tiles-view_item-container">
              <div className="grid-view_card-container ml0">
                <div>
                  <div className="img-placeholder flex-item" />
                  <this.AddBoardForm boardType={boardType} title={title} />
                </div>
              </div>
            </div>
          )}
          <GenericDragDropListing
            dragClassName="task-view_drag-card"
            dropClassName="small-tiles-view_item-container"
            dropZoneProps={{ topicId: topic ? topic.id : null }}
            draggedItemProps={{ origin: { topicId: topic ? topic.id : null } }}
            itemContainerClassName="grid-view_card-container ml0"
            itemList={topics}
            itemType={dragItemTypes.TOPIC}
            onDropItem={moveTopicFromDragAndDrop}
            renderItem={top => (
              <TopicTile topic={top} subtopic={top} key={top.id} />
            )}
          >
            {topics.length > 0 && (
              <this.AddBoardPlaceholder
                RenderAddBoardForm={() => (
                  <this.AddBoardForm
                    boardType={placeholderBoardType}
                    title={placeholderTitle}
                    isPlaceholder
                  />
                )}
              />
            )}
            <DMLoader
              dataRequirements={{
                topicsWithAttributes: {
                  attributes: topicRequirements
                }
              }}
              loaderKey="topicsWithAttributes"
            />
          </GenericDragDropListing>
        </div>
      </Fragment>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design },
    groups,
    page: { groupId, page, topicId },
    filters: { workspaceHomeSearchQuery }
  } = sm;
  const ui_settings = getUiSettings(state);
  const currentGroup = groups[groupId];
  const filter_setting = getFilterSettings(state);
  const rootTopic = getRootTopic(state);
  return {
    active_design,
    subtopicPanelVisible: ui_settings.topics_panel_visible,
    domains: getDomains(state),
    myTopicsView: ui_settings.current_active_template,
    currentGroup,
    boardTypeFilter: filter_setting.board_type || [],
    addViewsPanelVisible: ui_settings.add_option,
    mainBoard: rootTopic,
    page,
    topicId,
    workspaceHomeSearchQuery
  };
};

const mapDispatch = {
  createTopic,
  moveTopicFromDragAndDrop,
  setTopicPanelView,
  setDomainSubtopicsView,
  setUserUiSettings,
  setUserFilterSettings,
  setWorkspaceHomeSearchQuery
};

export default connect(mapState, mapDispatch)(SmallTiles);
